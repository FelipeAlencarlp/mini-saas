import { TitlePage } from "@/components/admin/TitlePage";
import DashboardCards from "@/components/dashboard/DashboardCards";

export default function AdminPage() {
    return (
        <div>
            <TitlePage>Dashboard</TitlePage>
            
            <DashboardCards />
        </div>
    );
}