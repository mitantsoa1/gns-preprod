import prisma from '@/lib/prisma';
import PricingContent from './_components/pricing-client';
import { Product } from '@/lib/generated/prisma/client';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Pricing',
    description: 'GNS BTP is a Reunion Island company specializing in structural work, born from the meeting between an experienced site manager and seasoned real estate developers.',
};

const PricingPage = async ({ params }: { params: Promise<{ locale: string }> }) => {
    const { locale } = await params;
    let products = await prisma.product.findMany();

    // Depending on the locale, you might want to select the correct language fields
    products = products.map((p: Product) => ({
        ...p,
        name: (locale === 'fr' && p.nameFr) ? p.nameFr : p.name,
        description: (locale === 'fr' && p.descriptionFr) ? p.descriptionFr : p.description,
    }));

    return <PricingContent products={products} />;
};

export default PricingPage;