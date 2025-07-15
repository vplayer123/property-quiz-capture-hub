import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Search, MapPin, Home, Building, TrendingUp, Bath, Square, Wifi, Car, Dumbbell, Utensils } from 'lucide-react';
import heroBg from '@/assets/hero-bg.jpg';
import PropertyMap from './PropertyMap';

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

const QuizInterface = () => {
  const [currentStep, setCurrentStep] = useState(0);
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

  const handleSubmit = () => {
    console.log('Quiz submitted:', quizData);
    // Here you would integrate with your PHP backend
    alert('Thank you! Your submission has been received.');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-display font-semibold text-card-foreground">
                Find Your Perfect Property
              </h2>
              <p className="text-lg text-muted-foreground">
                Start by entering your desired location
              </p>
            </div>
            
            <div className="space-y-4">
              <Label htmlFor="address" className="text-base font-medium">
                Enter Address or Area
              </Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  id="address"
                  placeholder="e.g., New York, NY or 123 Main St"
                  className="pl-10 h-12 text-base"
                  value={quizData.address}
                  onChange={(e) => setQuizData({...quizData, address: e.target.value})}
                />
              </div>
              <p className="text-sm text-muted-foreground">
                We'll show you properties in this area
              </p>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-display font-semibold text-card-foreground">
                What are you looking to do?
              </h2>
              <p className="text-lg text-muted-foreground">
                Choose your property goal
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { id: 'rent', label: 'Rent', icon: Home, color: 'bg-blue-50 border-blue-200' },
                { id: 'buy', label: 'Buy', icon: Building, color: 'bg-green-50 border-green-200' },
                { id: 'sell', label: 'Sell', icon: TrendingUp, color: 'bg-orange-50 border-orange-200' }
              ].map((option) => (
                <button
                  key={option.id}
                  onClick={() => setQuizData({...quizData, propertyType: option.id as 'rent' | 'buy' | 'sell'})}
                  className={`p-6 rounded-lg border-2 transition-all hover:shadow-card ${
                    quizData.propertyType === option.id 
                      ? 'border-primary bg-primary/5' 
                      : `${option.color} hover:border-primary/50`
                  }`}
                >
                  <div className="flex flex-col items-center space-y-3">
                    <option.icon className="h-8 w-8 text-primary" />
                    <span className="text-lg font-medium">{option.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-display font-semibold text-card-foreground">
                Budget & Requirements
              </h2>
              <p className="text-lg text-muted-foreground">
                Tell us about your preferences
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="budget" className="text-base font-medium">
                    Budget Range
                  </Label>
                  <select
                    id="budget"
                    value={quizData.budget}
                    onChange={(e) => setQuizData({...quizData, budget: e.target.value})}
                    className="w-full h-12 px-3 border border-input rounded-md bg-background"
                  >
                    <option value="">Select budget range</option>
                    <option value="under-100k">Under $100,000</option>
                    <option value="100k-300k">$100,000 - $300,000</option>
                    <option value="300k-500k">$300,000 - $500,000</option>
                    <option value="500k-1m">$500,000 - $1,000,000</option>
                    <option value="over-1m">Over $1,000,000</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="propertySize" className="text-base font-medium">
                    Property Size
                  </Label>
                  <select
                    id="propertySize"
                    value={quizData.propertySize}
                    onChange={(e) => setQuizData({...quizData, propertySize: e.target.value})}
                    className="w-full h-12 px-3 border border-input rounded-md bg-background"
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
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bedrooms" className="text-base font-medium">
                    Number of Bedrooms
                  </Label>
                  <select
                    id="bedrooms"
                    value={quizData.bedrooms}
                    onChange={(e) => setQuizData({...quizData, bedrooms: e.target.value})}
                    className="w-full h-12 px-3 border border-input rounded-md bg-background"
                  >
                    <option value="">Select bedrooms</option>
                    <option value="1">1 Bedroom</option>
                    <option value="2">2 Bedrooms</option>
                    <option value="3">3 Bedrooms</option>
                    <option value="4">4 Bedrooms</option>
                    <option value="5+">5+ Bedrooms</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bathrooms" className="text-base font-medium">
                    Number of Bathrooms
                  </Label>
                  <select
                    id="bathrooms"
                    value={quizData.bathrooms}
                    onChange={(e) => setQuizData({...quizData, bathrooms: e.target.value})}
                    className="w-full h-12 px-3 border border-input rounded-md bg-background"
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
              
              <div className="space-y-4">
                <Label className="text-base font-medium">
                  Preferred Amenities
                </Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    { id: 'parking', label: 'Parking', icon: Car },
                    { id: 'gym', label: 'Gym/Fitness', icon: Dumbbell },
                    { id: 'kitchen', label: 'Modern Kitchen', icon: Utensils },
                    { id: 'wifi', label: 'High-Speed Internet', icon: Wifi },
                    { id: 'balcony', label: 'Balcony/Patio', icon: Square },
                    { id: 'laundry', label: 'In-Unit Laundry', icon: Bath }
                  ].map((amenity) => (
                    <button
                      key={amenity.id}
                      onClick={() => {
                        const newAmenities = quizData.amenities.includes(amenity.id)
                          ? quizData.amenities.filter(a => a !== amenity.id)
                          : [...quizData.amenities, amenity.id];
                        setQuizData({...quizData, amenities: newAmenities});
                      }}
                      className={`p-3 rounded-lg border-2 transition-all hover:shadow-card ${
                        quizData.amenities.includes(amenity.id)
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="flex flex-col items-center space-y-2">
                        <amenity.icon className="h-5 w-5 text-primary" />
                        <span className="text-sm font-medium">{amenity.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-display font-semibold text-card-foreground">
                Timeline
              </h2>
              <p className="text-lg text-muted-foreground">
                When are you looking to move?
              </p>
            </div>
            
            <div className="space-y-4">
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
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all hover:shadow-card ${
                    quizData.timeline === option.id 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <span className="text-base font-medium">{option.label}</span>
                </button>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="text-center lg:text-left space-y-4">
                <h2 className="text-3xl font-display font-semibold text-card-foreground">
                  Contact Information
                </h2>
                <p className="text-lg text-muted-foreground">
                  Get personalized property recommendations
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-base font-medium">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="Enter your name"
                    className="h-12 text-base"
                    value={quizData.contact.name}
                    onChange={(e) => setQuizData({
                      ...quizData, 
                      contact: {...quizData.contact, name: e.target.value}
                    })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-base font-medium">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="h-12 text-base"
                    value={quizData.contact.email}
                    onChange={(e) => setQuizData({
                      ...quizData, 
                      contact: {...quizData.contact, email: e.target.value}
                    })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-base font-medium">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    className="h-12 text-base"
                    value={quizData.contact.phone}
                    onChange={(e) => setQuizData({
                      ...quizData, 
                      contact: {...quizData.contact, phone: e.target.value}
                    })}
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="text-center lg:text-left">
                <h3 className="text-xl font-display font-semibold text-card-foreground mb-2">
                  Property Location
                </h3>
                <p className="text-muted-foreground">
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
        <div className="w-full max-w-2xl">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <span className={`text-sm font-medium ${currentStep === 0 ? 'text-white/90' : 'text-foreground'}`}>
                Step {currentStep + 1} of {steps.length}
              </span>
              <span className={`text-sm font-medium ${currentStep === 0 ? 'text-white/90' : 'text-foreground'}`}>
                {Math.round(((currentStep + 1) / steps.length) * 100)}%
              </span>
            </div>
            <div className={`w-full rounded-full h-2 ${currentStep === 0 ? 'bg-white/20' : 'bg-muted'}`}>
              <div 
                className="bg-secondary h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Quiz Card */}
          <Card className={`shadow-elegant backdrop-blur-sm ${
            currentStep === 0 
              ? 'bg-gradient-card border-white/20' 
              : 'bg-card border-border'
          }`}>
            <CardContent className="p-8">
              {renderStep()}
              
              {/* Navigation Buttons */}
              <div className="flex justify-between items-center mt-8 pt-6 border-t border-border">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={currentStep === 0}
                  className="px-6"
                >
                  Back
                </Button>
                
                <div className="flex space-x-2">
                  {steps.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentStep
                          ? 'bg-primary'
                          : index < currentStep
                          ? 'bg-secondary'
                          : 'bg-muted'
                      }`}
                    />
                  ))}
                </div>
                
                {currentStep === steps.length - 1 ? (
                  <Button
                    onClick={handleSubmit}
                    className="px-6 bg-gradient-primary hover:bg-primary-hover"
                  >
                    Submit
                  </Button>
                ) : (
                  <Button
                    onClick={handleNext}
                    className="px-6 bg-gradient-primary hover:bg-primary-hover"
                  >
                    Next
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default QuizInterface;