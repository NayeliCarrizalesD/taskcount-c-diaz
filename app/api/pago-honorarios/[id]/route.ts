import { NextResponse } from "next/server";
import { updateRegistroPago } from "@/app/schema";

export const dynamic = 'force-dynamic';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const id_pago = parseInt(params.id);
        if (isNaN(id_pago)) {
            return NextResponse.json({ error: 'ID de pago inválido' }, { status: 400 });
        }

        const body = await request.json();
        const { concepto, pago, mes_pago, year_pago, correo_empleado, fecha_realizacion_pago } = body;

        if (!concepto || !pago || !mes_pago || !year_pago || !correo_empleado) {
            return NextResponse.json({ error: 'Datos requeridos faltantes' }, { status: 400 });
        }

        const resultado = await updateRegistroPago(
            id_pago,
            concepto,
            parseFloat(pago),
            parseInt(mes_pago),
            parseInt(year_pago),
            correo_empleado,
            fecha_realizacion_pago
        );

        if (!resultado || resultado.length === 0) {
            return NextResponse.json({ error: 'No se pudo actualizar el pago' }, { status: 500 });
        }

        return NextResponse.json({ success: true, data: resultado[0] });
    } catch (error) {
        console.error('Error al actualizar pago:', error);
        return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
    }
}
