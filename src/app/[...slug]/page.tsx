import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SectionPlaceholder from "@/components/layout/SectionPlaceholder";
import { flattenNav, findNav } from "@/lib/nav";

type PageProps = {
    params: Promise<{ slug: string[] }>;
};

function pathFromSlug(slug: string[]) {
    return `/${slug.join("/")}`;
}

export function generateStaticParams() {
    return [
        ...flattenNav().map(({ href }) => ({
            slug: href.replace(/^\//, "").split("/"),
        })),
        { slug: ["profile"] },
    ];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const current = findNav(pathFromSlug(slug));

    return {
        title: current ? `${current.label} | Deal Pokket` : "Deal Pokket",
    };
}

export default async function SectionPage({ params }: PageProps) {
    const { slug } = await params;
    const current = findNav(pathFromSlug(slug));

    if (!current) {
        notFound();
    }

    return <SectionPlaceholder label={current.label} />;
}
