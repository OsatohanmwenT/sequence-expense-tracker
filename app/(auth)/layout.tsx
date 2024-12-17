import React from 'react'
import {redirect} from "next/navigation";
import {getSession} from "@/lib/auth/session";
import Link from "next/link";

const Layout = async ({ children }: {children: React.ReactNode}) => {
    const access_token = await getSession()
    if(access_token) {
        return redirect("/dashboard");
    }
    return (
        <div>
            <div className="max-w-[400px] px-4 mx-auto">
                <Link href="/">
                    <h1 className="text-center font-work-sans text-green font-semibold text-3xl my-3 sm:my-16">Sequence</h1>
                </Link>
              {children}
            </div>
        </div>
    )
}
export default Layout
