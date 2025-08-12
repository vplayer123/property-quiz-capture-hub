
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

interface QuizData {
  address: string;
  propertyType: 'rent' | 'buy' | 'sell';
  budget: string;
  bedrooms: string;
  bathrooms: string;
  propertySize: string;
}

const RequirementsPage = () => {
  const [quizData, setQuizData] = useState<QuizData>({
    address: '',
    propertyType: 'rent',
    budget: '',
    bedrooms: '',
    bathrooms: '',
    propertySize: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const savedData = localStorage.getItem('quizData');
    if (!savedData) {
      navigate('/');
      return;
    }
    
    const data = JSON.parse(savedData);
    if (!data.propertyType) {
      navigate('/quiz/property-type');
      return;
    }
    
    setQuizData({ ...quizData, ...data });
  }, [navigate]);

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

  const handleNext = () => {
    localStorage.setItem('quizData', JSON.stringify(quizData));
    navigate('/quiz/timeline');
  };

  const handleBack = () => {
    navigate('/quiz/property-type');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-4xl lg:max-w-[75%]">
        <Card className="shadow-elegant bg-card border-border">
          <CardContent className="p-8 lg:p-12">
            <div className="space-y-8">
              <div className="text-center space-y-6">
                <h2 className="text-5xl font-display font-semibold text-card-foreground">
                  Budget & Requirements
                </h2>
                <p className="text-2xl text-muted-foreground">
                  Tell us about your preferences
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

export default RequirementsPage;
