
import type { Metadata } from 'next';
import ProjectsClientPage from './_components/projects-client';

export const metadata: Metadata = {
    title: 'Projects',
    description: 'GNS BTP is a Reunion Island company specializing in structural work, born from the meeting between an experienced site manager and seasoned real estate developers.',
};

export default function ProjectsPage() {
    return <ProjectsClientPage />;
}