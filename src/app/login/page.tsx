"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import LoginScreen from "@/components/auth/LoginScreen";
import { RootState } from "@/components/redux/store";
import { DEFAULT_NAV_HREF } from "@/lib/nav";

export default function LoginPage() {
    const router = useRouter();
    const user = useSelector((state: RootState) => state.user.user);

    useEffect(() => {
        if (user) {
            router.replace(DEFAULT_NAV_HREF);
        }
    }, [user, router]);

    if (user) return null;

    return <LoginScreen />;
}
