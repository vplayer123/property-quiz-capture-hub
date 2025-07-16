
import { useState, useEffect } from 'react';

interface ContentData {
  step1_title: string;
  step1_subtitle: string;
  step2_title: string;
  step2_subtitle: string;
  step3_title: string;
  step3_subtitle: string;
  step4_title: string;
  step4_subtitle: string;
  step5_title: string;
  step5_subtitle: string;
}

const defaultContent: ContentData = {
  step1_title: 'Find Your Perfect Property',
  step1_subtitle: 'Start by entering your desired location',
  step2_title: 'What are you looking to do?',
  step2_subtitle: 'Choose your property goal',
  step3_title: 'Budget & Requirements',
  step3_subtitle: 'Tell us about your preferences',
  step4_title: 'Timeline',
  step4_subtitle: 'When are you looking to move?',
  step5_title: 'Contact Information',
  step5_subtitle: 'Get personalized property recommendations'
};

export const useContent = () => {
  const [content, setContent] = useState<ContentData>(defaultContent);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch('./api/get-content.php');
        const data = await response.json();
        
        if (data.success && data.content) {
          setContent({ ...defaultContent, ...data.content });
        }
      } catch (error) {
        console.log('Using default content - backend not available');
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  return { content, loading };
};
