"use server"

import React from 'react'
import {SidebarTrigger} from "@/components/ui/sidebar";
import SearchInput from "@/components/forms/SearchInput";
import CalendarRange from "@/components/forms/CalendarRange";
import DownloadButton from "@/components/Buttons/DownloadButton";

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
                <DownloadButton />
            </div>
        </section>
    )
}
export default NavBar
