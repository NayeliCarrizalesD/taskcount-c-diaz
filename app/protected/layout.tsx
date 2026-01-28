
import { auth } from 'app/auth';
import { getUsuario } from "@/app/schema";
import { SidebarProvider } from "./context/SidebarContext";
import { ProtectedLayout } from "./components/ProtectedLayout";

// Sidebars
import { SideBarAdmin } from "./atributos/sidebar/sidebar_admin/sidebar";
import { SideBarN1 } from "./atributos/sidebar/sidebar_nivel1/sidebar_n1";
import { SideBarN2 } from "./atributos/sidebar/sidebar_nivel2/sidebar_n2";
import { SideBarN3 } from "./atributos/sidebar/sidebar_nivel3/sidebar_n3";

export default async function Layout({ children }: { children: React.ReactNode }) {
    let session = await auth();
    let correo = session?.user?.email;
    let usuarios: any[] = [];
    let nivelUsuario: string = 'n3'; // Default to lowest permission if undetected

    try {
        if (correo) {
            const usuarioResponse = await getUsuario(correo);
            if (usuarioResponse.length > 0) {
                nivelUsuario = usuarioResponse[0].nivel || 'n3';
            }
        }
    } catch (error) {
        console.error("Error fetching user level in layout:", error);
    }

    // Select Sidebar Component based on Level
    let SidebarComponent;
    const userName = session?.user?.name;
    const userEmail = session?.user?.email;

    switch (nivelUsuario) {
        case 'na1':
            SidebarComponent = <SideBarAdmin name={userName} email={userEmail} />;
            break;
        case 'n1':
            SidebarComponent = <SideBarN1 name={userName} email={userEmail} />;
            break;
        case 'n2':
            SidebarComponent = <SideBarN2 name={userName} email={userEmail} />;
            break;
        case 'n3':
        default:
            SidebarComponent = <SideBarN3 name={userName} email={userEmail} />;
            break;
    }

    return (
        <SidebarProvider>
            <ProtectedLayout sidebar={SidebarComponent}>
                {children}
            </ProtectedLayout>
        </SidebarProvider>
    );
}
