import { SideBarAdmin } from "../atributos/sidebar/sidebar_admin/sidebar";
import { SideBarN1 } from "../atributos/sidebar/sidebar_nivel1/sidebar_n1";
import { SideBarN2 } from "../atributos/sidebar/sidebar_nivel2/sidebar_n2";
import { SideBarN3 } from "../atributos/sidebar/sidebar_nivel3/sidebar_n3";
import { RegistroClientes } from "../atributos/registro_clientes/registro_cliente";
import { auth } from "app/auth";
import { getUsuario } from "@/app/schema";

export default async function ProtectedRegistroDatosUsuarios() {
  const session = await auth();
  const correo = session?.user?.email;
  let nivelUsuario: string | undefined;

  try {
    if (correo) {
      const usuarios = await getUsuario(correo);
      if (usuarios.length > 0) {
        nivelUsuario = usuarios[0].nivel;
      }
    }
  } catch (error) {
    console.error("Error obteniendo usuario:", error);
  }

  return (
    <main>
      {nivelUsuario === "na1" && <SideBarAdmin />}
      {nivelUsuario === "n1" && <SideBarN1 />}
      {nivelUsuario === "n2" && <SideBarN2 />}
      {nivelUsuario === "n3" && <SideBarN3 />}
      <RegistroClientes />
    </main>
  );
}
