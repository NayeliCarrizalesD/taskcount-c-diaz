
import { TopBar } from "../topbar/topbar";
import Grid from "./grid";


export function Dashboard() {
    return (
        <div className="main-content-card">
            <TopBar/>
            <Grid />
        </div>
    );
};
