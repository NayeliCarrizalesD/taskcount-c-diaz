
import { TopBar } from "../topbar/topbar";
import { Grid } from "./grid";


export function Dashboard() {
    return (
        <div className="p-4 sm:ml-64 bg-zinc-700 rounded-3xl pb-4 shadow h-auto">
            <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
            <div className="grid grid-cols-3 gap-4 mb-4">
            
            <TopBar/>
            <Grid />
            </div>
            </div>
        </div>
    );
};
