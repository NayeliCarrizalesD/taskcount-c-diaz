import { NextRequest, NextResponse } from 'next/server';
import { getUsuarioPorCorreo } from '@/app/schema'; // Debes tener esta función

export async function GET(request: NextRequest) {
  try {
    // Ejemplo: obtén el correo desde la cookie, sesión o JWT
    // Aquí debes adaptar según tu sistema de autenticación
    const correo = request.cookies.get('correo_usuario')?.value;
    if (!correo) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    }

    const usuario = await getUsuarioPorCorreo(correo);
    if (!usuario) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
    }

    // Solo devuelve el correo
    return NextResponse.json({ correo: usuario.correo });
  } catch (error) {
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}