
import { Product, Filters, ClarityTier, Material } from '../types.ts';

/**
 * Maps a product's detailed clarity string to a simplified tier.
 * This function is designed to be robust against variations in description.
 * Tier mapping: 'high' (best), 'semi-clear' (middle), 'visible' (lowest).
 * @param {string} clarityLevel - The detailed clarity string from product data.
 * @returns {ClarityTier} The simplified clarity tier.
 */
const getProductClarityTier = (clarityLevel: string): ClarityTier => {
    const level = clarityLevel.toLowerCase();

    // Highest tier keywords
    if (level.includes('premium') || level.includes('a+') || level.includes('vs') || level.includes('high clarity')) {
        return 'high';
    }
    // Middle tier keywords
    if (level.includes('a grade') || level.includes('high grade') || level.includes('semi-clear')) {
        return 'semi-clear';
    }
    // Lowest tier keywords
    if (level.includes('b grade') || level.includes('inclusions') || level.includes('visible')) { 
        return 'visible';
    }
    
    // Default for any un-matched strings to prevent filtering errors
    return 'semi-clear';
};

/**
 * Filters an array of products based on user-selected criteria