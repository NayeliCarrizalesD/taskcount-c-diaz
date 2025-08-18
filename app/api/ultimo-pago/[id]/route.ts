import { getUltimoPagoCliente } from '@/app/schema';

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const id_cliente = params.id;

        const ultimoPago = await getUltimoPagoCliente(id_cliente);

        if (!ultimoPago || ultimoPago.length === 0) {
            return Response.json({ message: 'No hay pagos registrados' }, { status: 404 });
        }

        return Response.json(ultimoPago[0]);
    } catch (error) {
        console.error('Error al obtener último pago:', error);
        return Response.json({ error: 'Error interno del servidor' }, { status: 500 });
    }
}