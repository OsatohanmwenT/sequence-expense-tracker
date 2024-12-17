import React from 'react'
import {footerLinks} from "@/lib/constant";
import Link from "next/link";

const Footer = () => {
    return (
        <footer className="bg-black bottom-0 p-10">
            <div className="grid max-md:place-content-center gap-y-3 max-md:gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="flex flex-col max-md:items-center">
                    <p className="text-3xl text-white">Sequence</p>
                    <p className="text-white mt-5 mb-3 md:pr-4 max-md:text-center font-inter font-semibold">
                        Make your complicated finance more simple.
                    </p>
                </div>
                {footerLinks.map((items) => (
                    <div
                        className="flex flex-col items-center md:items-start"
                        key={items.title}
                    >
                        <p className="text-white text-xl mb-3 font-inter">{items.title}</p>
                        <ul className="flex flex-col max-md:text-center gap-2">
                            {items.links.map((link) => (
                                <Link href="." key={link.name}>
                                    <li className="text-white/70 hover:text-white text-sm">{link.name}</li>
                                </Link>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            <div className="px-4 py-2 rounded-xl mt-4 bg-stone-100">
                <span
                className="text-gray text-sm mb-2 font-inter">
                    Sequence © 2000-2024, All Rights Reserved
                </span>
            </div>
        </footer>
    );
};
export default Footer
