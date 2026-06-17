import { dbTablas, catalogo_productos } from "@/app/schema";
import TablaProductosClient from "./TablaProductosClient";

export default async function TablaProductos() {
    let productos: any[] = [];
    try {
        productos = await dbTablas.select().from(catalogo_productos).orderBy(catalogo_productos.nombre_producto_servicio);
    }
    catch (e: any) {
        console.error(e);
    }

    return (
        <TablaProductosClient initialProductos={productos} />
    );
}
