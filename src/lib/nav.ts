export type NavChild = {
    id: string;
    href: string;
    label: string;
    description: string;
};

export type NavItem = {
    id: string;
    href: string;
    label: string;
    description: string;
    children?: readonly NavChild[];
};

export type ResolvedNav = {
    id: string;
    href: string;
    label: string;
    description: string;
    crumbs: string[];
};

export const PRIMARY_LINKS: readonly NavItem[] = [
    {
        id: "analytics",
        href: "/analytics",
        label: "Analytics",
        description:
            "Track traffic, conversions, and marketplace performance in one view.",
    },
    {
        id: "banners",
        href: "/banners",
        label: "Banners",
        description:
            "Create, schedule, and publish promotional banners across Deal Pokket.",
    },
    {
        id: "ads",
        href: "/ads",
        label: "Ads",
        description:
            "Manage campaigns, placements, and visibility for marketplace ads.",
    },
    {
        id: "roles",
        href: "/roles",
        label: "Roles",
        description:
            "Set permissions and access levels for every member of your admin team.",
    },
    {
        id: "users",
        href: "/users",
        label: "Users",
        description:
            "Review accounts, status, and activity across the Deal Pokket platform.",
    },
    {
        id: "categories",
        href: "/categories",
        label: "Categories",
        description:
            "Organize listings with a clear structure shoppers can browse quickly.",
    },
    {
        id: "sub-categories",
        href: "/sub-categories",
        label: "Sub Categories",
        description:
            "Fine-tune category trees so deals land in the right place every time.",
    },
    {
        id: "cities",
        href: "/cities",
        label: "Cities",
        description:
            "Control city coverage and location targeting for local listings.",
    },
    {
        id: "reports",
        href: "/reports",
        label: "Reports",
        description:
            "Review disputes, flagged content, and operational reports in one place.",
    },
    {
        id: "revenue",
        href: "/revenue",
        label: "Revenue",
        description:
            "Monitor earnings, payouts, and marketplace revenue as they come in.",
    },
    {
        id: "packages",
        href: "/packages",
        label: "Packages",
        description:
            "Configure listing packages, featured spots, and seller upgrades.",
    },
    {
        id: "subscriptions",
        href: "/subscriptions",
        label: "Subscription",
        description:
            "Manage member plans, billing cycles, and subscription access.",
    },
    {
        id: "flags",
        href: "/flags",
        label: "Flags",
        description:
            "Triage user reports and take action on listings that need review.",
    },
    {
        id: "logs",
        href: "/logs",
        label: "Logs Audit",
        description:
            "Inspect admin actions and system events with a full audit trail.",
    },
    {
        id: "alerts",
        href: "/alerts",
        label: "Alert / Warning",
        description:
            "Broadcast warnings and keep operators ahead of issues as they appear.",
    },
] as const;

export const DEFAULT_NAV_HREF = PRIMARY_LINKS[0].href;

export function flattenNav(): { href: string; label: string }[] {
    return PRIMARY_LINKS.flatMap((item) => [
        { href: item.href, label: item.label },
        ...(item.children ?? []),
    ]);
}

export function findNav(pathname: string): ResolvedNav | null {
    if (pathname === "/profile") {
        return {
            id: "profile",
            href: "/profile",
            label: "Profile",
            description: "Update your account details and admin preferences.",
            crumbs: ["Profile"],
        };
    }

    for (const item of PRIMARY_LINKS) {
        if (item.href === pathname) {
            return {
                id: item.id,
                href: item.href,
                label: item.label,
                description: item.description,
                crumbs: [item.label],
            };
        }

        const child = item.children?.find((entry) => entry.href === pathname);
        if (child) {
            return {
                id: child.id,
                href: child.href,
                label: child.label,
                description: child.description,
                crumbs: [item.label, child.label],
            };
        }
    }

    return null;
}

export function isExactNavMatch(href: string, pathname: string) {
    return pathname === href;
}

export function isParentNavMatch(item: NavItem, pathname: string) {
    return item.children?.some((child) => child.href === pathname) ?? false;
}
