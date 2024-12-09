import React from 'react'
import {getSession} from "@/lib/auth/actions";
import {redirect} from "next/navigation";

const Layout = async ({ children }: {children: React.ReactNode}) => {
    const access_token = await getSession()
    if(access_token) {
        return redirect("/");
    }
    return (
        <div>
            <div className="max-w-[400px] mx-auto">
              <h1 className="text-center text-green font-semibold text-3xl my-10">Sequence</h1>
              {children}
            </div>
        </div>
    )
}
export default Layout
