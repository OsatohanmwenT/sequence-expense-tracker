import { SidebarProvider } from "@/components/ui/sidebar"
import {AppSidebar} from "@/components/AppSidebar";
import NavBar from "@/components/Lists/NavBar";
import React from "react";
import {redirect} from "next/navigation";
import {getSession} from "@/lib/auth/session";
import {Toaster} from "@/components/ui/toaster";

export default async function Layout({ children }: { children: React.ReactNode }) {
    const session = await getSession()
    if (!session) return redirect("/sign-in");
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="w-full font-helvetica">
                <NavBar />
                {children}
            </main>
        </SidebarProvider>
    )
}
