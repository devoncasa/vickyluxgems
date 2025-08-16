

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useLanguage } from '../i18n/LanguageContext.tsx';
import SEO from '../components/SEO.tsx';
import { BACKGROUND_IMAGES, PRAYER_BEAD_SIZES, JUZU_MATERIAL_PRICES, AMBER_COLOR_DETAILS, TASSEL_OPTIONS, calculateBeadWeightGemstone, METAL_COMPONENT_PRICES, METAL_COMPONENT_MATERIALS, TESBIH_COMPONENT_WEIGHTS, ROSARY_COMPONENT_WEIGHTS, PRAYER_BEAD_VISUAL_MATERIALS } from '../constants.ts';
import SectionDivider from '../components/SectionDivider.tsx';
import { JuzuGenderStyle, JuzuType, TasselShape, TasselMaterial, BeadSize, AmberColorDetail, PrayerBeadTradition, TesbihBeadCount, TesbihRosaryGrade } from '../types.ts';
import { useParams, useNavigate, Link } from 'react-router-dom';

const formatCurrency = (amount: number) => {
    return `฿${amount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
};

const ControlGroup: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
    <div>
        <h3 className="text-xl font-semibold mb-4 text-[var(--c-heading)]">{title}</h3>
        <div className="space-y-4 bg-[var(--c-surface-alt)] p-4 rounded-md border border-[var(--c-border)]">
            {children}
        </div>
    </div>
);

const CheckmarkIcon: React.FC = () => (
    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);


const PrayerBeadBuilderPage: React.FC = () => {
    const { t } = useLanguage();
    const { tradition } = useParams<{ tradition: string }>();
    const navigate = useNavigate();
    const captureRef = useRef<HTMLDivElement>(null);

    const currentTradition = useMemo(() => {
        const traditionStr = tradition || PrayerBeadTradition.Juzu;
        if (Object.values(PrayerBeadTradition).includes(traditionStr as PrayerBeadTradition)) {
            return traditionStr as PrayerBeadTradition;
        }
        return PrayerBeadTradition.Juzu;
    }, [tradition]);

    // --- State ---
    const [mainBeadSize, setMainBeadSize] = useState<BeadSize>(10);
    const [mainBeadMaterial, setMainBeadMaterial] = useState<string>('Agarwood (Oud)');
    const [burmeseAmberColor, setBurmeseAmberColor] = useState<AmberColorDetail | null>(null);
    const [metalGrade, setMetalGrade] = useState<TesbihRosaryGrade>(TesbihRosaryGrade.Premium);
    
    // Juzu State
    const [juzuGender, setJuzuGender] = useState<JuzuGenderStyle>(JuzuGenderStyle.Mens);
    const [juzuType, setJuzuType] = useState<JuzuType>(JuzuType.Formal);
    const [tasselShape, setTasselShape] = useState<TasselShape>(TasselShape.Head);
    const [tasselMaterial, setTasselMaterial] = useState<TasselMaterial>(TasselMaterial.Rayon);

    // Tesbih State
    const [tesbihBeadCount, setTesbihBeadCount] = useState<TesbihBeadCount>(99);
    const [tesbihTepelikMaterial, setTesbihTepelikMaterial] = useState<string>('Silver-Plated (Thai Style)');

    // Rosary State
    const [rosaryCenterpieceMaterial, setRosaryCenterpieceMaterial] = useState<string>('Pewter/Resin');
    const [rosaryCrucifixMaterial, setRosaryCrucifixMaterial] = useState<string>('Pewter/Resin');


    const [isProcessing, setIsProcessing] = useState(false);
    const [notification, setNotification] = useState<string | null>(null);

    const maxBeadSizes: Record<PrayerBeadTradition, number> = {
        [PrayerBeadTradition.Juzu]: 12.0,
        [PrayerBeadTradition.Tesbih]: 12.5,
        [PrayerBeadTradition.Rosary]: 11.5,
    };

    const handleBeadSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newSize = Number(e.target.value);
        const maxSize = maxBeadSizes[currentTradition];
        if (newSize <= maxSize) {
            setMainBeadSize(newSize);
        } else {
            setMainBeadSize(maxSize);
        }
    };

    useEffect(() => {
        if (currentTradition === PrayerBeadTradition.Juzu) {
            setMainBeadSize(juzuGender === JuzuGenderStyle.Mens ? 10 : 7);
        } else if (currentTradition === PrayerBeadTradition.Tesbih) {
            setMainBeadSize(10);
        } else if (currentTradition === PrayerBeadTradition.Rosary) {
            setMainBeadSize(8);
        }
    }, [currentTradition, juzuGender]);

     const dependentBeadSizes = useMemo(() => {
        const baseSize = mainBeadSize;
        let sizes: Record<string, number> = {};
        const step = 0.5;

        if (currentTradition === PrayerBeadTradition.Juzu) {
            const oyadamaIncrease = baseSize < 9.5 ? 2 * step : 4 * step;
            const shitentamaDecrease = baseSize < 9.5 ? 1 * step : 2 * step;
            sizes.oyadama = Math.max(6, baseSize + oyadamaIncrease);
            sizes.shitentama = Math.max(6, baseSize - shitentamaDecrease);
        } else if (currentTradition === PrayerBeadTradition.Tesbih) {
            sizes.disks = Math.max(6, baseSize + 5 * step); // +5 steps
            sizes.imame = Math.max(6, baseSize + 3 * step); // +3 steps
        } else if (currentTradition === PrayerBeadTradition.Rosary) {
            sizes.ourFather = Math.max(6, baseSize + 5 * step); // +5 steps
        }
        return sizes;
    }, [mainBeadSize, currentTradition]);

    const componentCounts = useMemo(() => {
        if (currentTradition === PrayerBeadTradition.Juzu) {
            return juzuType === JuzuType.Formal ? { main: 108, parent: 2, marker: 4 } : { main: 27, parent: 2, marker: 0 };
        }
        if (currentTradition === PrayerBeadTradition.Tesbih) {
            return { main: tesbihBeadCount, disks: 2, imame: 1, smallBeads: 3, tepelik: 1 };
        }
        if (currentTradition === PrayerBeadTradition.Rosary) {
            return { main: 53, ourFather: 6, crucifix: 1, centerpiece: 1 };
        }
        return { main: 0 };
    }, [juzuType, tesbihBeadCount, currentTradition]);

    const priceBreakdown = useMemo(() => {
        let mainBeadsPrice = 0;
        let accentBeadsPrice = 0;
        let tasselPrice = 0;
        let metalPrice = 0;
        let individualPrices: Record<string, number> = {};

        const materialPrices = JUZU_MATERIAL_PRICES[mainBeadMaterial as keyof typeof JUZU_MATERIAL_PRICES];

        const getBeadPrice = (size: BeadSize, count: number) => {
            if (!size || !count) return 0;
            const weight = calculateBeadWeightGemstone(size);
            if (mainBeadMaterial === 'Burmese Amber') {
                const amberColor = burmeseAmberColor || AMBER_COLOR_DETAILS[4];
                return amberColor.basePricePerGram * weight * count;
            }
            if (materialPrices) {
                const closestSize = PRAYER_BEAD_SIZES.reduce((prev, curr) => (Math.abs(curr - size) < Math.abs(prev - size) ? curr : prev));
                const pricePerGram = materialPrices[closestSize as keyof typeof materialPrices] || 0;
                return pricePerGram * weight * count;
            }
            return 0;
        };
        
        const getMetalPrice = (weight_g: number, material: string) => {
             const pricePerGram = METAL_COMPONENT_PRICES[material as keyof typeof METAL_COMPONENT_PRICES]?.[metalGrade] ?? 0;
             return pricePerGram * weight_g;
        };

        if (currentTradition === PrayerBeadTradition.Juzu) {
            mainBeadsPrice = getBeadPrice(mainBeadSize, (componentCounts as any).main);
            accentBeadsPrice += getBeadPrice(dependentBeadSizes.oyadama, (componentCounts as any).parent);
            accentBeadsPrice += getBeadPrice(dependentBeadSizes.shitentama, (componentCounts as any).marker);
            tasselPrice = TASSEL_OPTIONS.materials?.find((m: {name: string}) => m.name === tasselMaterial)?.price || 0;
        } else if (currentTradition === PrayerBeadTradition.Tesbih) {
            individualPrices.mainBeads = getBeadPrice(mainBeadSize, tesbihBeadCount);
            individualPrices.disks = getBeadPrice(dependentBeadSizes.disks, 2);
            individualPrices.imame = getBeadPrice(dependentBeadSizes.imame, 1);
            const smallBeadSize = Math.max(2, mainBeadSize - 4.5);
            individualPrices.smallBeads = getBeadPrice(smallBeadSize, 3);
            individualPrices.tepelik = getMetalPrice(TESBIH_COMPONENT_WEIGHTS.tepelik, tesbihTepelikMaterial);
            individualPrices.tassel = 5.18; // From prompt example
            
            mainBeadsPrice = individualPrices.mainBeads;
            accentBeadsPrice = individualPrices.disks + individualPrices.imame + individualPrices.smallBeads;
            metalPrice = individualPrices.tepelik;
            tasselPrice = individualPrices.tassel;

        } else if (currentTradition === PrayerBeadTradition.Rosary) {
            individualPrices.hailMaryBeads = getBeadPrice(mainBeadSize, 53);
            individualPrices.ourFatherBeads = getBeadPrice(dependentBeadSizes.ourFather, 6);
            individualPrices.centerpiece = getMetalPrice(ROSARY_COMPONENT_WEIGHTS.centerpiece, rosaryCenterpieceMaterial);
            individualPrices.crucifix = getMetalPrice(ROSARY_COMPONENT_WEIGHTS.crucifix, rosaryCrucifixMaterial);
            
            mainBeadsPrice = individualPrices.hailMaryBeads;
            accentBeadsPrice = individualPrices.ourFatherBeads;
            metalPrice = individualPrices.centerpiece + individualPrices.crucifix;
        }

        const totalPrice = mainBeadsPrice + accentBeadsPrice + tasselPrice + metalPrice;
        return { totalPrice, individualPrices };
    }, [
        currentTradition, mainBeadSize, mainBeadMaterial, burmeseAmberColor, metalGrade,
        juzuType, tasselMaterial, tesbihBeadCount, tesbihTepelikMaterial,
        rosaryCenterpieceMaterial, rosaryCrucifixMaterial, dependentBeadSizes, componentCounts, juzuGender
    ]);

    return (
        <div 
            className="page-container-with-bg min-h-screen py-16 md:py-20"
            style={{ backgroundImage: `url('${BACKGROUND_IMAGES[20]}')` }}
        >
            <SEO 
                title={`${t('nav_Custom_Jewelry' as any)}: ${currentTradition}`}
                description={`Design your own heirloom-quality ${currentTradition}.`}
            />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10">
                    <h1 className="text-5xl font-bold tracking-tight">Build Your Custom {currentTradition}</h1>
                    <p className="mt-4 text-xl text-[var(--c-text-secondary)] max-w-3xl mx-auto">
                        Craft an authentic piece tailored to your spiritual practice.
                    </p>
                    <div className="mt-4">
                        <Link to="/custom-jewelry" className="text-sm font-semibold text-[var(--c-accent-primary)] hover:underline">&larr; Back to Custom Options</Link>
                    </div>
                    <SectionDivider />
                </div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Controls */}
                    <div className="space-y-6">
                        <ControlGroup title={`Step 1: ${currentTradition} Style`}>
                            {currentTradition === PrayerBeadTradition.Juzu && (
                                <>
                                    <div className="admin-form-field">
                                        <label>{t('juzu_gender_style')}</label>
                                        <select value={juzuGender} onChange={(e) => setJuzuGender(e.target.value as JuzuGenderStyle)} className="admin-select">
                                            {Object.values(JuzuGenderStyle).map(g => <option key={g} value={g}>{g}</option>)}
                                        </select>
                                    </div>
                                    <div className="admin-form-field">
                                        <label>{t('juzu_type')}</label>
                                        <select value={juzuType} onChange={(e) => setJuzuType(e.target.value as JuzuType)} className="admin-select">
                                            {Object.values(JuzuType).map(jt => <option key={jt} value={jt}>{jt}</option>)}
                                        </select>
                                    </div>
                                     <div className="admin-form-field">
                                        <label>{t('juzu_tassel_shape')}</label>
                                        <select value={tasselShape} onChange={(e) => setTasselShape(e.target.value as TasselShape)} className="admin-select">
                                            {TASSEL_OPTIONS.shapes.map((s: {name: string}) => <option key={s.name} value={s.name}>{s.name}</option>)}
                                        </select>
                                    </div>
                                    <div className="admin-form-field">
                                        <label>{t('juzu_tassel_material')}</label>
                                        <select value={tasselMaterial} onChange={(e) => setTasselMaterial(e.target.value as TasselMaterial)} className="admin-select">
                                            {TASSEL_OPTIONS.materials.map((m: {name: string}) => <option key={m.name} value={m.name}>{m.name}</option>)}
                                        </select>
                                    </div>
                                </>
                            )}
                             {currentTradition === PrayerBeadTradition.Tesbih && (
                                <>
                                     <div className="admin-form-field">
                                        <label>Bead Count</label>
                                        <select value={tesbihBeadCount} onChange={(e) => setTesbihBeadCount(Number(e.target.value) as TesbihBeadCount)} className="admin-select">
                                            <option value={33}>33 Beads</option>
                                            <option value={99}>99 Beads</option>
                                        </select>
                                    </div>
                                </>
                             )}
                            {currentTradition === PrayerBeadTradition.Rosary && (
                                <p className="text-sm text-center text-[var(--c-text-secondary)]">The Rosary has a fixed structure of 59 beads. Component materials can be customized during consultation.</p>
                            )}
                        </ControlGroup>
                        <ControlGroup title="Step 2: Materials & Size">
                             <div className="admin-form-field">
                                <label>Main Bead Material</label>
                                <select value={mainBeadMaterial} onChange={(e) => setMainBeadMaterial(e.target.value)} className="admin-select">
                                    {Object.keys(JUZU_MATERIAL_PRICES).map(m => <option key={m} value={m}>{t(`juzu_material_${m.replace(/\s/g, '_').replace(/[\(\)]/g, '')}` as any)}</option>)}
                                </select>
                            </div>
                             {mainBeadMaterial === 'Burmese Amber' && (
                                <div className="admin-form-field">
                                    <label>{t('juzu_burmese_amber_color')}</label>
                                    <select value={burmeseAmberColor?.id || ''} onChange={e => setBurmeseAmberColor(AMBER_COLOR_DETAILS.find(c=>c.id === e.target.value) || null)} className="admin-select">
                                        {AMBER_COLOR_DETAILS.map(c => <option key={c.id} value={c.id}>{t(`amber_color_${c.id}_name` as any)}</option>)}
                                    </select>
                                </div>
                            )}
                            <div className="admin-form-field">
                                <label>Main Bead Size: {mainBeadSize.toFixed(2)}mm (Max: {maxBeadSizes[currentTradition].toFixed(2)}mm)</label>
                                <input type="range" min="6" max={maxBeadSizes[currentTradition]} step="0.50" value={mainBeadSize} onChange={handleBeadSizeChange} className="w-full custom-slider"/>
                            </div>
                        </ControlGroup>
                    </div>

                    {/* Summary & Preview */}
                    <div ref={captureRef} className="bg-[var(--c-surface)] p-6 rounded-lg shadow-lg border border-[var(--c-border)] sticky top-28 self-start">
                         <h3 className="text-2xl font-bold text-center mb-4">Your Custom {currentTradition}</h3>
                         {/* Placeholder for a more complex preview */}
                         <div className="h-48 bg-gray-100 rounded-md flex items-center justify-center text-gray-500 mb-4">
                             Visual Preview
                         </div>
                         <div className="mt-6 pt-4 border-t-2">
                            <div className="flex justify-between items-baseline">
                                <span className="text-lg font-bold">Estimated Total</span>
                                <p className="text-3xl font-bold text-right text-[var(--c-heading)]">{formatCurrency(priceBreakdown.totalPrice)}</p>
                            </div>
                        </div>
                        <button disabled={isProcessing} className="w-full mt-4 btn-primary text-white font-bold py-3 rounded-lg text-lg">
                            {isProcessing ? 'Processing...' : 'Submit Design for Pre-Order'}
                        </button>
                         {notification && <p className="text-sm text-center mt-3 text-green-700">{notification}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrayerBeadBuilderPage;