import { PriceItem } from '../types';

export const STANDARD_PRICE_LIST: PriceItem[] = [
  {
    id: 1,
    category: 'standard',
    packageTitleEn: 'Only Card (Double Side Printing)',
    packageTitleTa: 'Only Card (கார்டு மட்டும் - இருபுற பிரிண்டிங்)',
    dealerPrice: 30.00,
    mrp: 60.00,
    dealerProfit: 30.00,
    badge: 'Popular',
  },
  {
    id: 2,
    category: 'standard',
    packageTitleEn: 'Card + Transparent Case',
    packageTitleTa: 'Card + Transparent Case (கார்டு + டிரான்ஸ்பரண்ட் பவுச்)',
    dealerPrice: 40.00,
    mrp: 80.00,
    dealerProfit: 40.00,
  },
  {
    id: 3,
    category: 'standard',
    packageTitleEn: 'Card + Case + Plain Lanyard',
    packageTitleTa: 'Card + Case + Plain Lanyard (கார்டு + பவுச் + சாதாரண கயிறு)',
    dealerPrice: 55.00,
    mrp: 110.00,
    dealerProfit: 55.00,
    badge: 'Best Value',
  },
  {
    id: 4,
    category: 'standard',
    packageTitleEn: 'Card + Case + Multi-color Lanyard',
    packageTitleTa: 'Card + Case + Multi-color Lanyard (கார்டு + பிராண்டட் கயிறு)',
    dealerPrice: 85.00,
    mrp: 160.00,
    dealerProfit: 75.00,
    badge: 'Premium',
  },
];

export const RFID_PRICE_LIST: PriceItem[] = [
  {
    id: 101,
    category: 'rfid',
    packageTitleEn: 'Only RFID Card (Smart Card)',
    packageTitleTa: 'Only RFID Card (ஸ்மார்ட் கார்டு மட்டும்)',
    dealerPrice: 65.00,
    mrp: 120.00,
    dealerProfit: 55.00,
    badge: 'Smart NFC',
  },
  {
    id: 102,
    category: 'rfid',
    packageTitleEn: 'RFID Card + Transparent Case',
    packageTitleTa: 'RFID Card + Transparent Case (கார்டு + பவுச்)',
    dealerPrice: 75.00,
    mrp: 140.00,
    dealerProfit: 65.00,
  },
  {
    id: 103,
    category: 'rfid',
    packageTitleEn: 'RFID Card + Case + Plain Lanyard',
    packageTitleTa: 'RFID Card + Case + Plain Lanyard (கார்டு + பவுச் + கயிறு)',
    dealerPrice: 90.00,
    mrp: 170.00,
    dealerProfit: 80.00,
    badge: 'Popular',
  },
  {
    id: 104,
    category: 'rfid',
    packageTitleEn: 'RFID Card + Case + Multi-color Lanyard',
    packageTitleTa: 'RFID Card + Case + Multi-color Lanyard (மல்டிகலர் கயிறு)',
    dealerPrice: 125.00,
    mrp: 230.00,
    dealerProfit: 105.00,
    badge: 'Executive',
  },
];

export const ALL_PRICE_ITEMS: PriceItem[] = [...STANDARD_PRICE_LIST, ...RFID_PRICE_LIST];
