import React from 'react';
import { MessageCircle } from 'lucide-react';

interface WhatsAppButtonProps {
  phoneNumber?: string;
  defaultMessage?: string;
  className?: string;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  phoneNumber = '7708910190',
  defaultMessage = 'Hello Reya Designs, I would like to check my ID card order status.',
  className = '',
}) => {
  // Format international number (India +91)
  const cleanNumber = phoneNumber.replace(/[^0-9]/g, '');
  const internationalNumber = cleanNumber.length === 10 ? `91${cleanNumber}` : cleanNumber;
  const whatsappUrl = `https://wa.me/${internationalNumber}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <aside aria-label="WhatsApp Support" className={`fixed bottom-6 right-6 z-40 ${className}`}>
      <a
        id="whatsapp-status-button"
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-emerald-300"
        title="Chat on WhatsApp: 7708910190"
      >
        <span className="relative flex items-center justify-center">
          <MessageCircle className="w-6 h-6 fill-current text-white" />
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-100"></span>
          </span>
        </span>
        <div className="flex flex-col text-left">
          <span className="text-xs text-emerald-100 font-medium leading-none">Order Inquiry</span>
          <span className="text-sm font-semibold tracking-tight whitespace-nowrap text-white">
            Status on WhatsApp
          </span>
        </div>
      </a>
    </aside>
  );
};
