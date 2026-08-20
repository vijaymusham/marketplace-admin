import type { Metadata, Viewport } from "next";
import "./globals.css";
import localFont from "next/font/local";
import { Toaster } from "react-hot-toast";
import TanstackProvider from "../components/providers/TanstackProvider";
import SmoothScroll from "../components/layout/SmoothScroll";
import Sidebar from "@/components/sidebar/Sidebar";

/** Matches navbar top tint: primary (#2f3adf) at 15% over white */
const THEME_COLOR = "#e0e1fa";

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
    title: "Deal Pokket",
    description: "Buy and sell used products near you",
    appleWebApp: {
        statusBarStyle: "default",
    },
};

export const viewport: Viewport = {
    themeColor: THEME_COLOR,
    colorScheme: "light",
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
            <body className="min-h-full flex flex-col bg-white font-display text-slate-900" suppressHydrationWarning>
                <TanstackProvider>
                    <SmoothScroll>
                        <div className="flex flex-col min-h-screen w-full overflow-hidden">
                            <Sidebar />
                            <main className="flex-1 ml-64 w-full">
                                {children}
                            </main>
                        </div>
                        <Toaster
                            position="top-right"
                            reverseOrder={false}
                            gutter={8}
                            containerStyle={{ zIndex: 100000, fontFamily: "var(--font-display)", fontWeight: "600" }}
                            toasterId="default"
                        />
                    </SmoothScroll>
                </TanstackProvider>
            </body>
        </html>
    );
}
