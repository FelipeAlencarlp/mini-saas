"use client";

import { useState } from "react";
import { Sidebar } from "./sidebar/Sidebar";
import { Overlay } from "./Overlay";
import { Header } from "./header/Header";
import { ProfileDrawer } from "./ProfileDrawer";
import { useUserQuery } from "@/hooks/users/useUserQuery";
import { useToast } from "@/hooks/useToast";

export function DashboardLayout() {
    const { showToast } = useToast();

    const [openMenu, setOpenMenu] = useState<boolean>(false);
    const [openProfile, setOpenProfile] = useState<boolean>(false);

    const { data: user, isLoading, error } = useUserQuery();

    if (error) {
        showToast('Erro ao exibir usuário', 'error');
    }

    return (
        <div>
            <Header
                isLoading={isLoading}
                onOpenMenu={() => setOpenMenu(true)}
                onOpenProfile={() => setOpenProfile(true)}
            />

            {openMenu && (
                <Overlay onClose={() => setOpenMenu(false)}/>
            )}
            
            <Sidebar
                open={openMenu}
                isLoading={isLoading}
                onClose={() => setOpenMenu(false)}
            />

            <ProfileDrawer
                open={openProfile}
                user={user}
                isLoading={isLoading}
                onClose={() => setOpenProfile(false)}
            />
        </div>
    );
}