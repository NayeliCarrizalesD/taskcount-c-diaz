import { dbTablas, datosUsuario } from "@/app/schema";
import TablaDatosUsuariosClient from "./TablaDatosUsuariosClient";

export default async function TablaDatosUsuarios() {
    let usuarios: any[] = [];
    try {
        usuarios = await dbTablas.select().from(datosUsuario).orderBy(datosUsuario.id_usuario);
    }
    catch (e: any) {
        console.error(e);
    }

    return (
        <TablaDatosUsuariosClient initialUsuarios={usuarios} />
    );
}
