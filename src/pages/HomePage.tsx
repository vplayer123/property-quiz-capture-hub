
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Search, MapPin } from 'lucide-react';
import heroBg from '@/assets/hero-bg.jpg';

interface AddressSuggestion {
  display_name: string;
  lat: string;
  lon: string;
}

const HomePage = () => {
  const [address, setAddress] = useState('');
  const [addressSuggestions, setAddressSuggestions] = useState<AddressSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout>();
  const navigate = useNavigate();

  const searchAddresses = async (query: string) => {
    if (query.length < 3) {
      setAddressSuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=5&q=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      setAddressSuggestions(data);
    } catch (error) {
      console.error('Error fetching address suggestions:', error);
      setAddressSuggestions([]);
    }
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAddress(value);
    
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    
    searchTimeoutRef.current = setTimeout(() => {
      searchAddresses(value);
      setShowSuggestions(true);
    }, 300);
  };

  const handleSuggestionClick = (suggestion: AddressSuggestion) => {
    setAddress(suggestion.display_name);
    setShowSuggestions(false);
    setAddressSuggestions([]);
  };

  const handleNext = () => {
    if (address.trim()) {
      localStorage.setItem('quizData', JSON.stringify({ address }));
      navigate('/quiz/property-type');
    }
  };

  useEffect(() => {
    const handleClickOutside = () => {
      setShowSuggestions(false);
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-hero" />
      </div>
      
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-2xl lg:max-w-[50%]">
          <Card className="shadow-elegant backdrop-blur-sm bg-gradient-card border-white/20">
            <CardContent className="p-8 lg:p-12">
              <div className="space-y-8">
                <div className="text-center space-y-6">
                  <h1 className="text-4xl lg:text-5xl font-display font-semibold text-card-foreground">
                    Find Your Perfect Property Match
                  </h1>
                  <p className="text-xl lg:text-2xl text-muted-foreground">
                    Take our quick quiz to discover properties tailored to your needs
                  </p>
                </div>
                
                <div className="space-y-6">
                  <Label htmlFor="address" className="text-lg font-medium block">
                    Enter Address or Area
                  </Label>
                  <div className="flex gap-4 relative">
                    <div className="relative flex-1">
                      <Search className="absolute left-4 top-4 h-6 w-6 text-muted-foreground" />
                      <Input
                        id="address"
                        placeholder="e.g., New York, NY or 123 Main St"
                        className="pl-12 h-14 text-lg"
                        value={address}
                        onChange={handleAddressChange}
                        onFocus={() => setShowSuggestions(addressSuggestions.length > 0)}
                      />
                      
                      {showSuggestions && addressSuggestions.length > 0 && (
                        <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-card border border-border rounded-md shadow-card max-h-60 overflow-y-auto">
                          {addressSuggestions.map((suggestion, index) => (
                            <button
                              key={index}
                              onClick={() => handleSuggestionClick(suggestion)}
                              className="w-full text-left px-4 py-3 hover:bg-accent text-sm border-b border-border last:border-b-0 flex items-center gap-2"
                            >
                              <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                              <span className="truncate">{suggestion.display_name}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    <Button
                      onClick={handleNext}
                      disabled={!address.trim()}
                      className="px-8 h-14 text-lg bg-gradient-primary hover:bg-primary-hover"
                    >
                      Start Quiz
                    </Button>
                  </div>
                  <p className="text-base text-muted-foreground">
                    We'll show you properties in this area
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
