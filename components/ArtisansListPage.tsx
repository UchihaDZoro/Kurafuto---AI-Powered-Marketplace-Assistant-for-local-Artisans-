
import React, { useState, useEffect } from 'react';
import { type Artisan } from '../types';
import * as dbService from '../services/dbService';
import { ChatBubbleOvalLeftIcon, UserPlusIcon } from './Icon';

interface ArtisansListPageProps {
    onArtisanSelect: (artisan: Artisan) => void;
    loggedInArtisan: Artisan | null;
    onStartConversation: (targetArtisanId: string) => void;
}

const ArtisansListPage: React.FC<ArtisansListPageProps> = ({ onArtisanSelect, loggedInArtisan, onStartConversation }) => {
    const [artisans, setArtisans] = useState<Artisan[]>([]);

    useEffect(() => {
        setArtisans(dbService.getArtisans());
    }, []);

    return (
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 animate-fade-in">
             <style>{`.animate-fade-in { animation: fadeIn 0.5s ease-in-out forwards; } @keyframes fadeIn { 0% { opacity: 0; } 100% { opacity: 1; } }`}</style>
             <h1 className="text-4xl font-bold font-sans text-center text-gray-800 dark:text-gray-100 mb-2">Meet Our Artisans</h1>
             <p className="text-center text-lg text-gray-600 dark:text-gray-400 mb-8">Discover the talented individuals behind the amazing crafts.</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {artisans.map((artisan) => (
                    <div key={artisan.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-none dark:border dark:border-gray-700 overflow-hidden flex flex-col text-center transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl dark:hover:border-gray-600">
                        <img src={artisan.bannerImageUrl} alt={`${artisan.name}'s craft`} className="h-24 w-full object-cover" />
                        <div className="p-6 flex flex-col items-center flex-grow">
                            <img 
                                src={artisan.profileImageUrl} 
                                alt={artisan.name} 
                                className="w-24 h-24 rounded-full object-cover border-4 border-white dark:border-gray-800 -mt-16" 
                            />
                            <h2 className="text-xl font-bold font-sans mt-4 text-gray-800 dark:text-gray-100">{artisan.name}</h2>
                            <p className="text-sm text-google-blue font-semibold">{artisan.craft}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{artisan.location}</p>
                            
                            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 w-full flex-grow flex flex-col justify-end">
                                <button 
                                    onClick={() => onArtisanSelect(artisan)}
                                    className="w-full px-4 py-2 text-sm font-bold rounded-md text-white bg-google-blue hover:bg-blue-700 transition-colors"
                                >
                                    View Profile
                                </button>
                                <div className="flex gap-2 mt-2">
                                    <button onClick={() => alert(`You are now following ${artisan.name}!`)} className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold rounded-md text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                                        <UserPlusIcon className="w-4 h-4" /> Follow
                                    </button>
                                     {loggedInArtisan?.id !== artisan.id && (
                                        <button onClick={() => onStartConversation(artisan.id)} className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold rounded-md text-white bg-google-green hover:bg-green-700 transition-colors">
                                            <ChatBubbleOvalLeftIcon className="w-4 h-4" /> Message
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ArtisansListPage;
