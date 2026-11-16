import { MessageCircle } from 'lucide-react';
import { BUSINESS_INFO } from '../data/carWashData';
import { buildWhatsAppUrl } from '../utils/carWashHelpers';

export function FloatingWhatsAppButton() {
  const whatsappUrl = buildWhatsAppUrl(
    BUSINESS_INFO.whatsappDigits,
    'Hello Amigos Car Wash! I would like to schedule a car wash.'
  );

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Amigos Car Wash on WhatsApp"
      className="fixed bottom-4 right-4 z-40 inline-flex h-12 items-center gap-2 rounded-full bg-[#0B3D91] px-4 text-sm font-semibold text-white shadow-lg ring-2 ring-white transition-transform duration-150 hover:scale-[1.03] hover:bg-[#1D9BF0] whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D9BF0] sm:bottom-6 sm:right-6"
    >
      <MessageCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
      <span>WhatsApp</span>
    </a>
  );
}
