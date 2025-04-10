import { PlaceholderCheckHora } from "../check_entrada_salida/placeholder_check";
import Footer from "../footer";


export const Grid = () => {
    return (
        <>
            <div className="px-4 grid gap-3 grid-cols-12">
            <PlaceholderCheckHora/>
            </div>
            <Footer />
        </>

    );
};
