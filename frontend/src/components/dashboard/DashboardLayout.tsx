"use client";

import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Overlay } from "./Overlay";
import { Header } from "./Header";
import { ProfileDrawer } from "./ProfileDrawer";

export function DashboardLayout() {
    const [openMenu, setOpenMenu] = useState<boolean>(false);
    const [openProfile, setOpenProfile] = useState<boolean>(false);

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
                onClose={() => setOpenMenu(false)}
            />

            <ProfileDrawer
                open={openProfile}
                onClose={() => setOpenProfile(false)}
            />
        </div>
    );
}