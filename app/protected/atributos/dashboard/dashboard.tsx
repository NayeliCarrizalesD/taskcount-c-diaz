
import { TopBar } from "../topbar/topbar";
import { Grid } from "./grid";


export function Dashboard() {
    return (
        <div className="p-4 sm:ml-64 my-4 bg-zinc-700 rounded-3xl pb-4 shadow h-auto">
            <TopBar/>
            <Grid />
        </div>
    );
};
