
import type { Metadata } from 'next';
import FaqClientPage from './_components/faq-client';

export const metadata: Metadata = {
    title: 'FAQ',
    description: 'GNS BTP is a Reunion Island company specializing in structural work, born from the meeting between an experienced site manager and seasoned real estate developers.',
};

export default function FaqPage() {
    return <FaqClientPage />;
}