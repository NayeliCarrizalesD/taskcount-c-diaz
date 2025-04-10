import Footer from "../footer";
import FormularioDatosUsuario from "./place_formulario_datos_usuario";
import { PlaceholderTablaDatosUsuario } from "./place_tabla_datos_usuario";

export const GridRegistroDatosUsers = () => {
    return (
        <>
            <div className="px-4 grid gap-3 grid-cols-12">
                <FormularioDatosUsuario />
                <PlaceholderTablaDatosUsuario />
            </div>
            <Footer />
        </>

    );
};
