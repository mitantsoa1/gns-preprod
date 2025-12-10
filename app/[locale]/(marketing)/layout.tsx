
import "../../globals.css";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";



export default async function MarketingLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <div className="min-h-screen bg-white max-w-full">
            <Header />
            {children}
            <Footer />
        </div>
    );
}
