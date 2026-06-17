import { NextRequest, NextResponse } from 'next/server';
import { getUsuarioPorCorreo } from '@/app/schema';
import { auth } from '@/app/auth';

export async function GET(request: NextRequest) {
  try {
    // 1. Intentar obtener el correo de la sesión de NextAuth
    const session = await auth();
    let correo = session?.user?.email;

    // 2. Si no hay sesión, intentar obtener de la cookie correo_usuario
    if (!correo) {
      correo = request.cookies.get('correo_usuario')?.value;
    }

    if (!correo) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    }

    const usuario = await getUsuarioPorCorreo(correo);
    if (!usuario) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
    }

    // Devuelve el correo y el nivel
    return NextResponse.json({ correo: usuario.correo, nivel: usuario.nivel });
  } catch (error) {
    console.error('Error en GET /api/usuario-actual:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}