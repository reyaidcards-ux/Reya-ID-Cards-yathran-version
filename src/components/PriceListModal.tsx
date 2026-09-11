import React, { useState } from 'react';
import { X, Tag, Check, Sparkles, Printer, Download, ArrowRight, ShieldCheck } from 'lucide-react';
import { STANDARD_PRICE_LIST, RFID_PRICE_LIST, ALL_PRICE_ITEMS } from '../data/priceList';
import { PriceItem } from '../types';

interface PriceListModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPackage?: (item: PriceItem) => void;
  selectedPackageId?: number;
}

export const PriceListModal: React.FC<PriceListModalProps> = ({
  isOpen,
  onClose,
  onSelectPackage,
  selectedPackageId,
}) => {
  const [activeTab, setActiveTab] = useState<'standard' | 'rfid' | 'all'>('standard');

  if (!isOpen) return null;

  const currentItems =
    activeTab === 'all'
      ? ALL_PRICE_ITEMS
      : activeTab === 'standard'
      ? STANDARD_PRICE_LIST
      : RFID_PRICE_LIST;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      id="price-list-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        id="price-list-modal-container"
        className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6 flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-400">
              <Tag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                Reya ID Card Dealer Price List
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 font-medium">
                  Wholesale Rates
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                டீலர் விலை பட்டியல் &bull; Official wholesale pricing with dealer profit margins
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="print-price-list-btn"
              type="button"
              onClick={handlePrint}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
              title="Print Price List"
            >
              <Printer className="w-3.5 h-3.5" />
              Print
            </button>
            <button
              id="close-price-list-btn"
              type="button"
              onClick={onClose}
              className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="bg-slate-50 px-6 py-3 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('standard')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'standard'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              Standard PVC Cards (வழக்கமான கார்டுகள்)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('rfid')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'rfid'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              Smart RFID Cards (RFID ஸ்மார்ட் கார்டுகள்)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'all'
                  ? 'bg-slate-800 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              All Packages
            </button>
          </div>

          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>High Quality Double-Side Thermal/Offset Printing</span>
          </div>
        </div>

        {/* Table Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white text-xs sm:text-sm uppercase tracking-wider font-semibold">
                  <th className="py-3.5 px-4 text-center w-16 border-r border-slate-800">
                    வ.எண்
                    <span className="block text-[10px] text-slate-400 font-normal">S.No</span>
                  </th>
                  <th className="py-3.5 px-4 border-r border-slate-800">
                    பேக்கேஜ் &amp; உதிரிபாக விவரம்
                    <span className="block text-[10px] text-slate-400 font-normal">(Accessories Description)</span>
                  </th>
                  <th className="py-3.5 px-4 text-center border-r border-slate-800">
                    டீலர் விலை
                    <span className="block text-[10px] text-blue-300 font-normal">(Wholesale)</span>
                  </th>
                  <th className="py-3.5 px-4 text-center border-r border-slate-800">
                    விற்பனை MRP
                    <span className="block text-[10px] text-slate-400 font-normal">(Retail)</span>
                  </th>
                  <th className="py-3.5 px-4 text-center border-r border-slate-800">
                    டீலர் லாபம்
                    <span className="block text-[10px] text-emerald-300 font-normal">(Profit)</span>
                  </th>
                  {onSelectPackage && (
                    <th className="py-3.5 px-4 text-center w-28">
                      தேர்வு
                      <span className="block text-[10px] text-slate-400 font-normal">Action</span>
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-800 text-sm">
                {currentItems.map((item, idx) => {
                  const isSelected = selectedPackageId === item.id;
                  return (
                    <tr
                      key={item.id}
                      className={`hover:bg-blue-50/40 transition-colors ${
                        isSelected ? 'bg-blue-50/70 font-medium' : idx % 2 === 1 ? 'bg-slate-50/50' : 'bg-white'
                      }`}
                    >
                      <td className="py-4 px-4 text-center font-bold text-slate-600 border-r border-slate-200">
                        {idx + 1}
                      </td>
                      <td className="py-4 px-4 border-r border-slate-200">
                        <div className="flex flex-col">
                          <span className="font-semibold text-slate-900 flex items-center gap-2">
                            {item.packageTitleTa}
                            {item.badge && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-100 text-amber-800 border border-amber-200">
                                {item.badge}
                              </span>
                            )}
                          </span>
                          <span className="text-xs text-slate-500 font-normal mt-0.5">
                            {item.packageTitleEn}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-center border-r border-slate-200">
                        <span className="inline-block px-3 py-1 rounded-md bg-blue-50 text-blue-700 font-bold border border-blue-200 text-sm tracking-tight">
                          ₹{item.dealerPrice.toFixed(2)}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center text-slate-600 font-medium border-r border-slate-200">
                        ₹{item.mrp.toFixed(2)}
                      </td>
                      <td className="py-4 px-4 text-center border-r border-slate-200">
                        <span className="inline-block px-3 py-1 rounded-md bg-emerald-50 text-emerald-700 font-bold border border-emerald-200 text-sm tracking-tight">
                          ₹{item.dealerProfit.toFixed(2)}
                        </span>
                      </td>
                      {onSelectPackage && (
                        <td className="py-4 px-4 text-center">
                          <button
                            type="button"
                            onClick={() => {
                              onSelectPackage(item);
                              onClose();
                            }}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 w-full transition-colors ${
                              isSelected
                                ? 'bg-emerald-600 text-white shadow-xs'
                                : 'bg-slate-100 text-slate-700 hover:bg-blue-600 hover:text-white'
                            }`}
                          >
                            {isSelected ? (
                              <>
                                <Check className="w-3.5 h-3.5" />
                                Selected
                              </>
                            ) : (
                              <>Select</>
                            )}
                          </button>
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Quick Notes */}
          <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1.5">
            <div className="font-semibold text-slate-800 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Dealer Advantages with Reya Designs:
            </div>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>High-resolution 300 DPI edge-to-edge dye-sublimation / thermal printing on premium PVC.</li>
              <li>Free scratch-resistant gloss / matte lamination finish on both sides.</li>
              <li>Bulk dealer discounts available for orders over 50+ cards. Contact on WhatsApp for custom quotes.</li>
              <li>Fast dispatch within 24-48 hours after artwork approval.</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-100 px-6 py-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-500">
            For custom bulk orders or branded lanyards, contact WhatsApp: <strong className="text-slate-800">7708910190</strong>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold transition-colors"
          >
            Close Price List
          </button>
        </div>
      </div>
    </div>
  );
};
