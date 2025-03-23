
import React from 'react';
import { MapPin, X } from 'lucide-react';
import { Location } from '../context/WeatherContext';

interface LocationItemProps {
  location: Location;
  onRemove: (id: string) => void;
}

const LocationItem: React.FC<LocationItemProps> = ({ location, onRemove }) => {
  return (
    <div className="flex items-center justify-between px-4 py-2 bg-white/50 dark:bg-black/40 rounded-lg shadow-sm transition-all duration-300 hover:bg-white/60 dark:hover:bg-black/50 hover:shadow">
      <div className="flex items-center">
        <MapPin className="h-4 w-4 text-primary mr-2" />
        <span className="font-medium">{location.name}</span>
        <span className="text-sm text-foreground/70 ml-1">{location.country}</span>
        {location.state && <span className="text-sm text-foreground/70 ml-1">({location.state})</span>}
      </div>
      <button
        onClick={() => onRemove(location.id)}
        className="p-1 rounded-full hover:bg-white/40 dark:hover:bg-black/40 transition-colors"
        aria-label="Remove location"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

export default LocationItem;
