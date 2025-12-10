
import type { Metadata } from 'next';
import ContactClientPage from './_components/contact-client';

export const metadata: Metadata = {
    title: 'Contact',
    description: 'GNS BTP is a Reunion Island company specializing in structural work, born from the meeting between an experienced site manager and seasoned real estate developers.',
};

export default function ContactPage() {
    return <ContactClientPage />;
}