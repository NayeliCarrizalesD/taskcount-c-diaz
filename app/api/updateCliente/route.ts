import { NextResponse } from "next/server";
import { updateCliente } from "@/app/schema"; // tu función de update

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json();
  await updateCliente(
    Number(params.id),
    body.nombre_cliente,
    body.telefono_cliente,
    body.correo_cliente,
    body.rfc,
    body.correo_empleado,
    body.fecha_alta
  ); // implementa esta función en tu schema
  return NextResponse.json({ message: "Cliente actualizado" });
}