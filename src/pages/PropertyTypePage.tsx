
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Home, Building, TrendingUp } from 'lucide-react';

const PropertyTypePage = () => {
  const [propertyType, setPropertyType] = useState<'rent' | 'buy' | 'sell' | ''>('');
  const navigate = useNavigate();

  useEffect(() => {
    const savedData = localStorage.getItem('quizData');
    if (!savedData) {
      navigate('/');
    }
  }, [navigate]);

  const handleNext = () => {
    if (propertyType) {
      const savedData = JSON.parse(localStorage.getItem('quizData') || '{}');
      localStorage.setItem('quizData', JSON.stringify({ ...savedData, propertyType }));
      navigate('/quiz/requirements');
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-4xl lg:max-w-[75%]">
        <Card className="shadow-elegant bg-card border-border">
          <CardContent className="p-8 lg:p-12">
            <div className="space-y-8">
              <div className="text-center space-y-6">
                <h2 className="text-5xl font-display font-semibold text-card-foreground">
                  What are you looking to do?
                </h2>
                <p className="text-2xl text-muted-foreground">
                  Choose your property goal
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { 
                    id: 'rent', 
                    label: 'Rent', 
                    icon: Home, 
                    color: 'bg-orange-50 border-orange-200 hover:border-orange-400',
                    iconColor: 'text-orange-600',
                    selectedBg: 'border-orange-600 bg-orange-50'
                  },
                  { 
                    id: 'buy', 
                    label: 'Buy', 
                    icon: Building, 
                    color: 'bg-blue-50 border-blue-200 hover:border-blue-400',
                    iconColor: 'text-blue-600',
                    selectedBg: 'border-blue-600 bg-blue-50'
                  },
                  { 
                    id: 'sell', 
                    label: 'Sell', 
                    icon: TrendingUp, 
                    color: 'bg-green-50 border-green-200 hover:border-green-400',
                    iconColor: 'text-green-600',
                    selectedBg: 'border-green-600 bg-green-50'
                  }
                ].map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setPropertyType(option.id as 'rent' | 'buy' | 'sell')}
                    className={`p-8 rounded-lg border-2 transition-all hover:shadow-card ${
                      propertyType === option.id 
                        ? option.selectedBg
                        : option.color
                    }`}
                  >
                    <div className="flex flex-col items-center space-y-4">
                      <option.icon className={`h-12 w-12 ${option.iconColor}`} />
                      <span className="text-2xl font-medium">{option.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center mt-12 pt-8 border-t border-border">
              <Button
                variant="outline"
                onClick={handleBack}
                className="px-8 h-12 text-lg"
              >
                Back
              </Button>
              
              <Button
                onClick={handleNext}
                disabled={!propertyType}
                className="px-8 h-12 text-lg bg-gradient-primary hover:bg-primary-hover"
              >
                Next
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PropertyTypePage;
