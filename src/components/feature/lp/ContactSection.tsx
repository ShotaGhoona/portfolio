import { useLanguage } from '@/hooks/useLanguage';
import { useEffect, useState } from 'react';
import contactTranslations from '@/data/translations/contact.json';

export function ContactSection() {
  const { language } = useLanguage();
  const [contactData, setContactData] = useState(contactTranslations[language] || contactTranslations.en);

  useEffect(() => {
    setContactData(contactTranslations[language] || contactTranslations.en);
  }, [language]);
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
          {/* Section header */}
          <div 
            className="col-span-1 md:col-span-3 px-4 md:px-8 pb-8 md:pb-0 md:border-r"
            style={{ borderColor: 'var(--color-border-secondary)' }}
          >
            <div className="md:sticky md:top-40">
              <div 
                className="font-mono font-black text-xl md:text-2xl mb-2"
                style={{ color: 'var(--color-text-primary)' }}
              >
                06.
              </div>
              <h2 
                className="font-mono font-black text-lg md:text-xl mb-4"
                style={{ color: 'var(--color-text-primary)' }}
              >
                {contactData.sectionTitle}
              </h2>
              <div 
                className="font-mono text-xs mb-6 md:mb-0"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                <div>{`// ${contactData.subtitle.line1}`}</div>
                <div>{`// ${contactData.subtitle.line2}`}</div>
              </div>
            </div>
          </div>
          
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
                    Let&apos;s build something amazing together.
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
                          value: 'alex.chen.dev@gmail.com',
                          preferred: true,
                          response: '< 24h'
                        },
                        { 
                          method: 'linkedin', 
                          value: '/in/alexchen-engineer',
                          preferred: false,
                          response: '< 48h'
                        },
                        { 
                          method: 'github', 
                          value: '/alexchen-dev',
                          preferred: false,
                          response: 'async'
                        },
                        { 
                          method: 'phone', 
                          value: '+1 (555) 123-4567',
                          preferred: false,
                          response: 'scheduled'
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
                  <div className="p-4 space-y-4">
                    <div>
                      <label 
                        className="font-mono text-xs block mb-1"
                        style={{ color: 'var(--color-text-tertiary)' }}
                      >
                        {contactData.form.nameLabel}
                      </label>
                      <input 
                        type="text" 
                        className="w-full font-mono text-sm px-3 py-2 focus:outline-none transition-colors duration-200"
                        style={{ 
                          border: `1px solid var(--color-border-primary)`,
                          backgroundColor: 'var(--color-bg-primary)',
                          color: 'var(--color-text-primary)'
                        }}
                        placeholder="{contactData.form.namePlaceholder}"
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
                        className="w-full font-mono text-sm px-3 py-2 focus:outline-none transition-colors duration-200"
                        style={{ 
                          border: `1px solid var(--color-border-primary)`,
                          backgroundColor: 'var(--color-bg-primary)',
                          color: 'var(--color-text-primary)'
                        }}
                        placeholder="{contactData.form.emailPlaceholder}"
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
                        rows={4}
                        className="w-full font-mono text-sm px-3 py-2 focus:outline-none resize-none transition-colors duration-200"
                        style={{ 
                          border: `1px solid var(--color-border-primary)`,
                          backgroundColor: 'var(--color-bg-primary)',
                          color: 'var(--color-text-primary)'
                        }}
                        placeholder="{contactData.form.messageBodyPlaceholder}"
                      ></textarea>
                    </div>
                    
                    <button 
                      className="w-full font-mono font-bold text-sm py-3 transition-all duration-200 hover:opacity-90"
                      style={{ 
                        backgroundColor: 'var(--color-text-primary)',
                        color: 'var(--color-bg-primary)'
                      }}
                    >
                      {contactData.form.submitButton}
                    </button>
                    
                    <div 
                      className="font-mono text-xs text-center"
                      style={{ color: 'var(--color-text-tertiary)' }}
                    >
                      {contactData.form.responseTime}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Grid overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="max-w-6xl mx-auto h-full grid grid-cols-12 gap-0">
            {Array.from({ length: 12 }).map((_, index) => (
              <div 
                key={index} 
                className="h-full"
                style={{ 
                  borderRight: index < 11 ? `1px solid var(--color-border-primary)` : 'none',
                  opacity: 0.3
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}