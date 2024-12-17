import { CreditCard, User, Settings } from 'lucide-react'
import Link from "next/link";

const sidebarItems = [
    { icon: User, label: "Profile", href: "/settings/profile" },
    { icon: CreditCard, label: "Billing", href: "/settings/billing" },
    { icon: Settings, label: "Account", href: "/settings/account" },
]

export default function SettingsSidebar() {
    return (
        <nav className="w-full md:w-64 space-y-1">
            <Link className="block w-full px-2 py-2 hover:bg-secondary/80 text-sm font-medium" href="/settings/profile">Profile</Link>
            <Link className="block w-full px-2 py-2 hover:bg-secondary/80 text-sm font-medium" href="/settings/account">Account</Link>
        </nav>

    )
}

