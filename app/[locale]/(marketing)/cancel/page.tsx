

import type { Metadata } from 'next';
import CancelClientPage from './_components/cancel-client';

export const metadata: Metadata = {
    title: 'Cancel',
    description: 'GNS BTP is a Reunion Island company specializing in structural work, born from the meeting between an experienced site manager and seasoned real estate developers.',
};

export default function CancelPage() {
    return <CancelClientPage />;
}
