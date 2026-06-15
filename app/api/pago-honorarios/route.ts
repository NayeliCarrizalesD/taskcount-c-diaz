import { getClienteHonorariosPorId, createRegistroPago } from '@/app/schema';

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const id_cliente = params.id;

        const config = await getClienteHonorariosPorId(id_cliente);

        if (!config || config.length === 0) {
            return Response.json({ error: 'No se encontró configuración de honorarios para este cliente' }, { status: 404 });
        }

        return Response.json(config[0]);
    } catch (error) {
        console.error('Error al obtener configuración:', error);
        return Response.json({ error: 'Error interno del servidor' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { marca_temporal, id_cliente, concepto,  pago, mes_pago, year_pago, correo_empleado, fecha_realizacion_pago } = body;

        if (!marca_temporal || !id_cliente || !concepto || !pago || !mes_pago || !year_pago || !correo_empleado) {
            return Response.json({ error: 'Datos requeridos' }, { status: 400 });
        }

        // Aquí sí se inserta el pago
        const resultado = await createRegistroPago(
            marca_temporal,
            id_cliente,
            concepto,
            pago,
            mes_pago,
            year_pago,
            correo_empleado,
            fecha_realizacion_pago
        );
        console.log(resultado);

        if (!resultado) {
            return Response.json({ error: 'No se pudo registrar el pago' }, { status: 500 });
        }

        return Response.json({ success: true, data: resultado });
    } catch (error) {
        console.error('Error al registrar pago:', error);
        return Response.json({ error: 'Error interno del servidor' }, { status: 500 });
    }
}