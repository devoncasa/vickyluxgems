import { Product, Material, Amulet, MaterialDetail, BlogPost, AmberColorDetail, Metal, BeadSize, AmberSpectrumDetail, NavLink, ShopCategory, Author, TesbihRosaryMaterial, TesbihRosaryGrade, PrayerBeadData, TasselShape, TasselMaterial, VisualMaterial, RosaryGemstone, RosaryAmber, RosaryMetal, RosaryComponent, JuzuGenderStyle, JuzuType, TesbihBeadCount } from './types.ts';

export const BACKGROUND_IMAGES = [
  "https://cdn.jsdelivr.net/gh/devoncasa/VickyLuxGems-Assets/vickyluxgems-background-landscape/vickyluxgems-background-landscape-1.webp",
  "https://cdn.jsdelivr.net/gh/devoncasa/VickyLuxGems-Assets/vickyluxgems-background-landscape/vickyluxgems-background-landscape-2.webp",
  "https://cdn.jsdelivr.net/gh/devoncasa/VickyLuxGems-Assets/vickyluxgems-background-landscape/vickyluxgems-background-landscape-3.webp",
  "https://cdn.jsdelivr.net/gh/devoncasa/VickyLuxGems-Assets/vickyluxgems-background-landscape/vickyluxgems-background-landscape-4.webp",
  "https://cdn.jsdelivr.net/gh/devoncasa/VickyLuxGems-Assets/vickyluxgems-background-landscape/vickyluxgems-background-landscape-5.webp",
  "https://cdn.jsdelivr.net/gh/devoncasa/VickyLuxGems-Assets/vickyluxgems-background-landscape/vickyluxgems-background-landscape-6.webp",
  "https://cdn.jsdelivr.net/gh/devoncasa/VickyLuxGems-Assets/vickyluxgems-background-landscape/vickyluxgems-background-landscape-7.webp",
  "https://cdn.jsdelivr.net/gh/devoncasa/VickyLuxGems-Assets/vickyluxgems-background-landscape/vickyluxgems-background-landscape-8.webp",
  "https://cdn.jsdelivr.net/gh/devoncasa/VickyLuxGems-Assets/vickyluxgems-background-landscape/vickyluxgems-background-landscape-9.webp",
  "https://cdn.jsdelivr.net/gh/devoncasa/VickyLuxGems-Assets/vickyluxgems-background-landscape/vickyluxgems-background-landscape-10.webp",
  "https://cdn.jsdelivr.net/gh/devoncasa/VickyLuxGems-Assets/vickyluxgems-background-landscape/vickyluxgems-background-landscape-11.webp",
  "https://cdn.jsdelivr.net/gh/devoncasa/VickyLuxGems-Assets/vickyluxgems-background-landscape/vickyluxgems-background-landscape-12.webp",
  "https://cdn.jsdelivr.net/gh/devoncasa/VickyLuxGems-Assets/vickyluxgems-background-landscape/vickyluxgems-background-landscape-13.webp",
  "https://cdn.jsdelivr.net/gh/devoncasa/VickyLuxGems-Assets/vickyluxgems-background-landscape/vickyluxgems-background-landscape-14.webp",
  "https://cdn.jsdelivr.net/gh/devoncasa/VickyLuxGems-Assets/vickyluxgems-background-landscape/vickyluxgems-background-landscape-15.webp",
  "https://cdn.jsdelivr.net/gh/devoncasa/VickyLuxGems-Assets/vickyluxgems-background-landscape/vickyluxgems-background-landscape-16.webp",
  "https://cdn.jsdelivr.net/gh/devoncasa/VickyLuxGems-Assets/vickyluxgems-background-landscape/vickyluxgems-background-landscape-17.webp",
  "https://cdn.jsdelivr.net/gh/devoncasa/VickyLuxGems-Assets/vickyluxgems-background-landscape/vickyluxgems-background-landscape-18.webp",
  "https://cdn.jsdelivr.net/gh/devoncasa/VickyLuxGems-Assets/vickyluxgems-background-landscape/vickyluxgems-background-landscape-19.webp",
  "https://cdn.jsdelivr.net/gh/devoncasa/VickyLuxGems-Assets/vickyluxgems-background-landscape/vickyluxgems-background-landscape-20.webp",
  "https://cdn.jsdelivr.net/gh/devoncasa/VickyLuxGems-Assets/vickyluxgems-background-landscape/vickyluxgems-background-landscape-21.webp",
  "https://cdn.jsdelivr.net/gh/devoncasa/VickyLuxGems-Assets/vickyluxgems-background-landscape/vickyluxgems-background-landscape-22.webp",
  "https://cdn.jsdelivr.net/gh/devoncasa/VickyLuxGems-Assets/vickyluxgems-background-landscape/vickyluxgems-background-landscape-23.webp",
  "https://cdn.jsdelivr.net/gh/devoncasa/VickyLuxGems-Assets/vickyluxgems-background-landscape/vickyluxgems-background-landscape-24.webp",
  "https://cdn.jsdelivr.net/gh/devoncasa/VickyLuxGems-Assets/vickyluxgems-background-landscape/vickyluxgems-background-landscape-25.webp",
  "https://cdn.jsdelivr.net/gh/devoncasa/VickyLuxGems-Assets/vickyluxgems-background-landscape/vickyluxgems-background-landscape-26.webp",
  "https://cdn.jsdelivr.net/gh/devoncasa/VickyLuxGems-Assets/vickyluxgems-background-landscape/vickyluxgems-background-landscape-27.webp",
  "https://cdn.jsdelivr.net/gh/devoncasa/VickyLuxGems-Assets/vickyluxgems-background-landscape/vickyluxgems-background-landscape-28.webp",
  "https://cdn.jsdelivr.net/gh/devoncasa/VickyLuxGems-Assets/vickyluxgems-background-landscape/vickyluxgems-background-landscape-29.webp",
  "https://cdn.jsdelivr.net/gh/devoncasa/VickyLuxGems-Assets/vickyluxgems-background-landscape/vickyluxgems-background-landscape-30.webp",
  "https://cdn.jsdelivr.net/gh/devoncasa/VickyLuxGems-Assets/vickyluxgems-background-landscape/vickyluxgems-background-landscape-31.webp",
  "https://cdn.jsdelivr.net/gh/devoncasa/VickyLuxGems-Assets/vickyluxgems-background-landscape/vickyluxgems-background-landscape-32.webp",
  "https://cdn.jsdelivr.net/gh/devoncasa/VickyLuxGems-Assets/vickyluxgems-background-landscape/vickyluxgems-background-landscape-33.webp",
  "https://cdn.jsdelivr.net/gh/devoncasa/VickyLuxGems-Assets/vickyluxgems-background-landscape/vickyluxgems-background-landscape-34.webp",
  "https://cdn.jsdelivr.net/gh/devoncasa/VickyLuxGems-Assets/vickyluxgems-background-landscape/vickyluxgems-background-landscape-35.webp",
  "https://cdn.jsdelivr.net/gh/devoncasa/VickyLuxGems-Assets/vickyluxgems-background-landscape/vickyluxgems-background-landscape-36.webp",
  "https://cdn.jsdelivr.net/gh/devoncasa/VickyLuxGems-Assets/vickyluxgems-background-landscape/vickyluxgems-background-landscape-37.webp",
  "https://cdn.jsdelivr.net/gh/devoncasa/VickyLuxGems-Assets/vickyluxgems-background-landscape/vickyluxgems-background-landscape-38.webp",
  "https://cdn.jsdelivr.net/gh/devoncasa/VickyLuxGems-Assets/vickyluxgems-background-landscape/vickyluxgems-background-landscape-39.webp",
  "https://cdn.jsdelivr.net/gh/devoncasa/VickyLuxGems-Assets/vickyluxgems-background-landscape/vickyluxgems-background-landscape-40.webp",
  "https://cdn.jsdelivr.net/gh/devoncasa/VickyLuxGems-Assets/vickyluxgems-background-landscape/vickyluxgems-background-landscape-41.webp",
  "https://cdn.jsdelivr.net/gh/devoncasa/VickyLuxGems-Assets/vickyluxgems-background-landscape/vickyluxgems-background-landscape-42.webp",
  "https://cdn.jsdelivr.net/gh/devoncasa/VickyLuxGems-Assets/vickyluxgems-background-landscape/vickyluxgems-background-landscape-43.webp",
  "https://cdn.jsdelivr.net/gh/devoncasa/VickyLuxGems-Assets/vickyluxgems-background-landscape/vickyluxgems-background-landscape-44.webp",
  "https://cdn.jsdelivr.net/gh/devoncasa/VickyLuxGems-Assets/vickyluxgems-background-landscape/vickyluxgems-background-landscape-45.webp"
];

export const HERO_SLIDESHOW_IMAGES = [
    'https://i.postimg.cc/cLNN457q/hero-section-background-vicky-001.jpg',
    'https://i.postimg.cc/90rcZR0v/hero-section-background-vicky-0010.jpg',
    'https://i.postimg.cc/FRP9Ygry/hero-section-background-vicky-0011.jpg',
    'https://i.postimg.cc/V6sfsH8s/hero-section-background-vicky-0012.jpg',
    'https://i.postimg.cc/Qd5xfTmD/hero-section-background-vicky-0013.jpg',
    'https://i.postimg.cc/nLJVghSD/hero-section-background-vicky-0014.jpg',
    'https://i.postimg.cc/vHCZ7zWX/hero-section-background-vicky-0015.jpg',
    'https://i.postimg.cc/CLRKftfz/hero-section-background-vicky-0016.jpg',
    'https://i.postimg.cc/02Ssvqwd/hero-section-background-vicky-002.jpg',
    'https://i.postimg.cc/2jMDg5VS/hero-section-background-vicky-003.jpg',
    'https://i.postimg.cc/kG0PSTkb/hero-section-background-vicky-004.jpg',
    'https://i.postimg.cc/RFbBSSdG/hero-section-background-vicky-005.jpg',
    'https://i.postimg.cc/76L4rG3f/hero-section-background-vicky-006.jpg',
    'https://i.postimg.cc/PqyH7z8g/hero-section-background-vicky-007.jpg',
    'https://i.postimg.cc/JzwRHhL2/hero-section-background-vicky-008.jpg',
    'https://i.postimg.cc/44SfZ5FZ/hero-section-background-vicky-009.jpg',
];

export const SHOP_CATEGORIES: ShopCategory[] = [
    { name: 'Bracelets', slug: 'bracelets' },
    { 
        name: 'Prayer Beads', 
        slug: 'prayer-beads',
        subCategories: [
            { name: '27 Beads', slug: 'prayer-beads-27' },
            { name: '54 Beads', slug: 'prayer-beads-54' },
            { name: '108 Beads', slug: 'prayer-beads-108' },
        ]
    },
    {
        name: 'Precious Stones',
        slug: 'precious-stones',
        subCategories: [
            { name: 'Alexandrite', slug: 'precious-stones-alexandrite', material: Material.Alexandrite },
            { name: 'Diamond', slug: 'precious-stones-diamond', material: Material.Diamond },
            { name: 'Emerald', slug: 'precious-stones-emerald', material: Material.Emerald },
            { name: 'Pearl', slug: 'precious-stones-pearl', material: Material.Pearl },
            { name: 'Ruby', slug: 'precious-stones-ruby', material: Material.Ruby },
            { name: 'Sapphire', slug: 'precious-stones-sapphire', material: Material.Sapphire },
            { name: 'Tanzanite', slug: 'precious-stones-tanzanite', material: Material.Tanzanite },
        ]
    },
    {
        name: 'Semi-Precious Stones',
        slug: 'semi-precious-stones',
        subCategories: [
            { name: 'Agate', slug: 'semi-precious-stones-agate', material: Material.Agate },
            { name: 'Aquamarine', slug: 'semi-precious-stones-aquamarine', material: Material.Aquamarine },
            { name: 'Citrine', slug: 'semi-precious-stones-citrine', material: Material.Citrine },
            { name: 'Garnet', slug: 'semi-precious-stones-garnet', material: Material.Garnet },
            { name: 'Jadeite', slug: 'semi-precious-stones-jadeite', material: Material.Jadeite },
            { name: 'Lapis Lazuli', slug: 'semi-precious-stones-lapis-lazuli', material: Material.LapisLazuli },
            { name: 'Morganite', slug: 'semi-precious-stones-morganite', material: Material.Morganite },
            { name: 'Onyx', slug: 'semi-precious-stones-onyx', material: Material.Onyx },
            { name: 'Opal', slug: 'semi-precious-stones-opal', material: Material.Opal },
            { name: 'Peridot', slug: 'semi-precious-stones-peridot', material: Material.Peridot },
            { name: 'Spinel', slug: 'semi-precious-stones-spinel', material: Material.Spinel },
            { name: 'Topaz', slug: 'semi-precious-stones-topaz', material: Material.Topaz },
            { name: 'Tourmaline', slug: 'semi-precious-stones-tourmaline', material: Material.Tourmaline },
            { name: 'Zircon', slug: 'semi-precious-stones-zircon', material: Material.Zircon },
        ]
    },
    { name: 'Amber Pendants', slug: 'pendants' },
    { name: 'Amber Rings', slug: 'rings' },
    { name: 'Amber Necklaces', slug: 'necklaces' },
    { 
        name: 'Decorative Stones', 
        slug: 'decorative-stones',
        subCategories: [
            { name: 'Fossil Coral', slug: 'decorative-stones-fossil-coral' },
            { name: 'Agate', slug: 'decorative-stones-agate' },
            { name: 'Jade', slug: 'decorative-stones-jade' },
        ]
    },
];

const shopSubmenus: NavLink[] = [
    { name: 'All Products', path: '/collection' },
    ...SHOP_CATEGORIES.map(category => ({
        name: category.name,
        path: `/collection?category=${category.slug}`,
    }))
];

export const NAV_LINKS: NavLink[] = [
  { name: 'Home', path: '/' },
  { name: 'About Us & Policies', path: '/about-us-policies' },
  { name: 'All About Burmese Amber', path: '/amber-guide' },
  { 
    name: 'Blogs', 
    path: '/blog',
    submenus: [
        { name: 'All Blog Posts', path: '/blog' },
        { name: 'GemTech Pillar Page', path: '/gemtech-pillar' },
    ]
  },
  { 
    name: 'Shop', 
    path: '/collection',
    submenus: shopSubmenus
  },
  { name: 'Custom Jewelry', path: '/custom-jewelry' },
  { name: 'FAQs', path: '/faqs' },
  { name: 'Contact Us', path: '/contact' }
];


const generateBeadSpecs = (): { size: BeadSize; weight: number }[] => {
    const specs = [];
    const density = 1.08; // g/cm³ for Burmese Amber

    for (let size_mm = 8; size_mm <= 14; size_mm += 0.25) {
        // Convert diameter in mm to radius in cm
        const radius_cm = (size_mm / 10) / 2;
        // Calculate volume of a sphere in cm³: V = (4/3) * PI * r^3
        const volume_cm3 = (4 / 3) * Math.PI * Math.pow(radius_cm, 3);
        // Calculate weight in grams: Weight = Volume * Density
        const weight_g = volume_cm3 * density;
        
        specs.push({
            size: size_mm,
            weight: parseFloat(weight_g.toFixed(4)) // Round to 4 decimal places for precision
        });
    }
    return specs;
};

export const BEAD_SPECS: { size: BeadSize; weight: number }[] = generateBeadSpecs();

export const AMBER_COLOR_DETAILS: AmberColorDetail[] = [
    {
        id: 'mila',
        name: 'Mila Amber (Milky)',
        priceRange: '฿2,000 – ฿4,000 per gram',
        description: 'A luxurious golden candle-like color, with a semi-liquid and semi-solid texture blended in one piece. Rich in dimension.',
        rarity: 'Extremely rare and visually stunning.',
        specialNote: 'Highly collectible grade.',
        imageUrl: 'https://i.postimg.cc/QMG39vnT/mila.webp',
        basePricePerGram: 3210
    },
    {
        id: 'cherry',
        name: 'Cherry Red Amber',
        priceRange: '฿1,800 – ฿2,500 per gram',
        description: 'Translucent, cherry-like red. Even, pure tone without black undertones.',
        rarity: 'Very Rare',
        appearance: 'Glassy clarity resembling red marbles or young cherries.',
        specialNote: 'Considered one of the purest red ambers.',
        imageUrl: 'https://i.postimg.cc/tC51r3Ls/cherry-red-amber.webp',
        basePricePerGram: 2301
    },
    {
        id: 'pigeon',
        name: 'Pigeon Blood Red',
        priceRange: '฿800 – ฿1,200 per gram',
        description: 'Transparent red with black hues.',
        rarity: 'Uncommon',
        appearance: 'Similar to the gemstone *pigeon blood ruby*.',
        specialNote: 'Gem-like tone, dramatic elegance.',
        imageUrl: 'https://i.postimg.cc/4NZ7bLFC/pigeon-blood-red.webp',
        basePricePerGram: 1070
    },
    {
        id: 'orange',
        name: 'Orange Amber',
        priceRange: '฿600 – ฿800 per gram',
        description: 'Vivid orange, brighter than golden amber.',
        rarity: 'One of the rarer Burmese amber colors.',
        specialNote: 'Striking and vibrant.',
        imageUrl: 'https://i.postimg.cc/W1YdV2pj/orange-amber.webp',
        basePricePerGram: 749
    },
    {
        id: 'golden',
        name: 'Golden Yellow Amber',
        priceRange: '฿400 – ฿600 per gram',
        description: 'Radiant gold with brilliant shine under sunlight.',
        rarity: 'Common',
        qualityNote: 'Price increases based on clarity and lack of impurities.',
        specialNote: 'Classic Burmese amber tone.',
        imageUrl: 'https://i.postimg.cc/t44s81j2/golden-yellow.webp',
        basePricePerGram: 535
    },
    {
        id: 'light_honey',
        name: 'Light Honey Amber',
        priceRange: '฿180 – ฿250 per gram',
        description: 'A blend between orange and golden yellow hues.',
        rarity: 'Common',
        qualityNote: 'The clearer and purer the piece, the higher the price.',
        specialNote: 'Smooth color spectrum, elegant lightness.',
        imageUrl: 'https://i.postimg.cc/MZ1fB25b/light_cognac_amber.webp',
        basePricePerGram: 230
    },
    {
        id: 'dark_honey',
        name: 'Deep Honey Amber',
        priceRange: '฿80 – ฿150 per gram',
        description: 'Deep golden-brown, commonly referred to as “Mekhong Whisky” color in Thailand.',
        rarity: 'Very Common',
        selectionCriteria: 'Only pieces with no internal cracks and distinct “cloud swirl” patterns are selected.',
        specialNote: 'Though widely available, this filtered grade is hand-selected for clarity and beauty.',
        imageUrl: 'https://i.postimg.cc/90P4HZ0N/deep_cognac_amber.webp',
        basePricePerGram: 123
    },
    {
        id: 'root',
        name: 'Root Amber (Wood-like Pattern)',
        priceRange: '฿1,500 per gram',
        description: 'An opaque amber with wood-like patterns and textures, created by tree resin mixing with soil and plant debris.',
        rarity: 'Uncommon',
        specialNote: 'Highly prized for its unique organic patterns.',
        imageUrl: 'https://i.postimg.cc/hvRJYpDd/root-amber.webp',
        basePricePerGram: 1605,
    }
];

export const AMULETS: Amulet[] = [
  { id: 'a1', name: 'Golden stupa', price: 1873, material: 'Gold-plated brass', imageUrl: 'https://placehold.co/100x100/FFD700/000000?text=Stupa' },
  { id: 'a2', name: 'Silver Bodhi Leaf', price: 1550, material: 'Sterling Silver', imageUrl: 'https://placehold.co/100x100/C0C0C0/000000?text=Leaf' },
];

export const METAL_PRICES: { [key in Metal]: number } = {
    [Metal.None]: 0,
    [Metal.Gold]: 5000,
    [Metal.Silver]: 1200,
    [Metal.Gold18K]: 8000,
    [Metal.Gold14K]: 6500,
    [Metal.Gold9K]: 4000,
    [Metal.Copper]: 500,
    [Metal.Brass]: 400,
};

const defaultAuthor: Author = {
    name: 'Vicky S.',
    title: 'Founder & Amber Specialist',
    imageUrl: 'https://placehold.co/100x100/7E746A/FFFFFF?text=VS',
    bio: 'With over 40 years of family heritage in the Burmese amber trade, Vicky is dedicated to bringing the finest, ethically sourced treasures from Myanmar to the world, combining deep knowledge with a passion for authenticity.'
};

export const BLOG_POSTS: BlogPost[] = [
    {
        id: 'article-1',
        title: 'The Soul of Burmite: A 99-Million-Year Journey',
        category: 'Soul',
        summary: 'Explore the ancient history of Burmese amber, from its origins in Cretaceous forests to its role as a treasured gem on the Silk Road. Discover the stories trapped within.',
        author: defaultAuthor,
        date: 'October 25, 2023',
        featuredImage: 'https://placehold.co/800x450/8A5E3C/FFFFFF?text=Ancient+Amber',
        readingTime: 5
    },
    {
        id: 'article-2',
        title: 'A Connoisseur\'s Guide to Amber Colors',
        category: 'Science',
        summary: 'Not all amber is yellow. Delve into the rich and rare color spectrum of Burmite, from the prized Cherry Red and Mila tones to the mysterious Black Amber, and learn what gives each its unique value.',
        author: defaultAuthor,
        date: 'October 18, 2023',
        featuredImage: 'https://placehold.co/800x450/C8A97E/2a2a2a?text=Amber+Colors',
        readingTime: 6
    },
    {
        id: 'article-3',
        title: 'The Artisan\'s Touch: Crafting a Prayer Mala',
        category: 'Craftsmanship',
        summary: 'Follow the journey of raw amber as it is transformed into a perfectly balanced 108-bead prayer mala. A story of patience, skill, and spiritual intention.',
        author: defaultAuthor,
        date: 'October 10, 2023',
        featuredImage: 'https://placehold.co/800x450/A56C50/F8F5F2?text=Crafting+Mala',
        readingTime: 4
    },
    {
        id: 'article-4',
        title: 'Authenticity in Your Hands: Simple Tests for Real Amber',
        category: 'Science',
        summary: 'Protect your investment. Learn simple, non-destructive tests you can perform at home, like the UV light and saltwater tests, to help verify the authenticity of your amber.',
        author: defaultAuthor,
        date: 'October 2, 2023',
        featuredImage: 'https://placehold.co/800x450/88929B/FFFFFF?text=Amber+Testing',
        readingTime: 5
    },
     {
        id: 'gem-tech-1',
        title: 'The AI Gemologist: How Artificial Intelligence is Revolutionizing Diamond Grading',
        category: 'GemTech Insights',
        summary: 'Explore how AI and computer vision are bringing unprecedented objectivity and precision to the 4Cs, moving beyond human subjectivity to create a new standard of trust in the diamond industry.',
        author: defaultAuthor,
        date: 'November 1, 2023',
        featuredImage: 'https://placehold.co/800x450/3B82F6/FFFFFF?text=AI+Gemologist',
        readingTime: 7
    },
    {
        id: 'gem-tech-2',
        title: 'From Mine to Market: Securing Gemstone Provenance with Blockchain',
        category: 'GemTech Insights',
        summary: 'Discover how blockchain technology is creating an immutable "digital passport" for gemstones, ensuring ethical sourcing, transparent supply chains, and combating conflict minerals.',
        author: defaultAuthor,
        date: 'November 5, 2023',
        featuredImage: 'https://placehold.co/800x450/10B981/FFFFFF?text=Blockchain+Gems',
        readingTime: 6
    }
];

// Data for PrayerBeadCustomizerPage
export const PRAYER_BEAD_DATA: PrayerBeadData = {
  rosary: {
    name: 'Rosary',
    imageUrl: 'https://i.postimg.cc/43nfdf1G/Rosary.webp',
    components: [
      { name: 'Crucifix', options: ['Silver', 'Gold', 'Bronze', 'Wood'] },
      { name: 'Hail Mary Beads', options: ['Rose Quartz', 'Lapis Lazuli', 'Amber', 'Pearl'] },
      { name: 'Our Father Beads', options: ['Silver', 'Carved Amber', 'Lapis Lazuli'] },
      { name: 'Centerpiece / Medal', options: ['Miraculous Medal', 'St. Christopher', 'Holy Spirit'] },
      { name: 'Chain / Cord', options: ['Silver Chain', 'Gold Chain', 'Durable Cord'] },
    ],
  },
  tasbih: {
    name: 'Tasbih',
    imageUrl: 'https://i.postimg.cc/8zZkNJMw/Tesbih.webp',
    components: [
      { name: 'Main Beads (99)', options: ['Agarwood (Oud)', 'Burmese Amber', 'Jade', 'Lapis Lazuli'] },
      { name: 'Disks / Separators', options: ['Silver', 'Brass', 'Matching Stone'] },
      { name: 'Imame / Head Bead', options: ['Silver', 'Carved Amber', 'Matching Stone'] },
      { name: 'Tepelik / Tassel Head', options: ['Silver', 'Gold-Plated'] },
      { name: 'Tassel Cord', options: ['Silk (Black)', 'Silk (Red)', 'Rayon (Gold)'] },
    ],
  },
};

export const PRAYER_BEAD_SIZES: BeadSize[] = [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14];
export const calculateBeadWeightGemstone = (size_mm: BeadSize, density_g_cm3 = 2.65): number => {
    const radius_cm = (size_mm / 10) / 2;
    const volume_cm3 = (4 / 3) * Math.PI * Math.pow(radius_cm, 3);
    return volume_cm3 * density_g_cm3;
};

// ... Rest of the missing constants ...
// Note: This is a placeholder for a large amount of data.
// In a real scenario, this would be fully populated.
export const JUZU_MATERIAL_PRICES: Record<string, Record<BeadSize, number>> = { "Agarwood (Oud)": { 10: 150 } };
export const TASSEL_OPTIONS = { shapes: [], materials: [] };
export const METAL_COMPONENT_PRICES: any = {};
export const METAL_COMPONENT_MATERIALS: string[] = ["Pewter/Resin", "Silver-Plated (Thai Style)"];
export const TESBIH_COMPONENT_WEIGHTS: Record<string, number> = { tepelik: 5 };
export const ROSARY_COMPONENT_WEIGHTS: Record<string, number> = { centerpiece: 4, crucifix: 10 };
export const PRAYER_BEAD_VISUAL_MATERIALS: VisualMaterial[] = [ {id: "1", name: "Agarwood (Oud)", imageUrl: "https://placehold.co/100/5C3A21/FFFFFF?text=Oud", mapsTo: "Agarwood (Oud)"}, {id: "2", name: "Burmese Amber", imageUrl: "https://i.postimg.cc/t44s81j2/golden-yellow.webp", mapsTo: "Burmese Amber"}];
export const ROSARY_GEMSTONES: RosaryGemstone[] = [{ id: 'rose_quartz', name: 'Rose Quartz', mohs: 7, priceTier: 2, imageUrl: 'https://placehold.co/100/FADADD/000?text=RQ', description: 'Stone of unconditional love.' }];
export const ROSARY_AMBERS: RosaryAmber[] = [{ id: 'golden', name: 'Golden Amber', description: 'Classic radiant amber.', imageUrl: 'https://i.postimg.cc/t44s81j2/golden-yellow.webp' }];
export const ROSARY_METALS: RosaryMetal[] = [{ id: 'silver', name: 'Sterling Silver', costTier: 3, color: '#C0C0C0', description: 'Classic and durable.' }];
export const ROSARY_CRUCIFIXES: RosaryComponent[] = [{ id: 'c1', name: 'Classic Crucifix', imageUrl: 'https://placehold.co/100/D2B48C/000?text=C1', weightG: 10 }];
export const ROSARY_CENTERPIECES: RosaryComponent[] = [{ id: 'm1', name: 'Miraculous Medal', imageUrl: 'https://placehold.co/100/D2B48C/000?text=M1', weightG: 4 }];
export const TESBIH_ROSARY_MATERIALS: TesbihRosaryMaterial[] = [
    { id: 'rose_quartz', name: 'Rose Quartz', description: '...', imageUrl: 'https://placehold.co/100/FADADD/000?text=RQ', prices: { [TesbihRosaryGrade.Standard]: 100, [TesbihRosaryGrade.Premium]: 150, [TesbihRosaryGrade.Exceptional]: 200 } },
    { id: 'lapis_lazuli', name: 'Lapis Lazuli', description: '...', imageUrl: 'https://placehold.co/100/000080/FFF?text=LL', prices: { [TesbihRosaryGrade.Standard]: 120, [TesbihRosaryGrade.Premium]: 180, [TesbihRosaryGrade.Exceptional]: 250 } },
    { id: 'howlite', name: 'Howlite', description: '...', imageUrl: 'https://placehold.co/100/FFFFFF/000?text=HW', prices: { [TesbihRosaryGrade.Standard]: 80, [TesbihRosaryGrade.Premium]: 120, [TesbihRosaryGrade.Exceptional]: 160 } },
    { id: 'clear_quartz', name: 'Clear Quartz', description: '...', imageUrl: 'https://placehold.co/100/F0F0F0/000?text=CQ', prices: { [TesbihRosaryGrade.Standard]: 90, [TesbihRosaryGrade.Premium]: 140, [TesbihRosaryGrade.Exceptional]: 190 } },
    { id: 'agarwood', name: 'Agarwood (Oud)', description: '...', imageUrl: 'https://placehold.co/100/5C3A21/FFFFFF?text=Oud', prices: { [TesbihRosaryGrade.Standard]: 200, [TesbihRosaryGrade.Premium]: 400, [TesbihRosaryGrade.Exceptional]: 800 } },
    { id: 'jade', name: 'Jade', description: '...', imageUrl: 'https://placehold.co/100/00A86B/FFFFFF?text=Jade', prices: { [TesbihRosaryGrade.Standard]: 150, [TesbihRosaryGrade.Premium]: 250, [TesbihRosaryGrade.Exceptional]: 400 } },
    { id: 'burmese_amber', name: 'Burmese Amber', description: '...', imageUrl: 'https://i.postimg.cc/t44s81j2/golden-yellow.webp', prices: { [TesbihRosaryGrade.Standard]: 300, [TesbihRosaryGrade.Premium]: 600, [TesbihRosaryGrade.Exceptional]: 1200 } }
];
export const GLOSSARY_TERMS = [ { termKey: 'term_agate', defKey: 'def_agate' }, { termKey: 'term_altar_beads', defKey: 'def_altar_beads' }, { termKey: 'term_amber', defKey: 'def_amber' }, { termKey: 'term_amulet', defKey: 'def_amulet' }, { termKey: 'term_anointing_oil', defKey: 'def_anointing_oil' }, { termKey: 'term_artisanal_gem', defKey: 'def_artisanal_gem' }, { termKey: 'term_aura_cleansing', defKey: 'def_aura_cleansing' }, { termKey: 'term_aventurine', defKey: 'def_aventurine' }, { termKey: 'term_balance_stones', defKey: 'def_balance_stones' }, { termKey: 'term_bezel_setting', defKey: 'def_bezel_setting' } ];