import { getClienteHonorariosTodosConNombre } from '../../schema';

export async function GET() {
  try {
    const configHonorarios = await getClienteHonorariosTodosConNombre();
    return Response.json(configHonorarios);
  } catch (error) {
    console.error('Error al obtener configuración de honorarios:', error);
    return Response.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}