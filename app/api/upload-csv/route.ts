
import { NextRequest, NextResponse } from "next/server";
import { dbTablas, catalogo_clientes, registroPago } from "../../schema";
import { eq, or } from "drizzle-orm";

export async function GET(req: NextRequest) {
  try {
    const clients = await dbTablas.select().from(catalogo_clientes).orderBy(catalogo_clientes.nombre_cliente);

    const headers = ["nombre_cliente", "rfc", "telefono_cliente", "correo_cliente", "fecha_alta", "concepto", "pago", "mes_pago", "year_pago", "correo_empleado"];

    // Create CSV rows from clients
    const csvRows = clients.map(client => {
      // Escape fields if necessary (simple CSV escaping)
      const escape = (val: string | number | null) => {
        if (val === null || val === undefined) return '';
        const str = String(val);
        if (str.includes(',') || str.includes('"') || str.includes('\n')) {
          return `"${str.replace(/"/g, '""')}"`;
        }
        return str;
      };

      return [
        escape(client.nombre_cliente),
        escape(client.rfc),
        escape(client.telefono_cliente),
        escape(client.correo_cliente),
        escape(client.fecha_alta),
        "", // concepto (empty for template)
        "", // pago (empty for template)
        "", // mes_pago (empty for template)
        "", // year_pago (empty for template)
        escape(client.correo_empleado)
      ].join(",");
    });

    const csvContent = headers.join(",") + "\n" + csvRows.join("\n");

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': 'attachment; filename="plantilla_clientes_pagos.csv"',
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
      created: 0,
      updated: 0,
      payments_added: 0,
      failed: 0,
      errors: [] as string[],
    };

    for (const record of records) {
      try {
        const {
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

        // Basic validation: Name is required
        if (!nombre_cliente) {
          continue; // Skip empty rows
        }

        const cleanName = nombre_cliente.trim();
        const cleanRfc = rfc ? rfc.trim() : null;

        let clientId = null;
        let existingClient = null;

        // 1. Find Client
        if (cleanRfc) {
          const byRfc = await dbTablas.select().from(catalogo_clientes).where(eq(catalogo_clientes.rfc, cleanRfc)).limit(1);
          if (byRfc.length > 0) existingClient = byRfc[0];
        }

        if (!existingClient) {
          const byName = await dbTablas.select().from(catalogo_clientes).where(eq(catalogo_clientes.nombre_cliente, cleanName)).limit(1);
          if (byName.length > 0) existingClient = byName[0];
        }

        // 2. Create or Update Client
        if (existingClient) {
          clientId = existingClient.id_cliente;

          // Update client details
          const updateData: any = {};
          if (telefono_cliente) updateData.telefono_cliente = telefono_cliente.trim();
          if (correo_cliente) updateData.correo_cliente = correo_cliente.trim();
          if (cleanRfc) updateData.rfc = cleanRfc;
          if (fecha_alta) updateData.fecha_alta = fecha_alta.trim();
          if (correo_empleado) updateData.correo_empleado = correo_empleado.trim();
          // Don't update name as it matches or is key

          if (Object.keys(updateData).length > 0) {
            await dbTablas.update(catalogo_clientes)
              .set(updateData)
              .where(eq(catalogo_clientes.id_cliente, clientId));
            results.updated++;
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
            results.created++;
          } else {
            throw new Error("Failed to create client");
          }
        }

        // 3. Register Payment (Optional)
        // Check if payment fields are present and valid
        if (clientId && pago && mes_pago && year_pago) {
          await dbTablas.insert(registroPago).values({
            marca_temporal: new Date().toISOString(),
            id_cliente: String(clientId),
            concepto: concepto || 'Pago Honorarios',
            pago: String(pago),
            mes_pago: Number(mes_pago),
            year_pago: String(year_pago),
            correo_empleado: correo_empleado || ''
          });
          results.payments_added++;
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
