import Footer from "../footer";
import { PlaceholderTablaClientesPequenio } from "./place_catalogo_clientes_min";
import FormularioClientes from "./place_formulario_cliente";

export const GridRegistroClientes = () => {
    return (
        <>
            <div className="px-4 grid gap-3 grid-cols-12">
                <FormularioClientes />
                <PlaceholderTablaClientesPequenio/>
            </div>
            <Footer />
        </>
    );
};
