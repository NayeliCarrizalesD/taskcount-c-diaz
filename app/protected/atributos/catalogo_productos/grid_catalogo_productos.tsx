import Footer from "../footer";
import { PlaceholderTablaProductos } from "./placeholder_catalogo_productos";

export const GridCatalogoProductos = () => {
    return (
        <>
            <div className="px-4 grid gap-3 grid-cols-12">
                <PlaceholderTablaProductos />
            </div>
            <Footer />
        </>

    );
};
