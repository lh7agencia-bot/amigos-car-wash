import { useState, FormEvent } from 'react';
import { CheckCircle2, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { BUSINESS_INFO } from '../data/carWashData';
import {
  ValidationErrors,
  buildMailtoUrl,
  buildWhatsAppUrl,
  formatContactWhatsAppMessage,
  validateContactInput,
} from '../utils/carWashHelpers';

interface SubmittedContact {
  name: string;
  email: string;
  message: string;
  channel: 'whatsapp' | 'email';
  actionUrl: string;
}

export function ContactAndFooter() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [submitted, setSubmitted] = useState<SubmittedContact | null>(null);

  const submitViaChannel = (channel: 'whatsapp' | 'email') => {
    const input = { name, email, message };
    const validationErrors = validateContactInput(input);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const whatsappText = formatContactWhatsAppMessage(input);
    const actionUrl =
      channel === 'whatsapp'
        ? buildWhatsAppUrl(BUSINESS_INFO.whatsappDigits, whatsappText)
        : buildMailtoUrl(
            'contact@amigoscarwash.example',
            `Amigos Car Wash Inquiry from ${name.trim()}`,
            whatsappText
          );

    setErrors({});
    setSubmitted({
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      channel,
      actionUrl,
    });
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitViaChannel('whatsapp');
  };

  const handleReset = () => {
    setSubmitted(null);
    setName('');
    setEmail('');
    setMessage('');
    setErrors({});
  };

  return (
    <>
      <section id="contact" className="border-t border-slate-200 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            {/* Left column: Location & direct contact details */}
            <div className="lg:col-span-5">
              <p className="text-sm font-semibold text-[#1D9BF0]">Contact &amp; Location</p>
              <h2
                className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
                style={{ textWrap: 'balance' }}
              >
                Visit us in Washington, DC or send a message
              </h2>
              <p className="mt-3 text-base leading-relaxed text-slate-600">
                Have a question about detailing packages, fleet washes, or same-day bay
                availability? Reach our team directly by WhatsApp, phone, or email.
              </p>

              <div className="mt-8 space-y-5 border-t border-slate-200 pt-6">
                <div className="flex items-start gap-3.5">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#0B3D91]" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Address</p>
                    <p className="mt-0.5 text-sm text-slate-600">{BUSINESS_INFO.address}</p>
                    <a
                      href={BUSINESS_INFO.mapsQueryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-block text-sm font-semibold text-[#1D9BF0] hover:text-[#0B3D91] hover:underline"
                    >
                      Open in Google Maps
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-[#0B3D91]" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Phone &amp; WhatsApp</p>
                    <a
                      href={BUSINESS_INFO.phoneHref}
                      className="mt-0.5 block text-sm font-semibold tabular-nums text-slate-700 hover:text-[#0B3D91] hover:underline"
                    >
                      {BUSINESS_INFO.phoneDisplay}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right column: Contact form */}
            <div className="lg:col-span-7">
              {submitted ? (
                <div
                  data-testid="contact-confirmation"
                  className="rounded-xl border border-[#1D9BF0]/40 bg-slate-50 p-6 sm:p-8"
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle2
                      className="mt-0.5 h-6 w-6 shrink-0 text-[#1D9BF0]"
                      aria-hidden="true"
                    />
                    <div>
                      <h3 className="font-display text-2xl font-bold text-slate-900">
                        Message Prepared for{' '}
                        {submitted.channel === 'whatsapp' ? 'WhatsApp' : 'Email'}
                      </h3>
                      <p className="mt-1 text-sm text-slate-600">
                        Review your details below and open{' '}
                        {submitted.channel === 'whatsapp' ? 'WhatsApp' : 'your email app'} to send
                        immediately.
                      </p>
                    </div>
                  </div>

                  <dl className="mt-5 space-y-2 rounded-lg border border-slate-200 bg-white p-4 text-sm">
                    <div>
                      <dt className="inline font-semibold text-slate-700">Name: </dt>
                      <dd className="inline text-slate-900">{submitted.name}</dd>
                    </div>
                    <div>
                      <dt className="inline font-semibold text-slate-700">Email: </dt>
                      <dd className="inline text-slate-900">{submitted.email}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-slate-700">Message:</dt>
                      <dd className="mt-1 text-slate-900">{submitted.message}</dd>
                    </div>
                  </dl>

                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <a
                      href={submitted.actionUrl}
                      target={submitted.channel === 'whatsapp' ? '_blank' : undefined}
                      rel={submitted.channel === 'whatsapp' ? 'noopener noreferrer' : undefined}
                      className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-[#1D9BF0] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#0B3D91] whitespace-nowrap"
                    >
                      {submitted.channel === 'whatsapp' ? (
                        <>
                          <MessageCircle className="h-4 w-4" aria-hidden="true" />
                          <span>Open WhatsApp Chat</span>
                        </>
                      ) : (
                        <>
                          <Mail className="h-4 w-4" aria-hidden="true" />
                          <span>Open Email Draft</span>
                        </>
                      )}
                    </a>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 whitespace-nowrap"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handleFormSubmit}
                  noValidate
                  className="rounded-xl border border-slate-200 bg-slate-50 p-6 sm:p-8"
                >
                  <div className="space-y-5">
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="contact-name"
                          className="block text-sm font-semibold text-slate-900"
                        >
                          Name
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          placeholder="Your name"
                          value={name}
                          onChange={(e) => {
                            setName(e.target.value);
                            setErrors((prev) => ({ ...prev, name: '' }));
                          }}
                          className="mt-2 block min-h-[44px] w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#1D9BF0] focus:outline-none focus:ring-2 focus:ring-[#1D9BF0]/25"
                        />
                        {errors.name && (
                          <p role="alert" className="mt-1.5 text-xs font-medium text-red-600">
                            {errors.name}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="contact-email"
                          className="block text-sm font-semibold text-slate-900"
                        >
                          Email
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          placeholder="you@example.com"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            setErrors((prev) => ({ ...prev, email: '' }));
                          }}
                          className="mt-2 block min-h-[44px] w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#1D9BF0] focus:outline-none focus:ring-2 focus:ring-[#1D9BF0]/25"
                        />
                        {errors.email && (
                          <p role="alert" className="mt-1.5 text-xs font-medium text-red-600">
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="contact-message"
                        className="block text-sm font-semibold text-slate-900"
                      >
                        Message
                      </label>
                      <textarea
                        id="contact-message"
                        rows={4}
                        placeholder="Tell us about your vehicle or ask a question..."
                        value={message}
                        onChange={(e) => {
                          setMessage(e.target.value);
                          setErrors((prev) => ({ ...prev, message: '' }));
                        }}
                        className="mt-2 block w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#1D9BF0] focus:outline-none focus:ring-2 focus:ring-[#1D9BF0]/25"
                      />
                      {errors.message && (
                        <p role="alert" className="mt-1.5 text-xs font-medium text-red-600">
                          {errors.message}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-3 pt-1">
                      <button
                        type="submit"
                        className="inline-flex min-h-[46px] flex-1 items-center justify-center gap-2 rounded-lg bg-[#1D9BF0] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#0B3D91] whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B3D91]"
                      >
                        <MessageCircle className="h-4 w-4" aria-hidden="true" />
                        <span>Send via WhatsApp</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => submitViaChannel('email')}
                        className="inline-flex min-h-[46px] flex-1 items-center justify-center gap-2 rounded-lg border border-[#0B3D91] bg-white px-5 py-2.5 text-sm font-semibold text-[#0B3D91] transition-colors hover:bg-[#0B3D91] hover:text-white whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B3D91]"
                      >
                        <Mail className="h-4 w-4" aria-hidden="true" />
                        <span>Send via Email</span>
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-800 bg-[#0B3D91] text-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-center">
            <div>
              <p className="font-display text-xl font-bold tracking-tight">
                {BUSINESS_INFO.name}
              </p>
              <p className="mt-1 text-sm text-sky-100">{BUSINESS_INFO.slogan}</p>
              <p className="mt-3 text-xs text-sky-200">
                {BUSINESS_INFO.address} · {BUSINESS_INFO.phoneDisplay}
              </p>
            </div>

            <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
              <a href="#services" className="text-sky-100 hover:text-white hover:underline">
                Services
              </a>
              <a href="#booking" className="text-sky-100 hover:text-white hover:underline">
                Booking
              </a>
              <a href="#gallery" className="text-sky-100 hover:text-white hover:underline">
                Gallery
              </a>
              <a href="#testimonials" className="text-sky-100 hover:text-white hover:underline">
                Testimonials
              </a>
              <a href="#faq" className="text-sky-100 hover:text-white hover:underline">
                FAQ
              </a>
              <a href="#contact" className="text-sky-100 hover:text-white hover:underline">
                Contact
              </a>
            </nav>
          </div>

          <div className="mt-8 border-t border-white/15 pt-6 text-xs text-sky-200">
            © {new Date().getFullYear()} {BUSINESS_INFO.name}. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}
