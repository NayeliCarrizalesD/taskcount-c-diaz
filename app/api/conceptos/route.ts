import { NextResponse } from "next/server";
import { getTodosProducto } from "@/app/schema";

export async function GET() {
    const conceptos = await getTodosProducto();
    return NextResponse.json(conceptos);
}