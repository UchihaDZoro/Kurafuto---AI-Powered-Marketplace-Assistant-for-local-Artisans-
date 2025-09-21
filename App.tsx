

import React, { useState, useCallback, useEffect } from 'react';
import ExplorePage from './components/ExplorePage';
import StoriesPage from './components/StoriesPage';
import ArtisanProfile from './components/ArtisanProfile';
import ArtisanOnboarding from './components/ArtisanOnboarding';
import LandingPage from './components/LandingPage';
import ThemeToggle from './components/ThemeToggle';
import ArtisansListPage from './components/ArtisansListPage';
import SignInModal from './components/SignInModal';
import { type Artisan } from './types';
import { MOCK_ARTISANS } from './constants';
import { MenuIcon, CloseIcon } from './components/Icon';
import * as dbService from './services/dbService';

dbService.initDB(); // Initialize the DB on app load

type View = 'home' | 'explore' | 'stories' | 'profile' | 'onboarding' | 'artisansList';
type Tab = 'home' | 'explore' | 'artisans' | 'stories' | 'help' | 'dashboard' | undefined;

const App: React.FC = () => {
    const [artisans, setArtisans] = useState<Artisan[]>(MOCK_ARTISANS);
    const [currentView, setCurrentView] = useState<View>('home');
    const [activeTab, setActiveTab] = useState<Tab>('home');
    const [selectedArtisan, setSelectedArtisan] = useState<Artisan | null>(null);
    const [loggedInArtisan, setLoggedInArtisan] = useState<Artisan | null>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
    const [initialMessageTarget, setInitialMessageTarget] = useState<string | null>(null);
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme === 'dark';
    });
    
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDarkMode]);

    const toggleTheme = () => {
        setIsDarkMode(prevMode => !prevMode);
    };

    const handleArtisanSelect = useCallback((artisan: Artisan) => {
        setSelectedArtisan(artisan);
        setCurrentView('profile');
        if (loggedInArtisan && loggedInArtisan.id === artisan.id) {
            setActiveTab('dashboard');
        } else {
            setActiveTab(undefined);
        }
    }, [loggedInArtisan]);

    const handleBackToExplore = useCallback(() => {
        setSelectedArtisan(null);
        setCurrentView('explore');
        setActiveTab('explore');
    }, []);

    const navigateTo = (view: View, tab?: Tab) => {
        if (view !== 'profile') {
            setSelectedArtisan(null);
        }
        setCurrentView(view);
        setActiveTab(tab || (view as Tab));
        setIsMenuOpen(false);
    };

    const handleLogin = (artisan: Artisan) => {
        setLoggedInArtisan(artisan);
        setSelectedArtisan(artisan);
        setCurrentView('profile');
        setActiveTab('dashboard');
        setIsMenuOpen(false);
        setIsSignInModalOpen(false);
    };

    const handleLogout = () => {
        setLoggedInArtisan(null);
        setSelectedArtisan(null);
        setCurrentView('home');
        setActiveTab('home');
        setIsMenuOpen(false);
    };

    const handleStartConversation = (targetArtisanId: string) => {
        if (!loggedInArtisan) {
            setIsSignInModalOpen(true);
            return;
        }
        setInitialMessageTarget(targetArtisanId);
        handleLogin(loggedInArtisan); // Navigate to dashboard
    };
    
    useEffect(() => {
        // Prevent body scroll when mobile menu is open
        document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
    }, [isMenuOpen]);

    const renderContent = () => {
        const isDashboard = currentView === 'profile' && !!selectedArtisan && !!loggedInArtisan && selectedArtisan.id === loggedInArtisan.id;
        
        switch (currentView) {
            case 'profile':
                return selectedArtisan ? <ArtisanProfile 
                    artisan={selectedArtisan} 
                    onBack={handleBackToExplore} 
                    isDashboard={isDashboard} 
                    loggedInArtisan={loggedInArtisan}
                    onStartConversation={handleStartConversation}
                    initialMessageTarget={initialMessageTarget}
                    onInitialMessageTargetClear={() => setInitialMessageTarget(null)}
                /> : <ExplorePage onArtisanSelect={handleArtisanSelect} />;
            case 'onboarding':
                return <ArtisanOnboarding onLogin={handleLogin}/>;
            case 'artisansList':
                return <ArtisansListPage onArtisanSelect={handleArtisanSelect} loggedInArtisan={loggedInArtisan} onStartConversation={handleStartConversation} />;
            case 'stories':
                return <StoriesPage onArtisanSelect={handleArtisanSelect} />;
            case 'explore':
                 return <ExplorePage onArtisanSelect={handleArtisanSelect} />;
            case 'home':
            default:
                // If logged in, default to their profile/dashboard instead of landing page
                if (loggedInArtisan) {
                     return <ArtisanProfile artisan={loggedInArtisan} onBack={handleBackToExplore} isDashboard={true} />;
                }
                return <ExplorePage onArtisanSelect={handleArtisanSelect} />;
        }
    };
    
    const navButtons = (isMobile = false) => (
        <>
            <button 
                onClick={() => navigateTo('explore', 'explore')} 
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors w-full text-left ${
                    activeTab === 'explore'
                        ? 'bg-google-blue text-white' 
                        : `text-gray-600 dark:text-gray-300 ${!isMobile && 'hover:bg-gray-100 dark:hover:bg-gray-700'}`
                }`}
            >
                Explore
            </button>
            <button 
                onClick={() => navigateTo('artisansList', 'artisans')} 
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors w-full text-left ${
                    activeTab === 'artisans'
                        ? 'bg-google-blue text-white' 
                        : `text-gray-600 dark:text-gray-300 ${!isMobile && 'hover:bg-gray-100 dark:hover:bg-gray-700'}`
                }`}
            >
                Artisans
            </button>
            <button 
                onClick={() => navigateTo('stories', 'stories')} 
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors w-full text-left ${
                    activeTab === 'stories'
                        ? 'bg-google-blue text-white' 
                        : `text-gray-600 dark:text-gray-300 ${!isMobile && 'hover:bg-gray-100 dark:hover:bg-gray-700'}`
                }`}
            >
                Stories
            </button>
            <button className={`px-4 py-2 rounded-md text-sm font-medium text-gray-500 cursor-not-allowed opacity-60 w-full text-left`}>
                Help
            </button>
        </>
    );

    return (
        <div className={`min-h-screen font-body text-gray-800 dark:text-gray-200 ${loggedInArtisan && currentView === 'profile' ? 'bg-gray-50 dark:bg-gray-900' : 'bg-white dark:bg-gray-800'}`}>
            <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-40 border-b border-gray-200 dark:border-gray-700 shadow-sm">
                <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <button onClick={() => loggedInArtisan ? navigateTo('profile', 'dashboard') : navigateTo('home', 'home')} className="flex-shrink-0 flex items-center">
                                <span className="font-sans text-2xl font-bold text-gray-800 dark:text-gray-100">
                                    Kurafuto
                                </span>
                            </button>
                        </div>
                        <div className="hidden md:flex items-center space-x-2">
                            {navButtons()}
                        </div>
                        <div className="hidden md:flex items-center space-x-4">
                            <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
                             {loggedInArtisan ? (
                                <>
                                    <button
                                        onClick={() => handleLogin(loggedInArtisan)}
                                        className="px-4 py-2 rounded-md text-sm font-medium text-white bg-google-blue hover:bg-blue-700"
                                    >
                                        My Dashboard
                                    </button>
                                    <button onClick={handleLogout} className="px-4 py-2 rounded-md text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                                        Logout
                                    </button>
                                </>
                             ) : (
                                <>
                                    <button onClick={() => setIsSignInModalOpen(true)} className="px-4 py-2 rounded-md text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600">
                                        Sign In
                                    </button>
                                    <button
                                        onClick={() => navigateTo('onboarding')}
                                        className="px-4 py-2 rounded-md text-sm font-medium text-white bg-google-blue hover:bg-blue-700"
                                    >
                                        Join as Artisan
                                    </button>
                                </>
                             )}
                        </div>
                        <div className="md:hidden flex items-center gap-2">
                             <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
                            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="dark:text-white">
                                {isMenuOpen ? <CloseIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </nav>
                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden absolute top-16 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg p-4 space-y-2 z-30 animate-fade-in-up">
                        {navButtons(true)}
                        <hr className="my-2 border-gray-200 dark:border-gray-700"/>
                         {loggedInArtisan ? (
                            <div className="space-y-2">
                                <button
                                    onClick={() => handleLogin(loggedInArtisan)}
                                    className="w-full text-left px-4 py-2 rounded-md text-sm font-medium text-white bg-google-blue hover:bg-blue-700"
                                >
                                    My Dashboard
                                </button>
                                <button onClick={handleLogout} className="w-full text-left px-4 py-2 rounded-md text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                                    Logout
                                </button>
                            </div>
                         ) : (
                             <div className="space-y-2">
                                <button onClick={() => setIsSignInModalOpen(true)} className="w-full text-left px-4 py-2 rounded-md text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                                    Sign In
                                </button>
                                <button
                                    onClick={() => navigateTo('onboarding')}
                                    className="w-full text-left px-4 py-2 rounded-md text-sm font-medium text-white bg-google-blue hover:bg-blue-700"
                                >
                                    Join as Artisan
                                </button>
                            </div>
                         )}
                    </div>
                )}
            </header>
            
            {currentView === 'home' && !loggedInArtisan ? (
                <main className="-mt-16">
                    <LandingPage onJoin={() => navigateTo('onboarding')} onExplore={() => navigateTo('explore', 'explore')} />
                </main>
            ) : (
                <main>
                    {renderContent()}
                </main>
            )}
            <SignInModal 
                isOpen={isSignInModalOpen} 
                onClose={() => setIsSignInModalOpen(false)}
                onArtisanLogin={handleLogin}
            />
        </div>
    );
};

export default App;