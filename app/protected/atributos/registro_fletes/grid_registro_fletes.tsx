import Footer from "../footer";
import FormularioCostos from "./place_formulario";
import { TablaCostoFlete } from "./tabla_costo_flete";


export const GridRegistroFletes = () => {
    return (
        <>
            <div className="px-4 grid gap-3 grid-cols-12">
                <FormularioCostos />
                <TablaCostoFlete />
            </div>
            <Footer />
        </>

    );
};
