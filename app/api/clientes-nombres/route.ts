import { getPagosTodosConNombres } from '@/app/schema';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const pagos = await getPagosTodosConNombres();
        return Response.json(pagos);
    } catch (error) {
        console.error('Error al obtener pagos:', error);
        return Response.json({ error: 'Error interno del servidor' }, { status: 500 });
    }
}