import { RosaryConfig, RosaryGemstone, RosaryAmber, RosaryMetal } from '../types';
import { ROSARY_GEMSTONES, ROSARY_AMBERS, ROSARY_METALS } from '../constants';

const BASE_BEAD_PRICE = 5; // A base value in THB for a standard bead at a standard size
const BEAD_SIZE_BASELINE = 8; // 8mm is our baseline size
const BEAD_SIZE_SCALING_FACTOR = 1.3; // Price increases by 30% for each mm larger than baseline
const MARKUP = 2.5;
const VAT_RATE = 1.07;

// Price per gram for metals based on cost tier
const METAL_PRICE_PER_GRAM = {
    5: 2500, // Assumed 18k Gold
    4: 2000, // Assumed 14k Gold
    3: 1000, // Sterling Silver
    2: 400,  // Assumed Bronze
    1: 200,  // Assumed Pewter
};

const BASE_ARTISANRY_FEE = 1500; // Base labor cost in THB

export function calculateRosaryPrice(config: RosaryConfig): {
    subtotal: number,
    vat: number,
    total: number,
    breakdown: Record<string, number>
} {
    if (!config.pathway || !config.metal) {
        return { subtotal: 0, vat: 0, total: 0, breakdown: {} };
    }

    // A standard 5-decade rosary has 53 "Ave" beads and 6 "Pater" beads.
    const allBeads = [
        { ...config.decadeAveBeads, count: 50 },
        { ...config.decadePaterBeads, count: 5 }, // 5 Paters in the loop
        { ...config.invitatoryAveBeads, count: 3 },
        { ...config.invitatoryPaterBead, count: 1 }, // 1 Pater in the pendant after centerpiece
    ];

    let uniqueMaterials = new Set<string>();

    const costBeads = allBeads.reduce((acc, bead) => {
        if (!bead.materialId) return acc;
        uniqueMaterials.add(bead.materialId);
        
        let material;
        let priceTier = 1;

        if (config.pathway === 'Gemstone') {
            material = ROSARY_GEMSTONES.find(g => g.id === bead.materialId);
            priceTier = material?.priceTier || 1;
        } else {
            // For amber, let's assign a higher base price tier
            material = ROSARY_AMBERS.find(a => a.id === bead.materialId);
            priceTier = 4; // Amber is generally more expensive
        }

        if (!material) return acc;

        const sizeDifference = bead.size - BEAD_SIZE_BASELINE;
        const sizeMultiplier = Math.pow(BEAD_SIZE_SCALING_FACTOR, sizeDifference);
        
        const singleBeadPrice = BASE_BEAD_PRICE * priceTier * sizeMultiplier;
        return acc + (singleBeadPrice * bead.count);
    }, 0);

    const metalPricePerGram = METAL_PRICE_PER_GRAM[config.metal.costTier as keyof typeof METAL_PRICE_PER_GRAM] || 0;
    const costMetalComponents = ((config.crucifix?.weightG || 0) + (config.centerpiece?.weightG || 0)) * metalPricePerGram;

    // Estimate wire cost based on number and size of beads
    const totalBeadSize = allBeads.reduce((sum, b) => sum + (b.size * b.count), 0);
    const estimatedWireWeightG = (totalBeadSize / 1000) * 5; // Simplified estimation
    const costWireChain = estimatedWireWeightG * metalPricePerGram;

    // Complexity modifier for artisanry fee
    const complexityModifier = (uniqueMaterials.size - 1) * 250;
    const artisanryFee = BASE_ARTISANRY_FEE + complexityModifier;

    const costBreakdown = {
        costBeads,
        costMetalComponents,
        costWireChain,
        artisanryFee,
    };
    
    const preMarkupTotal = costBeads + costMetalComponents + costWireChain + artisanryFee;
    const subtotal = preMarkupTotal * MARKUP;
    const total = subtotal * VAT_RATE;
    const vat = total - subtotal;

    return {
        subtotal,
        vat,
        total,
        breakdown: costBreakdown
    };
}