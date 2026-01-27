
import { NextRequest, NextResponse } from "next/server";
import { dbTablas, catalogo_clientes, registroPago } from "../../schema";
import { eq, sql, desc } from "drizzle-orm";

export async function GET(req: NextRequest) {
  try {
    // Left Join Clients with Payments to get all history
    // We need all clients, even those without payments (LEFT JOIN from Clients to Payments)
    const data = await dbTablas
      .select({
        // Client info
        id_cliente: catalogo_clientes.id_cliente,
        nombre_cliente: catalogo_clientes.nombre_cliente,
        rfc: catalogo_clientes.rfc,
        telefono_cliente: catalogo_clientes.telefono_cliente,
        correo_cliente: catalogo_clientes.correo_cliente,
        fecha_alta: catalogo_clientes.fecha_alta,
        correo_empleado_cliente: catalogo_clientes.correo_empleado,
        // Payment info
        id_pago: registroPago.id_pago,
        concepto: registroPago.concepto,
        pago: registroPago.pago,
        mes_pago: registroPago.mes_pago,
        year_pago: registroPago.year_pago,
        correo_empleado_pago: registroPago.correo_empleado
      })
      .from(catalogo_clientes)
      .leftJoin(registroPago, eq(sql`${catalogo_clientes.id_cliente}::text`, registroPago.id_cliente))
      .orderBy(catalogo_clientes.nombre_cliente, desc(registroPago.year_pago), desc(registroPago.mes_pago));

    const headers = [
      "id_pago", // Hidden/System ID for updates
      "nombre_cliente",
      "rfc",
      "telefono_cliente",
      "correo_cliente",
      "fecha_alta",
      "concepto",
      "pago",
      "mes_pago",
      "year_pago",
      "correo_empleado"
    ];

    // Create CSV rows
    const csvRows = data.map(row => {
      const escape = (val: string | number | null) => {
        if (val === null || val === undefined) return '';
        const str = String(val);
        if (str.includes(',') || str.includes('"') || str.includes('\n')) {
          return `"${str.replace(/"/g, '""')}"`;
        }
        return str;
      };

      return [
        escape(row.id_pago), // ID used for round-tripping
        escape(row.nombre_cliente),
        escape(row.rfc),
        escape(row.telefono_cliente),
        escape(row.correo_cliente),
        escape(row.fecha_alta),
        escape(row.concepto), // Now populated
        escape(row.pago),     // Now populated
        escape(row.mes_pago), // Now populated
        escape(row.year_pago),// Now populated
        escape(row.correo_empleado_pago || row.correo_empleado_cliente)
      ].join(",");
    });

    const csvContent = headers.join(",") + "\n" + csvRows.join("\n");

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': 'attachment; filename="historial_clientes_pagos.csv"',
      },
    });

  } catch (error: any) {
    console.error("Error exporting CSV:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const records = await req.json();

    if (!Array.isArray(records)) {
      return NextResponse.json({ error: "Invalid data format. Expected an array." }, { status: 400 });
    }

    const results = {
      clients_created: 0,
      clients_updated: 0,
      payments_created: 0,
      payments_updated: 0,
      failed: 0,
      errors: [] as string[],
    };

    for (const record of records) {
      try {
        const {
          id_pago,
          nombre_cliente,
          rfc,
          telefono_cliente,
          correo_cliente,
          fecha_alta,
          concepto,
          pago,
          mes_pago,
          year_pago,
          correo_empleado
        } = record;

        // Basic validation
        if (!nombre_cliente) continue;

        const cleanName = nombre_cliente.trim();
        const cleanRfc = rfc ? rfc.trim() : null;

        // 1. Manage Client (Find -> Update OR Create)
        let clientId = null;
        let existingClient = null;

        if (cleanRfc) {
          const byRfc = await dbTablas.select().from(catalogo_clientes).where(eq(catalogo_clientes.rfc, cleanRfc)).limit(1);
          if (byRfc.length > 0) existingClient = byRfc[0];
        }

        if (!existingClient) {
          const byName = await dbTablas.select().from(catalogo_clientes).where(eq(catalogo_clientes.nombre_cliente, cleanName)).limit(1);
          if (byName.length > 0) existingClient = byName[0];
        }

        if (existingClient) {
          clientId = existingClient.id_cliente;
          // Update client details
          const updateData: any = {};
          if (telefono_cliente) updateData.telefono_cliente = telefono_cliente.trim();
          if (correo_cliente) updateData.correo_cliente = correo_cliente.trim();
          if (cleanRfc) updateData.rfc = cleanRfc;
          if (fecha_alta) updateData.fecha_alta = fecha_alta.trim();
          if (correo_empleado) updateData.correo_empleado = correo_empleado.trim();

          if (Object.keys(updateData).length > 0) {
            await dbTablas.update(catalogo_clientes)
              .set(updateData)
              .where(eq(catalogo_clientes.id_cliente, clientId));
            results.clients_updated++;
          }
        } else {
          // Create new client
          const newClient = await dbTablas.insert(catalogo_clientes).values({
            marca_temporal: new Date().toISOString(),
            nombre_cliente: cleanName,
            telefono_cliente: telefono_cliente || '',
            correo_cliente: correo_cliente || '',
            rfc: cleanRfc || '',
            fecha_alta: fecha_alta || new Date().toISOString().split('T')[0],
            correo_empleado: correo_empleado || ''
          }).returning({ id_cliente: catalogo_clientes.id_cliente });

          if (newClient.length > 0) {
            clientId = newClient[0].id_cliente;
            results.clients_created++;
          }
        }

        // 2. Manage Payment
        if (clientId && pago && mes_pago && year_pago) {

          if (id_pago && id_pago.trim() !== "") {
            // UPDATE existing payment
            const cleanIdPago = Number(id_pago);
            if (!isNaN(cleanIdPago)) {
              await dbTablas.update(registroPago).set({
                concepto: concepto || 'Pago Honorarios',
                pago: String(pago),
                mes_pago: Number(mes_pago),
                year_pago: String(year_pago),
                correo_empleado: correo_empleado || ''
              }).where(eq(registroPago.id_pago, cleanIdPago));
              results.payments_updated++;
            }
          } else {
            // INSERT new payment
            // Optional: Prevent duplicates if not using ID but same data? 
            // For now, trusting the empty ID means new.
            await dbTablas.insert(registroPago).values({
              marca_temporal: new Date().toISOString(),
              id_cliente: String(clientId),
              concepto: concepto || 'Pago Honorarios',
              pago: String(pago),
              mes_pago: Number(mes_pago),
              year_pago: String(year_pago),
              correo_empleado: correo_empleado || ''
            });
            results.payments_created++;
          }
        }

      } catch (err: any) {
        console.error("Error processing record:", record, err);
        results.failed++;
        results.errors.push(`Row error (${record.nombre_cliente}): ${err.message}`);
      }
    }

    return NextResponse.json({
      message: "Proceso completado",
      results
    });

  } catch (error: any) {
    console.error("Bulk upload error:", error);
    return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
  }
}
