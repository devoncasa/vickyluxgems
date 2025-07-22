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

export const clarityGrades = ["IF", "VVS1", "VVS2", "VS1", "VS2", "SI1", "SI2", "I1", "I2", "I3"];
export const certifications = [
    "GIT – Gem and Jewelry Institute of Thailand",
    "AIGS – Asian Institute of Gemological Sciences",
    "GIA Bangkok – Gemological Institute of America (Thailand)",
    "GRS Thailand – GemResearch Swisslab",
    "Lotus Gemology",
    "DGL – Diamond Grading Laboratory",
    "NGI – National Gem Institute",
    "BGL – Bangkok Gemological Laboratory",
    "TGL – Thai Gemological Laboratory",
    "Swiss Gemmological Institute (SSEF)"
];

export const GEM_DATA: GemData = {
  cuts: {
    standard: [
      "Asscher", "Cabochon", "Cushion", "Emerald", "Heart", "Marquise", 
      "Oval", "Pear", "Princess", "Radiant", "Round", "Trillion"
    ],
    jade: [
      "Bangle", "Bead", "Buddha", "Carving", "Coin", "Donut", "Drop", 
      "Figurine", "Gua Sha", "Pendant", "Ring"
    ],
  },
  origins: {
    standard: [
      "Afghanistan", "Australia", "Botswana", "Brazil", "Cambodia", "Canada", "China", "Colombia", "Indonesia", "Kashmir", "Kenya", "Madagascar", "Mozambique", 
      "Myanmar", "Nigeria", "Pakistan", "Russia", "South Africa", "Sri Lanka", 
      "Tajikistan", "Tanzania", "Thailand", "USA", "Vietnam", "Zambia"
    ],
  },
  categories: {
    "Precious Gemstones": {
        "Ruby": {
            colors: ["Pigeon Blood Red", "Vivid Red", "Deep Red", "Pure Red", "Pinkish Red", "Orangey Red", "Purplish Red", "Brownish Red", "Light Red"],
            origins: ["Myanmar", "Mozambique", "Thailand", "Sri Lanka", "Tanzania"],
        },
        "Sapphire": {
            colors: ["Royal Blue", "Cornflower Blue", "Deep Blue", "Medium Blue", "Light Blue", "Greenish Blue", "Violetish Blue", "Steel Blue", "Ceylon Blue", "Kashmir Blue", "Pink", "Padparadscha", "Violet", "Purple", "Yellow (Canary, Golden)", "Orange", "Green", "White (Colorless)", "Gray", "Black", "Parti-colored", "Color-change"],
            origins: ["Myanmar", "Sri Lanka", "Madagascar", "Thailand", "Australia", "Kashmir"],
        },
        "Emerald": {
            colors: ["Vivid Green", "Deep Green", "Bluish Green", "Yellowish Green", "Medium Green", "Light Green", "Dark Green", "Colombian Green", "Zambian Green"],
            origins: ["Colombia", "Zambia", "Brazil", "Afghanistan"]
        },
        "Diamond": {
            colors: ["(D-F) Colorless", "(G-J) Near-colorless", "(K-M) Faint yellow", "(N-R) Very light yellow", "(S-Z) Light yellow", "Fancy Yellow", "Fancy Blue", "Fancy Pink", "Fancy Green", "Fancy Brown", "Fancy Orange", "Fancy Red", "Fancy Gray", "Fancy Black", "Salt and Pepper"],
            origins: ["Russia", "Botswana", "Canada", "South Africa", "Australia"]
        },
        "Spinel": {
            colors: ["Red (Blood Red, Deep Red)", "Pink (Light Pink, Fuchsia, Hot Pink)", "Purple (Lavender, Violet)", "Blue (Cobalt Blue, Electric Blue)", "Gray", "Orange", "Peach", "Brown", "Black", "White (Colorless)", "Green", "Mahenge Spinel"],
            origins: ["Myanmar", "Tajikistan", "Tanzania", "Sri Lanka", "Vietnam"],
        },
        "Jadeite": {
            colors: ["Imperial Green", "Apple Green", "Moss Green", "Olive Green", "Yellow-Green", "White", "Lavender", "Gray", "Black", "Reddish Brown", "Yellow", "Blue"],
            cuts: ["Bangle", "Bead", "Buddha", "Carving", "Coin", "Donut", "Drop", "Figurine", "Gua Sha", "Pendant", "Ring"],
            origins: ["Myanmar"]
        }
    },
    "Semi-Precious Gemstones": {
        "Agate": {
            colors: ["Banded", "Blue Lace", "Botswana", "Dendritic", "Fire", "Moss", "White"],
        },
         "Fossil Coral": {
            colors: ["Patterned White", "Patterned Pink", "Patterned Brown"],
            cuts: ["Sphere", "Slab", "Cabochon", "Carving"],
            origins: ["Indonesia", "USA"]
        }
    },
    "Burmese Amber": {
        "Burmese Amber": {
            colors: burmeseAmberColors,
            origins: ["Hukawng Valley, Myanmar"],
            cuts: [
                "Cabochon",
                "Facet Cut (Emerald Shape)",
                "Facet Cut (Cushion Shape)",
                "Perfectly Rounded Bead",
                "Bangle",
                "Ring",
                "Pendant",
                "Earrings",
                "108 Prayer Beads (Chinese Style)",
                "108 Prayer Beads (Buddhist Style)",
                "Setting (Silver Ring)",
                "Setting (Silver Pendant)",
                "Setting (Silver Earrings)"
            ]
        }
    }
  }
};