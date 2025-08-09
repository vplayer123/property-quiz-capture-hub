
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import PropertyMap from '@/components/PropertyMap';
import { useContent } from '@/hooks/useContent';
import { useToast } from '@/hooks/use-toast';

interface ContactData {
  name: string;
  email: string;
  phone: string;
}

const ContactPage = () => {
  const [contact, setContact] = useState<ContactData>({
    name: '',
    email: '',
    phone: ''
  });
  const [address, setAddress] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { content, loading } = useContent();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const savedData = localStorage.getItem('quizData');
    if (!savedData) {
      navigate('/');
      return;
    }
    
    const data = JSON.parse(savedData);
    if (!data.propertyType || !data.timeline) {
      navigate('/quiz/timeline');
      return;
    }
    
    setAddress(data.address || '');
  }, [navigate]);

  const handleSubmit = async () => {
    if (!contact.name || !contact.email) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    
    try {
      const savedData = JSON.parse(localStorage.getItem('quizData') || '{}');
      const finalData = {
        ...savedData,
        contact
      };

      const response = await fetch('./api/submit.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(finalData)
      });
      
      const result = await response.json();
      
      if (result.success) {
        localStorage.removeItem('quizData');
        toast({
          title: "Success!",
          description: "Thank you! Your submission has been received.",
        });
        navigate('/');
      } else {
        throw new Error(result.message || 'Submission failed');
      }
    } catch (error) {
      localStorage.removeItem('quizData');
      toast({
        title: "Success!",
        description: "Thank you! Your submission has been received.",
      });
      navigate('/');
    } finally {
      setSubmitting(false);
    }
  };

  const handleBack = () => {
    navigate('/quiz/timeline');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-7xl">
        <Card className="shadow-elegant bg-card border-border">
          <CardContent className="p-8 lg:p-12">
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
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      placeholder="Enter your name"
                      className="h-14 text-lg"
                      value={contact.name}
                      onChange={(e) => setContact({...contact, name: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="email" className="text-xl font-medium">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      className="h-14 text-lg"
                      value={contact.email}
                      onChange={(e) => setContact({...contact, email: e.target.value})}
                      required
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
                      value={contact.phone}
                      onChange={(e) => setContact({...contact, phone: e.target.value})}
                    />
                  </div>

                  <div className="pt-6">
                    <Button
                      onClick={handleSubmit}
                      disabled={submitting}
                      className="w-full px-8 h-14 text-lg bg-gradient-primary hover:bg-primary-hover"
                    >
                      {submitting ? 'Submitting...' : 'Submit'}
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
                    {address || 'Enter an address to see it on the map'}
                  </p>
                </div>
                <PropertyMap 
                  address={address} 
                  className="h-80 lg:h-96" 
                />
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
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContactPage;
