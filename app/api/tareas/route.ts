import { auth } from '@/app/auth';
import { getTodasTareas, createTarea } from '@/app/schema';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const tareas = await getTodasTareas();
    return NextResponse.json(tareas);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return NextResponse.json({ error: 'Error al cargar las tareas' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    const creado_por = session?.user?.email;

    if (!creado_por) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    }

    const body = await request.json();
    const { titulo, descripcion, prioridad, fecha_limite, asignado_a } = body;

    if (!titulo) {
      return NextResponse.json({ error: 'El título es obligatorio' }, { status: 400 });
    }

    const fecha_creacion = new Date().toISOString().split('T')[0];

    const result = await createTarea(
      titulo,
      descripcion || null,
      prioridad || 'media',
      fecha_limite || null,
      fecha_creacion,
      creado_por,
      asignado_a || null
    );

    if (!result || result.length === 0) {
      return NextResponse.json({ error: 'No se pudo crear la tarea' }, { status: 500 });
    }

    return NextResponse.json({ success: true, data: result[0] });
  } catch (error) {
    console.error('Error creating task:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
