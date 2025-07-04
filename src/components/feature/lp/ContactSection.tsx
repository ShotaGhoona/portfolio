import { useLanguage } from '@/hooks/useLanguage';
import { useEffect, useState } from 'react';
import contactTranslations from '@/data/translations/contact.json';
import { GridOverlay } from '@/components/ui/GridOverlay';
import { SectionTitle } from '@/components/ui/SectionTitle';

export function ContactSection() {
  const { language } = useLanguage();
  const [contactData, setContactData] = useState(contactTranslations[language] || contactTranslations.en);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    messageType: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setContactData(contactTranslations[language] || contactTranslations.en);
  }, [language]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMessage('Please fill in all required fields');
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          messageType: formData.messageType,
          message: formData.message,
          to: 'shota.yamashita@ghoona.com'
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', messageType: '', message: '' });
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.error || 'Failed to send message');
        setSubmitStatus('error');
      }
    } catch (error) {
      setErrorMessage('Network error. Please try again.');
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <section 
      id="contact"
      className="w-full py-24 relative transition-colors duration-200"
      style={{ 
        backgroundColor: 'var(--color-bg-primary)',
        borderTop: `1px solid var(--color-border-secondary)`
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
          <SectionTitle
            sectionNumber="06."
            sectionTitle={contactData.sectionTitle}
            line1={contactData.subtitle.line1}
            line2={contactData.subtitle.line2}
          />
          {/* Contact content */}
          <div className="col-span-1 md:col-span-9 px-4 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {/* Contact info */}
              <div className="space-y-8">
                <div>
                  <div 
                    className="font-mono text-lg font-bold mb-6"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    npx create-next-app@latest<br/>
                    <span 
                      className="font-bold text-xl"
                      style={{ color: 'var(--color-accent-green)' }}>something amazing together.
                    </span>
                  </div>
                  <p 
                    className="font-mono text-sm leading-relaxed"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    {contactData.description}
                  </p>
                </div>
                
                {/* Contact methods */}
                <div className="space-y-6">
                  <div 
                    className="border transition-colors duration-200"
                    style={{ borderColor: 'var(--color-border-primary)' }}
                  >
                    <div 
                      className="px-4 py-2 border-b transition-colors duration-200"
                      style={{ 
                        backgroundColor: 'var(--color-bg-secondary)',
                        borderColor: 'var(--color-border-primary)'
                      }}
                    >
                      <div 
                        className="font-mono text-xs"
                        style={{ color: 'var(--color-text-secondary)' }}
                      >
                        contact.methods
                      </div>
                    </div>
                    <div className="p-4 space-y-3">
                      {[
                        { 
                          method: 'email', 
                          value: 'shota.yamashita@ghoona.com',
                          preferred: true,
                          response: '< 24h'
                        },
                        { 
                          method: 'Instagram', 
                          value: '@____syota_01',
                          preferred: false,
                          response: '< 48h'
                        },
                        { 
                          method: 'github', 
                          value: '/syotaYYY',
                          preferred: false,
                          response: 'async'
                        }
                      ].map((contact, index) => (
                        <div key={index} className="flex flex-col md:flex-row md:items-center md:justify-between gap-1 md:gap-0">
                          <div className="font-mono text-xs">
                            <span style={{ color: 'var(--color-text-tertiary)' }}>{contact.method}:</span>
                            <span 
                              className="ml-2"
                              style={{ color: 'var(--color-text-primary)' }}
                            >{contact.value}</span>
                            {contact.preferred && (
                              <span 
                                className="ml-2"
                                style={{ color: 'var(--color-accent-green)' }}
                              >[PREFERRED]</span>
                            )}
                          </div>
                          <div 
                            className="font-mono text-xs"
                            style={{ color: 'var(--color-text-tertiary)' }}
                          >
                            {contact.response}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Availability */}
                  <div 
                    className="border transition-colors duration-200"
                    style={{ borderColor: 'var(--color-border-primary)' }}
                  >
                    <div 
                      className="px-4 py-2 border-b transition-colors duration-200"
                      style={{ 
                        backgroundColor: 'var(--color-bg-secondary)',
                        borderColor: 'var(--color-border-primary)'
                      }}
                    >
                      <div 
                        className="font-mono text-xs"
                        style={{ color: 'var(--color-text-secondary)' }}
                      >
                        availability.status
                      </div>
                    </div>
                    <div className="p-4 space-y-2">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1 md:gap-0 font-mono text-xs">
                        <span style={{ color: 'var(--color-text-tertiary)' }}>Current Status:</span>
                        <span 
                          className="font-bold"
                          style={{ color: 'var(--color-accent-green)' }}
                        >AVAILABLE</span>
                      </div>
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1 md:gap-0 font-mono text-xs">
                        <span style={{ color: 'var(--color-text-tertiary)' }}>Start Date:</span>
                        <span style={{ color: 'var(--color-text-primary)' }}>{contactData.availability.startDate}</span>
                      </div>
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1 md:gap-0 font-mono text-xs">
                        <span style={{ color: 'var(--color-text-tertiary)' }}>Location:</span>
                        <span style={{ color: 'var(--color-text-primary)' }}>{contactData.availability.location}</span>
                      </div>
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1 md:gap-0 font-mono text-xs">
                        <span style={{ color: 'var(--color-text-tertiary)' }}>Role Type:</span>
                        <span style={{ color: 'var(--color-text-primary)' }}>{contactData.availability.roleType}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Quick contact form */}
              <div className="space-y-6">
                <div 
                  className="border transition-colors duration-200"
                  style={{ borderColor: 'var(--color-border-primary)' }}
                >
                  <div 
                    className="px-4 py-2 border-b transition-colors duration-200"
                    style={{ 
                      backgroundColor: 'var(--color-bg-secondary)',
                      borderColor: 'var(--color-border-primary)'
                    }}
                  >
                    <div 
                      className="font-mono text-xs"
                      style={{ color: 'var(--color-text-secondary)' }}
                    >
                      quick.contact()
                    </div>
                  </div>
                  <form onSubmit={handleSubmit} className="p-4 space-y-4">
                    <div>
                      <label 
                        className="font-mono text-xs block mb-1"
                        style={{ color: 'var(--color-text-tertiary)' }}
                      >
                        {contactData.form.nameLabel}
                      </label>
                      <input 
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full font-mono text-sm px-3 py-2 focus:outline-none transition-colors duration-200"
                        style={{ 
                          border: `1px solid var(--color-border-primary)`,
                          backgroundColor: 'var(--color-bg-primary)',
                          color: 'var(--color-text-primary)'
                        }}
                        placeholder={contactData.form.namePlaceholder}
                        required
                      />
                    </div>
                    
                    <div>
                      <label 
                        className="font-mono text-xs block mb-1"
                        style={{ color: 'var(--color-text-tertiary)' }}
                      >
                        {contactData.form.emailLabel}
                      </label>
                      <input 
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full font-mono text-sm px-3 py-2 focus:outline-none transition-colors duration-200"
                        style={{ 
                          border: `1px solid var(--color-border-primary)`,
                          backgroundColor: 'var(--color-bg-primary)',
                          color: 'var(--color-text-primary)'
                        }}
                        placeholder={contactData.form.emailPlaceholder}
                        required
                      />
                    </div>
                    
                    <div>
                      <label 
                        className="font-mono text-xs block mb-1"
                        style={{ color: 'var(--color-text-tertiary)' }}
                      >
                        {contactData.form.messageTypeLabel}
                      </label>
                      <select 
                        name="messageType"
                        value={formData.messageType}
                        onChange={handleInputChange}
                        className="w-full font-mono text-sm px-3 py-2 focus:outline-none transition-colors duration-200"
                        style={{ 
                          border: `1px solid var(--color-border-primary)`,
                          backgroundColor: 'var(--color-bg-primary)',
                          color: 'var(--color-text-primary)'
                        }}
                      >
                        <option value="">{contactData.form.messageTypePlaceholder}</option>
                        <option value="job">Job Opportunity</option>
                        <option value="consulting">Consulting Project</option>
                        <option value="collaboration">Collaboration</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    
                    <div>
                      <label 
                        className="font-mono text-xs block mb-1"
                        style={{ color: 'var(--color-text-tertiary)' }}
                      >
                        {contactData.form.messageBodyLabel}
                      </label>
                      <textarea 
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full font-mono text-sm px-3 py-2 focus:outline-none resize-none transition-colors duration-200"
                        style={{ 
                          border: `1px solid var(--color-border-primary)`,
                          backgroundColor: 'var(--color-bg-primary)',
                          color: 'var(--color-text-primary)'
                        }}
                        placeholder={contactData.form.messageBodyPlaceholder}
                        required
                      ></textarea>
                    </div>
                    
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full font-mono font-bold text-sm py-3 transition-all duration-200 ${
                        isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'
                      }`}
                      style={{ 
                        backgroundColor: 'var(--color-text-primary)',
                        color: 'var(--color-bg-primary)'
                      }}
                    >
                      {isSubmitting ? 'SENDING...' : (submitStatus === 'success' ? 'SENT!' : contactData.form.submitButton)}
                    </button>
                    
                    {/* Status messages */}
                    {submitStatus === 'success' && (
                      <div 
                        className="font-mono text-xs text-center p-2 rounded"
                        style={{ 
                          color: 'var(--color-accent-green)',
                          backgroundColor: 'var(--color-bg-secondary)'
                        }}
                      >
                        ✅ Message sent successfully! We'll get back to you soon.
                      </div>
                    )}
                    
                    {submitStatus === 'error' && (
                      <div 
                        className="font-mono text-xs text-center p-2 rounded"
                        style={{ 
                          color: '#ef4444',
                          backgroundColor: 'var(--color-bg-secondary)'
                        }}
                      >
                        ❌ {errorMessage}
                      </div>
                    )}
                    
                    <div 
                      className="font-mono text-xs text-center"
                      style={{ color: 'var(--color-text-tertiary)' }}
                    >
                      {contactData.form.responseTime}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <GridOverlay />
      </div>
    </section>
  );
}