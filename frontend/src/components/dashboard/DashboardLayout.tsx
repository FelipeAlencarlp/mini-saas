"use client";

import { useState } from "react";
import { Sidebar } from "./sidebar/Sidebar";
import { Overlay } from "./Overlay";
import { Header } from "./header/Header";
import { ProfileDrawer } from "./ProfileDrawer";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/services/users/usersService";
import { useToast } from "@/hooks/useToast";

export function DashboardLayout() {
    const { showToast } = useToast();

    const [openMenu, setOpenMenu] = useState<boolean>(false);
    const [openProfile, setOpenProfile] = useState<boolean>(false);

    const { data: user, isLoading, error } = useQuery({
        queryKey: ['user'],
        queryFn: getUser
    });

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

            {openProfile && (
                <Overlay onClose={() => setOpenProfile(false)}/>
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