"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "../form/Button";
import { HiOutlineArrowLeftStartOnRectangle as logoutIcon } from "react-icons/hi2";

export default function LogoutButton() {
    const router = useRouter();
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        router.push('/login');
    }

    return (
        <Button
            onClick={handleLogout}
            Icon={logoutIcon}
            className="
                flex justify-center gap-3
                bg-red-500 w-full mb-5 text-white
                p-2 cursor-pointer hover:bg-red-400
                items-center
            "
        >
            Sair
        </Button>
    );
}