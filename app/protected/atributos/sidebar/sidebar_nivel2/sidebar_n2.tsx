import { Plan } from "../plan";
import { AccountAdminToggle } from "../account_Admin_Toggle";
import { RouteSelectNivel2 } from "./routeSelectN2";

export function SideBarN2(){
  return (
    <div className="font-[family-name:var(--font-geist-mono)]">
      <div className="overflow-y bg-black text-white sticky top-4 h-[calc(100vh-32px-48px)]" >
        <AccountAdminToggle/>
        <RouteSelectNivel2/>
      </div>
      <Plan/>
    </div>

  );
}