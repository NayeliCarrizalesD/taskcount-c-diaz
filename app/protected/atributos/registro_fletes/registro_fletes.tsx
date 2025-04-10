import { TopBar } from "../topbar/topbar";
import { GridRegistroFletes } from "./grid_registro_fletes";

export function RegistroFletes() {
    return (
        <div className="bg-zinc-700 rounded-3xl pb-4 shadow h-auto">
            <TopBar/>
            <GridRegistroFletes />
        </div>
    );
};
