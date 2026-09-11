import React, { useState } from 'react';
import {
  CheckCircle2,
  Mail,
  ExternalLink,
  Copy,
  Printer,
  FileText,
  RotateCcw,
  Check,
  MessageCircle,
  Clock,
  User,
  ShieldCheck,
} from 'lucide-react';
import { SubmittedOrder } from '../types';

interface SubmissionSuccessModalProps {
  order: SubmittedOrder | null;
  isOpen: boolean;
  onClose: () => void;
  onNewOrder: () => void;
}

export const SubmissionSuccessModal: React.FC<SubmissionSuccessModalProps> = ({
  order,
  isOpen,
  onClose,
  onNewOrder,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !order) return null;

  const emailSubject = `New Reya ID Card Order [${order.id}] - ${order.dealerName} / ${order.clientName}`;
  const emailBody = `REYA ID CARD ORDER DETAILS
------------------------------------------------
Order ID: ${order.id}
Date: ${new Date(order.timestamp).toLocaleString()}
Dealer Name: ${order.dealerName}
Client Name: ${order.clientName}
${order.dealerPhone ? `Dealer Phone: ${order.dealerPhone}\n` : ''}Package: ${order.packageName || 'Standard PVC Card'}
Quantity: ${order.quantity} card(s)
${order.totalEstimatedCost ? `Estimated Wholesale Total: ₹${order.totalEstimatedCost}\n` : ''}
ATTACHED DESIGN FILES:
- Front Side ID Card: ${order.frontFileName} (${order.frontFileSize})
${order.backFileName ? `- Back Side ID Card: ${order.backFileName} (${order.backFileSize})\n` : '- Back Side: Single sided / Not provided\n'}
${order.notes ? `Special Instructions / Notes:\n${order.notes}\n` : ''}
------------------------------------------------
Sent to: reyadesigns@gmail.com
Inquiry Contact / WhatsApp: 7708910190`;

  const mailtoUrl = `mailto:${order.targetEmail}?subject=${encodeURIComponent(
    emailSubject
  )}&body=${encodeURIComponent(emailBody)}`;

  const gmailWebUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    order.targetEmail
  )}&su=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

  const whatsappOrderMessage = `Hello Reya Designs, I have submitted an ID Card order on the portal:
*Order ID:* ${order.id}
*Dealer:* ${order.dealerName}
*Client:* ${order.clientName}
*Package:* ${order.packageName || 'Custom'} (${order.quantity} qty)
*Files:* ${order.frontFileName} ${order.backFileName ? `+ ${order.backFileName}` : ''}
Sent to email: ${order.targetEmail}. Kindly confirm receipt and production timeline!`;

  const whatsappUrl = `https://wa.me/917708910190?text=${encodeURIComponent(whatsappOrderMessage)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(emailBody);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      id="submission-success-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-fadeIn"
    >
      <div
        id="submission-success-modal-container"
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6 max-h-[92vh] flex flex-col"
      >
        {/* Banner */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-6 text-center relative">
          <div className="mx-auto w-14 h-14 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center mb-3">
            <CheckCircle2 className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Order Details Submitted!</h2>
          <p className="text-emerald-100 text-sm mt-1">
            Completed form details prepared for dispatch to{' '}
            <strong className="text-white underline">{order.targetEmail}</strong>
          </p>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/20 text-xs font-mono mt-3 text-emerald-100">
            <span>Ref ID:</span>
            <span className="font-bold text-white tracking-wide">{order.id}</span>
          </div>
        </div>

        {/* Order Details Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {/* Summary Box */}
          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <span className="text-xs font-semibold uppercase text-slate-500 tracking-wider">
                Order Summary
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {new Date(order.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div className="p-2.5 rounded-lg bg-white border border-slate-200/80">
                <span className="text-xs text-slate-400 block">Dealer Name</span>
                <span className="font-semibold text-slate-800">{order.dealerName}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white border border-slate-200/80">
                <span className="text-xs text-slate-400 block">Client Name</span>
                <span className="font-semibold text-slate-800">{order.clientName}</span>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-white border border-slate-200/80 text-sm">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 block">Selected Package</span>
                  <span className="font-semibold text-slate-800">
                    {order.packageName || 'Standard PVC Card (இருபுற பிரிண்டிங்)'}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 block">Quantity</span>
                  <span className="font-bold text-slate-900">{order.quantity} pcs</span>
                </div>
              </div>
            </div>

            {/* Attached Files info */}
            <div className="p-2.5 rounded-lg bg-white border border-slate-200/80 space-y-2">
              <span className="text-xs text-slate-400 block font-medium">Uploaded ID Card Artwork</span>
              <div className="flex items-center justify-between text-xs text-slate-700 bg-slate-50 p-2 rounded">
                <span className="font-medium truncate max-w-[200px] flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-blue-600" />
                  Front: {order.frontFileName}
                </span>
                <span className="text-slate-400">{order.frontFileSize}</span>
              </div>
              {order.backFileName && (
                <div className="flex items-center justify-between text-xs text-slate-700 bg-slate-50 p-2 rounded">
                  <span className="font-medium truncate max-w-[200px] flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-indigo-600" />
                    Back: {order.backFileName}
                  </span>
                  <span className="text-slate-400">{order.backFileSize}</span>
                </div>
              )}
            </div>

            {order.notes && (
              <div className="p-2.5 rounded-lg bg-white border border-slate-200/80 text-xs">
                <span className="text-slate-400 block">Notes &amp; Instructions</span>
                <p className="text-slate-700 mt-0.5">{order.notes}</p>
              </div>
            )}
          </div>

          {/* Action to trigger email delivery */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-semibold uppercase text-slate-500 tracking-wider">
              Email Dispatch &amp; Confirmation Options
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <a
                id="open-gmail-btn"
                href={gmailWebUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs sm:text-sm font-semibold transition-colors"
              >
                <Mail className="w-4 h-4 text-red-600" />
                <span>Open in Gmail (reyadesigns@)</span>
                <ExternalLink className="w-3 h-3 text-red-500" />
              </a>

              <a
                id="open-mailto-btn"
                href={mailtoUrl}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs sm:text-sm font-semibold transition-colors"
              >
                <Mail className="w-4 h-4 text-blue-600" />
                <span>Default Mail Client</span>
              </a>
            </div>

            <a
              id="confirm-whatsapp-btn"
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] border border-[#25D366]/30 text-xs sm:text-sm font-semibold transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366] fill-current" />
              <span>Notify Reya Designs on WhatsApp (7708910190)</span>
            </a>
          </div>

          {/* Quick Utility Tools */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-200">
            <button
              id="copy-order-details-btn"
              type="button"
              onClick={handleCopy}
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-semibold">Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                  <span>Copy Order Details</span>
                </>
              )}
            </button>

            <button
              id="print-order-receipt-btn"
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              <Printer className="w-3.5 h-3.5 text-slate-500" />
              <span>Print Receipt</span>
            </button>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-100 px-6 py-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <button
            id="new-order-btn"
            type="button"
            onClick={onNewOrder}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Create Another Order
          </button>

          <button
            id="close-success-modal-btn"
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
