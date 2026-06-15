import { getClientes, getPagosPorCliente } from "@/app/schema";
import HistorialClienteDashboard from "@/app/protected/catalogo_clientes/[id]/historial/HistorialClienteDashboard";
import { TopBar } from "@/app/protected/atributos/topbar/topbar";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function Page({ params }: PageProps) {
  const { id } = params;
  
  // Consultar el cliente y sus pagos directamente de la base de datos
  const clienteList = await getClientes(id);
  const cliente = clienteList[0] || null;
  const pagos = await getPagosPorCliente(id);

  return (
    <div className="main-content-card text-white">
      <TopBar />
      <HistorialClienteDashboard cliente={cliente} inicialPagos={pagos} />
    </div>
  );
}
