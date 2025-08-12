import { updateCliente } from '@/app/schema';
import { NextRequest } from 'next/server';

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const { nombre_cliente, telefono_cliente, correo_cliente, rfc } = body;

    const id_cliente = parseInt(params.id);

    if (isNaN(id_cliente)) {
      return Response.json({ error: 'ID de cliente inválido' }, { status: 400 });
    }

    // Obtener datos adicionales para la función updateCliente
    const correo_empleado = 'sistema@empresa.com'; // O desde la sesión del usuario
    const fecha_alta = new Date().toISOString().split('T')[0];

    const result = await updateCliente(
      id_cliente,
      nombre_cliente,
      telefono_cliente,
      correo_cliente,
      rfc,
      correo_empleado,
      fecha_alta
    );

    if (!result) {
      return Response.json({ error: 'Cliente no encontrado' }, { status: 404 });
    }

    return Response.json({
      success: true,
      message: 'Cliente actualizado exitosamente',
      data: result
    });

  } catch (error) {
    console.error('Error al actualizar cliente:', error);
    return Response.json({
      error: 'Error interno del servidor',
      details: error instanceof Error ? error.message : 'Error desconocido'
    }, { status: 500 });
  }
}