"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, LifeBuoy, LogOut, User, BadgeCheck } from "lucide-react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { clearuser } from "@/components/redux/slices/authSlice";
import { persistor, type AppDispatch, type RootState } from "@/components/redux/store";
import GlowButton from "@/components/ui/GlowButton";

const menuItemClass =
    "group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[13px] font-semibold text-[#C9C3DC] transition-colors hover:bg-white/6 hover:text-white";

const menuIconClass =
    "h-4.5 w-4.5 shrink-0 text-[#8B83A3] transition-colors group-hover:text-white";

export default function ProfileButton() {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const authData = useSelector((state: RootState) => state.user.user);
    const [menuOpen, setMenuOpen] = useState(false);
    const mounted = useSyncExternalStore(
        () => () => {},
        () => true,
        () => false,
    );
    const [pos, setPos] = useState({ top: 0, right: 0 });
    const triggerRef = useRef<HTMLDivElement>(null);
    const isLoggedIn = Boolean(authData?.accessToken);
    const profile = authData?.user;

    useEffect(() => {
        if (!menuOpen) return;

        const updatePosition = () => {
            const rect = triggerRef.current?.getBoundingClientRect();
            if (!rect) return;
            setPos({
                top: rect.bottom + 12,
                right: window.innerWidth - rect.right,
            });
        };

        updatePosition();
        window.addEventListener("resize", updatePosition);
        window.addEventListener("scroll", updatePosition, true);
        return () => {
            window.removeEventListener("resize", updatePosition);
            window.removeEventListener("scroll", updatePosition, true);
        };
    }, [menuOpen]);

    const handleSignOut = async () => {
        setMenuOpen(false);
        try {
            localStorage.removeItem("token");
            dispatch(clearuser());
            await persistor.purge();
            toast.success("Signed out");
            router.replace("/login");
        } catch {
            toast.error("Failed to sign out. Please try again.");
        }
    };

    const label = profile
        ? [profile.firstName, profile.lastName].filter(Boolean).join(" ") ||
          profile.username ||
          profile.phone?.slice(-4) ||
          "Profile"
        : "Profile";

    const primaryLinks = [
        { href: "/profile", label: "Edit Profile", icon: User },
        { href: "/roles", label: "Roles & access", icon: BadgeCheck },
    ] as const;

    const secondaryLinks = [
        { href: "/alerts", label: "Help Center", icon: LifeBuoy },
    ] as const;

    const avatar = (size: number) =>
        profile?.profilePhoto ? (
            <Image
                src={profile.profilePhoto}
                alt=""
                width={size}
                height={size}
                unoptimized
                className="h-full w-full object-cover"
            />
        ) : (
            <User className={size > 28 ? "h-6 w-6" : "h-3.5 w-3.5"} strokeWidth={2} />
        );

    const menuBody = (
        <div className="relative flex min-h-0 flex-1 flex-col gap-2.5 overflow-y-auto overscroll-contain bg-[#161322] p-3.5 pb-[max(0.875rem,env(safe-area-inset-bottom))] pt-5">
            <div className="absolute top-0 left-0 h-20 w-full bg-linear-to-b from-primary/20 via-primary/8 to-transparent" />
            <div className="relative z-10 flex items-center gap-3 px-0.5 pb-0.5">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-[#1A1724] text-[#C4B5FD]">
                    {avatar(48)}
                </span>
                <div className="min-w-0 flex-1">
                    <p className="truncate text-[15px] font-bold tracking-tight text-white capitalize">
                        {label}
                    </p>
                    <p className="mt-0.5 truncate text-xs font-semibold text-[#8B83A3]">
                        {profile?.email || profile?.phone || "Manage your account"}
                    </p>
                </div>
            </div>

            <div className="space-y-0.5 rounded-xl border border-white/6 bg-white/4 p-1">
                {primaryLinks.map(({ href, label: itemLabel, icon: Icon }) => (
                    <Link
                        key={itemLabel}
                        href={href}
                        onClick={() => setMenuOpen(false)}
                        className={menuItemClass}
                    >
                        <Icon className={menuIconClass} strokeWidth={1.75} />
                        <span className="min-w-0 flex-1 capitalize">{itemLabel}</span>
                        <ChevronRight className="h-3.5 w-3.5 text-[#5C566F] opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                    </Link>
                ))}
            </div>

            <div className="space-y-0.5 rounded-2xl border border-white/6 bg-white/4 p-1">
                {secondaryLinks.map(({ href, label: itemLabel, icon: Icon }) => (
                    <Link
                        key={itemLabel}
                        href={href}
                        onClick={() => setMenuOpen(false)}
                        className={menuItemClass}
                    >
                        <Icon className={menuIconClass} strokeWidth={1.75} />
                        <span className="min-w-0 flex-1 capitalize">{itemLabel}</span>
                        <ChevronRight className="h-3.5 w-3.5 text-[#5C566F] opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                    </Link>
                ))}
            </div>

            {isLoggedIn ? (
                <button
                    type="button"
                    onClick={handleSignOut}
                    className="group flex w-full cursor-pointer items-center gap-3 rounded-xl bg-[#3a1d24] px-3.5 py-3 text-left text-[13px] font-bold text-[#ff8a8a] capitalize transition-colors hover:bg-[#4a242c]"
                >
                    <LogOut className="h-4.5 w-4.5 shrink-0" strokeWidth={1.85} />
                    Logout
                </button>
            ) : null}
        </div>
    );

    return (
        <div ref={triggerRef} className="relative shrink-0">
            <GlowButton
                type="button"
                size="sm"
                aria-label="Account menu"
                aria-expanded={menuOpen}
                aria-haspopup="dialog"
                onClick={() => setMenuOpen((v) => !v)}
                className="h-9 min-h-9 py-0 pr-3.5 pl-1"
            >
                <span className="relative flex h-6 w-6 items-center justify-center overflow-hidden rounded-full bg-white/15 text-white">
                    {avatar(24)}
                </span>
                <span className="max-w-24 truncate capitalize">{label}</span>
            </GlowButton>

            {mounted
                ? createPortal(
                      <AnimatePresence>
                          {menuOpen ? (
                              <>
                                  <motion.button
                                      key="profile-backdrop"
                                      type="button"
                                      aria-label="Close menu"
                                      initial={{ opacity: 0 }}
                                      animate={{ opacity: 1 }}
                                      exit={{ opacity: 0 }}
                                      transition={{ duration: 0.18 }}
                                      className="fixed inset-0 z-100 cursor-default bg-black/45"
                                      onClick={() => setMenuOpen(false)}
                                  />
                                  <motion.div
                                      key="profile-menu"
                                      role="dialog"
                                      aria-modal="true"
                                      aria-label="Account menu"
                                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                                      animate={{ opacity: 1, y: 0, scale: 1 }}
                                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                                      transition={{ duration: 0.16 }}
                                      style={{ top: pos.top, right: pos.right }}
                                      className="fixed z-101 flex max-h-[min(85vh,36rem)] w-[min(18rem,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#161322] shadow-[0_24px_60px_rgba(0,0,0,0.45)]"
                                  >
                                      {menuBody}
                                  </motion.div>
                              </>
                          ) : null}
                      </AnimatePresence>,
                      document.body,
                  )
                : null}
        </div>
    );
}
