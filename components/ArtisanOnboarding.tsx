

import React, { useState, useEffect } from 'react';
import { type Artisan } from '../types';
import * as dbService from '../services/dbService';
import { ArrowRightIcon } from './Icon';

interface ArtisanOnboardingProps {
    onLogin: (artisan: Artisan) => void;
}

const ArtisanOnboarding: React.FC<ArtisanOnboardingProps> = ({ onLogin }) => {
    const [artisans, setArtisans] = useState<Artisan[]>([]);

    useEffect(() => {
        const demoArtisanIds = ['harry-potter-pottery', 'nancy-embroidery', 'pathan-violin'];
        const allArtisans = dbService.getArtisans();
        setArtisans(allArtisans.filter(a => demoArtisanIds.includes(a.id)));
    }, []);

    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 animate-fade-in">
             <style>{`
                  @keyframes fade-in {
                    0% { opacity: 0; }
                    100% { opacity: 1; }
                  }
                  .animate-fade-in {
                    animation: fade-in 0.5s ease-in-out forwards;
                  }
              `}</style>
            <h1 className="text-4xl font-bold font-sans text-center text-gray-800 dark:text-gray-100 mb-2">Join as a Demo Artisan</h1>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-8">Select one of our demo artisan accounts to explore the dashboard and storefront features.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {artisans.map((artisan) => (
                    <div key={artisan.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-none dark:border dark:border-gray-700 overflow-hidden flex flex-col items-center p-6 text-center transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl dark:hover:border-gray-600">
                        <img 
                            src={artisan.profileImageUrl} 
                            alt={artisan.name} 
                            className="w-24 h-24 rounded-full object-cover border-4 border-gray-100 dark:border-gray-700" 
                        />
                        <h2 className="text-xl font-bold font-sans mt-4 text-gray-800 dark:text-gray-100">{artisan.name}</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{artisan.craft}</p>
                        <p className="text-sm font-body text-gray-600 dark:text-gray-300 my-4 flex-grow">"{artisan.bio.split('. ')[0]}."</p>
                        <button 
                            onClick={() => onLogin(artisan)}
                            className="w-full flex items-center justify-center mt-auto px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-google-blue hover:bg-blue-700 transition-colors group"
                        >
                            Explore Dashboard
                            <ArrowRightIcon className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ArtisanOnboarding;