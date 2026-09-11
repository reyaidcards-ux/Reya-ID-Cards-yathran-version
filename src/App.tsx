/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { WelcomeScreen } from './components/WelcomeScreen';
import { ReyaIdCardForm } from './components/ReyaIdCardForm';
import { PriceListModal } from './components/PriceListModal';
import { WhatsAppButton } from './components/WhatsAppButton';
import { SubmissionSuccessModal } from './components/SubmissionSuccessModal';
import { Footer } from './components/Footer';
import { OrderFormData, SubmittedOrder, PriceItem } from './types';
import { ALL_PRICE_ITEMS } from './data/priceList';

const STORAGE_KEY = 'reya_id_card_orders';

export default function App() {
  const [currentView, setCurrentView] = useState<'welcome' | 'form'>('welcome');
  const [isPriceListOpen, setIsPriceListOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<PriceItem | null>(null);

  // Submissions
  const [orders, setOrders] = useState<SubmittedOrder[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [activeSubmittedOrder, setActiveSubmittedOrder] = useState<SubmittedOrder | null>(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  // Save orders to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
    } catch (err) {
      console.error('Failed to save order to localStorage:', err);
    }
  }, [orders]);

  const handleOrderSubmission = (formData: OrderFormData) => {
    const pkg = ALL_PRICE_ITEMS.find((p) => p.id === formData.packageId);
    const orderId = `RY-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const formatFileSize = (bytes: number) => {
      if (bytes < 1024) return bytes + ' B';
      if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
      return (bytes / 1048576).toFixed(1) + ' MB';
    };

    const newOrder: SubmittedOrder = {
      id: orderId,
      timestamp: new Date().toISOString(),
      dealerName: formData.dealerName,
      clientName: formData.clientName,
      dealerPhone: formData.dealerPhone,
      frontFileName: formData.idCardFront?.name || 'card-front.jpg',
      frontFileSize: formData.idCardFront ? formatFileSize(formData.idCardFront.size) : 'Unknown',
      backFileName: formData.idCardBack?.name,
      backFileSize: formData.idCardBack ? formatFileSize(formData.idCardBack.size) : undefined,
      packageName: pkg ? `${pkg.packageTitleTa} (${pkg.packageTitleEn})` : 'Standard PVC ID Card',
      packagePrice: pkg?.dealerPrice,
      quantity: formData.quantity,
      totalEstimatedCost: pkg ? pkg.dealerPrice * formData.quantity : undefined,
      notes: formData.notes,
      targetEmail: 'reyadesigns@gmail.com',
    };

    // Update state & order history
    setOrders((prev) => [newOrder, ...prev]);
    setActiveSubmittedOrder(newOrder);
    setIsSuccessModalOpen(true);

    // Prompt mail client directly to email reyadesigns@gmail.com
    const emailSubject = `New Reya ID Card Order [${newOrder.id}] - ${newOrder.dealerName} / ${newOrder.clientName}`;
    const emailBody = `REYA ID CARD ORDER DETAILS
------------------------------------------------
Order ID: ${newOrder.id}
Date: ${new Date(newOrder.timestamp).toLocaleString()}
Dealer Name: ${newOrder.dealerName}
Client Name: ${newOrder.clientName}
${newOrder.dealerPhone ? `Dealer Phone: ${newOrder.dealerPhone}\n` : ''}Package: ${newOrder.packageName}
Quantity: ${newOrder.quantity} card(s)
${newOrder.totalEstimatedCost ? `Estimated Wholesale Total: ₹${newOrder.totalEstimatedCost}\n` : ''}
ATTACHED DESIGN FILES:
- Front Side ID Card: ${newOrder.frontFileName} (${newOrder.frontFileSize})
${newOrder.backFileName ? `- Back Side ID Card: ${newOrder.backFileName} (${newOrder.backFileSize})\n` : '- Back Side: Single Sided\n'}
${newOrder.notes ? `Notes:\n${newOrder.notes}\n` : ''}
------------------------------------------------
Sent to: reyadesigns@gmail.com
Inquiry Contact / WhatsApp: 7708910190`;

    const mailtoUrl = `mailto:reyadesigns@gmail.com?subject=${encodeURIComponent(
      emailSubject
    )}&body=${encodeURIComponent(emailBody)}`;

    // Try to trigger mailto without navigating away
    const link = document.createElement('a');
    link.href = mailtoUrl;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleStartOrder = () => {
    setCurrentView('form');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectPackageFromModal = (pkg: PriceItem) => {
    setSelectedPackage(pkg);
    setCurrentView('form');
    setIsPriceListOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800 antialiased selection:bg-blue-600 selection:text-white">
      {/* Navigation Bar */}
      <Navbar
        currentView={currentView}
        onNavigate={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenPriceList={() => setIsPriceListOpen(true)}
        submittedOrdersCount={orders.length}
      />

      {/* Main View Transition */}
      <main className="flex-1">
        {currentView === 'welcome' ? (
          <WelcomeScreen
            onStartOrder={handleStartOrder}
            onOpenPriceList={() => setIsPriceListOpen(true)}
          />
        ) : (
          <div className="py-4">
            <ReyaIdCardForm
              onOpenPriceList={() => setIsPriceListOpen(true)}
              onSubmitOrder={handleOrderSubmission}
              selectedPackageFromModal={selectedPackage}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer
        onOpenPriceList={() => setIsPriceListOpen(true)}
        onNavigateToForm={handleStartOrder}
      />

      {/* WhatsApp Floating Button: Always visible on bottom corner */}
      <WhatsAppButton
        phoneNumber="7708910190"
        defaultMessage="Hello Reya Designs, I would like to check my ID card order status."
      />

      {/* Price List Modal (Triggered by 'Price List' link or buttons) */}
      <PriceListModal
        isOpen={isPriceListOpen}
        onClose={() => setIsPriceListOpen(false)}
        onSelectPackage={handleSelectPackageFromModal}
        selectedPackageId={selectedPackage?.id}
      />

      {/* Submission Success & Email Confirmation Dialog */}
      <SubmissionSuccessModal
        order={activeSubmittedOrder}
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        onNewOrder={() => {
          setIsSuccessModalOpen(false);
          setActiveSubmittedOrder(null);
          setCurrentView('form');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}
