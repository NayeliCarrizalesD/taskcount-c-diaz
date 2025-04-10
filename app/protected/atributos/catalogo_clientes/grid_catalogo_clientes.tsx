import Footer from "../footer";
import { PlaceholderTablaClientes } from "./placeholder_catalogo_clientes";

export const GridCatalogoClientes = () => {
    return (
        <>
            <div className="px-4 grid gap-3 grid-cols-12">
                <PlaceholderTablaClientes />
            </div>
            <Footer />
        </>

    );
};
