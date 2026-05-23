"use client";

import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Overlay } from "./Overlay";
import { Header } from "./Header";
import { ProfileDrawer } from "./ProfileDrawer";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/services/usersService";

export function DashboardLayout() {
    const [openMenu, setOpenMenu] = useState<boolean>(false);
    const [openProfile, setOpenProfile] = useState<boolean>(false);

    const { data: user, isLoading, error } = useQuery({
        queryKey: ['user'],
        queryFn: getUser
    });

    if (error) console.log(error);

    return (
        <div>
            <Header
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