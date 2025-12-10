import type { Metadata } from 'next';
import AboutClientPage from './_components/about-client';

export const metadata: Metadata = {
    title: 'About',
    description: 'GNS BTP is a Reunion Island company specializing in structural work, born from the meeting between an experienced site manager and seasoned real estate developers.',
};

export default function AboutPage() {
    return <AboutClientPage />;
}
