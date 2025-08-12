
// EmailJS Configuration
// Replace these values with your EmailJS credentials
export const EMAIL_CONFIG = {
  SERVICE_ID: 'your_service_id', // Replace with your EmailJS service ID
  TEMPLATE_ID: 'your_template_id', // Replace with your EmailJS template ID
  PUBLIC_KEY: 'your_public_key', // Replace with your EmailJS public key
  ADMIN_EMAIL: 'admin@yourdomain.com' // Replace with your admin email
};

// Email template for quiz results
export const formatQuizEmail = (quizData: any) => {
  const propertyTypeLabel = {
    rent: 'Rent',
    buy: 'Buy',
    sell: 'Sell'
  }[quizData.propertyType] || quizData.propertyType;

  return {
    to_email: EMAIL_CONFIG.ADMIN_EMAIL,
    subject: `New Property Quiz Submission - ${propertyTypeLabel}`,
    message: `
New Property Quiz Submission

Contact Information:
- Name: ${quizData.contact?.name || 'Not provided'}
- Email: ${quizData.contact?.email || 'Not provided'}
- Phone: ${quizData.contact?.phone || 'Not provided'}

Property Details:
- Address/Area: ${quizData.address || 'Not provided'}
- Property Type: ${propertyTypeLabel}
- Budget: ${quizData.budget || 'Not specified'}
- Bedrooms: ${quizData.bedrooms || 'Not specified'}
- Bathrooms: ${quizData.bathrooms || 'Not specified'}
- Property Size: ${quizData.propertySize || 'Not specified'}
- Timeline: ${quizData.timeline || 'Not specified'}

Submitted at: ${new Date().toLocaleString()}
    `.trim()
  };
};
