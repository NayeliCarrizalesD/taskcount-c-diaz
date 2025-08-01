import { NextResponse } from 'next/server';
<<<<<<< HEAD
import { getClienteHonorariosTodosConNombre } from '@/app/schema';

export async function GET() {
  try {
    const clientesHonorarios = await getClienteHonorariosTodosConNombre();
=======
// Update the import path to the correct relative location
import { getTodosClientes } from '../../schema';

export async function GET() {
  try {
    const clientesHonorarios = await getTodosClientes();
>>>>>>> develop
    return NextResponse.json(clientesHonorarios);
  } catch (error) {
    console.error('Error fetching clientes honorarios:', error);
    return NextResponse.json(
      { error: 'Error al obtener los datos de configuración de clientes honorarios' },
      { status: 500 }
    );
  }
}
