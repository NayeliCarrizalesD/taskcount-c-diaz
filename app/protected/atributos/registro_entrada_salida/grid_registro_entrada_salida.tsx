import Footer from "../footer";
import FormularioChecarEntrada from "./place_formulario";
import { TablaEntradaSalida } from "./tabla_entrada_salida";


export const GridRegistroChecador = () => {
    return (
        <>
            <div className="px-4 grid gap-3 grid-cols-12">
                <div className="lg:col-span-4 sm:col-span-12">
                    <FormularioChecarEntrada />
                </div>
                <TablaEntradaSalida />
            </div>
            <Footer />
        </>

    );
};
