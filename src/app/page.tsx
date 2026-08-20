import { redirect } from "next/navigation";
import { DEFAULT_NAV_HREF } from "@/lib/nav";

export default function Page() {
    redirect(DEFAULT_NAV_HREF);
}
