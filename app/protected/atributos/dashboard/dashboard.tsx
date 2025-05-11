
import { TopBar } from "../topbar/topbar";
import { Grid } from "./grid";


export function Dashboard() {
    return (
        <div className="p-4 sm:ml-64 m-3 bg-gray-700 rounded-3xl pb-4 shadow h-auto">
            <TopBar/>
            <Grid />
        </div>
    );
};
