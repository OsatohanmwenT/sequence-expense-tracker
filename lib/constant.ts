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
            { name: "Payment", link: "/" },
            { name: "Card", link: "/" },
            { name: "Pricing", link: "/" },
            { name: "Login / Register", link: "/" },
        ],
    },
    {
        title: "Product",
        links: [
            { name: "Personal", link: "/" },
            { name: "Business", link: "/" },
            { name: "Invoice", link: "/" },
        ],
    },
    {
        title: "Company",
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
            { name: "customer@sequence.com", link: "mailto:customer@sequence.com" },
            { name: "+92554862354", link: "tel:+92554862354" },
        ],
    },
];