import React from 'react'
import {Metadata} from "next";
import Link from "next/link";
import {Separator} from "@/components/ui/separator";
import SettingsSidebar from "@/components/Navigation/SettingsSidebar";

export const metadata: Metadata = {
    title: {
        default: "Settings",
        template: "%s | Settings",
    },
    description: "Manage your account settings and preferences.",
}

const Layout = ({children}: {children: React.ReactNode}) => {
    return (
            <>
                <header>
                    <nav className="py-4 px-3 flex-between shadow-sm border-b-2">
                        <Link href="/dashboard" className="logo">Sequence</Link>
                        <button className="font-work-sans">
                            Logout
                        </button>
                    </nav>
                </header>
                <section className="min-h-screen bg-background">
                    <div className="max-w[1280px] mx-auto p-3">
                        <section>
                            <section className="mb-5">
                                <h1 className="text-3xl font-bold font-inter tracking-tight">Settings</h1>
                                <p className="text-muted-foreground">
                                    Manage your account settings and set e-mail preferences.
                                </p>
                            </section>
                            <Separator/>
                        </section>
                        <section className="flex py-5 flex-col md:flex-row gap-8">
                            <SettingsSidebar />
                            <main className="flex-1 space-y-6">
                                {children}
                            </main>
                        </section>
                    </div>
                </section>
            </>
    )
}
export default Layout
