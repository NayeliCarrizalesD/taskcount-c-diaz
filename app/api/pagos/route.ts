import { NextResponse } from "next/server";
import { getPagosTodos } from "@/app/schema"; // Aquí sí puedes importar postgres

export async function GET() {
  const pagos = await getPagosTodos();
  return NextResponse.json(pagos);
}