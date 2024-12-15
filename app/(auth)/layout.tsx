import React from 'react'
import {redirect} from "next/navigation";
import {getSession} from "@/lib/auth/session";

const Layout = async ({ children }: {children: React.ReactNode}) => {
    const access_token = await getSession()
    if(access_token) {
        return redirect("/");
    }
    return (
        <div>
            <div className="max-w-[400px] px-4 mx-auto">
              <h1 className="text-center font-work-sans text-green font-semibold text-3xl my-8 sm:my-14">Sequence</h1>
              {children}
            </div>
        </div>
    )
}
export default Layout
