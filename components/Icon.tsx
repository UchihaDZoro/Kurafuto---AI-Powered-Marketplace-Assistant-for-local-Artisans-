

import React from 'react';

// FIX: Added optional strokeWidth to IconProps to support icons with variable stroke widths.
type IconProps = {
  className?: string;
  strokeWidth?: number;
};

export const MapPinIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 005.16-4.053l.075-.115a16.975 16.975 0 002.3-5.592c.125-.64.125-1.28.125-1.92C21 6.04 16.96 2 12 2S3 6.04 3 10.992c0 .64.012 1.28.125 1.921a16.975 16.975 0 002.3 5.592l.075.115a16.975 16.975 0 005.159 4.053zM12 14a3 3 0 100-6 3 3 0 000 6z"
      clipRule="evenodd"
    />
  </svg>
);

export const SparklesIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 01.75.75c0 5.056-2.383 9.555-6.084 12.436A6.75 6.75 0 019.75 22.5a.75.75 0 01-.75-.75v-7.192A6.75 6.75 0 019.315 7.584zM12 15a.75.75 0 01.75.75v7.5a.75.75 0 01-1.5 0v-7.5a.75.75 0 01.75-.75z"
      clipRule="evenodd"
    />
    <path d="M3 18.75a.75.75 0 01.75-.75h6a.75.75 0 010 1.5h-6a.75.75 0 01-.75-.75zM2.25 12a.75.75 0 01.75-.75h9a.75.75 0 010 1.5h-9a.75.75 0 01-.75-.75zM6 6.75A.75.75 0 016.75 6h9a.75.75 0 010 1.5h-9A.75.75 0 016 6.75zM.75 6a.75.75 0 01.75-.75h3a.75.75 0 010 1.5h-3A.75.75 0 01.75 6z" />
  </svg>
);

export const CloseIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
      clipRule="evenodd"
    />
  </svg>
);

export const UploadIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z" />
    </svg>
);

export const UsersIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.12v-.002zM16.5 19.125a9 9 0 00-18 0v.003l.001.12a.75.75 0 00.364.63 13.067 13.067 0 006.76 1.873c2.472 0 4.786-.684 6.76-1.873a.75.75 0 00.364-.63l.001-.12v-.002z" />
    </svg>
);

export const GlobeAltIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM8.203 5.44a7.5 7.5 0 015.592 0c.343.12.67.263.982.421.21.107.413.22.61.341a.75.75 0 01-.423 1.346c-2.435 1.18-4.965 1.18-7.4 0a.75.75 0 01-.423-1.346c.197-.12.399-.234.61-.341.312-.158.64-.3.982-.421zM5.44 8.203a7.5 7.5 0 010 7.594c.12-.343.263-.67.421-.982.107-.21.22-.413.341-.61a.75.75 0 011.346.423c1.18 2.435 1.18 4.965 0 7.4a.75.75 0 01-1.346.423c-.12-.197-.234-.399-.341-.61-.158-.312-.3-.64-.421-.982zM12 7.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9zm-2.25 4.5a2.25 2.25 0 114.5 0 2.25 2.25 0 01-4.5 0zm11.157-1.852a.75.75 0 01-1.346-.423c-1.18-2.435-1.18-4.965 0-7.4a.75.75 0 011.346-.423c.12.197.234.399.341.61.158.312.3.64.421.982a7.5 7.5 0 010 7.594c-.12.343-.263.67-.421.982-.107.21-.22.413-.341-.61z" clipRule="evenodd" />
    </svg>
);

// FIX: Updated component to accept strokeWidth prop and provide a default value.
export const ShoppingCartIcon: React.FC<IconProps> = ({ className, strokeWidth = 1.5 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={strokeWidth} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c.51 0 .962-.328 1.093-.828l3.025-7.302A1.125 1.125 0 0019.5 4.875c0-.621-.504-1.125-1.125-1.125H4.875M16.5 18a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM8.25 18a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
    </svg>
);

export const ChartBarIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.035-.84-1.875-1.875-1.875h-.75zM9.75 8.625c-1.035 0-1.875.84-1.875 1.875v9.375c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V10.5c0-1.035-.84-1.875-1.875-1.875h-.75zM3 13.5c-1.035 0-1.875.84-1.875 1.875v4.5c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875v-4.5c0-1.035-.84-1.875-1.875-1.875h-.75z" />
    </svg>
);

export const ScaleIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l1.992-7.302H3.75a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.913-.143z" clipRule="evenodd" />
    </svg>
);

export const UserGroupIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.12v-.002zM16.5 19.125a9 9 0 00-18 0v.003l.001.12a.75.75 0 00.364.63 13.067 13.067 0 006.76 1.873c2.472 0 4.786-.684 6.76-1.873a.75.75 0 00.364-.63l.001-.12v-.002z" />
    </svg>
);

export const UserPlusIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.125 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.12v-.002zM16.125 16.125a3 3 0 100-6 3 3 0 000 6z" />
        <path d="M18.75 16.125a.75.75 0 000-1.5h-1.5v-1.5a.75.75 0 00-1.5 0v1.5h-1.5a.75.75 0 000 1.5h1.5v1.5a.75.75 0 001.5 0v-1.5h1.5z" />
    </svg>
);


export const BookOpenIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M12 5.25a.75.75 0 01.75.75v.01a.75.75 0 01-1.5 0V6a.75.75 0 01.75-.75zm.75 4.5a.75.75 0 00-1.5 0v5.25a.75.75 0 001.5 0V9.75z" clipRule="evenodd" />
      <path d="M21 9.75A9 9 0 0012 3C7.029 3 3 7.029 3 12s4.029 9 9 9 9-4.029 9-9V9.75zM12 4.5A7.5 7.5 0 0119.5 12a.75.75 0 001.5 0A9 9 0 0012 3a.75.75 0 000 1.5z" />
    </svg>
);

// FIX: Updated component to accept strokeWidth prop and provide a default value.
export const ArrowRightIcon: React.FC<IconProps> = ({ className, strokeWidth = 1.5 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={strokeWidth} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
    </svg>
);

// FIX: Updated component to accept strokeWidth prop and provide a default value.
export const MenuIcon: React.FC<IconProps> = ({ className, strokeWidth = 1.5 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={strokeWidth} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
);

export const HomeIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
        <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
    </svg>
);

export const ChatBubbleLeftRightIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M1.5 6.375c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v3.026a.75.75 0 01-1.5 0V6.375a.375.375 0 00-.375-.375H3.375A.375.375 0 003 6.375v11.25c0 .207.168.375.375.375h9.401a.75.75 0 010 1.5H3.375A1.875 1.875 0 011.5 17.625V6.375z" clipRule="evenodd" />
        <path fillRule="evenodd" d="M12.553 14.632a.75.75 0 01.636-.288h5.622a1.875 1.875 0 011.875 1.875v4.328a1.875 1.875 0 01-1.875 1.875h-5.622a1.875 1.875 0 01-1.24-.462l-2.404-2.146a.75.75 0 010-1.086l2.404-2.146a1.875 1.875 0 01.604-.376zM14.053 16.132a.375.375 0 00-.127.288v4.328a.375.375 0 00.127.288l2.404-2.146a.375.375 0 000-.543l-2.404-2.215z" clipRule="evenodd" />
    </svg>
);

export const Squares2X2Icon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M3 3.75A.75.75 0 013.75 3h6a.75.75 0 01.75.75v6a.75.75 0 01-.75.75h-6a.75.75 0 01-.75-.75v-6zM13.5 3.75A.75.75 0 0114.25 3h6a.75.75 0 01.75.75v6a.75.75 0 01-.75.75h-6a.75.75 0 01-.75-.75v-6zM3 14.25a.75.75 0 01.75-.75h6a.75.75 0 01.75.75v6a.75.75 0 01-.75.75h-6a.75.75 0 01-.75-.75v-6zM13.5 14.25a.75.75 0 01.75-.75h6a.75.75 0 01.75.75v6a.75.75 0 01-.75.75h-6a.75.75 0 01-.75-.75v-6z" clipRule="evenodd" />
    </svg>
);

export const SunIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.106a.75.75 0 010 1.06-4.5 4.5 0 00-6.364 6.364.75.75 0 01-1.06 1.06 6 6 0 018.486-8.486.75.75 0 011.06 0zM12 18a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM5.106 18.894a.75.75 0 011.06 0 4.5 4.5 0 006.364-6.364.75.75 0 01-1.06-1.06 6 6 0 01-8.486 8.486.75.75 0 010-1.06zM18 12a.75.75 0 01.75.75h2.25a.75.75 0 010 1.5H18.75a.75.75 0 01-.75-.75zM4.5 12a.75.75 0 01.75.75h2.25a.75.75 0 010 1.5H5.25a.75.75 0 01-.75-.75z" />
    </svg>
);

export const MoonIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-3.832 2.072-7.147 5.22-8.97a.75.75 0 01.819.162z" clipRule="evenodd" />
    </svg>
);

export const ThumbUpIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M7.493 18.75c-.425 0-.82-.22-.975-.555C4.846 14.61 3 11.25 3 9.75c0-1.403 1.03-2.583 2.378-2.91a.75.75 0 01.82.289 2.248 2.248 0 004.304 0 .75.75 0 01.82-.29C12.47 7.167 13.5 8.347 13.5 9.75c0 2.025-1.628 5.05-3.688 8.445a.75.75 0 01-.562.555H7.493zM12.372 3.06a2.25 2.25 0 013.256 0l1.013.985 1.12-1.12a2.25 2.25 0 013.182 3.182l-1.12 1.12.985 1.013a2.25 2.25 0 010 3.256l-.985 1.014-1.12 1.12a2.25 2.25 0 01-3.182-3.182l1.12-1.12-1.013-.985a2.25 2.25 0 010-3.256l1.013-.985-1.12-1.12a2.25 2.25 0 01-3.182-3.182z" />
    </svg>
);

export const ChatBubbleOvalLeftIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M4.804 21.644A6.707 6.707 0 006 21.75a6.721 6.721 0 003.583-1.029c.774.182 1.584.279 2.417.279 5.352 0 9.75-3.694 9.75-8.25s-4.398-8.25-9.75-8.25T3 6.194 3 12.544c0 1.838.784 3.55 2.072 4.898a6.707 6.707 0 00-.968 1.498.75.75 0 00.3 1.025c.39.23 1.12.653 1.398.825z" clipRule="evenodd" />
    </svg>
);

export const StarIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.007z" clipRule="evenodd" />
    </svg>
);

export const CurrencyDollarIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path
      d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"
    />
    <path
      fillRule="evenodd"
      d="M1.5 4.5a3 3 0 013-3h15a3 3 0 013 3v15a3 3 0 01-3-3h-15a3 3 0 01-3-3V4.5zM3 16.5v-12a1.5 1.5 0 011.5-1.5h15a1.5 1.5 0 011.5 1.5v12a1.5 1.5 0 01-1.5-1.5h-15a1.5 1.5 0 01-1.5-1.5zM12 9.75a.75.75 0 01.75-.75H15a.75.75 0 010 1.5h-2.25a.75.75 0 01-.75-.75zM9 12.75a.75.75 0 000 1.5h3.75a.75.75 0 000-1.5H9z"
      clipRule="evenodd"
    />
  </svg>
);

export const ArrowLeftIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z"
      clipRule="evenodd"
    />
  </svg>
);

export const TrendingUpIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path
      d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 1.85.53 3.555 1.448 5.005.342 1.24 1.519 1.905 2.66 1.905H6.44l4.5 4.5c.944.945 2.56.276 2.56-1.06V4.06z"
    />
    <path
      d="M17.25 7.5a.75.75 0 00-1.5 0v4.569l-1.94-1.94a.75.75 0 10-1.06 1.061l3.25 3.25a.75.75 0 001.06 0l3.25-3.25a.75.75 0 10-1.06-1.06l-1.94 1.939V7.5z"
    />
  </svg>
);

export const CheckCircleIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.06 0l4.25-5.95z"
      clipRule="evenodd"
    />
  </svg>
);