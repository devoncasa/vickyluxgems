import { GemData } from '../types';

const burmeseAmberColors = [
    "Mila Amber (Milky)",
    "Cherry Red Amber",
    "Pigeon Blood Red",
    "Orange Amber",
    "Golden Yellow Amber",
    "Light Honey Amber",
    "Deep Honey Amber",
    "Root Amber (Wood-like Pattern)",
    "Black Amber"
];

// GIA-like descriptions for colored gemstones
export const coloredGemClarityGrades = [
    "Eye-Clean (EC)",
    "Very Very Slightly Included (VVS)",
    "Very Slightly Included (VS)",
    "Slightly Included (SI)",
    "Included (I)",
    "Opaque"
];
// GIA diamond clarity grades
export const diamondClarityGrades = [
    "FL (Flawless)",
    "IF (Internally Flawless)",
    "VVS1 (Very, Very Slightly Included 1)",
    "VVS2 (Very, Very Slightly Included 2)",
    "VS1 (Very Slightly Included 1)",
    "VS2 (Very Slightly Included 2)",
    "SI1 (Slightly Included 1)",
    "SI2 (Slightly Included 2)",
    "I1 (Included 1)",
    "I2 (Included 2)",
    "I3 (Included 3)"
];

export const certifications = [
    "AIGS – Asian Institute of Gemological Sciences",
    "BGL – Bangkok Gemological Laboratory",
    "GIA – Gemological Institute of America",
    "GIT – Gem and Jewelry Institute of Thailand",
    "GRS – GemResearch Swisslab",
    "Lotus Gemology",
    "SSEF – Swiss Gemmological Institute",
    "In-house",
    "Other"
];

export const productForms = {
    "Spiritual & Prayer Beads (Mala)": ["108-Bead Prayer Mala", "54-Bead Mala", "27-Bead Mala", "18-Bead Wrist Mala", "21-Bead Monk Set", "9-Bead Short Mala (Thai style)"],
    "Jewelry": ["Ring (Men’s/Women’s)", "Pendant (Single Drop or Carved)", "Necklace (Beaded or Pendant Style)", "Bracelet (Elastic or Threaded)", "Bangle (Solid or Hinged)", "Earrings (Stud or Drop)", "Choker (Short Necklace Style)"],
    "Beads (Loose or Semi-finished)": ["Round Beads (Loose, For Custom Stringing)", "Barrel Beads", "Olive-shaped Beads", "Flat or Coin Beads", "Tumbled Nugget Beads", "Faceted Beads", "Disk or Button Beads"],
    "Display or Collectible Items": ["Cabochon (Polished Flat Back)", "Freeform Polished Piece", "Carved Sculpture (Small)", "Polished Amber Stone (Display)", "Encased Insect Amber (Collector’s Item)", "Amber Block (for carving or collectors)"],
    "Custom / Artisan": ["Resin-Amber Combo Jewelry", "Silver-Set Amber (Artisan Style)", "Buddhist Relic Container (Encased)", "Amber Keychain or Amulet"],
};


export const GEM_DATA: GemData = {
  cuts: {
    standard: [
      "Asscher", "Briolette", "Cabochon", "Cushion", "Emerald", "Heart", "Marquise", 
      "Mixed Cut", "Oval", "Pear", "Princess", "Radiant", "Rose Cut", "Round", "Step Cut", "Trillion"
    ],
    jade: [
      "Bangle", "Bead", "Buddha", "Carving", "Coin", "Donut", "Drop", 
      "Figurine", "Pendant", "Ring"
    ],
  },
  origins: {
    standard: [
      "Afghanistan", "Australia", "Botswana", "Brazil", "Cambodia", "Canada", "China", "Colombia", "Ethiopia", "Indonesia", "Kashmir", "Kenya", "Madagascar", "Mexico", "Mozambique", 
      "Myanmar", "Nigeria", "Pakistan", "Russia", "South Africa", "Sri Lanka", 
      "Tajikistan", "Tanzania", "Thailand", "USA", "Vietnam", "Zambia"
    ],
  },
  categories: {
    "Precious Gemstones": {
        "Alexandrite": {
            colors: ["Green (Daylight)", "Red (Incandescent)", "Bluish Green", "Purplish Red", "Color-Change"],
            origins: ["Russia", "Sri Lanka", "Brazil", "Tanzania"],
        },
        "Diamond": {
            colors: ["Colorless (D-F)", "Near Colorless (G-J)", "Faint Yellow (K-M)", "Fancy Yellow", "Fancy Blue", "Fancy Pink", "Fancy Green", "Fancy Brown", "Fancy Black", "Salt and Pepper"],
            origins: ["Russia", "Botswana", "Canada", "South Africa", "Australia"]
        },
        "Emerald": {
            colors: ["Vivid Green", "Deep Green", "Bluish Green", "Yellowish Green"],
            origins: ["Colombia", "Zambia", "Brazil", "Afghanistan"]
        },
        "Pearl": {
            colors: ["White", "Cream", "Pink", "Silver", "Gold", "Blue", "Black (Tahitian)"],
            origins: ["Japan (Akoya)", "Australia (South Sea)", "French Polynesia (Tahitian)", "China (Freshwater)"],
            cuts: ["Round", "Near-Round", "Oval", "Button", "Drop", "Baroque"]
        },
        "Ruby": {
            colors: ["Pigeon Blood Red", "Vivid Red", "Deep Red", "Pinkish Red", "Purplish Red"],
            origins: ["Myanmar", "Mozambique", "Thailand", "Sri Lanka", "Tanzania"],
        },
        "Sapphire": {
            colors: ["Royal Blue", "Cornflower Blue", "Deep Blue", "Pink", "Padparadscha", "Violet", "Yellow", "Orange", "Green", "White", "Color-change"],
            origins: ["Myanmar", "Sri Lanka", "Madagascar", "Thailand", "Australia", "Kashmir"],
        },
        "Tanzanite": {
            colors: ["Vivid Violet-Blue", "Deep Blue", "Bluish Purple"],
            origins: ["Tanzania"]
        }
    },
    "Semi-Precious Gemstones": {
        "Agate": {
            colors: ["Banded", "Blue Lace", "Botswana", "Dendritic", "Fire", "Moss"],
            origins: ["Brazil", "Mexico", "USA"]
        },
        "Aquamarine": {
            colors: ["Sky Blue", "Sea Green", "Deep Blue", "Santa Maria Blue"],
            origins: ["Brazil", "Nigeria", "Madagascar", "Pakistan"]
        },
        "Citrine": {
            colors: ["Light Yellow", "Golden Yellow", "Madeira Red"],
            origins: ["Brazil", "Madagascar", "Russia"]
        },
        "Garnet": {
            colors: ["Red (Almandine/Pyrope)", "Green (Tsavorite/Demantoid)", "Orange (Spessartite)", "Pink/Purple (Rhodolite)", "Color-change"],
            origins: ["Tanzania", "Kenya", "Sri Lanka", "Russia", "USA"]
        },
        "Jadeite": {
            colors: ["Imperial Green", "Apple Green", "Lavender", "White", "Black", "Reddish Brown"],
            origins: ["Myanmar"]
        },
        "Lapis Lazuli": {
            colors: ["Deep Blue", "Royal Blue", "Indigo"],
            cuts: ["Cabochon", "Bead", "Slab", "Carving"],
            origins: ["Afghanistan", "Chile", "Russia"]
        },
        "Morganite": {
            colors: ["Pink", "Peach", "Salmon", "Rose"],
            origins: ["Brazil", "Madagascar", "Afghanistan"]
        },
        "Onyx": {
            colors: ["Black", "Banded Black and White", "Sardonyx (Red/Brown)"],
            origins: ["Brazil", "Uruguay", "Mexico"]
        },
        "Opal": {
            colors: ["White (Play-of-color)", "Black (Play-of-color)", "Fire (Orange/Red)", "Boulder", "Crystal"],
            origins: ["Australia", "Ethiopia", "Mexico"]
        },
        "Peridot": {
            colors: ["Olive Green", "Lime Green", "Yellowish Green"],
            origins: ["Myanmar", "Pakistan", "USA"]
        },
        "Spinel": {
            colors: ["Red", "Pink", "Purple", "Blue (Cobalt)", "Gray", "Orange"],
            origins: ["Myanmar", "Tajikistan", "Tanzania", "Vietnam"],
        },
        "Topaz": {
            colors: ["Blue (Swiss, London)", "Imperial (Reddish Orange)", "Precious (Yellow-Orange)", "Pink", "White"],
            origins: ["Brazil", "Nigeria", "Pakistan", "Russia"]
        },
        "Tourmaline": {
            colors: ["Pink (Rubellite)", "Green (Verdelite)", "Blue (Indicolite)", "Watermelon", "Paraíba (Neon Blue/Green)", "Black (Schorl)"],
            origins: ["Brazil", "Nigeria", "Afghanistan", "USA"]
        },
        "Zircon": {
            colors: ["Blue", "White (Colorless)", "Red", "Yellow", "Brown", "Green"],
            origins: ["Cambodia", "Sri Lanka", "Thailand"]
        }
    },
    "Burmese Amber": {
        "Burmese Amber": {
            colors: burmeseAmberColors,
            origins: ["Hukawng Valley, Myanmar"],
        }
    }
  }
};