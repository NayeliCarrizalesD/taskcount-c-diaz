import { updateCliente } from '@/app/schema';
import { NextRequest } from 'next/server';

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    console.log('PUT request received for ID:', params.id);
    
    const body = await request.json();
    console.log('Request body:', body);
    
    const { nombre_cliente, telefono_cliente, correo_cliente, rfc } = body;

    const id_cliente = parseInt(params.id);

    if (isNaN(id_cliente)) {
      console.error('Invalid ID:', params.id);
      return Response.json({ error: 'ID de cliente inválido' }, { status: 400 });
    }

    // Obtener datos adicionales para la función updateCliente
    const correo_empleado = 'sistema@empresa.com';
    const fecha_alta = new Date().toISOString().split('T')[0];

    console.log('Calling updateCliente with:', {
      id_cliente,
      nombre_cliente,
      telefono_cliente,
      correo_cliente,
      rfc,
      correo_empleado,
      fecha_alta
    });

    const result = await updateCliente(
      id_cliente,
      nombre_cliente,
      telefono_cliente,
      correo_cliente,
      rfc,
      correo_empleado,
      fecha_alta
    );

    console.log('Update result:', result);

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