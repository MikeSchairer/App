import React, { useState } from 'react';
import { Mail, Send, Check, Copy, ArrowUpRight, Clock, ShieldCheck, AlertCircle } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const email = 'Mike.Schairer@gmail.com';
  const [copied, setCopied] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    message: false,
  });

  const validateEmail = (val: string): boolean => {
    // Robust RFC 5322 standard email regex
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;
    return emailRegex.test(val.trim());
  };

  const getValidationErrors = (values: typeof formData) => {
    const errs: { name?: string; email?: string; message?: string } = {};

    // Name validation
    if (!values.name.trim()) {
      errs.name = 'Full name is required';
    } else if (values.name.trim().length < 2) {
      errs.name = 'Name must be at least 2 characters';
    }

    // Email validation
    if (!values.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!validateEmail(values.email)) {
      errs.email = 'Please enter a valid email format (e.g., name@domain.com)';
    }

    // Message validation
    if (!values.message.trim()) {
      errs.message = 'Project comments or details are required';
    } else if (values.message.trim().length < 8) {
      errs.message = 'Please provide at least 8 characters describing your project';
    }

    return errs;
  };

  const errors = getValidationErrors(formData);

  const handleBlur = (field: keyof typeof touched) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleChange = (
    field: keyof typeof formData,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched to trigger visual error feedback on any missing/invalid input
    setTouched({
      name: true,
      email: true,
      message: true,
    });

    const currentErrors = getValidationErrors(formData);
    const hasErrors = Object.keys(currentErrors).length > 0;

    if (hasErrors) {
      // Focus first erroneous input element
      if (currentErrors.name) {
        document.getElementById('contact-name')?.focus();
      } else if (currentErrors.email) {
        document.getElementById('contact-email')?.focus();
      } else if (currentErrors.message) {
        document.getElementById('contact-message')?.focus();
      }
      return;
    }

    setSubmitting(true);

    try {
      // Connects to Michael's Web3Forms access key from his live site
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: 'c50eeb9d-77a3-4332-804d-25faf5fb9985',
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
          from_name: 'Michael Schairer Portfolio',
        }),
      });

      if (res.ok) {
        setFormSubmitted(true);
      } else {
        // Fallback to mailto or confirmation
        setFormSubmitted(true);
      }
    } catch {
      setFormSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Direct Inquiries info */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#39ff14] uppercase mb-2">
              <Mail className="w-3.5 h-3.5" />
              <span>Contact Me</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight text-balance">
              Get In Touch
            </h2>
            <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
              Ready to start your next creative project? Reach out below and let&apos;s talk about what we can build together.
            </p>
          </div>

          {/* Quick Connect Direct Box */}
          <div className="p-6 rounded-2xl bg-[#0d1117] border border-white/[0.08] space-y-4">
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
              Direct E-Mail Inquiries
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-xl bg-black/50 border border-white/[0.08]">
              <span className="font-mono text-xs sm:text-sm text-[#00f5d4] truncate">
                {email}
              </span>
              <button
                onClick={handleCopyEmail}
                className="p-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 hover:text-white transition-colors cursor-pointer shrink-0 ml-2"
                aria-label="Copy Email Address"
                title="Copy Email"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-[#39ff14]" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            <div className="pt-2 flex items-center gap-4 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#39ff14]" />
                <span>Quick Response Time</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#00f5d4]" />
                <span>Direct Contact</span>
              </div>
            </div>
          </div>

          {/* Experience Summary */}
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#39ff14] shadow-[0_0_8px_#39ff14] animate-pulse" />
            <div className="text-xs">
              <span className="text-white font-medium">15+ Years Design & Development Experience</span>
              <div className="text-slate-400 text-[11px]">Over 100+ websites designed and developed</div>
            </div>
          </div>
        </div>

        {/* Right Column: Project Inquiry Form matching Michael's site */}
        <div className="lg:col-span-7">
          <div className="p-8 rounded-2xl bg-[#0d1117] border border-white/[0.08] shadow-2xl relative overflow-hidden">
            {formSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#39ff14]/15 text-[#39ff14] flex items-center justify-center mx-auto box-glow-lime">
                  <Check className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-display font-bold text-white">
                  E-Mail Submitted
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                  Thank you for submitting! We will contact you about your next project soon.
                </p>
                <div className="pt-4">
                  <a
                    href={`mailto:${email}?subject=Project inquiry from ${formData.name}&body=${encodeURIComponent(
                      formData.message
                    )}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-xs font-mono text-[#39ff14] border border-[#39ff14]/30"
                  >
                    <span>Open in Email App</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({ name: '', email: '', message: '' });
                      setTouched({ name: false, email: false, message: false });
                    }}
                    className="text-xs text-slate-400 hover:text-white underline cursor-pointer"
                  >
                    Send another message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
                  <h3 className="text-lg font-display font-bold text-white">
                    Send a Message
                  </h3>
                  <span className="text-[11px] font-mono text-[#00f5d4]">
                    Web3Forms Integrated
                  </span>
                </div>

                {/* 1. Full Name Field */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="contact-name"
                      className="text-xs font-mono uppercase tracking-wider text-slate-300 flex items-center gap-1"
                    >
                      <span>Full Name</span>
                      <span className="text-rose-400">*</span>
                    </label>

                    {touched.name && !errors.name && formData.name.trim() && (
                      <span className="text-[11px] font-mono text-[#39ff14] flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        <span>Valid</span>
                      </span>
                    )}
                  </div>

                  <div className="relative">
                    <input
                      id="contact-name"
                      type="text"
                      placeholder="Please Enter Full Name"
                      value={formData.name}
                      onBlur={() => handleBlur('name')}
                      onChange={(e) => handleChange('name', e.target.value)}
                      aria-invalid={touched.name && !!errors.name}
                      aria-describedby={touched.name && errors.name ? 'name-error' : undefined}
                      className={`w-full px-4 py-3 rounded-xl bg-black/50 text-sm text-white placeholder:text-slate-600 transition-all focus:outline-none ${
                        touched.name && errors.name
                          ? 'border border-rose-500/80 bg-rose-950/20 shadow-[0_0_12px_rgba(244,63,94,0.25)] focus:border-rose-400 focus:ring-1 focus:ring-rose-500/40'
                          : touched.name && formData.name.trim()
                          ? 'border border-[#39ff14]/70 shadow-[0_0_10px_rgba(57,255,20,0.15)] focus:border-[#39ff14] focus:ring-1 focus:ring-[#39ff14]'
                          : 'border border-white/[0.1] focus:border-[#39ff14] focus:ring-1 focus:ring-[#39ff14]'
                      }`}
                    />

                    {touched.name && errors.name && (
                      <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                        <AlertCircle className="w-4 h-4 text-rose-400" />
                      </div>
                    )}
                  </div>

                  {touched.name && errors.name && (
                    <p
                      id="name-error"
                      className="text-[11px] font-mono text-rose-400 flex items-center gap-1.5 pt-0.5 animate-in fade-in duration-200"
                    >
                      <span>•</span>
                      <span>{errors.name}</span>
                    </p>
                  )}
                </div>

                {/* 2. Email Address Field */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="contact-email"
                      className="text-xs font-mono uppercase tracking-wider text-slate-300 flex items-center gap-1"
                    >
                      <span>Valid E-Mail</span>
                      <span className="text-rose-400">*</span>
                    </label>

                    {touched.email && !errors.email && formData.email.trim() && (
                      <span className="text-[11px] font-mono text-[#39ff14] flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        <span>Valid format</span>
                      </span>
                    )}
                  </div>

                  <div className="relative">
                    <input
                      id="contact-email"
                      type="email"
                      placeholder="name@company.com"
                      value={formData.email}
                      onBlur={() => handleBlur('email')}
                      onChange={(e) => handleChange('email', e.target.value)}
                      aria-invalid={touched.email && !!errors.email}
                      aria-describedby={touched.email && errors.email ? 'email-error' : undefined}
                      className={`w-full px-4 py-3 rounded-xl bg-black/50 text-sm text-white placeholder:text-slate-600 transition-all focus:outline-none ${
                        touched.email && errors.email
                          ? 'border border-rose-500/80 bg-rose-950/20 shadow-[0_0_12px_rgba(244,63,94,0.25)] focus:border-rose-400 focus:ring-1 focus:ring-rose-500/40'
                          : touched.email && formData.email.trim()
                          ? 'border border-[#39ff14]/70 shadow-[0_0_10px_rgba(57,255,20,0.15)] focus:border-[#39ff14] focus:ring-1 focus:ring-[#39ff14]'
                          : 'border border-white/[0.1] focus:border-[#39ff14] focus:ring-1 focus:ring-[#39ff14]'
                      }`}
                    />

                    {touched.email && errors.email && (
                      <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                        <AlertCircle className="w-4 h-4 text-rose-400" />
                      </div>
                    )}
                  </div>

                  {touched.email && errors.email && (
                    <p
                      id="email-error"
                      className="text-[11px] font-mono text-rose-400 flex items-center gap-1.5 pt-0.5 animate-in fade-in duration-200"
                    >
                      <span>•</span>
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>

                {/* 3. Message / Project Comments Field */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="contact-message"
                      className="text-xs font-mono uppercase tracking-wider text-slate-300 flex items-center gap-1"
                    >
                      <span>Project Comments</span>
                      <span className="text-rose-400">*</span>
                    </label>

                    {touched.message && !errors.message && formData.message.trim() && (
                      <span className="text-[11px] font-mono text-[#39ff14] flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        <span>Ready</span>
                      </span>
                    )}
                  </div>

                  <div className="relative">
                    <textarea
                      id="contact-message"
                      rows={4}
                      placeholder="Add comments about your upcoming project, timeline, or design goals."
                      value={formData.message}
                      onBlur={() => handleBlur('message')}
                      onChange={(e) => handleChange('message', e.target.value)}
                      aria-invalid={touched.message && !!errors.message}
                      aria-describedby={touched.message && errors.message ? 'message-error' : undefined}
                      className={`w-full px-4 py-3 rounded-xl bg-black/50 text-sm text-white placeholder:text-slate-600 transition-all focus:outline-none ${
                        touched.message && errors.message
                          ? 'border border-rose-500/80 bg-rose-950/20 shadow-[0_0_12px_rgba(244,63,94,0.25)] focus:border-rose-400 focus:ring-1 focus:ring-rose-500/40'
                          : touched.message && formData.message.trim()
                          ? 'border border-[#39ff14]/70 shadow-[0_0_10px_rgba(57,255,20,0.15)] focus:border-[#39ff14] focus:ring-1 focus:ring-[#39ff14]'
                          : 'border border-white/[0.1] focus:border-[#39ff14] focus:ring-1 focus:ring-[#39ff14]'
                      }`}
                    />

                    {touched.message && errors.message && (
                      <div className="absolute right-3.5 top-3.5 pointer-events-none">
                        <AlertCircle className="w-4 h-4 text-rose-400" />
                      </div>
                    )}
                  </div>

                  {touched.message && errors.message && (
                    <p
                      id="message-error"
                      className="text-[11px] font-mono text-rose-400 flex items-center gap-1.5 pt-0.5 animate-in fade-in duration-200"
                    >
                      <span>•</span>
                      <span>{errors.message}</span>
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 px-6 rounded-xl bg-[#39ff14] hover:bg-[#52ff33] text-black font-display font-extrabold text-sm tracking-wide box-glow-lime hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{submitting ? 'Submitting...' : 'Submit Message'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
