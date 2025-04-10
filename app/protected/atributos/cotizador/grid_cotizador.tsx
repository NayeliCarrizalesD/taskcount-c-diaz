import Footer from "../footer";
import { TablaCostoFleteFull } from "../tablaCostoFletes/tabla_costoFlete_placeholder";
import { CambioDolares } from "./cambio_dolares";

import { FormularioCotizador } from "./formulario_cotizador";

export const GridCotizador = () => {
    return (
      
      <>
    <div className="px-4 grid gap-3 grid-cols-12">
    
        <FormularioCotizador/>
        <CambioDolares/>
        <TablaCostoFleteFull/>
    </div>
    <Footer/>
    
    </>
    );
  };