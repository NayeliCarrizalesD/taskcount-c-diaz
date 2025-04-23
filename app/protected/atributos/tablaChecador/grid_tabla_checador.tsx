
import Footer from "../footer";
import { TablaChecadorFull } from "./tabla_checador_placeholder";

export const GridTablaFullChecador = () => {
    return (
        <>
            <div className="px-4 grid gap-3 grid-cols-12">
                <TablaChecadorFull />
            </div>
            <Footer/>
        </>

    );
};
