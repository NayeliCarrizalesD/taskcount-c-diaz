
import { NextRequest, NextResponse } from "next/server";
import { dbTablas, catalogo_clientes, registroPago } from "../../schema";
import { eq, or } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const records = await req.json();

    if (!Array.isArray(records)) {
      return NextResponse.json({ error: "Invalid data format. Expected an array." }, { status: 400 });
    }

    const results = {
      success: 0,
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

        // Validations
        if (!nombre_cliente || !pago || !mes_pago || !year_pago) {
            throw new Error(`Missing required fields for record: ${JSON.stringify(record)}`);
        }

        let clientId = null;

        // 1. Check if client exists by RFC (if provided) or Name
        let existingClient = null;
        
        // Trim and clean inputs
        const cleanName = nombre_cliente.trim();
        const cleanRfc = rfc ? rfc.trim() : null;

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
            } else {
                throw new Error("Failed to create client");
            }
        }

        // 2. Insert Payment
        if (clientId) {
            await dbTablas.insert(registroPago).values({
                marca_temporal: new Date().toISOString(),
                id_cliente: String(clientId),
                concepto: concepto || 'Pago Honorarios',
                pago: String(pago),
                mes_pago: Number(mes_pago),
                year_pago: String(year_pago),
                correo_empleado: correo_empleado || ''
            });
            results.success++;
        }

      } catch (err: any) {
        console.error("Error processing record:", record, err);
        results.failed++;
        results.errors.push(`Row error: ${err.message}`);
      }
    }

    return NextResponse.json({ message: "Proceso completado", results });

  } catch (error: any) {
    console.error("Bulk upload error:", error);
    return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
  }
}
