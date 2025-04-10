import { Plan } from "../plan";
import { AccountAdminToggle } from "../account_Admin_Toggle";
import { RouteSelectAdmin } from "./routeSelectAdmin";

export function SideBarAdmin(){

  return (
    <div className="font-[family-name:var(--font-geist-mono)] w-[200px]">
      <div className="overflow-y bg-black text-white sticky top-4 h-[calc(100vh-32px-48px)]" >
        <AccountAdminToggle/>
        <RouteSelectAdmin/> 
      </div>
      <Plan/>
    </div>
  );
}