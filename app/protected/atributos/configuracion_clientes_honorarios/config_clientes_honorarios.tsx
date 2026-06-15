
import { TopBar } from "../topbar/topbar";
import { GridConfigClientesHonorarios } from "./grid_config_clientes_honorarios";



export function ConfigClientesHonorarios() {
    return (
        <div className="main-content-card">
            <TopBar/>
            <GridConfigClientesHonorarios />
        </div>
    );
};
