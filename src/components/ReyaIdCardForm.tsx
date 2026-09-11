import React, { useState, useRef } from 'react';
import {
  Upload,
  FileText,
  X,
  Eye,
  Tag,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Layers,
  ArrowRight,
  RefreshCw,
  CreditCard,
} from 'lucide-react';
import { UploadedCardFile, OrderFormData, PriceItem } from '../types';
import { ALL_PRICE_ITEMS } from '../data/priceList';

interface ReyaIdCardFormProps {
  onOpenPriceList: () => void;
  onSubmitOrder: (formData: OrderFormData) => void;
  selectedPackageFromModal?: PriceItem | null;
}

export const ReyaIdCardForm: React.FC<ReyaIdCardFormProps> = ({
  onOpenPriceList,
  onSubmitOrder,
  selectedPackageFromModal,
}) => {
  const [dealerName, setDealerName] = useState('');
  const [clientName, setClientName] = useState('');
  const [dealerPhone, setDealerPhone] = useState('');
  const [idCardFront, setIdCardFront] = useState<UploadedCardFile | null>(null);
  const [idCardBack, setIdCardBack] = useState<UploadedCardFile | null>(null);
  const [selectedPackageId, setSelectedPackageId] = useState<number>(1);
  const [quantity, setQuantity] = useState<number>(1);
  const [notes, setNotes] = useState('');

  // Active preview tab for uploaded card mockup
  const [previewSide, setPreviewSide] = useState<'front' | 'back'>('front');

  // Drag states
  const [isDraggingFront, setIsDraggingFront] = useState(false);
  const [isDraggingBack, setIsDraggingBack] = useState(false);

  // Form validation errors
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const frontInputRef = useRef<HTMLInputElement>(null);
  const backInputRef = useRef<HTMLInputElement>(null);

  // Sync selected package from modal if user chose one
  React.useEffect(() => {
    if (selectedPackageFromModal) {
      setSelectedPackageId(selectedPackageFromModal.id);
    }
  }, [selectedPackageFromModal]);

  const processFile = (file: File): UploadedCardFile => {
    const previewUrl = URL.createObjectURL(file);
    return {
      file,
      name: file.name,
      size: file.size,
      previewUrl,
      type: file.type,
    };
  };

  const handleFrontFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = processFile(e.target.files[0]);
      setIdCardFront(file);
      setPreviewSide('front');
      if (errors.idCardFront) {
        setErrors((prev) => ({ ...prev, idCardFront: '' }));
      }
    }
  };

  const handleBackFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = processFile(e.target.files[0]);
      setIdCardBack(file);
      setPreviewSide('back');
    }
  };

  const handleFrontDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingFront(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = processFile(e.dataTransfer.files[0]);
      setIdCardFront(file);
      setPreviewSide('front');
      if (errors.idCardFront) {
        setErrors((prev) => ({ ...prev, idCardFront: '' }));
      }
    }
  };

  const handleBackDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingBack(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = processFile(e.dataTransfer.files[0]);
      setIdCardBack(file);
      setPreviewSide('back');
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1048576).toFixed(1) + ' MB';
  };

  const selectedPackage =
    ALL_PRICE_ITEMS.find((p) => p.id === selectedPackageId) || ALL_PRICE_ITEMS[0];
  const estimatedWholesaleTotal = selectedPackage ? selectedPackage.dealerPrice * quantity : 0;
  const estimatedRetailTotal = selectedPackage ? selectedPackage.mrp * quantity : 0;
  const estimatedDealerProfit = selectedPackage ? selectedPackage.dealerProfit * quantity : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { [key: string]: string } = {};

    if (!dealerName.trim()) {
      newErrors.dealerName = 'Please enter Dealer Name';
    }

    if (!clientName.trim()) {
      newErrors.clientName = 'Please enter Client Name';
    }

    if (!idCardFront) {
      newErrors.idCardFront = 'Please upload the front side ID Card file';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Scroll to top of form
      const formTop = document.getElementById('reya-id-card-form');
      if (formTop) {
        formTop.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      onSubmitOrder({
        dealerName: dealerName.trim(),
        clientName: clientName.trim(),
        dealerPhone: dealerPhone.trim(),
        idCardFront,
        idCardBack,
        packageId: selectedPackageId,
        category: selectedPackage.category,
        quantity: Math.max(1, quantity),
        notes: notes.trim(),
      });
    }, 400);
  };

  return (
    <div id="reya-id-card-form-wrapper" className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Form Container */}
      <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
        {/* Form Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-blue-900 text-white px-6 sm:px-8 py-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-blue-300">
                <CreditCard className="w-4 h-4" />
                Official Order Dispatch
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mt-1">
                Reya ID Card Form
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Submit ID card details and artwork. Submissions are dispatched directly to{' '}
                <span className="text-blue-300 font-medium underline">reyadesigns@gmail.com</span>
              </p>
            </div>

            <div className="hidden sm:block">
              <button
                type="button"
                onClick={onOpenPriceList}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-semibold backdrop-blur-xs transition-colors"
              >
                <Tag className="w-3.5 h-3.5 text-blue-300" />
                <span>Check Price List</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Form Body */}
        <form id="reya-id-card-form" onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-8">
          {/* Section 1: Dealer & Client Information */}
          <div className="space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs">
                1
              </span>
              Dealer &amp; Client Details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Field 1: Dealer Name */}
              <div className="space-y-1.5">
                <label
                  htmlFor="dealer-name-input"
                  className="block text-sm font-semibold text-slate-800"
                >
                  Dealer Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="dealer-name-input"
                  type="text"
                  required
                  value={dealerName}
                  onChange={(e) => {
                    setDealerName(e.target.value);
                    if (errors.dealerName) {
                      setErrors((prev) => ({ ...prev, dealerName: '' }));
                    }
                  }}
                  placeholder="e.g., Sri Sai Graphics / John Doe"
                  className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-3 transition-colors ${
                    errors.dealerName
                      ? 'border-red-400 bg-red-50/30 focus:ring-red-200'
                      : 'border-slate-300 bg-white hover:border-slate-400 focus:border-blue-500 focus:ring-blue-100'
                  }`}
                />
                {errors.dealerName && (
                  <p className="text-xs text-red-600 flex items-center gap-1 mt-1 font-medium">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.dealerName}
                  </p>
                )}
              </div>

              {/* Field 2: Client Name */}
              <div className="space-y-1.5">
                <label
                  htmlFor="client-name-input"
                  className="block text-sm font-semibold text-slate-800"
                >
                  Client Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="client-name-input"
                  type="text"
                  required
                  value={clientName}
                  onChange={(e) => {
                    setClientName(e.target.value);
                    if (errors.clientName) {
                      setErrors((prev) => ({ ...prev, clientName: '' }));
                    }
                  }}
                  placeholder="e.g., St. Joseph School / TechCorp / Karthik"
                  className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-3 transition-colors ${
                    errors.clientName
                      ? 'border-red-400 bg-red-50/30 focus:ring-red-200'
                      : 'border-slate-300 bg-white hover:border-slate-400 focus:border-blue-500 focus:ring-blue-100'
                  }`}
                />
                {errors.clientName && (
                  <p className="text-xs text-red-600 flex items-center gap-1 mt-1 font-medium">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.clientName}
                  </p>
                )}
              </div>

              {/* Optional Dealer Phone */}
              <div className="space-y-1.5 sm:col-span-2">
                <label
                  htmlFor="dealer-phone-input"
                  className="block text-sm font-semibold text-slate-800"
                >
                  Dealer WhatsApp / Phone Number <span className="text-xs text-slate-400 font-normal">(Optional for delivery updates)</span>
                </label>
                <input
                  id="dealer-phone-input"
                  type="tel"
                  value={dealerPhone}
                  onChange={(e) => setDealerPhone(e.target.value)}
                  placeholder="e.g., 9876543210"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-sm text-slate-800 placeholder-slate-400 hover:border-slate-400 focus:border-blue-500 focus:ring-3 focus:ring-blue-100 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Section 2: ID Card File Uploads (Front & Back) */}
          <div className="space-y-4 pt-2 border-t border-slate-200">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs">
                  2
                </span>
                Card Artwork Uploads
              </h2>
              <span className="text-xs text-slate-500 font-normal">
                Supported formats: PNG, JPG, JPEG, WEBP, PDF (Max 25MB)
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Field 3: ID Card (Front) */}
              <div className="space-y-2">
                <label
                  htmlFor="id-card-front-input"
                  className="block text-sm font-semibold text-slate-800 flex items-center justify-between"
                >
                  <span>
                    ID Card <span className="text-xs text-blue-600 font-bold">(Front Side)</span>{' '}
                    <span className="text-red-500">*</span>
                  </span>
                  {idCardFront && (
                    <span className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> File Selected
                    </span>
                  )}
                </label>

                {/* Upload Box */}
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDraggingFront(true);
                  }}
                  onDragLeave={() => setIsDraggingFront(false)}
                  onDrop={handleFrontDrop}
                  className={`border-2 border-dashed rounded-2xl p-5 text-center transition-all ${
                    isDraggingFront
                      ? 'border-blue-500 bg-blue-50/60'
                      : errors.idCardFront
                      ? 'border-red-400 bg-red-50/20'
                      : idCardFront
                      ? 'border-emerald-300 bg-emerald-50/20'
                      : 'border-slate-300 hover:border-blue-400 bg-slate-50/50'
                  }`}
                >
                  <input
                    id="id-card-front-input"
                    ref={frontInputRef}
                    type="file"
                    accept="image/*,application/pdf"
                    onChange={handleFrontFileChange}
                    className="hidden"
                  />

                  {idCardFront ? (
                    <div className="space-y-3">
                      {/* Thumbnail Preview */}
                      <div className="relative mx-auto w-36 h-24 bg-slate-100 rounded-xl overflow-hidden border border-slate-200 shadow-xs flex items-center justify-center">
                        {idCardFront.type.startsWith('image/') ? (
                          <img
                            src={idCardFront.previewUrl}
                            alt="Front Card Preview"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="flex flex-col items-center text-slate-500">
                            <FileText className="w-8 h-8 text-blue-600" />
                            <span className="text-[10px] font-mono mt-1 uppercase">PDF Document</span>
                          </div>
                        )}
                        <button
                          type="button"
                          onClick={() => setIdCardFront(null)}
                          className="absolute top-1 right-1 p-1 bg-black/60 hover:bg-black/80 text-white rounded-full transition-colors"
                          title="Remove File"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-left bg-white p-2.5 rounded-lg border border-slate-200 text-xs">
                        <p className="font-semibold text-slate-800 truncate" title={idCardFront.name}>
                          {idCardFront.name}
                        </p>
                        <p className="text-slate-400 mt-0.5">{formatFileSize(idCardFront.size)}</p>
                      </div>

                      <button
                        id="choose-file-front-btn-replace"
                        type="button"
                        onClick={() => frontInputRef.current?.click()}
                        className="w-full py-2 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-colors"
                      >
                        Change File
                      </button>
                    </div>
                  ) : (
                    <div className="py-4 space-y-3">
                      <div className="mx-auto w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                        <Upload className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm font-medium text-slate-700">
                          Drag &amp; drop front card artwork here
                        </p>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          High resolution CMYK / RGB recommended
                        </p>
                      </div>
                      <button
                        id="choose-file-front-btn"
                        type="button"
                        onClick={() => frontInputRef.current?.click()}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        Choose File
                      </button>
                    </div>
                  )}
                </div>

                {errors.idCardFront && (
                  <p className="text-xs text-red-600 flex items-center gap-1 mt-1 font-medium">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.idCardFront}
                  </p>
                )}
              </div>

              {/* Field 4: ID Card Back Side */}
              <div className="space-y-2">
                <label
                  htmlFor="id-card-back-input"
                  className="block text-sm font-semibold text-slate-800 flex items-center justify-between"
                >
                  <span>
                    ID Card Back Side{' '}
                    <span className="text-xs text-slate-400 font-normal">(Double side print)</span>
                  </span>
                  {idCardBack && (
                    <span className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> File Selected
                    </span>
                  )}
                </label>

                {/* Upload Box */}
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDraggingBack(true);
                  }}
                  onDragLeave={() => setIsDraggingBack(false)}
                  onDrop={handleBackDrop}
                  className={`border-2 border-dashed rounded-2xl p-5 text-center transition-all ${
                    isDraggingBack
                      ? 'border-indigo-500 bg-indigo-50/60'
                      : idCardBack
                      ? 'border-emerald-300 bg-emerald-50/20'
                      : 'border-slate-300 hover:border-indigo-400 bg-slate-50/50'
                  }`}
                >
                  <input
                    id="id-card-back-input"
                    ref={backInputRef}
                    type="file"
                    accept="image/*,application/pdf"
                    onChange={handleBackFileChange}
                    className="hidden"
                  />

                  {idCardBack ? (
                    <div className="space-y-3">
                      {/* Thumbnail Preview */}
                      <div className="relative mx-auto w-36 h-24 bg-slate-100 rounded-xl overflow-hidden border border-slate-200 shadow-xs flex items-center justify-center">
                        {idCardBack.type.startsWith('image/') ? (
                          <img
                            src={idCardBack.previewUrl}
                            alt="Back Card Preview"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="flex flex-col items-center text-slate-500">
                            <FileText className="w-8 h-8 text-indigo-600" />
                            <span className="text-[10px] font-mono mt-1 uppercase">PDF Document</span>
                          </div>
                        )}
                        <button
                          type="button"
                          onClick={() => setIdCardBack(null)}
                          className="absolute top-1 right-1 p-1 bg-black/60 hover:bg-black/80 text-white rounded-full transition-colors"
                          title="Remove File"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-left bg-white p-2.5 rounded-lg border border-slate-200 text-xs">
                        <p className="font-semibold text-slate-800 truncate" title={idCardBack.name}>
                          {idCardBack.name}
                        </p>
                        <p className="text-slate-400 mt-0.5">{formatFileSize(idCardBack.size)}</p>
                      </div>

                      <button
                        id="choose-file-back-btn-replace"
                        type="button"
                        onClick={() => backInputRef.current?.click()}
                        className="w-full py-2 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-colors"
                      >
                        Change File
                      </button>
                    </div>
                  ) : (
                    <div className="py-4 space-y-3">
                      <div className="mx-auto w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center">
                        <Layers className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm font-medium text-slate-700">
                          Drag &amp; drop back side artwork here
                        </p>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          Optional for single-side; recommended for double-side
                        </p>
                      </div>
                      <button
                        id="choose-file-back-btn"
                        type="button"
                        onClick={() => backInputRef.current?.click()}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold shadow-xs transition-colors"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        Choose File
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Interactive Live Card Visualizer when at least one file is uploaded */}
            {(idCardFront || idCardBack) && (
              <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-blue-300 flex items-center gap-1.5">
                    <Eye className="w-4 h-4" /> Live Artwork Preview
                  </span>
                  <div className="flex items-center gap-1 bg-slate-800 p-0.5 rounded-lg text-xs">
                    <button
                      type="button"
                      onClick={() => setPreviewSide('front')}
                      className={`px-3 py-1 rounded-md font-medium transition-all ${
                        previewSide === 'front'
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Front Side
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreviewSide('back')}
                      disabled={!idCardBack}
                      className={`px-3 py-1 rounded-md font-medium transition-all ${
                        previewSide === 'back'
                          ? 'bg-blue-600 text-white shadow-xs'
                          : !idCardBack
                          ? 'text-slate-600 cursor-not-allowed'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Back Side {!idCardBack && '(None)'}
                    </button>
                  </div>
                </div>

                <div className="flex justify-center py-2">
                  <div className="w-56 h-88 bg-white rounded-2xl p-2 border-4 border-slate-700 shadow-2xl flex flex-col items-center justify-center overflow-hidden relative">
                    {previewSide === 'front' && idCardFront ? (
                      idCardFront.type.startsWith('image/') ? (
                        <img
                          src={idCardFront.previewUrl}
                          alt="Front card preview"
                          className="w-full h-full object-contain rounded-xl"
                        />
                      ) : (
                        <div className="text-center p-4 text-slate-800">
                          <FileText className="w-12 h-12 text-blue-600 mx-auto mb-2" />
                          <p className="text-xs font-semibold">{idCardFront.name}</p>
                          <p className="text-[10px] text-slate-500">PDF Ready for Prepress</p>
                        </div>
                      )
                    ) : previewSide === 'back' && idCardBack ? (
                      idCardBack.type.startsWith('image/') ? (
                        <img
                          src={idCardBack.previewUrl}
                          alt="Back card preview"
                          className="w-full h-full object-contain rounded-xl"
                        />
                      ) : (
                        <div className="text-center p-4 text-slate-800">
                          <FileText className="w-12 h-12 text-indigo-600 mx-auto mb-2" />
                          <p className="text-xs font-semibold">{idCardBack.name}</p>
                          <p className="text-[10px] text-slate-500">PDF Ready for Prepress</p>
                        </div>
                      )
                    ) : (
                      <div className="text-center p-4 text-slate-400">
                        <CreditCard className="w-10 h-10 mx-auto mb-2 opacity-50" />
                        <p className="text-xs">No artwork uploaded for this side</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* REQUIREMENT: "Below this, there should be a 'Price List' link that displays the price list I provide when clicked." */}
            <div className="pt-3 pb-2 text-center sm:text-left">
              <button
                id="price-list-link-button"
                type="button"
                onClick={onOpenPriceList}
                className="group inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100/80 text-blue-700 font-semibold text-sm border border-blue-200/90 transition-all duration-200 hover:shadow-xs cursor-pointer"
              >
                <Tag className="w-4 h-4 text-blue-600 group-hover:scale-110 transition-transform" />
                <span>Price List</span>
                <span className="text-xs font-normal text-blue-600/80">
                  (Click to view wholesale rates &amp; profit margins)
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-blue-500 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* Section 3: Package & Quantity Selection */}
          <div className="space-y-4 pt-2 border-t border-slate-200">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs">
                3
              </span>
              Package &amp; Order Quantity
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Package Selector */}
              <div className="space-y-1.5 sm:col-span-2">
                <label
                  htmlFor="package-selector"
                  className="block text-sm font-semibold text-slate-800"
                >
                  Select Printing Package
                </label>
                <select
                  id="package-selector"
                  value={selectedPackageId}
                  onChange={(e) => setSelectedPackageId(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-sm text-slate-800 focus:border-blue-500 focus:ring-3 focus:ring-blue-100 transition-colors"
                >
                  <optgroup label="Standard PVC Cards (இருபுற பிரிண்டிங்)">
                    {ALL_PRICE_ITEMS.filter((p) => p.category === 'standard').map((pkg) => (
                      <option key={pkg.id} value={pkg.id}>
                        {pkg.packageTitleTa} — Wholesale: ₹{pkg.dealerPrice} | MRP: ₹{pkg.mrp}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Smart RFID Cards (RFID ஸ்மார்ட் கார்டு)">
                    {ALL_PRICE_ITEMS.filter((p) => p.category === 'rfid').map((pkg) => (
                      <option key={pkg.id} value={pkg.id}>
                        {pkg.packageTitleTa} — Wholesale: ₹{pkg.dealerPrice} | MRP: ₹{pkg.mrp}
                      </option>
                    ))}
                  </optgroup>
                </select>
              </div>

              {/* Quantity */}
              <div className="space-y-1.5">
                <label
                  htmlFor="quantity-input"
                  className="block text-sm font-semibold text-slate-800"
                >
                  Quantity (Cards)
                </label>
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3.5 py-3 border border-r-0 border-slate-300 rounded-l-xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-sm"
                  >
                    -
                  </button>
                  <input
                    id="quantity-input"
                    type="number"
                    min="1"
                    max="10000"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full text-center py-3 border-y border-slate-300 text-sm font-bold text-slate-900 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-3.5 py-3 border border-l-0 border-slate-300 rounded-r-xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-sm"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Live Pricing Breakdown Card */}
            {selectedPackage && (
              <div className="rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/80 p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-blue-700 uppercase tracking-wide">
                    Live Wholesale Pricing
                  </span>
                  <p className="text-sm font-bold text-slate-900">
                    {selectedPackage.packageTitleTa}
                  </p>
                  <p className="text-xs text-slate-500">
                    Unit Dealer Rate: ₹{selectedPackage.dealerPrice.toFixed(2)} &bull; Suggested Retail MRP: ₹
                    {selectedPackage.mrp.toFixed(2)}
                  </p>
                </div>

                <div className="flex items-center gap-4 text-right">
                  <div>
                    <span className="text-xs text-slate-500 block">Wholesale Cost</span>
                    <span className="text-xl font-extrabold text-blue-700">
                      ₹{estimatedWholesaleTotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="border-l border-blue-200 pl-4">
                    <span className="text-xs text-emerald-600 block font-semibold">Dealer Profit</span>
                    <span className="text-xl font-extrabold text-emerald-600">
                      +₹{estimatedDealerProfit.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Special Instructions */}
            <div className="space-y-1.5">
              <label
                htmlFor="order-notes-input"
                className="block text-sm font-semibold text-slate-800"
              >
                Special Instructions / Lanyard Color / Remarks{' '}
                <span className="text-xs text-slate-400 font-normal">(Optional)</span>
              </label>
              <textarea
                id="order-notes-input"
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g., Please use blue lanyards with school name printed, gloss finish required, delivery by Friday."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-sm text-slate-800 placeholder-slate-400 hover:border-slate-400 focus:border-blue-500 focus:ring-3 focus:ring-blue-100 transition-colors"
              />
            </div>
          </div>

          {/* Section 4: Submission Notice & Submit Button */}
          {/* REQUIREMENT: "At the bottom, there should be a 'Submit' button." */}
          <div className="pt-4 border-t border-slate-200 space-y-4">
            <div className="flex items-start gap-2.5 text-xs text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-200">
              <Sparkles className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                Upon clicking <strong className="text-slate-800">Submit</strong>, the complete form details,
                artwork filenames, client name, and dealer specifications will be forwarded to{' '}
                <strong className="text-slate-900 underline">reyadesigns@gmail.com</strong>.
              </div>
            </div>

            <button
              id="submit-id-card-form-btn"
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-3 disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>Processing Submission...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Submit</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
