
import type { Metadata } from 'next';
import PrivacyClientPage from './_components/privacy-client';

export const metadata: Metadata = {
    title: 'Privacy',
    description: 'GNS BTP is a Reunion Island company specializing in structural work, born from the meeting between an experienced site manager and seasoned real estate developers.',
};

export default function PrivacyPage() {
    return <PrivacyClientPage />;
}