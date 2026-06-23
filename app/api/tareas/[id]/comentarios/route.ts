import { auth } from '@/app/auth';
import { getComentariosTarea, createComentarioTarea } from '@/app/schema';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id_tarea = Number(params.id);
    if (isNaN(id_tarea)) {
      return NextResponse.json({ error: 'ID de tarea inválido' }, { status: 400 });
    }

    const comentarios = await getComentariosTarea(id_tarea);
    return NextResponse.json(comentarios);
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json({ error: 'Error al cargar los comentarios' }, { status: 500 });
  }
}

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await auth();
    const usuario = session?.user?.email;

    if (!usuario) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    }

    const id_tarea = Number(params.id);
    if (isNaN(id_tarea)) {
      return NextResponse.json({ error: 'ID de tarea inválido' }, { status: 400 });
    }

    const body = await request.json();
    const { comentario } = body;

    if (!comentario || !comentario.trim()) {
      return NextResponse.json({ error: 'El comentario no puede estar vacío' }, { status: 400 });
    }

    const fecha_registro = new Date().toISOString();

    const result = await createComentarioTarea(id_tarea, usuario, comentario, fecha_registro);

    if (!result || result.length === 0) {
      return NextResponse.json({ error: 'No se pudo crear el comentario' }, { status: 500 });
    }

    return NextResponse.json({ success: true, data: result[0] });
  } catch (error) {
    console.error('Error creating comment:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
