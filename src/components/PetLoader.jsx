import React from 'react';

const PetLoader = () => {
    return (
        <div className="flex justify-center items-center py-20 w-full min-h-[40vh]">
            <div className="flex flex-col items-center gap-3">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-500"></div>
                <p className="text-gray-500 font-medium animate-pulse text-sm">Loading cute friends...</p>
            </div>
        </div>
    );
};

export default PetLoader;