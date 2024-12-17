type FAQItem = {
    id: number;
    value: string;
};

export const faq: FAQItem[] = [
    {id: 1, value: "Account"},
    {id: 2, value: "Manage Deliveries"},
    {id: 3, value: "Orders"},
    {id: 4, value: "Payments"}
]

type FooterLink = {
    name: string;
    link: string;
};

type FooterSection = {
    title: string;
    links: FooterLink[];
};


export const footerLinks: FooterSection[] = [
    {
        title: "Account",
        links: [
            { name: "Wishlist", link: "/" },
            { name: "Cart", link: "/" },
            { name: "Shop", link: "/" },
            { name: "Login / Register", link: "/" },
        ],
    },
    {
        title: "Help",
        links: [
            { name: "About us", link: "/" },
            { name: "FAQs", link: "/" },
            { name: "How it works", link: "/" },
            { name: "Privacy policy", link: "/" },
            { name: "Payment policy", link: "/" },
        ],
    },
    {
        title: "Get in touch",
        links: [
            { name: "customer@shopco.com", link: "mailto:customer@shopco.com" },
            { name: "+92554862354", link: "tel:+92554862354" },
        ],
    },
];