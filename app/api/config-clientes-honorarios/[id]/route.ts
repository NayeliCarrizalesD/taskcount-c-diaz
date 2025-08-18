import { getClienteHonorarios } from '@/app/schema';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const config = await getClienteHonorarios(params.id);
    if (!config || config.length === 0) {
      return Response.json({ error: 'No existe configuración' }, { status: 404 });
    }
    return Response.json(config[0]);
  } catch (error) {
    return Response.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}