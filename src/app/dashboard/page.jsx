

import React from 'react';

const DashboardHomePage = () => {
    
    return (
       <div className="p-6 md:p-15 max-w-5xl mx-auto space-y-12 mt-10">
            <div className="bg-[#faf5ef] rounded-3xl p-8 text-rose-500 shadow-lg">
                <h1 className="text-3xl md:text-4xl font-extrabold mb-2">
                    Welcome back 
                </h1>
                <p className="text-gray-400 text-sm md:text-base max-w-xl">
                    Manage your adoption requests and find your next furry friend all in one place.
                </p>
            </div>

            
        </div>
    );
};

export default DashboardHomePage;