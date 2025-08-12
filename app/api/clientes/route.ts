import { getTodosClientes } from '@/app/schema';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const clientes = await getTodosClientes();
    return NextResponse.json(clientes);
  } catch (error) {
    console.error('Error al obtener clientes:', error);
    return NextResponse.json(
      { error: 'Error al cargar los clientes' },
      { status: 500 }
    );
  }
}