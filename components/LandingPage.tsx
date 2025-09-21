import React from 'react';
import { SparklesIcon, UsersIcon, GlobeAltIcon, ArrowRightIcon } from './Icon';

interface LandingPageProps {
  onJoin: () => void;
  onExplore: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onJoin, onExplore }) => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <style>{`
        .video-bg-iframe {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 100vw;
          height: 56.25vw; /* 100vw / (16/9) = 56.25 */
          min-height: 100vh;
          min-width: 177.77vh; /* 100vh * (16/9) = 177.77 */
          transform: translateX(-50%) translateY(-50%);
          pointer-events: none;
          z-index: 0;
        }
      `}</style>
      
      {/* Background Video Player */}
      <iframe
          className="video-bg-iframe"
          src="https://www.youtube.com/embed/RtSd3KhsQo4?autoplay=1&loop=1&playlist=RtSd3KhsQo4&controls=0&rel=0&mute=1&modestbranding=1&showinfo=0&iv_load_policy=3"
          title="Kurafuto AI-Powered Craft Platform Showcase"
          frameBorder="0"
          allow="autoplay; encrypted-media"
      ></iframe>
      
      {/* Dark Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/60 z-10"></div>

      {/* Content */}
      <div className="relative z-20 w-full h-full flex items-center justify-center p-4">
          <div className="max-w-3xl text-center text-white">
            <div className="inline-block px-3 py-1 text-sm font-semibold tracking-wider bg-white/10 rounded-full mb-4 backdrop-blur-sm opacity-0 animate-fade-in [animation-delay:100ms]">
                <SparklesIcon className="inline w-4 h-4 mr-2 text-yellow-300" />
                AI-Powered Craft Platform
            </div>
            <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl font-sans opacity-0 animate-fade-in-up [animation-delay:200ms]">
                <span className="block xl:inline">Showcase Your</span>
                <span className="block xl:inline">
                    <span className="text-google-blue"> Crafts</span> <span className="text-google-red">to</span> <span className="text-google-yellow">the</span> <span className="text-google-green"> World</span>
                </span>
            </h1>
            <p className="mt-4 text-base text-gray-200 sm:text-lg md:text-xl max-w-2xl mx-auto opacity-0 animate-fade-in-up [animation-delay:400ms]">
                Join thousands of artisans who use AI-powered tools to create stunning product listings, generate compelling stories, and connect with customers globally.
            </p>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-4 justify-center opacity-0 animate-fade-in-up [animation-delay:600ms]">
                <div className="flex items-center text-sm font-medium text-gray-300">
                    <UsersIcon className="w-5 h-5 mr-2 text-google-blue transition-transform duration-300 transform group-hover:scale-110" />
                    5,000+ Artisans
                </div>
                <div className="flex items-center text-sm font-medium text-gray-300">
                    <GlobeAltIcon className="w-5 h-5 mr-2 text-google-green transition-transform duration-300 transform group-hover:scale-110" />
                    Global Customer Reach
                </div>
                <div className="flex items-center text-sm font-medium text-gray-300">
                    <SparklesIcon className="w-5 h-5 mr-2 text-google-yellow transition-transform duration-300 transform group-hover:scale-110" />
                    AI-Enhanced
                </div>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row sm:justify-center gap-4 opacity-0 animate-fade-in-up [animation-delay:800ms]">
                <button onClick={onJoin} className="w-full sm:w-auto flex items-center justify-center px-8 py-3 border border-transparent text-base font-bold rounded-md text-white bg-google-blue hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 md:py-4 md:text-lg md:px-10 group">
                    Join as Artisan
                    <ArrowRightIcon className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                </button>
                <button onClick={onExplore} className="w-full sm:w-auto flex items-center justify-center px-8 py-3 border border-white text-base font-medium rounded-md text-white bg-transparent hover:bg-white/90 hover:text-gray-900 transition-all duration-300 transform hover:scale-105 md:py-4 md:text-lg md:px-10">
                    Explore Products
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;