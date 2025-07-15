import { NextResponse } from "next/server";
import { createRegistroPago, getRegistroPago } from "@/app/schema";

export async function POST(request: Request) {
    const body = await request.json();
    let producto = await getRegistroPago(body.nombre_cliente.toString());

    if (producto.length > 0) {
        return NextResponse.json({ message: "La configuración ya existe" });
    } else {
        await createRegistroPago(
            body.marca_temporal,
            body.nombre_cliente,
            body.concepto,
            body.pago,
            body.mes_pago,
            body.year_pago,
            body.correo_empleado
        );
        return NextResponse.json({ message: "Registro exitoso" });
    }
}