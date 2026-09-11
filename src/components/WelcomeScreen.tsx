import React from 'react';
import {
  CreditCard,
  ArrowRight,
  Tag,
  ShieldCheck,
  Sparkles,
  Zap,
  CheckCircle2,
  FileText,
  MessageCircle,
} from 'lucide-react';
import { STANDARD_PRICE_LIST, RFID_PRICE_LIST } from '../data/priceList';

interface WelcomeScreenProps {
  onStartOrder: () => void;
  onOpenPriceList: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onStartOrder,
  onOpenPriceList,
}) => {
  return (
    <div id="welcome-screen" className="relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-blue-50/80 to-transparent pointer-events-none -z-10" />

      {/* Hero Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-10 pb-16">
        {/* Top Eyebrow Tag */}
        <div className="flex justify-center mb-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-semibold tracking-wide shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Official Reya Designs Portal</span>
            <span className="w-1 h-1 rounded-full bg-blue-400"></span>
            <span className="text-slate-600 font-normal">Dealer &amp; Client Hub</span>
          </div>
        </div>

        {/* Main Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Welcome to <span className="text-blue-600">Reya ID Cards</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Fast, high-definition PVC ID card printing and smart RFID cards for institutions,
            studios, and organizations. Submit your card artwork with ease and enjoy transparent wholesale pricing.
          </p>
        </div>

        {/* Call to Actions */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            id="welcome-start-order-btn"
            type="button"
            onClick={onStartOrder}
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm sm:text-base shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            <span>Fill Reya ID Card Form</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <button
            id="welcome-view-pricelist-btn"
            type="button"
            onClick={onOpenPriceList}
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm sm:text-base border border-slate-300 shadow-xs hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-slate-200"
          >
            <Tag className="w-4 h-4 text-blue-600" />
            <span>View Dealer Price List</span>
          </button>
        </div>

        {/* Interactive Visual Showcase Card */}
        <div className="mt-12 relative max-w-3xl mx-auto">
          <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-blue-950 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-800 relative overflow-hidden">
            {/* Gloss light reflection */}
            <div className="absolute -right-24 -bottom-24 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Left Column: Info */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-wider">
                  <CreditCard className="w-4 h-4" />
                  <span>Premium Production Ready</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                  Seamless ID Card Submission
                </h3>
                <ul className="space-y-2.5 text-sm text-slate-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    <span>Double-side printing for both Front &amp; Back artwork</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    <span>Transparent pouches &amp; custom branded lanyards</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    <span>Dispatched directly to reyadesigns@gmail.com</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    <span>Live status tracking on WhatsApp (7708910190)</span>
                  </li>
                </ul>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={onStartOrder}
                    className="inline-flex items-center gap-2 text-xs font-semibold text-blue-300 hover:text-white transition-colors"
                  >
                    <span>Proceed to Reya ID Card Form</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Right Column: Visual ID Card Render */}
              <div className="flex justify-center">
                <div className="w-64 h-96 bg-white rounded-2xl shadow-xl border-4 border-slate-800 p-4 text-slate-900 flex flex-col justify-between relative transform rotate-1 hover:rotate-0 transition-transform duration-300">
                  {/* Lanyard slot */}
                  <div className="w-12 h-2.5 bg-slate-200 rounded-full mx-auto mb-2" />

                  {/* Card Header */}
                  <div className="text-center border-b border-slate-100 pb-2">
                    <span className="text-[10px] font-bold tracking-widest text-blue-600 uppercase">
                      Reya Designs
                    </span>
                    <h4 className="text-xs font-bold text-slate-800">
                      OFFICIAL IDENTIFICATION
                    </h4>
                  </div>

                  {/* Photo Placeholder */}
                  <div className="my-auto flex flex-col items-center">
                    <div className="w-20 h-24 bg-gradient-to-b from-blue-100 to-slate-200 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 mb-2">
                      <CreditCard className="w-8 h-8 text-blue-400" />
                    </div>
                    <span className="text-xs font-bold text-slate-900">SAMPLE CLIENT</span>
                    <span className="text-[10px] text-slate-500">ID: REYA-2026-01</span>
                    <span className="text-[9px] px-2 py-0.5 mt-1 rounded bg-blue-50 text-blue-700 font-semibold">
                      Authorized Card
                    </span>
                  </div>

                  {/* Card Footer */}
                  <div className="pt-2 border-t border-slate-100 text-center">
                    <div className="w-36 h-4 mx-auto bg-slate-800 rounded flex items-center justify-center">
                      <span className="text-[8px] font-mono text-white tracking-widest">
                        ||| | |||| | |||
                      </span>
                    </div>
                    <span className="text-[9px] text-slate-400 mt-1 block">
                      Double Side PVC / RFID
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Highlights Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-blue-200 transition-colors">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
              <Zap className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-900 mb-1">Standard PVC ID Cards</h4>
            <p className="text-xs text-slate-500 mb-3">
              Double-side printing with options for transparent case and lanyards.
            </p>
            <div className="text-xs font-bold text-blue-600">Starting from ₹30.00 / card</div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-blue-200 transition-colors">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3">
              <CreditCard className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-900 mb-1">Smart RFID Cards</h4>
            <p className="text-xs text-slate-500 mb-3">
              Integrated proximity RFID contactless smart cards with durable casing.
            </p>
            <div className="text-xs font-bold text-indigo-600">Starting from ₹65.00 / card</div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-blue-200 transition-colors">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
              <MessageCircle className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-900 mb-1">WhatsApp Status Support</h4>
            <p className="text-xs text-slate-500 mb-3">
              Direct chat with 7708910190 for instant confirmation and queries.
            </p>
            <div className="text-xs font-bold text-emerald-600">Status on WhatsApp</div>
          </div>
        </div>
      </div>
    </div>
  );
};
