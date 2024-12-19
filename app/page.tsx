import React from 'react'
import Link from "next/link";
import Footer from "@/components/Footer";
import {getSession} from "@/lib/auth/session";
import {redirect} from "next/navigation";

export const metadata = {
    title: "Sequence Expense Tracker - Simplify Your Finances",
    description: "Track and split your expenses effortlessly with our intuitive platform. Perfect for flatmates, friends, and families.",
    openGraph: {
        title: "Sequence",
        description: "The best way to manage shared expenses seamlessly.",
        url: "https://sequence-expense-tracker.vercel.app/",
        // images: [
        //     {
        //         url: "/path-to-image.jpg",
        //         width: 800,
        //         height: 600,
        //         alt: "Expense Tracker Preview",
        //     },
        // ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Expense Tracker",
        description: "Simplify your shared expenses with ease.",
        // images: ["/path-to-image.jpg"],
    },
};


const Page = async () => {
    const session = await getSession();
    if (session) {
        redirect("/dashboard");
    }

    return (
        <>
            <header>
                <nav className="nav">
                    <Link href=".." className="logo">Sequence</Link>
                    <div className="flex items-center gap-2">
                        <Link href="/sign-in" className="nav__link">
                            Sign In
                        </Link>
                        <Link href="/sign-in" className="nav__link nav__link-btn">
                            Sign Up
                        </Link>
                    </div>
                </nav>
            </header>
            <section className="home_section px-2">
                <div className="relative mt-10 max-h-[450px]">
                    <div className="w-full flex items-center justify-center pointer-events-none"
                         style={{
                             background: 'radial-gradient(circle at center, rgba(74,222,128,0.25) 0%, transparent 25%)'
                         }}>
                        <h1 className="heading">
                            <span className="xl:mr-5">Control Your Budget</span>
                            <span className="xl:ml-5"> And Finance Easily</span>
                        </h1>
                    </div>
                </div>
                <p className="paragraph mt-6">Introducing Sequence, your all-in-one money management solution for a simpler financial life. Sequence allows you to easily manage your budgets, and finances while also providing the ease of sending and receiving money via UPI.</p>
                <button className="link-btn">Get started</button>
            </section>
            <section className="details_section">
                <div></div>
                <div className="max-w-xl max-md:px-2 mx-auto">
                    <p className="heading_title">Simplify your wallet, manage Your cards effortlessly.</p>
                    <p className="paragraph !text-start !text-base">Sequence allows you to manage all of your credit and debit cards easily. Our simplified app allows you to easily organize and manage many cards in one place, eliminating the need for different banking apps. Sequence streamlines card management by providing features such as transaction monitoring, spending limitations, and real-time notifications, allowing you to effortlessly handle your money.</p>
                </div>
            </section>
            <Footer />
        </>
    )
}
export default Page
