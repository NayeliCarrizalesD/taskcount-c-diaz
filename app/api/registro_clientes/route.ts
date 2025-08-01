import { NextResponse } from "next/server";
import { createNewClient } from "@/app/schema";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const marca_temporal = formData.get("marca_temporal")?.toString() || "";
    const nombre_cliente = formData.get("nombre_cliente")?.toString() || "";
    const rfc = formData.get("rfc")?.toString() || "";
    const telefono_cliente = formData.get("telefono_cliente")?.toString() || "";
    const correo_cliente = formData.get("correo_cliente")?.toString() || "";
    const correo_empleado = formData.get("correo_empleado")?.toString() || "";
    const fecha_alta = formData.get("fecha_alta")?.toString() || "";

    await createNewClient(
      marca_temporal,
      nombre_cliente,
      telefono_cliente,
      correo_cliente,
      rfc,
      correo_empleado,
      fecha_alta
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error al registrar cliente" }, { status: 500 });
  }
}
