
import type { Metadata } from 'next';
import SuccessClientPage from './components/success-client';

export const metadata: Metadata = {
    title: 'Success',
    description: 'GNS BTP is a Reunion Island company specializing in structural work, born from the meeting between an experienced site manager and seasoned real estate developers.',
};

export default function SuccessPage() {
    return <SuccessClientPage />;
}