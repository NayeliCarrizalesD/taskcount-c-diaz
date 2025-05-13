import { PlaceholderTablaConceptos } from "../catalogo_productos/placeholder_catalogo_productos";
import Footer from "../footer";
import FormularioProductos from "./place_formulario_producto";

export const GridRegistroProductos = () => {
    return (
        <>
            <div className="px-4 grid gap-3 grid-cols-12">
                <FormularioProductos />
                <PlaceholderTablaConceptos/>
              
            </div>
            <Footer />
        </>

    );
};
