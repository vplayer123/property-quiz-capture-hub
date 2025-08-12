
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const TimelinePage = () => {
  const [timeline, setTimeline] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const savedData = localStorage.getItem('quizData');
    if (!savedData) {
      navigate('/');
      return;
    }
    
    const data = JSON.parse(savedData);
    if (!data.propertyType || !data.budget) {
      navigate('/quiz/requirements');
      return;
    }
  }, [navigate]);

  const handleNext = () => {
    if (timeline) {
      const savedData = JSON.parse(localStorage.getItem('quizData') || '{}');
      localStorage.setItem('quizData', JSON.stringify({ ...savedData, timeline }));
      navigate('/quiz/contact');
    }
  };

  const handleBack = () => {
    navigate('/quiz/requirements');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-4xl lg:max-w-[75%]">
        <Card className="shadow-elegant bg-card border-border">
          <CardContent className="p-8 lg:p-12">
            <div className="space-y-8">
              <div className="text-center space-y-6">
                <h2 className="text-5xl font-display font-semibold text-card-foreground">
                  Timeline
                </h2>
                <p className="text-2xl text-muted-foreground">
                  When are you looking to move?
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
                    onClick={() => setTimeline(option.id)}
                    className={`w-full p-6 text-left rounded-lg border-2 transition-all hover:shadow-card ${
                      timeline === option.id 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <span className="text-xl font-medium">{option.label}</span>
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
                disabled={!timeline}
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

export default TimelinePage;
