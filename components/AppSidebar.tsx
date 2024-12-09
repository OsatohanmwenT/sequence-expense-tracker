import { Home, Badge, Settings, ChartArea, Group } from "lucide-react"

import {
    Sidebar,
    SidebarContent, SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem, SidebarRail,
} from "@/components/ui/sidebar"
import Link from "next/link";
import {logoutUser} from "@/lib/auth/actions";

// Menu items.
const items = [
    {
        title: "Dashboard",
        url: "/",
        icon: Home,
    },
    {
        title: "Analytics",
        url: "/analytics",
        icon: ChartArea,
    },
    {
        title: "Budgets",
        url: "/budget",
        icon: Badge,
    },
    {
        title: "Groups",
        url: "/groups",
        icon: Group,
    },
    {
        title: "Settings",
        url: "/settings",
        icon: Settings,
    },
]

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <div className="flex items-center pt-2 mb-2 pb-4 border-b-[1px] justify-between">
                        <Link href="/">
                            <SidebarGroupLabel className="text-green text-2xl font-medium">Sequence</SidebarGroupLabel>
                        </Link>
                    </div>
                    <SidebarGroupContent>
                        <SidebarMenu>
                                {items.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild>
                                            <a href={item.url}>
                                                <item.icon/>
                                                <span>{item.title}</span>
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <button onClick={logoutUser} className="px-10 mx-2 mb-2 rounded-xl shadow-2xl hover:shadow-light-green-400/10 transition-all border-2 py-3">
                    <p>User Profile</p>
                </button>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
