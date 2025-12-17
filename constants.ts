import { Category, Product } from './types';

export const MANUFACTURERS = [
  "Glock", "Sig Sauer", "Smith & Wesson", "Colt", "CZ", "H&K", "Walther", "Springfield", "Beretta"
];

export const GUN_MODELS: Record<string, string[]> = {
  "Glock": ["G19 Gen 3/4/5", "G17", "G43/43X", "G48", "G26"],
  "Sig Sauer": ["P365", "P365XL", "P320 Compact", "P320 Full", "P226", "P229"],
  "Smith & Wesson": ["M&P Shield Plus", "M&P 2.0 Compact", "J-Frame Revolver"],
  "Colt": ["1911 Government 5\"", "1911 Commander 4.25\"", "Python 4\""],
  "CZ": ["P-10 C", "75 SP-01", "Shadow 2"],
  "H&K": ["VP9", "P30", "USP Compact"],
  "Walther": ["PDP Compact", "PPQ M2"],
  "Springfield": ["Hellcat", "Hellcat Pro", "Echelon"],
  "Beretta": ["92FS", "M9A4", "PX4 Storm"]
};

const DEFAULT_OPTIONS = [
  { id: 'hand', name: 'Draw Hand', values: ["Right Hand", "Left Hand"] },
  { id: 'color', name: 'Leather Finish', values: ["Mahogany", "Black"] }
];

export const PRODUCTS: Product[] = [
  // --- DUTY HOLSTERS ---
  {
    id: 'gcode-xst',
    name: 'G-Code XST KYDEX Holster for Beretta 92FS',
    category: Category.DUTY,
    price: 65.00,
    description: 'Precision molded Kydex duty holster featuring G-Code\'s proprietary XST retention system. Rapid-access security for the Beretta 92FS platform.',
    image: 'screenshot_1741131114.png',
    rating: 4.8,
    reviews: 24,
    features: ["Kydex Shell", "XST Retention", "Duty Ready"],
    options: DEFAULT_OPTIONS
  },
  {
    id: 'h201',
    name: 'Falco Professional Leather Duty Holster Model H201',
    category: Category.DUTY,
    price: 129.95,
    description: 'Professional grade full-grain leather duty holster. Hand-boned for specific firearm fit with reinforced stitching for long-term operational durability.',
    image: 'screenshot_1741131116.png',
    rating: 4.9,
    reviews: 42,
    features: ["Full Grain Leather", "Hand-Boned", "Level 1 Retention"],
    options: DEFAULT_OPTIONS,
    isBestSeller: true
  },
  {
    id: 'h202',
    name: 'Falco Duty leather holster for gun with light Model H202',
    category: Category.DUTY,
    price: 139.95,
    description: 'Premium leather duty holster designed to accommodate modern weapon-mounted lights. Combines old-world materials with tactical light compatibility.',
    image: 'screenshot_1741131117.png',
    rating: 4.8,
    reviews: 31,
    features: ["Light Compatible", "Reinforced Mouth", "Steel Core Support"],
    options: DEFAULT_OPTIONS
  },
  {
    id: 'c909',
    name: 'Falco LVL II Pancake OWB KYDEX Holster Model C909 2021',
    category: Category.DUTY,
    price: 199.95,
    description: 'Advanced Level II retention Kydex pancake holster. Offers high security with a mechanical thumb release in a slim, body-hugging OWB profile.',
    image: 'screenshot_1741131118.png',
    rating: 5.0,
    reviews: 18,
    features: ["Kydex Construction", "Level II Retention", "Slim Profile"],
    options: DEFAULT_OPTIONS
  },

  // --- HYBRID HOLSTERS ---
  {
    id: 'c904',
    name: 'Falco Kydex Belt Holster On Leather Platform model C904 2021',
    category: Category.HYBRID,
    price: 119.95,
    description: 'Falco\'s best leather platform holsters are made with belt slits on sides that curve the holster comfortably around your body shape when threaded on your gun belt.',
    image: 'screenshot_1741131119.png',
    rating: 4.9,
    reviews: 56,
    features: ["Leather Platform", "Kydex Shell", "Body-Contouring"],
    options: DEFAULT_OPTIONS
  },
  {
    id: 'c908',
    name: 'Falco Compact Hybrid OWB Holster Model C908 2021',
    category: Category.HYBRID,
    price: 109.95,
    description: 'Minimalist hybrid OWB holster designed for sub-compact firearms. Features a premium leather backing for comfort and a rigid Kydex front for fast draw.',
    image: 'screenshot_1741131114.png',
    rating: 4.7,
    reviews: 29,
    features: ["Deep Concealment", "Compact Base", "Adjustable Tension"],
    options: DEFAULT_OPTIONS
  },

  // --- SHOULDER SYSTEMS ---
  {
    id: 'd632l',
    name: 'Falco Horizontal Shoulder Holster for Guns with Light and Red Dot Model D632L',
    category: Category.SHOULDER,
    price: 259.95,
    description: 'Maximum capacity horizontal shoulder system. Full compatibility with weapon lights and red dot optics. Includes balanced double magazine pouch.',
    image: 'screenshot_1741131116.png',
    rating: 5.0,
    reviews: 14,
    features: ["Light/Optic Ready", "Balanced Harness", "Horizontal Draw"],
    options: DEFAULT_OPTIONS
  },
  {
    id: 'd602r',
    name: 'Falco Leather Horizontal Shoulder Holster for Guns with Red Dot Model D602R',
    category: Category.SHOULDER,
    price: 215.95,
    description: 'Precision horizontal shoulder holster specifically cut for slide-mounted red dot sights. Hand-molded leather ensures perfect firearm retention.',
    image: 'screenshot_1741131117.png',
    rating: 4.9,
    reviews: 38,
    features: ["Optic Cut", "Adjustable Harness", "Premium Cowhide"],
    options: DEFAULT_OPTIONS
  },
  {
    id: 'd602l',
    name: 'Falco Leather Horizontal Shoulder Holster for Guns with Light / Laser Model D602L',
    category: Category.SHOULDER,
    price: 219.95,
    description: 'Horizontal shoulder carry solution for firearms equipped with underslung lights or lasers. Hand-crafted for all-day concealment and comfort.',
    image: 'screenshot_1741131118.png',
    rating: 4.8,
    reviews: 25,
    features: ["Laser/Light Support", "Custom Molded", "Horizontal Profile"],
    options: DEFAULT_OPTIONS
  },
  {
    id: 'd109',
    name: 'Falco FORESTER Style Chest Leather Holster, Model D109 Forester',
    category: Category.SHOULDER,
    price: 219.95,
    description: 'Premium chest-mount holster designed for outdoor and hiking use. Keeps the firearm accessible while wearing packs or heavy outerwear.',
    image: 'screenshot_1741131115.png',
    rating: 4.8,
    reviews: 22,
    features: ["Chest Mounted", "Rugged Stitching", "Quick Release"],
    options: DEFAULT_OPTIONS
  },
  {
    id: 'd209',
    name: 'Falco FORESTER Style Chest Leather Holster, Model D209 Forester',
    category: Category.SHOULDER,
    price: 195.95,
    description: 'Optimized chest holster for smaller frame firearms. The Forester series ensures your weapon is centered on the torso for maximum stability during movement.',
    image: 'screenshot_1741131120.png',
    rating: 4.7,
    reviews: 19,
    features: ["Lightweight Design", "Centered Carry", "Adjustable Straps"],
    options: DEFAULT_OPTIONS
  }
];

export const REVIEWS = [
  {
    id: 1,
    author: "Capt. Mark S.",
    role: "L.E.O. Florida",
    text: "The H201 is my primary duty holster. The break-in was fast and the retention is as secure as any Kydex holster I've used.",
    rating: 5
  },
  {
    id: 2,
    author: "Richard T.",
    role: "Verified Buyer",
    text: "The rig fits my Sig with a Romeo1 and TLR-7 perfectly. Most shoulder rigs don't handle lights well, but this one is flawless.",
    rating: 5
  },
  {
    id: 3,
    author: "Elena G.",
    role: "Outdoor Enthusiast",
    text: "The Forester Chest Rig is essential for bear country hiking. Stable even on steep terrain and quick to access.",
    rating: 5
  }
];
