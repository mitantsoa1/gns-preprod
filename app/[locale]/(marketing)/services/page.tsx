
import type { Metadata } from 'next';
import ServicesClientPage from './_components/services-client';

export const metadata: Metadata = {
    title: 'Services',
    description: 'GNS BTP is a Reunion Island company specializing in structural work, born from the meeting between an experienced site manager and seasoned real estate developers.',
};

export default function ServicesPage() {
    return <ServicesClientPage />;
}