
import React, { useState, useEffect } from 'react';
import { type Artisan } from '../types';
import * as dbService from '../services/dbService';
import Modal from './Modal';
import { UsersIcon } from './Icon';

interface SignInModalProps {
    isOpen: boolean;
    onClose: () => void;
    onArtisanLogin: (artisan: Artisan) => void;
}

const SignInModal: React.FC<SignInModalProps> = ({ isOpen, onClose, onArtisanLogin }) => {
    const [demoArtisans, setDemoArtisans] = useState<Artisan[]>([]);

    useEffect(() => {
        if (isOpen) {
            const demoArtisanIds = ['harry-potter-pottery', 'nancy-embroidery', 'pathan-violin'];
            const allArtisans = dbService.getArtisans();
            setDemoArtisans(allArtisans.filter(a => demoArtisanIds.includes(a.id)));
        }
    }, [isOpen]);

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Sign In">
            <div className="space-y-4">
                <p className="text-sm text-center text-gray-600 dark:text-gray-400">
                    To explore the platform, please sign in using one of the demo accounts below.
                </p>

                <div>
                    <h3 className="font-semibold text-lg mb-2 text-center text-gray-700 dark:text-gray-200">As a Customer</h3>
                    <button 
                        onClick={() => {
                            alert("You've logged in as a Demo Customer! You can now explore products and message artisans.");
                            onClose();
                        }}
                        className="w-full flex items-center justify-center gap-2 p-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                    >
                       <UsersIcon className="w-5 h-5" />
                       <span className="font-semibold">Login as Demo Customer</span>
                    </button>
                </div>
                
                <div className="relative">
                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                        <div className="w-full border-t border-gray-300 dark:border-gray-600" />
                    </div>
                    <div className="relative flex justify-center">
                        <span className="bg-white dark:bg-gray-800 px-2 text-sm text-gray-500">OR</span>
                    </div>
                </div>

                <div>
                    <h3 className="font-semibold text-lg mb-2 text-center text-gray-700 dark:text-gray-200">As an Artisan</h3>
                    <div className="space-y-3">
                        {demoArtisans.map(artisan => (
                            <button 
                                key={artisan.id}
                                onClick={() => onArtisanLogin(artisan)}
                                className="w-full flex items-center gap-4 p-3 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors text-left border dark:border-gray-700"
                            >
                                <img src={artisan.profileImageUrl} alt={artisan.name} className="w-12 h-12 rounded-full object-cover"/>
                                <div>
                                    <p className="font-bold text-gray-800 dark:text-gray-100">{artisan.name}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{artisan.craft}</p>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default SignInModal;
