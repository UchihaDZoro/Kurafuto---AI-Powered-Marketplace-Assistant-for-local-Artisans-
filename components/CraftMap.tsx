
import React, { useState, useEffect } from 'react';
import { type CraftCluster, type Artisan } from '../types';
import * as dbService from '../services/dbService';
import { MapPinIcon } from './Icon';

interface CraftMapProps {
  onArtisanSelect: (artisan: Artisan) => void;
}

const CraftMap: React.FC<CraftMapProps> = ({ onArtisanSelect }) => {
  const [selectedCluster, setSelectedCluster] = useState<CraftCluster | null>(null);
  const [craftClusters, setCraftClusters] = useState<CraftCluster[]>([]);

  useEffect(() => {
    setCraftClusters(dbService.getCraftClusters());
  }, []);


  const handlePinClick = (cluster: CraftCluster) => {
    setSelectedCluster(cluster);
  };

  return (
    <div className="w-full h-full bg-blue-50 dark:bg-gray-800/20 flex flex-col lg:flex-row items-center justify-center p-4 relative overflow-hidden rounded-lg">
      {/* Map Area */}
      <div className="relative w-full max-w-2xl aspect-[4/5] bg-contain bg-center bg-no-repeat dark:brightness-90" style={{ backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/2/29/India-map-en.svg')" }}>
        {craftClusters.map((cluster) => (
          <button
            key={cluster.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 group"
            style={{ top: cluster.position.top, left: cluster.position.left }}
            onClick={() => handlePinClick(cluster)}
            aria-label={`Show artisans from ${cluster.name}`}
          >
            <MapPinIcon className={`w-8 h-8 text-google-red transition-transform duration-300 group-hover:scale-125 ${selectedCluster?.id === cluster.id ? 'text-google-blue scale-125' : ''}`} />
            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-3 py-1 bg-gray-800 dark:bg-gray-900 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {cluster.name}
            </span>
          </button>
        ))}
      </div>

      {/* Side Panel for Selected Cluster */}
      <div className={`
        absolute top-0 right-0 h-full w-full max-w-md bg-white dark:bg-gray-800 shadow-2xl dark:shadow-none dark:border-l dark:border-gray-700
        transform transition-transform duration-500 ease-in-out z-20 p-6 overflow-y-auto
        ${selectedCluster ? 'translate-x-0' : 'translate-x-full'}
      `}>
        {selectedCluster && (
          <div>
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-3xl font-bold font-sans text-gray-800 dark:text-gray-100">{selectedCluster.name}</h2>
                <p className="text-gray-500 dark:text-gray-400">{selectedCluster.region}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedCluster.crafts.map(craft => (
                     <span key={craft} className="px-2 py-1 bg-green-100 text-google-green dark:bg-green-900/50 dark:text-green-300 text-xs font-semibold rounded-full">{craft}</span>
                  ))}
                </div>
              </div>
              <button onClick={() => setSelectedCluster(null)} className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-100 text-3xl leading-none">&times;</button>
            </div>
            
            <div className="mt-6">
              {selectedCluster.artisans.length > 0 ? (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold font-sans text-gray-700 dark:text-gray-300">Featured Artisans</h3>
                  {selectedCluster.artisans.map(artisan => (
                    <div key={artisan.id} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                         <img src={artisan.profileImageUrl} alt={artisan.name} className="w-14 h-14 rounded-full object-cover" />
                        <div>
                          <h4 className="font-bold font-sans dark:text-white">{artisan.name}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{artisan.craft}</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => { onArtisanSelect(artisan); setSelectedCluster(null); }}
                        className="text-center bg-google-blue text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition-all duration-300 transform hover:-translate-y-0.5"
                      >
                        Visit
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500 dark:text-gray-400 mt-10">No featured artisans in this cluster yet. Check back soon!</p>
              )}
            </div>
          </div>
        )}
      </div>
      {!selectedCluster && (
          <div className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:relative lg:top-auto lg:left-auto lg:transform-none p-6 text-center lg:text-left max-w-sm">
             <h2 className="text-3xl font-bold font-sans text-gray-700 dark:text-gray-200">Interactive Craft Map</h2>
             <p className="mt-2 text-gray-600 dark:text-gray-400">Click on a pin to discover artisan clusters across India.</p>
          </div>
      )}
    </div>
  );
};

export default CraftMap;
