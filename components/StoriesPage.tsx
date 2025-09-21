

import React, { useState, useCallback, useEffect } from 'react';
import { type Artisan, type Story } from '../types';
import * as dbService from '../services/dbService';
import Modal from './Modal';

interface StoriesPageProps {
    onArtisanSelect: (artisan: Artisan) => void;
}

const StoriesPage: React.FC<StoriesPageProps> = ({ onArtisanSelect }) => {
    const [selectedStory, setSelectedStory] = useState<Story | null>(null);
    const [stories, setStories] = useState<Story[]>([]);
    const [artisans, setArtisans] = useState<Artisan[]>([]);

    useEffect(() => {
        setStories(dbService.getStories());
        setArtisans(dbService.getArtisans());
    }, []);


    const handleArtisanClick = useCallback((artisanId: string) => {
        const artisan = artisans.find(a => a.id === artisanId);
        if (artisan) {
            onArtisanSelect(artisan);
        }
    }, [onArtisanSelect, artisans]);

    if (stories.length === 0) {
        return null; // Or a loading spinner
    }

    const featuredStory = stories[0];
    const otherStories = stories.slice(1);

    return (
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 animate-fade-in">
            <style>{`.animate-fade-in { animation: fadeIn 0.5s ease-in-out forwards; } @keyframes fadeIn { 0% { opacity: 0; } 100% { opacity: 1; } }`}</style>
            
            <h1 className="text-4xl font-bold font-sans text-center text-gray-800 dark:text-gray-100 mb-2">Artisan Stories</h1>
            <p className="text-center text-lg text-gray-600 dark:text-gray-400 mb-8">Discover the inspiration and tradition behind the crafts.</p>

            {/* Featured Story */}
             <div className="relative rounded-2xl shadow-lg dark:shadow-none overflow-hidden mb-12 h-96 group animate-fade-in-up">
                <img src={featuredStory.artisanBannerImageUrl} alt={featuredStory.title} className="absolute w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
                <div className="relative h-full flex flex-col justify-end p-8 md:p-12 text-white">
                    <h2 className="text-3xl lg:text-4xl font-bold font-sans mb-3">{featuredStory.title}</h2>
                    <div className="flex items-center gap-3 mb-4">
                        <img src={featuredStory.artisanProfileImageUrl} alt={featuredStory.artisanName} className="w-10 h-10 rounded-full object-cover" />
                        <button onClick={() => handleArtisanClick(featuredStory.artisanId)} className="font-semibold text-white hover:underline">
                           {featuredStory.artisanName}
                        </button>
                    </div>
                    <p className="text-gray-200 mb-6 max-w-2xl">{featuredStory.excerpt}</p>
                    <button onClick={() => setSelectedStory(featuredStory)} className="self-start px-6 py-2 bg-google-blue text-white font-bold rounded-lg hover:bg-blue-600 transition-colors">
                        Read Full Story
                    </button>
                </div>
            </div>


            {/* Other Stories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {otherStories.map(story => (
                    <div key={story.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-none overflow-hidden flex flex-col">
                        <img src={story.imageUrl} alt={story.title} className="w-full h-48 object-cover" />
                        <div className="p-6 flex flex-col flex-grow">
                             <h3 className="text-xl font-bold font-sans text-gray-800 dark:text-gray-100 mb-2">{story.title}</h3>
                             <div className="flex items-center gap-3 mb-3">
                                <img src={story.artisanProfileImageUrl} alt={story.artisanName} className="w-8 h-8 rounded-full object-cover" />
                                <button onClick={() => handleArtisanClick(story.artisanId)} className="text-sm font-semibold text-google-blue hover:underline">
                                    {story.artisanName}
                                </button>
                            </div>
                             <p className="text-gray-600 dark:text-gray-400 mb-4 flex-grow">{story.excerpt}</p>
                             <button onClick={() => setSelectedStory(story)} className="self-start text-google-blue font-bold hover:underline">
                                Read More &rarr;
                             </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Story Modal */}
            <Modal isOpen={!!selectedStory} onClose={() => setSelectedStory(null)} title={selectedStory?.title || ''}>
                {selectedStory && (
                    <div>
                         <div className="flex items-center gap-4 mb-4">
                            <img src={selectedStory.artisanProfileImageUrl} alt={selectedStory.artisanName} className="w-12 h-12 rounded-full object-cover" />
                            <div>
                                <p className="font-bold text-lg text-gray-800 dark:text-gray-100">{selectedStory.artisanName}</p>
                                 <button onClick={() => { handleArtisanClick(selectedStory.artisanId); setSelectedStory(null); }} className="text-sm text-google-blue hover:underline">
                                    View Profile
                                </button>
                            </div>
                        </div>
                        <img src={selectedStory.imageUrl} alt={selectedStory.title} className="w-full h-64 object-cover rounded-lg mb-4" />
                        <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">
                            {selectedStory.content}
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default StoriesPage;