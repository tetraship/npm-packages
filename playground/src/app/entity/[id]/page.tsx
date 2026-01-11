'use client';
import { useTopNav, GlassCard, GlassEntityCard, ApplicationLayoutNav, BreadcrumbNav } from '@tetraship/react-glass';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function EntityPage() {
    const { id } = useParams();
    const { setNav, reset } = useTopNav();
    const [activeTab, setActiveTab] = useState('overview');

    useEffect(() => {
        const breadcrumbs = [
            { label: 'Home', href: '/', isHome: true },
            { label: 'Entities', href: '/entities' },
            { label: `Entity ${id}` }
        ];

        const nav = (
            <div className="flex items-center">
                 <ApplicationLayoutNav
                    options={[
                        { value: 'overview', label: 'Overview' },
                        { value: 'settings', label: 'Settings' },
                        { value: 'activity', label: 'Activity' }
                    ]}
                    activeValue={activeTab}
                    onSelect={setActiveTab}
                 />
            </div>
        );

        setNav(
            <BreadcrumbNav breadcrumbs={breadcrumbs} nav={nav} />
        );

        return () => reset();
    }, [id, setNav, reset, activeTab]);

    return (
        <div className="space-y-4 max-w-4xl mx-auto">
            <GlassEntityCard
                title={`Entity ${id}`}
                subtitle="This is a detailed view of a mocked entity to demonstrate dynamic navigation."
                image={
                    <div className="w-full h-full flex items-center justify-center bg-blue-600 text-white font-bold text-xl">
                        {typeof id === 'string' ? id.substring(0,2).toUpperCase() : 'E1'}
                    </div>
                }
                metadata={
                    <span className="inline-flex items-center rounded-md bg-green-500/10 px-2 py-1 text-xs font-medium text-green-400 ring-1 ring-inset ring-green-500/20">
                        Active
                    </span>
                }
            >
                <div className="p-4">
                    <p className="text-gray-300">Current View: <strong className="text-white capitalize">{activeTab}</strong></p>
                    <p className="text-sm text-gray-400 mt-2">Notice the top navigation has changed to breadcrumbs and the tabs have replaced the main menu.</p>
                </div>
            </GlassEntityCard>
             <GlassCard>
                <h3 className="text-lg font-bold mb-2 text-white">Additional Details</h3>
                <p className="text-gray-300">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
            </GlassCard>
        </div>
    );
}
