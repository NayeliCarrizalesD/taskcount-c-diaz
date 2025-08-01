import { NextResponse } from "next/server";
import { createActivityHistory, getActivityHistory } from "@/app/schema";


// GET - consultar historial con filtros
export async function GET(req: Request) {
  const url = new URL(req.url);
  const usuario = url.searchParams.get("usuario") ?? undefined;
  const fecha = url.searchParams.get("fecha") ?? undefined;
  const tipo_usuario = url.searchParams.get("tipo_usuario") ?? undefined;
  const accion = url.searchParams.get("accion") ?? undefined;

  const data = await getActivityHistory({ usuario, fecha, tipo_usuario, accion });
  return NextResponse.json(data);
}

// POST - crear un nuevo registro
export async function POST(req: Request) {
  const { fecha, hora, usuario, tipo_usuario, accion, detalles } = await req.json();
  await createActivityHistory(fecha, hora, usuario, tipo_usuario, accion, detalles);
  return NextResponse.json({ success: true });
}


