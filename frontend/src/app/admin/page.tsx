import { TitlePage } from "@/components/dashboard/TitlePage";
import DashboardCards from "@/components/dashboard/card/DashboardCards";

export default function AdminPage() {
    return (
        <div>
            <TitlePage>Dashboard</TitlePage>
            
            <DashboardCards />
        </div>
    );
}