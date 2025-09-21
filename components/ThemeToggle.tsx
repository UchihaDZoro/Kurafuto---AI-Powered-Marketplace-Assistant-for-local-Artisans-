
import React from 'react';
import { SunIcon, MoonIcon } from './Icon';

interface ThemeToggleProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDarkMode, toggleTheme }) => {
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-google-blue dark:focus:ring-offset-gray-800 transition-colors"
      aria-label="Toggle theme"
    >
      <div className="relative w-6 h-6">
        <SunIcon
          className={`absolute inset-0 w-6 h-6 text-yellow-500 transition-all duration-300 transform ${
            isDarkMode ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'
          }`}
        />
        <MoonIcon
          className={`absolute inset-0 w-6 h-6 text-blue-300 transition-all duration-300 transform ${
            isDarkMode ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'
          }`}
        />
      </div>
    </button>
  );
};

export default ThemeToggle;
