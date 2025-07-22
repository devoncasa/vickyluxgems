import { useState, useEffect, useCallback, useMemo } from 'react';
import { Product } from '../types';

const PREFERENCE_STORAGE_KEY = 'vickyAmberUserPreferences';

interface Preferences {
    [energy: string]: number;
}

export const useUserPreferences = () => {
    const [preferences, setPreferences] = useState<Preferences>({});

    useEffect(() => {
        try {
            const storedPrefs = localStorage.getItem(PREFERENCE_STORAGE_KEY);
            if (storedPrefs) {
                setPreferences(JSON.parse(storedPrefs));
            }
        } catch (error) {
            console.error("Failed to parse user preferences from localStorage", error);
        }
    }, []);

    const trackProductView = useCallback((product: Product) => {
        if (!product.energyProperties || product.energyProperties.length === 0) {
            return;
        }

        const newPreferences = { ...preferences };
        let updated = false;

        product.energyProperties.forEach(energy => {
            newPreferences[energy] = (newPreferences[energy] || 0) + 1;
            updated = true;
        });

        if (updated) {
            setPreferences(newPreferences);
            try {
                localStorage.setItem(PREFERENCE_STORAGE_KEY, JSON.stringify(newPreferences));
            } catch (error) {
                console.error("Failed to save user preferences to localStorage", error);
            }
        }
    }, [preferences]);

    const preferredEnergy = useMemo(() => {
        if (Object.keys(preferences).length === 0) {
            return null;
        }
        
        return Object.entries(preferences).reduce((a, b) => a[1] > b[1] ? a : b)[0];
    }, [preferences]);

    return { trackProductView, preferredEnergy };
};
