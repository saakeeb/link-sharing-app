import { Option } from '@/components/Form';

export const MAX_IMAGE_SIZE = 5000000;
export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/svg+xml'];
export const DEFAULT_CURRENCY_SYMBOL = '$';
export const DEFAULT_ROLE = 'ADMIN';
export const DEFAULT_TIME_FORMAT = 'hh:mm A';
export const DEFAULT_DATE_FORMAT = 'DD.MMM.YYYY';
export const DEFAULT_DATE_TIME_FORMAT = 'DD.MM.YYYY hh:mm A';
export const DEFAULT_SORT_FORMAT = 'DESC';
export const DEFAULT_DECIMAL_FORMAT = '2';

export const LANGUAGES: Option[] = [
  {
    id: 1,
    label: 'English',
    value: 'EN',
  },
  {
    id: 2,
    label: 'Turkish',
    value: 'TR',
  },
];

export const GENDER: Option[] = [
  {
    id: 1,
    label: 'Male',
    value: 'M',
  },
  {
    id: 2,
    label: 'Female',
    value: 'F',
  },
  {
    id: 3,
    label: 'Other',
    value: 'O',
  },
];

export const ITEM_TYPES: Option[] = [
  {
    id: 1,
    label: 'Parking',
    value: 'PARK',
  },
  {
    id: 2,
    label: 'EV Charging',
    value: 'EVCH',
  },
  {
    id: 3,
    label: 'Car Washing',
    value: 'WASH',
  },
  {
    id: 4,
    label: 'Valet Parking',
    value: 'VALET',
  },
  {
    id: 5,
    label: 'Handicap Parking',
    value: 'HAND',
  },
  {
    id: 6,
    label: 'Security Monitoring',
    value: 'SEC',
  },
  {
    id: 7,
    label: 'Tire Inflation and Pressure Check',
    value: 'TIRE',
  },
  {
    id: 8,
    label: 'Oil Change and Minor Repairs',
    value: 'MAINT',
  },
  {
    id: 9,
    label: 'Airport Shuttle',
    value: 'SHUTTLE',
  },
  {
    id: 10,
    label: 'Bicycle Parking',
    value: 'BIKE',
  },
  {
    id: 11,
    label: 'Vehicle Inspection',
    value: 'INSPECT',
  },
  {
    id: 12,
    label: 'Reservation Services',
    value: 'RESERVE',
  },
  {
    id: 13,
    label: 'Customer Loyalty Programs',
    value: 'LOYALTY',
  },
  {
    id: 14,
    label: 'Touchless Payment Options',
    value: 'TOUCHLESS',
  },
];

export const PAYMENT_TYPES: Option[] = [
  {
    id: 1,
    label: 'Cash',
    value: 'CASH',
  },
  {
    id: 2,
    label: 'Mobile Pay',
    value: 'MOBILE',
  },
  {
    id: 3,
    label: 'Card',
    value: 'CARD',
  },
  {
    id: 4,
    label: 'Wallet',
    value: 'WALLET',
  },
];

export const SUBSCRIPTION_TYPES: Option[] = [
  {
    id: 1,
    label: 'Daily',
    value: 'DAILY',
  },
  {
    id: 2,
    label: 'Weekly',
    value: 'WEEKLY',
  },
  {
    id: 3,
    label: 'Monthly',
    value: 'MONTHLY',
  },
  {
    id: 4,
    label: 'Yearly',
    value: 'YEARLY',
  },
];

export const BRANCH_TYPE: Option[] = [
  {
    id: 1,
    label: 'Branch',
    value: '1',
  },
  {
    id: 2,
    label: 'Room',
    value: '2',
  },
];

export const UNIT: Option[] = [
  { id: 1, label: 'Tariff wise', value: 'TW' },
  { id: 2, label: 'Per Hour', value: 'PH' },
  { id: 3, label: 'Per Minute', value: 'PM' },
  { id: 4, label: 'Per Service', value: 'PS' },
  { id: 5, label: 'Kilogram', value: 'KG' },
  { id: 6, label: 'Box', value: 'BOX' },
  { id: 7, label: 'Piece', value: 'PC' },
  { id: 8, label: 'Liter', value: 'L' },
  { id: 9, label: 'Bundle', value: 'BND' },
  { id: 10, label: 'Pack', value: 'PACK' },
  { id: 11, label: 'Set', value: 'SET' },
  { id: 12, label: 'Meter', value: 'M' },
  { id: 13, label: 'Square Meter', value: 'SQM' },
  { id: 14, label: 'Cubic Meter', value: 'CBM' },
  { id: 15, label: 'Dozen', value: 'DZ' },
  { id: 16, label: 'Pair', value: 'PR' },
];

export const PRICE_CALCULATION_TYPES: Option[] = [
  {
    id: 1,
    label: 'Per Minute Wise',
    value: 1,
  },
  {
    id: 2,
    label: 'Per Hour',
    value: 2,
  },
  {
    id: 3,
    label: 'Per Service',
    value: 3,
  },
];

export const YEARS: Option[] = Array.from({ length: 10 }, (_, index) => {
  const currentYear = new Date().getFullYear();
  const year = currentYear + index;
  return {
    id: index + 1,
    label: year.toString(),
    value: year.toString(),
  };
});

export const TIME_FORMATS = [
  { id: 1, value: 'hh:mm:ss A', label: 'HH:MM:SS AM/PM (e.g., 08:15:30 PM)' },
  { id: 2, value: 'hh:mm A', label: 'HH:MM AM/PM (e.g., 08:15 PM)' },
  { id: 3, value: 'HH:mm:ss', label: 'HH:MM:SS (24-hour format, e.g., 20:15:30)' },
  { id: 4, value: 'HH:mm', label: 'HH:MM (24-hour format, e.g., 20:15)' },
];

export const DATE_FORMATS = [
  { id: 1, value: 'MM/DD/YYYY', label: 'MM/DD/YYYY (e.g., 04/03/2024)' },
  { id: 2, value: 'DD.MM.YYYY', label: 'DD.MM.YYYY (e.g., 03.04.2024)' },
  { id: 3, value: 'DD/MM/YYYY', label: 'DD/MM/YYYY (e.g., 03/04/2024)' },
  { id: 4, value: 'MMM/DD/YYYY', label: 'MMM/DD/YYYY (e.g., Apr/03/2024)' },
  { id: 5, value: 'DD.MMM.YYYY', label: 'DD.MMM.YYYY (e.g., 03.Apr.2024)' },
  { id: 6, value: 'DD/MMM/YYYY', label: 'DD/MMM/YYYY (e.g., 03/Apr/2024)' },
];

export const DATE_TIME_FORMATS = [
  {
    id: 1,
    value: 'MM/DD/YYYY hh:mm:ss A',
    label: 'MM/DD/YYYY HH:MM:SS AM/PM (e.g., 04/03/2024 08:15:30 PM)',
  },
  {
    id: 2,
    value: 'MM/DD/YYYY hh:mm A',
    label: 'MM/DD/YYYY HH:MM AM/PM (e.g., 04/03/2024 08:15 PM)',
  },
  {
    id: 3,
    value: 'DD.MM.YYYY HH:mm:ss',
    label: 'DD.MM.YYYY HH:MM:SS (24-hour format, e.g., 03.04.2024 20:15:30)',
  },
  {
    id: 4,
    value: 'DD.MM.YYYY HH:mm',
    label: 'DD.MM.YYYY HH:MM (24-hour format, e.g., 03.04.2024 20:15:30)',
  },
  {
    id: 5,
    value: 'DD.MM.YYYY hh:mm:ss A',
    label: 'DD.MM.YYYY HH:MM:SS AM/PM (12-hour format, e.g., 03.04.2024 08:15:30 PM)',
  },
  {
    id: 6,
    value: 'DD.MM.YYYY hh:mm A',
    label: 'DD.MM.YYYY HH:MM AM/PM (12-hour format, e.g., 03.04.2024 08:15 PM)',
  },
  {
    id: 7,
    value: 'DD/MM/YYYY HH:mm:ss',
    label: 'DD/MM/YYYY HH:MM:SS (24-hour format,e.g., 03/04/2024 20:15:30)',
  },
  {
    id: 8,
    value: 'DD/MM/YYYY HH:mm',
    label: 'DD/MM/YYYY HH:MM (24-hour format,e.g., 03/04/2024 20:15)',
  },
  {
    id: 9,
    value: 'MMM/DD/YYYY hh:mm:ss A',
    label: 'MMM/DD/YYYY HH:MM:SS AM/PM (e.g., Apr/03/2024 08:15:30 PM)',
  },
  {
    id: 10,
    value: 'MMM/DD/YYYY hh:mm A',
    label: 'MMM/DD/YYYY HH:MM AM/PM (e.g., Apr/03/2024 08:15 PM)',
  },
  {
    id: 11,
    value: 'DD.MMM.YYYY HH:mm:ss',
    label: 'DD.MMM.YYYY HH:MM:SS (24-hour format, e.g., 03.Apr.2024 20:15:30)',
  },
  {
    id: 12,
    value: 'DD.MMM.YYYY HH:mm',
    label: 'DD.MMM.YYYY HH:MM (24-hour format, e.g., 03.Apr.2024 20:15)',
  },
  {
    id: 13,
    value: 'DD/MMM/YYYY HH:mm:ss',
    label: 'DD/MMM/YYYY HH:MM:SS (24-hour format, e.g., 03/Apr/2024 20:15:30)',
  },
  {
    id: 14,
    value: 'DD/MMM/YYYY HH:mm',
    label: 'DD/MMM/YYYY HH:MM (24-hour format, e.g., 03/Apr/2024 20:15)',
  },
];

export const ORDER_BY = [
  { id: 1, value: 'ASC', label: 'Ascending' },
  { id: 2, value: 'DESC', label: 'Descending' },
];
