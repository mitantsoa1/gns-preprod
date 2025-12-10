import { BreadcrumbItem } from '@/types/sidebar';
import AppLayoutTemplate from './app/app-sidebar-layout';
import { FC, type ReactNode } from 'react';
import { Toaster } from 'sonner';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

const AppLayout = ({ children, breadcrumbs, ...props }: AppLayoutProps) => (
    <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
        <div className='p-2  lg:p-4'>
            {children}
        </div>

        <Toaster />
    </AppLayoutTemplate>
);

export default AppLayout