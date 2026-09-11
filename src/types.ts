export interface PriceItem {
  id: number;
  packageTitleEn: string;
  packageTitleTa: string;
  dealerPrice: number; // Wholesale (டீலர் விலை)
  mrp: number; // Retail (விற்பனை MRP)
  dealerProfit: number; // Profit (டீலர் லாபம்)
  category: 'standard' | 'rfid';
  badge?: string;
}

export interface UploadedCardFile {
  file: File;
  name: string;
  size: number;
  previewUrl: string;
  type: string;
}

export interface OrderFormData {
  dealerName: string;
  clientName: string;
  dealerPhone: string;
  idCardFront: UploadedCardFile | null;
  idCardBack: UploadedCardFile | null;
  packageId?: number;
  category?: 'standard' | 'rfid';
  quantity: number;
  notes?: string;
}

export interface SubmittedOrder {
  id: string;
  timestamp: string;
  dealerName: string;
  clientName: string;
  dealerPhone?: string;
  frontFileName: string;
  frontFileSize: string;
  backFileName?: string;
  backFileSize?: string;
  packageName?: string;
  packagePrice?: number;
  quantity: number;
  totalEstimatedCost?: number;
  notes?: string;
  targetEmail: string;
}
