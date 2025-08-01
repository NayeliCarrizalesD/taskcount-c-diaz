import { NextResponse } from 'next/server';
import { getClienteHonorariosTodosConNombre } from '@/app/schema';

export async function GET() {
  try {
    const clientesHonorarios = await getClienteHonorariosTodosConNombre();

    return NextResponse.json(clientesHonorarios);
  } catch (error) {
    console.error('Error fetching clientes honorarios:', error);
    return NextResponse.json(
      { error: 'Error al obtener los datos de configuración de clientes honorarios' },
      { status: 500 }
    );
  }
}
