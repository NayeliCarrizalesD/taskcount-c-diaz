import { auth } from '@/app/auth';
import { updateTarea, deleteTarea } from '@/app/schema';
import { NextResponse } from 'next/server';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    }

    const id_tarea = Number(params.id);
    if (isNaN(id_tarea)) {
      return NextResponse.json({ error: 'ID de tarea inválido' }, { status: 400 });
    }

    const body = await request.json();
    
    // Si el estado cambia a 'completada', registramos la fecha completada automáticamente
    if (body.estado === 'completada' && !body.fecha_completada) {
      body.fecha_completada = new Date().toISOString().split('T')[0];
    } else if (body.estado && body.estado !== 'completada') {
      body.fecha_completada = null; // Clear if transitioned back
    }

    const result = await updateTarea(id_tarea, body);

    if (!result || result.length === 0) {
      return NextResponse.json({ error: 'No se pudo actualizar la tarea' }, { status: 500 });
    }

    return NextResponse.json({ success: true, data: result[0] });
  } catch (error) {
    console.error('Error updating task:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    }

    const id_tarea = Number(params.id);
    if (isNaN(id_tarea)) {
      return NextResponse.json({ error: 'ID de tarea inválido' }, { status: 400 });
    }

    const result = await deleteTarea(id_tarea);

    if (!result || result.length === 0) {
      return NextResponse.json({ error: 'No se pudo eliminar la tarea' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Tarea eliminada exitosamente' });
  } catch (error) {
    console.error('Error deleting task:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
