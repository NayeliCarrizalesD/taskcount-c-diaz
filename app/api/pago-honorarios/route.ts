import { getClienteHonorariosPorId, getRegistroPago } from '@/app/schema';

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
        const { id_cliente } = body;

        if (!id_cliente) {
            return Response.json({ error: 'ID de cliente requerido' }, { status: 400 });
        }

        const config = await getRegistroPago(id_cliente.toString());

        if (!config || config.length === 0) {
            return Response.json({ error: 'No se encontró configuración de honorarios para este cliente' }, { status: 404 });
        }

        return Response.json(config[0]);
    } catch (error) {
        console.error('Error al obtener configuración:', error);
        return Response.json({ error: 'Error interno del servidor' }, { status: 500 });
    }
}