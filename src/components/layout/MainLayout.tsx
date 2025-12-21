import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { Helmet } from 'react-helmet';

const MainLayout = () => {
    return (
        <>
            <Helmet>
                <title>Employee Dashboard | Workforce Management & Attendance Tracking</title>
                <meta
                    name="description"
                    content="Comprehensive employee dashboard for managing leave requests, tracking attendance, monitoring team schedules, and accessing company announcements. Clock in/out, view holiday calendar, and manage work-life balance efficiently."
                />
                <meta property="og:title" content="Employee Dashboard | Workforce Management & Attendance Tracking" />
                <meta property="og:description" content="Comprehensive employee dashboard for managing leave requests, tracking attendance, monitoring team schedules, and accessing company announcements. Clock in/out, view holiday calendar, and manage work-life balance efficiently." />
            </Helmet>
            <div className="flex h-screen bg-background-main ">
                {/* Fixed Sidebar */}
                <div className="fixed top-0 left-0 h-screen w-60 z-50">
                    <Sidebar />
                </div>

                {/* Main Content Area */}
                <div className="flex-1 ml-60 flex flex-col h-full">
                    {/* Header - Static Position in Flex Column */}
                    <div className="z-40 ">
                        <Header />
                    </div>

                    {/* Scrollable Content */}
                    <main className="flex-1 overflow-y-auto bg-[#0235640f]">
                        <Outlet />
                    </main>
                </div>
            </div>
        </>
    );
};

export default MainLayout;