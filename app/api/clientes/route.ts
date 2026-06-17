import { getTodosClientes } from '@/app/schema';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    console.log('GET /api/clientes called');
    const clientes = await getTodosClientes();
    console.log('Clientes found:', clientes.length);
    return NextResponse.json(clientes);
  } catch (error) {
    console.error('Error al obtener clientes:', error);
    return NextResponse.json(
      { error: 'Error al cargar los clientes' },
      { status: 500 }
    );
  }
}