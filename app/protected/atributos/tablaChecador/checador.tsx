
import { TopBar } from "../topbar/topbar";
import { GridTablaFullChecador} from "./grid_tabla_checador";



export function ConsultaChecador() {
    return (
        <div className="bg-zinc-700 rounded-3xl pb-4 shadow h-auto">
            <TopBar/>
            <GridTablaFullChecador />
        </div>
    );
};
