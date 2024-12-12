"use server"

import React from 'react'
import {SidebarTrigger} from "@/components/ui/sidebar";
import SearchInput from "@/components/forms/SearchInput";
import CalendarRange from "@/components/CalendarRange";
import {Download} from "lucide-react";

const NavBar = () => {
    return (
        <section className="w-full px-2 py-3 flex-between">
            <div className="flex items-center">
                <SidebarTrigger/>
                <hr className="border-[1px] max-sm:hidden rounded-md ml-2 mr-4 h-[25px] w-[1px]"/>
                <SearchInput/>
            </div>
            <div className="flex items-center gap-1 md:gap-3">
                <CalendarRange/>
                <button
                    aria-label="export button"
                    className="flex items-center hover:translate-y-[1px] transition-all md:bg-green-200 px-3 py-2 rounded-md md:text-white"
                >
                    <Download className="size-5 md:mr-1"/>
                    <span className="max-md:hidden">Export</span>
                </button>
            </div>
        </section>
    )
}
export default NavBar
