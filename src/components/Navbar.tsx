import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ThermometerSun, BarChart, Heart, Menu, X } from 'lucide-react';
import { useWeather } from '../context/WeatherContext';
import { Button } from '@/components/ui/button';

const Navbar: React.FC = () => {
  const { unit, toggleUnit } = useWeather();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  
  return (
    <header className="sticky top-0 z-50 backdrop-blur-lg bg-background/80 border-b border-border/40 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <nav className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <ThermometerSun className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg text-foreground">Climatify</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname === '/' ? 'text-primary' : 'text-foreground/80'}`}
            >
              Home
            </Link>
            <Link 
              to="/compare" 
              className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname === '/compare' ? 'text-primary' : 'text-foreground/80'}`}
            >
              Compare
            </Link>
            <Link 
              to="/favorites" 
              className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname === '/favorites' ? 'text-primary' : 'text-foreground/80'}`}
            >
              Favorites
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={toggleUnit}
              className="hidden md:flex"
            >
              {unit === 'metric' ? '°C' : '°F'}
            </Button>
            
            <button 
              className="md:hidden p-2 rounded-full hover:bg-muted transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </div>
      
      {/* Mobile Menu with Background Overlay */}
      {isMenuOpen && (
        <>
          {/* Solid background layer */}
          <div 
            className="md:hidden fixed inset-0 z-40"
            style={{
              top: '57px',
              backgroundColor: '#e6f0ff',
              opacity: 1
            }}
          ></div>
          
          {/* Content layer */}
          <div 
            className="md:hidden fixed inset-0 z-50"
            style={{top: '57px'}}
          >
            <div className="container mx-auto p-4">
              <div className="flex flex-col space-y-4">
                <Link 
                  to="/" 
                  className={`p-3 rounded-lg font-medium ${location.pathname === '/' ? 'bg-primary/10 text-primary' : 'text-gray-800'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  to="/compare" 
                  className={`p-3 rounded-lg font-medium ${location.pathname === '/compare' ? 'bg-primary/10 text-primary' : 'text-gray-800'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Compare
                </Link>
                <Link 
                  to="/favorites" 
                  className={`p-3 rounded-lg font-medium ${location.pathname === '/favorites' ? 'bg-primary/10 text-primary' : 'text-gray-800'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Favorites
                </Link>
                
                <div className="border-t border-gray-300 pt-4">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      toggleUnit();
                      setIsMenuOpen(false);
                    }}
                    className="w-full justify-center"
                  >
                    Switch to {unit === 'metric' ? 'Fahrenheit (°F)' : 'Celsius (°C)'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default Navbar;
