'use client';
import { useTopNav, BreadcrumbNav } from '@tetraship/react-glass';
import { useEffect } from 'react';

export function DocsPageClient() {
    const { setNav, reset } = useTopNav();

    useEffect(() => {
        setNav(
            <BreadcrumbNav 
                breadcrumbs={[
                    { label: 'Home', href: '/', isHome: true },
                    { label: 'Documentation' }
                ]} 
            />
        );
        return () => reset();
    }, [setNav, reset]);

    return null;
}