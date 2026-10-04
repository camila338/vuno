import { finances, type Category, type IconName } from './model';

type CategoryInfo = {
  label: string;
  icon: IconName;
  keywords: string[];
  /** Reference amounts for the "How much?" step. */
  suggestions: { amount: number; label: string }[];
};

const e = finances.monthlyExpenses;

export const categories: Record<Category, CategoryInfo> = {
  travel: {
    label: 'Travel',
    icon: 'airplane-outline',
    keywords: ['trip', 'travel', 'vacation', 'holiday', 'japan', 'europe', 'beach', 'mexico', 'paris', 'tokyo', 'flight', 'honeymoon'],
    suggestions: [
      { amount: 1200, label: 'Weekend getaway' },
      { amount: 2500, label: 'A week away' },
      { amount: 4000, label: 'Two weeks abroad' },
    ],
  },
  emergency: {
    label: 'Emergency fund',
    icon: 'shield-checkmark-outline',
    keywords: ['emergency', 'rainy day', 'safety', 'cushion', 'backup', 'just in case'],
    suggestions: [
      { amount: e, label: '1 month of expenses' },
      { amount: e * 3, label: '3 months · recommended' },
      { amount: e * 6, label: '6 months of expenses' },
    ],
  },
  tech: {
    label: 'Tech',
    icon: 'laptop-outline',
    keywords: ['laptop', 'computer', 'iphone', 'phone', 'camera', 'console', 'macbook', 'ipad', 'tablet', 'headphones'],
    suggestions: [
      { amount: 800, label: 'Phone or tablet' },
      { amount: 1500, label: 'Laptop' },
      { amount: 2500, label: 'Pro setup' },
    ],
  },
  home: {
    label: 'Home',
    icon: 'home-outline',
    keywords: ['move', 'moving', 'apartment', 'house', 'home', 'rent', 'deposit', 'furniture'],
    suggestions: [
      { amount: 1500, label: 'Rent deposit' },
      { amount: 3000, label: 'Moving and furniture' },
      { amount: 6000, label: 'Down payment' },
    ],
  },
  gift: {
    label: 'Gift',
    icon: 'gift-outline',
    keywords: ['gift', 'present', 'birthday', 'christmas', 'anniversary', 'wedding'],
    suggestions: [
      { amount: 100, label: 'Something small' },
      { amount: 250, label: 'Special gift' },
      { amount: 600, label: 'Something big' },
    ],
  },
  car: {
    label: 'Car',
    icon: 'car-outline',
    keywords: ['car', 'auto', 'motorcycle', 'bike', 'vehicle'],
    suggestions: [
      { amount: 3000, label: 'Down payment' },
      { amount: 6000, label: 'Used car' },
      { amount: 12000, label: 'New car' },
    ],
  },
  education: {
    label: 'Education',
    icon: 'school-outline',
    keywords: ['course', 'class', 'masters', 'college', 'tuition', 'school', 'certification', 'bootcamp'],
    suggestions: [
      { amount: 500, label: 'Online course' },
      { amount: 2000, label: 'Certification' },
      { amount: 6000, label: 'A semester' },
    ],
  },
  other: {
    label: 'Personal goal',
    icon: 'flag-outline',
    keywords: [],
    suggestions: [
      { amount: 500, label: 'Something small' },
      { amount: 1500, label: 'Mid-term' },
      { amount: 3000, label: 'Something big' },
    ],
  },
};

/** Quick ideas for the "What are you saving for?" step. */
export const quickIdeas: { name: string; category: Category }[] = [
  { name: 'A trip', category: 'travel' },
  { name: 'Emergency fund', category: 'emergency' },
  { name: 'New laptop', category: 'tech' },
  { name: 'Moving out', category: 'home' },
  { name: 'A course', category: 'education' },
  { name: 'A car', category: 'car' },
];

const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

/** Detects the category from what the user types ("Trip to Japan" → travel). */
export function detectCategory(name: string): Category {
  const text = normalize(name);
  for (const [key, info] of Object.entries(categories) as [Category, CategoryInfo][]) {
    if (info.keywords.some((k) => text.includes(k))) return key;
  }
  return 'other';
}
