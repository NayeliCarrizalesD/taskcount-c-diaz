// filepath: c:\Program Files\Ampps\www\taskcount-c-diaz\app\protected\atributos\registro_entrada_salida\actions.ts
"use server";

import { createNewEntradaSalida, getEntradaSalida } from "@/app/schema";
import { redirect } from "next/navigation";

export async function EntradaSalida(formData: FormData) {
  const fecha_entrada_salida = formData.get("fecha_entrada_salida") as string;
  const hora_entrada_salida = formData.get("hora_entrada_salida") as string;
  const checador = formData.get("checador") as string;
  const nombre_empleado = formData.get("nombre_empleado") as string;
  const correo_empleado = formData.get("correo_empleado") as string;

  const idEntrada = await getEntradaSalida(hora_entrada_salida);

  if (idEntrada.length > 0) {
    console.log("ya existe");
    return;
  } else {
    await createNewEntradaSalida(
      fecha_entrada_salida,
      hora_entrada_salida,
      checador,
      nombre_empleado,
      correo_empleado
    );
    redirect("/ProtectedConsultaFlete");
  }
}