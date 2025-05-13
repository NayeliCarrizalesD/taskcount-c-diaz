import Footer from "../footer";
import FormularioClientesHonorarios from "./placeholder_form_clientes_honorarios";


export const GridConfigClientesHonorarios = () => {
    return (
        <>
            <div className="px-4 grid gap-3 grid-cols-12">
            <FormularioClientesHonorarios/>
            </div>
            <Footer />
        </>

    );
};
