import Footer from "../footer";
import { getUsuario, getTodosClientes, getPagosTodosConNombres, getTodosProducto } from "@/app/schema";
import FormularioChecarEntrada from "../registro_entrada_salida/place_formulario";
import { auth } from 'app/auth';
import DashboardGridClient from "./DashboardGridClient";

export default async function Grid()  {
    let session = await auth();
    let correo = session?.user?.email;
    let usuarios: any[] = [];
    let nivelUsuario: string | undefined;
    let clientes: any[] = [];
    let pagos: any[] = [];
    let conceptos: any[] = [];
        
    try {
        if (correo) {
            const usuarioResponse = await getUsuario(correo);
            usuarios = usuarioResponse;
      
            if (usuarios.length > 0) {
                nivelUsuario = usuarios[0].nivel;
            }
        }

        if (nivelUsuario === 'na1') {
            const [clientesRes, pagosRes, conceptosRes] = await Promise.all([
                getTodosClientes(),
                getPagosTodosConNombres(),
                getTodosProducto()
            ]);
            clientes = clientesRes;
            pagos = pagosRes;
            conceptos = conceptosRes;
        }
    }
    catch (error) {
        console.error(error);
    }

    return (
        <>
            {nivelUsuario === 'na1' ? (
                <DashboardGridClient 
                    clientes={clientes}
                    pagos={pagos}
                    conceptos={conceptos}
                    checadorForm={<FormularioChecarEntrada />}
                />
            ) : (
                <div className="px-4 grid gap-3 grid-cols-12">
                    <FormularioChecarEntrada />
                </div>
            )}
            <Footer />
        </>
    );
};
