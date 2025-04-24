import { PlaceholderCheckHora } from "../check_entrada_salida/placeholder_check";
import Footer from "../footer";
import FormularioChecarEntrada from "../registro_entrada_salida/place_formulario";


export const Grid = () => {
    return (
        <>
            <div className="px-4 grid gap-3 grid-cols-12">
            <FormularioChecarEntrada/>  
            <PlaceholderCheckHora/>
            </div>
            <Footer />
        </>

    );
};
