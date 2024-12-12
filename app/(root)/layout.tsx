import { SidebarProvider } from "@/components/ui/sidebar"
import {AppSidebar} from "@/components/AppSidebar";
import NavBar from "@/components/NavBar";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
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
