
import { TopBar } from "../topbar/topbar";
import { GridConfigClientesHonorarios } from "./grid_config_clientes_honorarios";



export function ConfigClientesHonorarios() {
    return (
        <div className="p-4 sm:ml-64 m-3 bg-zinc-700 rounded-3xl pb-4 shadow h-auto">
            <TopBar/>
            <GridConfigClientesHonorarios />
        </div>
    );
};
