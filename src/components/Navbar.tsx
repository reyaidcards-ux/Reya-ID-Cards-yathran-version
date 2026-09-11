import React from 'react';
import { CreditCard, Tag, Home, FileText, MessageCircle } from 'lucide-react';

interface NavbarProps {
  currentView: 'welcome' | 'form';
  onNavigate: (view: 'welcome' | 'form') => void;
  onOpenPriceList: () => void;
  submittedOrdersCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onOpenPriceList,
  submittedOrdersCount = 0,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <button
          id="navbar-brand-btn"
          type="button"
          onClick={() => onNavigate('welcome')}
          className="flex items-center gap-2.5 text-left focus:outline-none"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
            <CreditCard className="w-5 h-5" />
          </div>
          <div>
            <div className="text-base sm:text-lg font-extrabold tracking-tight text-slate-900 leading-none">
              Reya <span className="text-blue-600">ID Cards</span>
            </div>
            <div className="text-[11px] text-slate-400 font-medium tracking-wider uppercase">
              By Reya Designs
            </div>
          </div>
        </button>

        {/* Navigation Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            id="nav-welcome-btn"
            type="button"
            onClick={() => onNavigate('welcome')}
            className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors flex items-center gap-1.5 ${
              currentView === 'welcome'
                ? 'bg-slate-100 text-slate-900 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Welcome</span>
          </button>

          <button
            id="nav-form-btn"
            type="button"
            onClick={() => onNavigate('form')}
            className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors flex items-center gap-1.5 ${
              currentView === 'form'
                ? 'bg-blue-50 text-blue-700 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>ID Card Form</span>
          </button>

          <button
            id="nav-pricelist-btn"
            type="button"
            onClick={onOpenPriceList}
            className="px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 border border-slate-200 transition-colors flex items-center gap-1.5"
          >
            <Tag className="w-3.5 h-3.5 text-blue-600" />
            <span className="hidden sm:inline">Price List</span>
            <span className="sm:hidden">Prices</span>
          </button>

          {/* Direct WhatsApp Callout in header */}
          <a
            id="nav-whatsapp-direct"
            href="https://wa.me/917708910190?text=Hello%20Reya%20Designs,%20I%20would%20like%20to%20check%20my%20ID%20card%20order%20status."
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#25D366] fill-current" />
            <span>7708910190</span>
          </a>
        </div>
      </div>
    </header>
  );
};
