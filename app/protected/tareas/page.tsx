import { auth } from "@/app/auth";
import { getUsuario } from "@/app/schema";
import { redirect } from "next/navigation";
import { TopBar } from "../atributos/topbar/topbar";
import GridTareas from "../atributos/tareas/GridTareas";

export default async function TareasPage() {
  const session = await auth();
  const email = session?.user?.email;
  if (!email) {
    redirect("/login");
  }

  const userRes = await getUsuario(email);
  if (userRes.length === 0 || userRes[0].nivel !== "na1") {
    redirect("/");
  }

  return (
    <main>
      <div className="main-content-card">
        <TopBar />
        <GridTareas showAsignarLayout={false} />
      </div>
    </main>
  );
}
