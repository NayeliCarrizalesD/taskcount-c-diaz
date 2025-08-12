import { updateCliente } from '@/app/schema';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const { nombre_cliente, telefono_cliente, correo_cliente, rfc, correo_empleado, fecha_alta } = body;

    const result = await updateCliente(
      parseInt(params.id),
      nombre_cliente,
      telefono_cliente,
      correo_cliente,
      rfc,
      correo_empleado,
      fecha_alta
    );

    if (result.length > 0) {
      return Response.json({ success: true, data: result[0] });
    } else {
      return Response.json({ error: 'Cliente no encontrado' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error al actualizar cliente:', error);
    return Response.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}