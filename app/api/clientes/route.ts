import { NextResponse } from 'next/server';
import { getTodosClientes } from '@/app/schema';

export async function GET() {
  try {
    const clientes = await getTodosClientes();
    return NextResponse.json(clientes);
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener clientes' }, { status: 500 });
  }
}