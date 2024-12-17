import {Home, Badge, Settings, ChartArea, Group, MoreHorizontal} from "lucide-react"

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
import {getSession} from "@/lib/auth/session";
import {logoutUser} from "@/lib/auth/actions";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";

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
        url: "/settings/profile",
        icon: Settings,
    },
]

export async function AppSidebar() {
    const user = await getSession();

    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <div className="flex items-center font-inter pt-2 mb-2 pb-4 border-b-[1px] justify-between">
                        <Link href="/">
                            <SidebarGroupLabel className="logo">Sequence</SidebarGroupLabel>
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
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="user-btn">
                            <Avatar className="text-black size-10">
                                <AvatarImage src="https://github.com/shadcn.png"/>
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <span className="font-semibold">{user?.userData}</span>
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="font-work-sans shadow-xl" align="end">
                        <DropdownMenuItem>Settings</DropdownMenuItem>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem onClick={logoutUser}>Logout</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
