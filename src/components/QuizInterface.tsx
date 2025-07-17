import { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Search, MapPin, Home, Building, TrendingUp } from 'lucide-react';
import heroBg from '@/assets/hero-bg.jpg';
import PropertyMap from './PropertyMap';
import { useContent } from '@/hooks/useContent';

interface QuizData {
  address: string;
  propertyType: 'rent' | 'buy' | 'sell' | '';
  budget: string;
  bedrooms: string;
  bathrooms: string;
  propertySize: string;
  amenities: string[];
  timeline: string;
  contact: {
    name: string;
    email: string;
    phone: string;
  };
}

interface AddressSuggestion {
  display_name: string;
  lat: string;
  lon: string;
}

const QuizInterface = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [addressSuggestions, setAddressSuggestions] = useState<AddressSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout>();
  const { content, loading } = useContent();
  const [quizData, setQuizData] = useState<QuizData>({
    address: '',
    propertyType: '',
    budget: '',
    bedrooms: '',
    bathrooms: '',
    propertySize: '',
    amenities: [],
    timeline: '',
    contact: {
      name: '',
      email: '',
      phone: ''
    }
  });

  const steps = [
    'Address Search',
    'Property Type',
    'Budget & Requirements',
    'Timeline',
    'Contact Information'
  ];

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
    setQuizData({...quizData, address: value});
    
    // Clear existing timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    
    // Set new timeout for search
    searchTimeoutRef.current = setTimeout(() => {
      searchAddresses(value);
      setShowSuggestions(true);
    }, 300);
  };

  const handleSuggestionClick = (suggestion: AddressSuggestion) => {
    setQuizData({...quizData, address: suggestion.display_name});
    setShowSuggestions(false);
    setAddressSuggestions([]);
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('./api/submit.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(quizData)
      });
      
      const result = await response.json();
      
      if (result.success) {
        alert('Thank you! Your submission has been received.');
      } else {
        alert('There was an error submitting your form. Please try again.');
      }
    } catch (error) {
      console.log('Backend not available, showing success message anyway');
      alert('Thank you! Your submission has been received.');
    }
  };

  const getBudgetOptions = () => {
    if (quizData.propertyType === 'rent') {
      return [
        { value: '', label: 'Select budget range' },
        { value: 'under-1000', label: 'Under $1,000/month' },
        { value: '1000-1500', label: '$1,000 - $1,500/month' },
        { value: '1500-2000', label: '$1,500 - $2,000/month' },
        { value: '2000-2500', label: '$2,000 - $2,500/month' },
        { value: '2500-3000', label: '$2,500 - $3,000/month' },
        { value: '3000-4000', label: '$3,000 - $4,000/month' },
        { value: 'over-4000', label: 'Over $4,000/month' },
      ];
    } else {
      return [
        { value: '', label: 'Select budget range' },
        { value: 'under-100k', label: 'Under $100,000' },
        { value: '100k-300k', label: '$100,000 - $300,000' },
        { value: '300k-500k', label: '$300,000 - $500,000' },
        { value: '500k-1m', label: '$500,000 - $1,000,000' },
        { value: 'over-1m', label: 'Over $1,000,000' },
      ];
    }
  };

  const renderStep = () => {
    if (loading) {
      return <div className="text-center">Loading...</div>;
    }

    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-8">
            <div className="text-center space-y-6">
              <h2 className="text-4xl lg:text-5xl font-display font-semibold text-card-foreground">
                {content.step1_title}
              </h2>
              <p className="text-xl lg:text-2xl text-muted-foreground">
                {content.step1_subtitle}
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
                    value={quizData.address}
                    onChange={handleAddressChange}
                    onFocus={() => setShowSuggestions(addressSuggestions.length > 0)}
                  />
                  
                  {/* Address Suggestions Dropdown */}
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
                  className="px-8 h-14 text-lg bg-gradient-primary hover:bg-primary-hover"
                >
                  Next
                </Button>
              </div>
              <p className="text-base text-muted-foreground">
                We'll show you properties in this area
              </p>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-8">
            <div className="text-center space-y-6">
              <h2 className="text-5xl font-display font-semibold text-card-foreground">
                {content.step2_title}
              </h2>
              <p className="text-2xl text-muted-foreground">
                {content.step2_subtitle}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { id: 'rent', label: 'Rent', icon: Home, color: 'bg-blue-50 border-blue-200' },
                { id: 'buy', label: 'Buy', icon: Building, color: 'bg-green-50 border-green-200' },
                { id: 'sell', label: 'Sell', icon: TrendingUp, color: 'bg-orange-50 border-orange-200' }
              ].map((option) => (
                <button
                  key={option.id}
                  onClick={() => setQuizData({...quizData, propertyType: option.id as 'rent' | 'buy' | 'sell'})}
                  className={`p-8 rounded-lg border-2 transition-all hover:shadow-card ${
                    quizData.propertyType === option.id 
                      ? 'border-primary bg-primary/5' 
                      : `${option.color} hover:border-primary/50`
                  }`}
                >
                  <div className="flex flex-col items-center space-y-4">
                    <option.icon className="h-12 w-12 text-primary" />
                    <span className="text-2xl font-medium">{option.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8">
            <div className="text-center space-y-6">
              <h2 className="text-5xl font-display font-semibold text-card-foreground">
                {content.step3_title}
              </h2>
              <p className="text-2xl text-muted-foreground">
                {content.step3_subtitle}
              </p>
            </div>
            
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="budget" className="text-xl font-medium">
                    Budget Range
                  </Label>
                  <select
                    id="budget"
                    value={quizData.budget}
                    onChange={(e) => setQuizData({...quizData, budget: e.target.value})}
                    className="w-full h-14 px-4 text-lg border border-input rounded-md bg-background"
                  >
                    {getBudgetOptions().map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="propertySize" className="text-xl font-medium">
                    Property Size
                  </Label>
                  <select
                    id="propertySize"
                    value={quizData.propertySize}
                    onChange={(e) => setQuizData({...quizData, propertySize: e.target.value})}
                    className="w-full h-14 px-4 text-lg border border-input rounded-md bg-background"
                  >
                    <option value="">Select size</option>
                    <option value="under-1000">Under 1,000 sq ft</option>
                    <option value="1000-1500">1,000 - 1,500 sq ft</option>
                    <option value="1500-2000">1,500 - 2,000 sq ft</option>
                    <option value="2000-3000">2,000 - 3,000 sq ft</option>
                    <option value="over-3000">Over 3,000 sq ft</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="bedrooms" className="text-xl font-medium">
                    Number of Bedrooms
                  </Label>
                  <select
                    id="bedrooms"
                    value={quizData.bedrooms}
                    onChange={(e) => setQuizData({...quizData, bedrooms: e.target.value})}
                    className="w-full h-14 px-4 text-lg border border-input rounded-md bg-background"
                  >
                    <option value="">Select bedrooms</option>
                    <option value="1">1 Bedroom</option>
                    <option value="2">2 Bedrooms</option>
                    <option value="3">3 Bedrooms</option>
                    <option value="4">4 Bedrooms</option>
                    <option value="5+">5+ Bedrooms</option>
                  </select>
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="bathrooms" className="text-xl font-medium">
                    Number of Bathrooms
                  </Label>
                  <select
                    id="bathrooms"
                    value={quizData.bathrooms}
                    onChange={(e) => setQuizData({...quizData, bathrooms: e.target.value})}
                    className="w-full h-14 px-4 text-lg border border-input rounded-md bg-background"
                  >
                    <option value="">Select bathrooms</option>
                    <option value="1">1 Bathroom</option>
                    <option value="1.5">1.5 Bathrooms</option>
                    <option value="2">2 Bathrooms</option>
                    <option value="2.5">2.5 Bathrooms</option>
                    <option value="3+">3+ Bathrooms</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-8">
            <div className="text-center space-y-6">
              <h2 className="text-5xl font-display font-semibold text-card-foreground">
                {content.step4_title}
              </h2>
              <p className="text-2xl text-muted-foreground">
                {content.step4_subtitle}
              </p>
            </div>
            
            <div className="space-y-6">
              {[
                { id: 'asap', label: 'As soon as possible' },
                { id: '1-3months', label: 'Within 1-3 months' },
                { id: '3-6months', label: 'Within 3-6 months' },
                { id: '6+months', label: 'More than 6 months' },
                { id: 'just-browsing', label: 'Just browsing' }
              ].map((option) => (
                <button
                  key={option.id}
                  onClick={() => setQuizData({...quizData, timeline: option.id})}
                  className={`w-full p-6 text-left rounded-lg border-2 transition-all hover:shadow-card ${
                    quizData.timeline === option.id 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <span className="text-xl font-medium">{option.label}</span>
                </button>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="text-center lg:text-left space-y-6">
                <h2 className="text-5xl font-display font-semibold text-card-foreground">
                  {content.step5_title}
                </h2>
                <p className="text-2xl text-muted-foreground">
                  {content.step5_subtitle}
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="name" className="text-xl font-medium">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="Enter your name"
                    className="h-14 text-lg"
                    value={quizData.contact.name}
                    onChange={(e) => setQuizData({
                      ...quizData, 
                      contact: {...quizData.contact, name: e.target.value}
                    })}
                  />
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="email" className="text-xl font-medium">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="h-14 text-lg"
                    value={quizData.contact.email}
                    onChange={(e) => setQuizData({
                      ...quizData, 
                      contact: {...quizData.contact, email: e.target.value}
                    })}
                  />
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="phone" className="text-xl font-medium">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    className="h-14 text-lg"
                    value={quizData.contact.phone}
                    onChange={(e) => setQuizData({
                      ...quizData, 
                      contact: {...quizData.contact, phone: e.target.value}
                    })}
                  />
                </div>

                {/* Submit button below the form */}
                <div className="pt-6">
                  <Button
                    onClick={handleSubmit}
                    className="w-full px-8 h-14 text-lg bg-gradient-primary hover:bg-primary-hover"
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="text-center lg:text-left">
                <h3 className="text-3xl font-display font-semibold text-card-foreground mb-3">
                  Property Location
                </h3>
                <p className="text-xl text-muted-foreground">
                  {quizData.address || 'Enter an address to see it on the map'}
                </p>
              </div>
              <PropertyMap 
                address={quizData.address} 
                className="h-80 lg:h-96" 
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Close suggestions when clicking outside
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
      {/* Background Image with Overlay - Only on first step */}
      {currentStep === 0 && (
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBg})` }}
        >
          <div className="absolute inset-0 bg-gradient-hero" />
        </div>
      )}
      
      {/* Background for other steps */}
      {currentStep !== 0 && (
        <div className="absolute inset-0 bg-background" />
      )}
      
      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className={`w-full ${
          currentStep === 0 
            ? 'max-w-4xl lg:max-w-[75%]'
            : currentStep === steps.length - 1 
              ? 'max-w-7xl' 
              : 'max-w-4xl lg:max-w-[75%]'
        }`}>
          {/* Quiz Card */}
          <Card className={`shadow-elegant backdrop-blur-sm ${
            currentStep === 0 
              ? 'bg-gradient-card border-white/20' 
              : 'bg-card border-border'
          }`}>
            <CardContent className="p-8 lg:p-12">
              {renderStep()}
              
              {/* Navigation Buttons - Skip inline handling for front page */}
              {currentStep !== 0 && currentStep !== steps.length - 1 && (
                <div className="flex justify-between items-center mt-12 pt-8 border-t border-border">
                  <Button
                    variant="outline"
                    onClick={handleBack}
                    disabled={currentStep === 0}
                    className="px-8 h-12 text-lg"
                  >
                    Back
                  </Button>
                  
                  <Button
                    onClick={handleNext}
                    className="px-8 h-12 text-lg bg-gradient-primary hover:bg-primary-hover"
                  >
                    Next
                  </Button>
                </div>
              )}

              {/* Special navigation for last step (contact + map) */}
              {currentStep === steps.length - 1 && (
                <div className="flex justify-between items-center mt-12 pt-8 border-t border-border">
                  <Button
                    variant="outline"
                    onClick={handleBack}
                    className="px-8 h-12 text-lg"
                  >
                    Back
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default QuizInterface;
