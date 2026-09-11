import React from 'react';
import { Mail, MessageCircle, CreditCard, Tag, ShieldCheck, Phone } from 'lucide-react';

interface FooterProps {
  onOpenPriceList: () => void;
  onNavigateToForm: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPriceList, onNavigateToForm }) => {
  return (
    <footer className="bg-slate-900 text-slate-400 text-xs py-10 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Col 1: Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <CreditCard className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-base tracking-tight">Reya ID Cards</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs">
              Powered by <strong>Reya Designs</strong>. Specializing in high-resolution double-sided
              PVC ID cards, smart RFID cards, multi-color lanyards, and transparent pouches for
              educational and corporate institutions.
            </p>
            <p className="text-slate-500 text-[11px]">
              டீலர்களுக்கான குறைந்தபட்ச மொத்த விலை பட்டியல் &bull; தரமான கார்டு பிரிண்டிங்
            </p>
          </div>

          {/* Col 2: Contact Info */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wide uppercase">Official Contacts</h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="mailto:reyadesigns@gmail.com"
                  className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4 text-blue-400" />
                  <span>reyadesigns@gmail.com</span>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/917708910190?text=Hello%20Reya%20Designs,%20I%20would%20like%20to%20check%20my%20ID%20card%20order%20status."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-slate-300 hover:text-emerald-400 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp: 7708910190</span>
                </a>
              </li>
              <li className="flex items-center gap-2 text-slate-400">
                <ShieldCheck className="w-4 h-4 text-slate-500" />
                <span>Fast 24-48 Hour Dispatch Service</span>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wide uppercase">Quick Access</h4>
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={onNavigateToForm}
                className="text-left text-slate-300 hover:text-blue-400 transition-colors"
              >
                &bull; Reya ID Card Form (Submit Order)
              </button>
              <button
                type="button"
                onClick={onOpenPriceList}
                className="text-left text-slate-300 hover:text-blue-400 transition-colors flex items-center gap-1.5"
              >
                <span>&bull; Dealer Price List (PVC &amp; RFID)</span>
                <Tag className="w-3 h-3 text-blue-400" />
              </button>
              <a
                href="https://wa.me/917708910190?text=Hello%20Reya%20Designs,%20I%20would%20like%20to%20check%20my%20ID%20card%20order%20status."
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:underline"
              >
                &bull; Status on WhatsApp (7708910190)
              </a>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800 text-center text-slate-500 text-[11px] flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>&copy; {new Date().getFullYear()} Reya ID Cards &bull; Reya Designs. All rights reserved.</div>
          <div className="text-slate-400">Orders dispatched to: reyadesigns@gmail.com</div>
        </div>
      </div>
    </footer>
  );
};
