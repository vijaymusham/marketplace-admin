import type { Metadata, Viewport } from "next";
import "./globals.css";
import localFont from "next/font/local";
import { Toaster } from "react-hot-toast";
import TanstackProvider from "../components/providers/TanstackProvider";
import DashboardShell from "@/components/layout/DashboardShell";
import { ModalProvider } from "@/components/ui/Modal";

/** Matches navbar top tint: primary (#2f3adf) at 15% over white */
const THEME_COLOR = "#0B0914";

const display = localFont({
    src: [
        { path: "../../public/fonts/Gilroy-Medium.woff2", weight: '500', style: 'normal' },
        { path: "../../public/fonts/Gilroy-SemiBold.woff2", weight: '600', style: 'normal' },
        { path: "../../public/fonts/Gilroy-Bold.woff2", weight: '700', style: 'normal' },
        { path: "../../public/fonts/Gilroy-ExtraBold.woff2", weight: '900', style: 'normal' },
    ],
    variable: "--font-display",
    display: "swap",
    preload: true,
});

export const metadata: Metadata = {
    title: "Deal Pokket | Dashboard",
    description: "Meetings, notes, and collaboration in one place",
    appleWebApp: {
        statusBarStyle: "default",
    },
};

export const viewport: Viewport = {
    themeColor: THEME_COLOR,
    colorScheme: "dark",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={`${display.variable} h-full antialiased`}
        >
            <body className="h-full overflow-hidden bg-[#0C0A13] font-display text-white" suppressHydrationWarning>
                <TanstackProvider>
                    <ModalProvider>
                        <DashboardShell>{children}</DashboardShell>
                    </ModalProvider>
                    <Toaster
                        position="top-right"
                        reverseOrder={false}
                        gutter={8}
                        containerStyle={{
                            zIndex: 100000,
                            fontFamily: "var(--font-display)",
                            fontWeight: "600",
                        }}
                        toastOptions={{
                            style: {
                                background: "#333",
                                color: "#fff",
                                border: "1px solid rgba(139, 110, 255, 0.22)",
                                borderRadius: "14px",
                            },
                            success: {
                                iconTheme: {
                                    primary: "#6E56F5",
                                    secondary: "#F5F3FF",
                                },
                            },
                            error: {
                                iconTheme: {
                                    primary: "#F43F5E",
                                    secondary: "#F5F3FF",
                                },
                            },
                        }}
                        toasterId="default"
                    />
                </TanstackProvider>
            </body>
        </html>
    );
}
