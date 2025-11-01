'use client';

import { useState } from 'react';
import { GridOverlay } from '@/components/ui/GridOverlay';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { P, Label, Span, Div } from '@/components/i18n';
import { useLanguage } from '@/hooks/useLanguage';

export function ContactSection() {
  const { language } = useLanguage();
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    messageType: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

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
          company: formData.company,
          messageType: formData.messageType,
          message: formData.message,
          to: 'shota.yamashita@ghoona.com'
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', company: '', messageType: '', message: '' });
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
            sectionTitle={{ en: 'CONNECT()', ja: 'コンタクト()' }}
            line1={{ en: 'Open to collaboration', ja: 'コラボレーションと' }}
            line2={{ en: 'and new opportunities', ja: '新しい機会を求めて' }}
          />
          {/* Contact content */}
          <div className="col-span-1 md:col-span-9 px-4 md:px-8">
            <div>
              {/* Intro text */}
              <div className="mb-12">
                <div
                  className="font-mono text-lg font-bold mb-6"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  npx create-next-app@latest<br/>
                  <span
                    className="font-bold text-2xl"
                    style={{ color: 'var(--color-accent-green)' }}>something amazing together.
                  </span>
                </div>
              </div>

              {/* Quick contact form */}
              <div className="space-y-6">
                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Row 1: Name and Message Type */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <Label
                          en="Name"
                          ja="氏名"
                          className="font-mono text-sm block mb-3"
                          style={{ color: 'var(--color-text-tertiary)' }}
                        />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full font-mono text-base py-3 focus:outline-none transition-colors duration-200 bg-transparent"
                          style={{
                            borderBottom: `1px solid var(--color-border-primary)`,
                            color: 'var(--color-text-primary)'
                          }}
                          placeholder={language === 'ja' ? '山田太郎' : 'John Doe'}
                          required
                        />
                      </div>

                      <div>
                        <Label
                          en="Subject"
                          ja="件名"
                          className="font-mono text-sm block mb-3"
                          style={{ color: 'var(--color-text-tertiary)' }}
                        />
                        <select
                          name="messageType"
                          value={formData.messageType}
                          onChange={handleInputChange}
                          className="w-full font-mono text-base py-3 focus:outline-none transition-colors duration-200 bg-transparent"
                          style={{
                            borderBottom: `1px solid var(--color-border-primary)`,
                            color: 'var(--color-text-primary)'
                          }}
                        >
                          <option value="">{language === 'ja' ? '件名を選択してください' : 'Select subject'}</option>
                          <option value="job">Job Opportunity</option>
                          <option value="consulting">Consulting Project</option>
                          <option value="collaboration">Collaboration</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    {/* Row 2: Company and Email */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <Label
                          en="Company"
                          ja="会社名"
                          className="font-mono text-sm block mb-3"
                          style={{ color: 'var(--color-text-tertiary)' }}
                        />
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          className="w-full font-mono text-base py-3 focus:outline-none transition-colors duration-200 bg-transparent"
                          style={{
                            borderBottom: `1px solid var(--color-border-primary)`,
                            color: 'var(--color-text-primary)'
                          }}
                          placeholder={language === 'ja' ? '株式会社XXXX' : 'Company Inc.'}
                        />
                      </div>

                      <div>
                        <Label
                          en="Email"
                          ja="メールアドレス"
                          className="font-mono text-sm block mb-3"
                          style={{ color: 'var(--color-text-tertiary)' }}
                        />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full font-mono text-base py-3 focus:outline-none transition-colors duration-200 bg-transparent"
                          style={{
                            borderBottom: `1px solid var(--color-border-primary)`,
                            color: 'var(--color-text-primary)'
                          }}
                          placeholder="example@email.com"
                          required
                        />
                      </div>
                    </div>
                    
                    {/* Row 3: Message */}
                    <div>
                      <Label
                        en="Message"
                        ja="メッセージ"
                        className="font-mono text-sm block mb-3"
                        style={{ color: 'var(--color-text-tertiary)' }}
                      />
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full font-mono text-base py-3 focus:outline-none resize-none transition-colors duration-200 bg-transparent"
                        style={{
                          borderBottom: `1px solid var(--color-border-primary)`,
                          color: 'var(--color-text-primary)'
                        }}
                        placeholder={language === 'ja' ? 'お問い合わせ内容をご記入ください...' : 'Enter your message...'}
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
                      {isSubmitting ? 'SENDING...' : (submitStatus === 'success' ? 'SENT!' : (language === 'ja' ? 'メッセージを送信()' : 'SEND_MESSAGE()'))}
                    </button>
                    
                    {/* Status messages */}
                    {submitStatus === 'success' && (
                      <div
                        className="font-mono text-sm"
                        style={{
                          color: 'var(--color-accent-green)',
                        }}
                      >
                        ✓ Message sent successfully!
                      </div>
                    )}

                    {submitStatus === 'error' && (
                      <div
                        className="font-mono text-sm"
                        style={{
                          color: '#ef4444',
                        }}
                      >
                        ✗ {errorMessage}
                      </div>
                    )}
                  </form>
              </div>
            </div>
          </div>
        </div>
        <GridOverlay />
      </div>
    </section>
  );
}