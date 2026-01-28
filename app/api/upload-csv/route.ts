
import { NextRequest, NextResponse } from "next/server";
import { dbTablas, catalogo_clientes, registroPago } from "../../schema";
import { eq, sql, desc, inArray, or } from "drizzle-orm";

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

    // 1. Collect all unique identifiers (RFCs and Names) to optimized searching
    const rfcs = new Set<string>();
    const names = new Set<string>();

    records.forEach((r: any) => {
      if (r.rfc && r.rfc.trim()) rfcs.add(r.rfc.trim());
      if (r.nombre_cliente && r.nombre_cliente.trim()) names.add(r.nombre_cliente.trim());
    });

    // 2. Fetch existing clients in one batch
    let existingClients: any[] = [];

    // Chunk queries if identifiers are too many (Postgres limit)
    const MAX_PARAMS = 1000;
    const rfcArray = Array.from(rfcs);
    const nameArray = Array.from(names);

    // Simplification: Fetch by RFC OR Name. 
    // Drizzle doesn't support "OR" easily across large IN clauses without query builder composition, 
    // but for typical CSV sizes (hundreds/thousands), splitting is good practice.

    if (rfcArray.length > 0 || nameArray.length > 0) {
      // We'll fetch all matches. 
      // Note: To avoid complex OR logic with huge arrays, we can run two parallel queries and merge.

      const promises = [];
      if (rfcArray.length > 0) {
        promises.push(dbTablas.select().from(catalogo_clientes).where(inArray(catalogo_clientes.rfc, rfcArray)));
      }
      if (nameArray.length > 0) {
        promises.push(dbTablas.select().from(catalogo_clientes).where(inArray(catalogo_clientes.nombre_cliente, nameArray)));
      }

      const fetchedGroups = await Promise.all(promises);
      existingClients = fetchedGroups.flat();
    }

    // Map for fast lookup:  Key -> Client Object
    const clientMap = new Map<string, any>();
    existingClients.forEach(c => {
      if (c.rfc) clientMap.set(c.rfc.trim(), c);
      if (c.nombre_cliente) clientMap.set(c.nombre_cliente.trim(), c);
    });

    // 3. Separate Records into New vs Existing Clients needed
    // We need to deduplicate *new* clients within the CSV itself.
    const newClientsMap = new Map<string, any>(); // Key (Name/RFC) -> Client Data

    // Helper to generate a unique key for deduplication (prefer RFC, fallback to Name)
    const getClientKey = (r: any) => {
      if (r.rfc && r.rfc.trim()) return `RFC:${r.rfc.trim()}`;
      if (r.nombre_cliente && r.nombre_cliente.trim()) return `NAME:${r.nombre_cliente.trim()}`;
      return null;
    };

    for (const record of records) {
      if (!record.nombre_cliente) continue;

      const rfc = record.rfc ? record.rfc.trim() : null;
      const name = record.nombre_cliente.trim();

      // Check if exists in DB
      let exists = false;
      if (rfc && clientMap.has(rfc)) exists = true;
      if (name && clientMap.has(name)) exists = true;

      if (!exists) {
        const key = getClientKey(record);
        if (key && !newClientsMap.has(key)) {
          newClientsMap.set(key, record);
        }
      }
    }

    // 3.1 Bulk Insert New Clients
    if (newClientsMap.size > 0) {
      const clientsToInsert = Array.from(newClientsMap.values()).map(r => ({
        marca_temporal: new Date().toISOString(),
        nombre_cliente: r.nombre_cliente.trim(),
        telefono_cliente: r.telefono_cliente || '',
        correo_cliente: r.correo_cliente || '',
        rfc: r.rfc ? r.rfc.trim() : '',
        fecha_alta: r.fecha_alta || new Date().toISOString().split('T')[0],
        correo_empleado: r.correo_empleado || ''
      }));

      // Insert in batches of 50 to avoid parameter limits errors
      const BATCH_SIZE = 50;
      for (let i = 0; i < clientsToInsert.length; i += BATCH_SIZE) {
        const batch = clientsToInsert.slice(i, i + BATCH_SIZE);
        const inserted = await dbTablas.insert(catalogo_clientes).values(batch).returning();

        // Add inserted clients to the map so we can find them for payments
        inserted.forEach(c => {
          if (c.rfc) clientMap.set(c.rfc.trim(), c);
          if (c.nombre_cliente) clientMap.set(c.nombre_cliente.trim(), c);
          results.clients_created++;
        });
      }
    }

    // 4. Processing Payments (Now all clients should be in clientMap)
    const paymentsToInsert: any[] = [];
    const paymentsToUpdate: any[] = [];
    const clientUpdates = new Map<number, any>(); // Deduplicate client updates

    for (const record of records) {
      try {
        const name = record.nombre_cliente?.trim();
        const rfc = record.rfc?.trim();

        // Resolve Client ID
        let client = null;
        if (rfc && clientMap.has(rfc)) client = clientMap.get(rfc);
        else if (name && clientMap.has(name)) client = clientMap.get(name);

        if (!client) {
          // Should not happen if logic above worked, but strict check
          results.failed++;
          results.errors.push(`Cliente no encontrado ni pudo ser creado: ${name}`);
          continue;
        }

        // Queue Client Update (Only if necessary fields match logic)
        // Simplified: We assume if data is present in CSV, we update local object representation
        // In a bulk scenario, constantly updating the same client for every payment row is wasteful.
        // We just store the "latest" revision from the CSV for each client ID.

        // (Optional: Compare fields to see if update is actually needed)
        clientUpdates.set(client.id_cliente, {
          telefono_cliente: record.telefono_cliente?.trim(),
          correo_cliente: record.correo_cliente?.trim(),
          rfc: rfc,
          fecha_alta: record.fecha_alta?.trim(),
          correo_empleado: record.correo_empleado?.trim()
        });

        // Prepare Payment
        if (record.pago && record.mes_pago && record.year_pago) {
          if (record.id_pago && String(record.id_pago).trim() !== "") {
            // Update Payment
            paymentsToUpdate.push({
              id_pago: Number(record.id_pago),
              concepto: record.concepto || 'Pago Honorarios',
              pago: String(record.pago),
              mes_pago: Number(record.mes_pago),
              year_pago: String(record.year_pago),
              correo_empleado: record.correo_empleado || ''
            });
          } else {
            // Insert Payment
            paymentsToInsert.push({
              marca_temporal: new Date().toISOString(),
              id_cliente: String(client.id_cliente),
              concepto: record.concepto || 'Pago Honorarios',
              pago: String(record.pago),
              mes_pago: Number(record.mes_pago),
              year_pago: String(record.year_pago),
              correo_empleado: record.correo_empleado || ''
            });
          }
        }

      } catch (err: any) {
        results.failed++;
        results.errors.push(`Row error (${record.nombre_cliente}): ${err.message}`);
      }
    }

    // 5. Execute Batch Updates/Inserts

    // 5.1 Update Clients (Parallelize execution)
    // We only update fields that are truthy/present in the CSV
    const clientUpdatePromises = Array.from(clientUpdates.entries()).map(async ([id, data]) => {
      const updateData: any = {};
      if (data.telefono_cliente) updateData.telefono_cliente = data.telefono_cliente;
      if (data.correo_cliente) updateData.correo_cliente = data.correo_cliente;
      if (data.rfc) updateData.rfc = data.rfc;
      if (data.fecha_alta) updateData.fecha_alta = data.fecha_alta;
      if (data.correo_empleado) updateData.correo_empleado = data.correo_empleado;

      if (Object.keys(updateData).length > 0) {
        await dbTablas.update(catalogo_clientes)
          .set(updateData)
          .where(eq(catalogo_clientes.id_cliente, id));
        results.clients_updated++;
      }
    });

    // Limit concurrency for client updates
    await Promise.all(clientUpdatePromises); // Or use a chunked runner if thousands

    // 5.2 Insert Payments
    if (paymentsToInsert.length > 0) {
      const BATCH_SIZE = 50;
      for (let i = 0; i < paymentsToInsert.length; i += BATCH_SIZE) {
        const batch = paymentsToInsert.slice(i, i + BATCH_SIZE);
        await dbTablas.insert(registroPago).values(batch);
        results.payments_created += batch.length;
      }
    }

    // 5.3 Update Payments (Must be individual queries unfortunately, unless we use advanced SQL)
    // We use Promise.all with concurrency control ideally, but for now simple batching of promises
    const paymentUpdatePromises = paymentsToUpdate.map(p =>
      dbTablas.update(registroPago)
        .set({
          concepto: p.concepto,
          pago: p.pago,
          mes_pago: p.mes_pago,
          year_pago: p.year_pago,
          correo_empleado: p.correo_empleado
        })
        .where(eq(registroPago.id_pago, p.id_pago))
        .then(() => { results.payments_updated++; })
    );

    // Wait for all payment updates
    await Promise.all(paymentUpdatePromises);

    return NextResponse.json({
      message: "Proceso masivo completado",
      results
    });

  } catch (error: any) {
    console.error("Bulk upload error:", error);
    return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
  }
}
