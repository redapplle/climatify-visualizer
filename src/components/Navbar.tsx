import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ThermometerSun, BarChart, Heart, Menu, X } from 'lucide-react';
import { useWeather } from '../context/WeatherContext';
import { Button } from '@/components/ui/button';

const Navbar: React.FC = () => {
  const { unit, toggleUnit } = useWeather();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  
  // Create a new style element to inject custom CSS that won't be affected by Tailwind
  React.useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      .mobile-menu-overlay {
        position: fixed;
        top: 57px;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #e6f0ff !important;
        z-index: 50;
        overflow-y: auto;
      }
      
      .mobile-menu-link {
        display: block;
        padding: 12px;
        margin-bottom: 8px;
        border-radius: 8px;
        font-weight: 500;
        color: #1f2937;
      }
      
      .mobile-menu-link.active {
        background-color: rgba(59, 130, 246, 0.1);
        color: #3b82f6;
      }
      
      .mobile-menu-divider {
        border-top: 1px solid #d1d5db;
        margin: 16px 0;
        padding-top: 16px;
      }
    `;
    document.head.appendChild(styleElement);
    
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);
  
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
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div id="mobile-menu-container" className="mobile-menu-overlay">
          <div className="container mx-auto p-4">
            <div>
              <a 
                href="/"
                className={`mobile-menu-link ${location.pathname === '/' ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  setIsMenuOpen(false);
                  window.location.href = '/';
                }}
              >
                Home
              </a>
              <a 
                href="/compare"
                className={`mobile-menu-link ${location.pathname === '/compare' ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  setIsMenuOpen(false);
                  window.location.href = '/compare';
                }}
              >
                Compare
              </a>
              <a 
                href="/favorites"
                className={`mobile-menu-link ${location.pathname === '/favorites' ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  setIsMenuOpen(false);
                  window.location.href = '/favorites';
                }}
              >
                Favorites
              </a>
              
              <div className="mobile-menu-divider">
                <button 
                  onClick={() => {
                    toggleUnit();
                    setIsMenuOpen(false);
                  }}
                  className="w-full py-2 px-4 bg-white border border-gray-300 rounded-md text-center"
                >
                  Switch to {unit === 'metric' ? 'Fahrenheit (°F)' : 'Celsius (°C)'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
