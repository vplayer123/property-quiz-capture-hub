
import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface PropertyMapProps {
  address: string;
  className?: string;
}

const PropertyMap = ({ address, className }: PropertyMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Simple map placeholder with address geocoding simulation
    const initMap = async () => {
      try {
        // For demonstration, we'll create a simple map placeholder
        // In a real implementation, you'd use Google Maps, Leaflet, or similar
        if (mapRef.current) {
          mapRef.current.innerHTML = `
            <div class="w-full h-full bg-slate-100 rounded-lg flex items-center justify-center relative overflow-hidden">
              <div class="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 opacity-20"></div>
              <div class="text-center z-10 p-4">
                <div class="w-8 h-8 bg-red-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                  <div class="w-3 h-3 bg-white rounded-full"></div>
                </div>
                <p class="text-sm font-medium text-slate-700">Map View</p>
                <p class="text-xs text-slate-500 mt-1">${address || 'Location'}</p>
              </div>
            </div>
          `;
        }
      } catch (error) {
        console.error('Error loading map:', error);
      }
    };

    initMap();
  }, [address]);

  return (
    <div 
      ref={mapRef}
      className={cn("w-full h-64 bg-slate-100 rounded-lg", className)}
    />
  );
};

export default PropertyMap;
