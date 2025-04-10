
import Footer from "../footer";
import { TablaCostoFleteFull } from "./tabla_costoFlete_placeholder";

export const GridTablaFullCostoFlete = () => {
    return (
        <>
            <div className="px-4 grid gap-3 grid-cols-12">
                <TablaCostoFleteFull />
            </div>
            <Footer/>
        </>

    );
};
