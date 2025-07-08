
import { TopBar } from "../topbar/topbar";
import { GridTablaFullChecador} from "./grid_tabla_checador";



export function ConsultaChecador() {
    return (
        <div className="p-4 sm:ml-64 m-3 bg-zinc-600 rounded-3xl pb-4 shadow h-auto">
            <TopBar/>
            <GridTablaFullChecador />
        </div>
    );
};
