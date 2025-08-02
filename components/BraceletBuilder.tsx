
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { BeadSize, AmberColorDetail, BeadConfig, CustomBraceletFromBuilderDetails } from '../types';
import { BEAD_SPECS, AMBER_COLOR_DETAILS } from '../constants';
import { toPng } from 'html-to-image';
import BeadCustomizationModal from './BeadCustomizationModal';
import { useLanguage } from '../i18n/LanguageContext';
import { SparkleIcon } from './IconComponents';
import BraceletCustomizationGuide from './BraceletCustomizationGuide.tsx';

const formatCurrency = (amount: number) => {
    return `฿${amount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
};

const BraceletBuilder: React.FC = () => {
    const { t } = useLanguage();
    // --- State ---
    const [wristSize, setWristSize] = useState<number>(16.5);
    const [fitPreference, setFitPreference] = useState<'perfect' | 'loose'>('loose');
    const [pattern, setPattern] = useState<BeadConfig[]>(() => [
        { id: `pattern-0-${Date.now()}`, colorId: 'dark_honey', size: 10 },
        { id: `pattern-1-${Date.now()}`, colorId: 'root', size: 12 },
        { id: `pattern-2-${Date.now()}`, colorId: 'dark_honey', size: 10 },
    ]);
    const [selectedPatternIndex, setSelectedPatternIndex] = useState<number | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [notification, setNotification] = useState<string | null>(null);
    const captureAreaRef = useRef<HTMLDivElement>(null);

    // New state and refs for dynamic scaling
    const [scale, setScale] = useState(1);
    const previewContainerRef = useRef<HTMLDivElement>(null);

    // --- Scaling Factor ---
    // Increased by 30% from 2.5 to 3.25 for a larger desktop preview.
    const SCALING_FACTOR = 3.25;
    
    // --- Calculations ---
    const { finalBeads, summary } = useMemo(() => {
        if (pattern.length === 0) {
            return {
                finalBeads: [],
                summary: { totalPrice: 0, totalWeight: 0, totalLength: 0, beadCount: 0, comfortFit_cm: 0 }
            };
        }
        
        const comfortFit_cm = fitPreference === 'loose' ? 1.5 : 0.5;
        const targetCircumference_mm = (wristSize + comfortFit_cm) * 10;

        let calculatedBeads: BeadConfig[] = [];
        let currentLength_mm = 0;
        let i = 0;
        while (currentLength_mm < targetCircumference_mm) {
            const patternBead = pattern[i % pattern.length];
            calculatedBeads.push({
                ...patternBead,
                id: `final-${i}-${patternBead.id}` // Create unique ID for the final bead
            });
            currentLength_mm += patternBead.size;
            i++;
        }
        
        let totalPrice = 0;
        let totalWeight = 0;
        calculatedBeads.forEach(bead => {
            const beadSpec = BEAD_SPECS.find(s => s.size === bead.size);
            const color = AMBER_COLOR_DETAILS.find(c => c.id === bead.colorId);
            if (beadSpec && color) {
                const beadWeight = beadSpec.weight;
                totalWeight += beadWeight;
                totalPrice += color.basePricePerGram * beadWeight;
            }
        });

        return {
            finalBeads: calculatedBeads,
            summary: { totalPrice, totalWeight, totalLength: currentLength_mm, beadCount: calculatedBeads.length, comfortFit_cm: comfortFit_cm }
        };
    }, [wristSize, pattern, fitPreference]);
    
    const beadComposition = useMemo(() => {
        if (!summary.beadCount) return [];
        
        const compositionMap = new Map<string, { count: number; colorName: string; size: number, colorId: string }>();
        
        finalBeads.forEach(bead => {
            const key = `${bead.colorId}-${bead.size}`;
            const color = AMBER_COLOR_DETAILS.find(c => c.id === bead.colorId);
            
            if (compositionMap.has(key)) {
                compositionMap.get(key)!.count++;
            } else {
                compositionMap.set(key, {
                    count: 1,
                    colorName: color?.name || 'Unknown',
                    size: bead.size,
                    colorId: bead.colorId,
                });
            }
        });
        
        return Array.from(compositionMap.values());
    }, [finalBeads, summary.beadCount]);

    const displayRadius = useMemo(() => {
        if (finalBeads.length < 2) return 0;
        const totalCircumference = finalBeads.reduce((sum, bead) => sum + (bead.size * SCALING_FACTOR), 0);
        return totalCircumference / (2 * Math.PI);
    }, [finalBeads, SCALING_FACTOR]);

    // Dynamic scaling logic
    useEffect(() => {
        if (previewContainerRef.current && finalBeads.length > 0) {
            const containerWidth = previewContainerRef.current.offsetWidth;
            
            // The visual diameter is the circle diameter + the diameter of the largest bead
            const maxBeadDiameter = Math.max(...finalBeads.map(b => b.size * SCALING_FACTOR));
            const braceletVisualDiameter = (displayRadius * 2) + maxBeadDiameter;

            if (braceletVisualDiameter > containerWidth) {
                const newScale = containerWidth / braceletVisualDiameter;
                setScale(newScale);
            } else {
                setScale(1);
            }
        } else {
            setScale(1); // Reset scale if no beads
        }
    }, [displayRadius, finalBeads, SCALING_FACTOR]);


    // --- Handlers ---
    const handleAddBeadToPattern = () => {
        setPattern(prev => [...prev, {
            id: `pattern-${prev.length}-${Date.now()}`,
            colorId: 'golden',
            size: 10
        }]);
    };
    
    const handleRemoveBeadFromPattern = () => {
        if (pattern.length > 1) {
            setPattern(prev => prev.slice(0, -1));
        }
    };

    const handleUpdatePatternBead = (index: number, newSize: BeadSize, newColorId: string) => {
        setPattern(prev => prev.map((bead, i) => 
            i === index ? { ...bead, size: newSize, colorId: newColorId } : bead
        ));
    };

    const handleAutoDesign = () => {
        // --- Helper functions ---
        const pickRandom = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
        const pickRandomN = <T,>(arr: T[], n: number): T[] => {
            if (n >= arr.length) return [...arr];
            return [...arr].sort(() => 0.5 - Math.random()).slice(0, n);
        };
        const roundToQuarter = (num: number) => Math.round(num * 4) / 4;

        // --- Data for generation ---
        const amberColorsByTone = {
            light: ['mila', 'golden', 'light_honey'],
            dark: ['root', 'pigeon', 'dark_honey'],
            vibrant: ['cherry', 'orange']
        };
        const allAmberColorIds = AMBER_COLOR_DETAILS.map(c => c.id);
        const availableBeadSizes = BEAD_SPECS.map(s => s.size);

        // --- Generator 1: Color Clusters ---
        const generateClusterPattern = (): BeadConfig[] => {
            const colorA = pickRandom(allAmberColorIds);
            let colorB = pickRandom(allAmberColorIds);
            while (colorB === colorA) { colorB = pickRandom(allAmberColorIds); }

            const clusterSizeA = pickRandom([3, 4]);
            const clusterSizeB = pickRandom([2, 3]);
            const size = pickRandom(availableBeadSizes.filter(s => s >= 9 && s <= 12));

            const patternA = Array.from({ length: clusterSizeA }, (_, i) => ({ id: `auto-A${i}-${Date.now()}`, colorId: colorA, size }));
            const patternB = Array.from({ length: clusterSizeB }, (_, i) => ({ id: `auto-B${i}-${Date.now()}`, colorId: colorB, size }));
            return Math.random() > 0.5 ? [...patternA, ...patternB] : [...patternB, ...patternA];
        };

        // --- Generator 2: Size Gradients ---
        const generateGradientPattern = (): BeadConfig[] => {
            const color = pickRandom(allAmberColorIds);
            const patternLength = pickRandom([5, 7]);
            const minSize = 8.5;
            const maxSize = 12.5;

            const step = (maxSize - minSize) / (patternLength - 1);
            let sizes = Array.from({ length: patternLength }, (_, i) => roundToQuarter(minSize + i * step));

            if (Math.random() > 0.5 && patternLength > 2) { // 50% chance of a wave pattern
                sizes = [...sizes, ...sizes.slice(0, -1).reverse()];
            }

            return sizes.map((size, i) => ({ id: `auto-G${i}-${Date.now()}`, colorId: color, size }));
        };

        // --- Generator 3: Freestyle ---
        const generateFreestylePattern = (): BeadConfig[] => {
            const patternLength = pickRandom([5, 7, 9]);
            const baseTone = pickRandom(Object.keys(amberColorsByTone) as Array<keyof typeof amberColorsByTone>);
            const accentTone = baseTone === 'light' ? 'dark' : 'light';
            const palette = [
                ...pickRandomN(amberColorsByTone[baseTone], 2),
                pickRandom(amberColorsByTone[accentTone])
            ];

            const newPattern: BeadConfig[] = [];
            let lastSize = 10;
            for (let i = 0; i < patternLength; i++) {
                const colorId = pickRandom(palette);
                const sizeChange = (Math.random() - 0.5) * 2; // -1 to 1
                let newSize = roundToQuarter(lastSize + sizeChange);
                newSize = Math.max(8, Math.min(14, newSize)); // Clamp size
                newPattern.push({ id: `auto-F${i}-${Date.now()}`, colorId, size: newSize });
                lastSize = newSize;
            }

            if (Math.random() > 0.4) { // 60% chance of a "hero" bead
                const heroIndex = Math.floor(patternLength / 2);
                newPattern[heroIndex].size = Math.min(14, roundToQuarter(Math.max(...newPattern.map(p => p.size)) + 1.5));
                if (amberColorsByTone.vibrant.length > 0) {
                    newPattern[heroIndex].colorId = pickRandom(amberColorsByTone.vibrant);
                }
            }
            return newPattern;
        };

        // --- Generator 4: Modern Symmetric ---
        const generateSymmetricPattern = (): BeadConfig[] => {
            const highValueColors = AMBER_COLOR_DETAILS.filter(c => c.basePricePerGram >= 1000).map(c => c.id);
            const mediumValueColors = AMBER_COLOR_DETAILS.filter(c => c.basePricePerGram < 1000).map(c => c.id);
            
            if (highValueColors.length === 0 || mediumValueColors.length < 2) {
                 return generateFreestylePattern(); // Fallback if not enough color variety
            }
            
            const focalColor = pickRandom(highValueColors);
            const [baseColor1, baseColor2] = pickRandomN(mediumValueColors, 2);
            
            const focalSize = pickRandom(availableBeadSizes.filter(s => s >= 11));
            const baseSize = pickRandom(availableBeadSizes.filter(s => s >= 9 && s < 11));
            
            const type = pickRandom(['focal', 'rhythmic']);

            if (type === 'focal') { // A-B-C-B-A
                return [
                    { id: `auto-S0-${Date.now()}`, colorId: baseColor1, size: baseSize },
                    { id: `auto-S1-${Date.now()}`, colorId: baseColor2, size: roundToQuarter((baseSize + focalSize) / 2) },
                    { id: `auto-S2-${Date.now()}`, colorId: focalColor, size: focalSize },
                    { id: `auto-S3-${Date.now()}`, colorId: baseColor2, size: roundToQuarter((baseSize + focalSize) / 2) },
                    { id: `auto-S4-${Date.now()}`, colorId: baseColor1, size: baseSize },
                ];
            } else { // A-A-B-A-A
                return [
                    { id: `auto-S0-${Date.now()}`, colorId: baseColor1, size: baseSize },
                    { id: `auto-S1-${Date.now()}`, colorId: baseColor1, size: baseSize },
                    { id: `auto-S2-${Date.now()}`, colorId: focalColor, size: focalSize },
                    { id: `auto-S3-${Date.now()}`, colorId: baseColor1, size: baseSize },
                    { id: `auto-S4-${Date.now()}`, colorId: baseColor1, size: baseSize },
                ];
            }
        };

        // --- Execute ---
        const designStrategies = [
            generateClusterPattern,
            generateGradientPattern,
            generateFreestylePattern,
            generateSymmetricPattern
        ];
        const chosenGenerator = pickRandom(designStrategies);
        const newPattern = chosenGenerator();
        setPattern(newPattern);
    };
    
    const handleAction = async (action: 'capture' | 'submit') => {
        if (!captureAreaRef.current || finalBeads.length <= 0 || isProcessing) return;
        setIsProcessing(true);
        setNotification(null);
    
        const designCode = `VAG-CUSTOM-${Date.now()}`;
        const filename = `${designCode}.png`;
    
        try {
            const dataUrl = await toPng(captureAreaRef.current, { backgroundColor: '#F8F5F2', pixelRatio: 2 });
    
            const link = document.createElement('a');
            link.download = filename;
            link.href = dataUrl;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
    
            if (action === 'submit') {
                const howToOrderLink = `${window.location.origin}/#/policies/pre-order`;
                const clipboardMessage = t('bracelet_builder_clipboard_message' as any, { link: howToOrderLink });
                
                await navigator.clipboard.writeText(clipboardMessage);
                setNotification(t('bracelet_builder_alert_submit_success_new_instructions' as any));
                window.open('https://www.facebook.com/messages/t/VKMMAmber', '_blank', 'noopener,noreferrer');
            } else {
                setNotification(t('bracelet_builder_alert_capture_success' as any));
            }
    
        } catch (err) {
            console.error('Failed to process action:', err);
            setNotification(t('bracelet_builder_alert_error' as any));
        } finally {
            setIsProcessing(false);
        }
    };
    
    const getBeadEffectClass = (colorId: string): string => {
        const color = AMBER_COLOR_DETAILS.find(c => c.id === colorId);
        if (!color) return 'bead-crystal';
        switch (color.id) {
            case 'mila': return 'bead-wax';
            case 'root': return 'bead-wood';
            default: return 'bead-crystal';
        }
    };
    
    const renderBraceletPreview = () => {
        let cumulativeAngle = -Math.PI / 2;

        return finalBeads.map((bead, index) => {
            const displayDiameter = bead.size * SCALING_FACTOR;
            const arcAngle = displayDiameter / displayRadius;
            const beadCenterAngle = cumulativeAngle + arcAngle / 2;
            const x = displayRadius * Math.cos(beadCenterAngle);
            const y = displayRadius * Math.sin(beadCenterAngle);
            cumulativeAngle += arcAngle;
            const color = AMBER_COLOR_DETAILS.find(c => c.id === bead.colorId);

            return (
                <div
                    key={bead.id}
                    className={`absolute rounded-full shadow-sm ${getBeadEffectClass(bead.colorId)}`}
                    style={{
                        width: `${displayDiameter}px`,
                        height: `${displayDiameter}px`,
                        backgroundImage: `url(${color?.imageUrl})`,
                        backgroundSize: 'cover',
                        top: '50%',
                        left: '50%',
                        transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`
                    }}
                    title={`${t(`amber_color_${color?.id}_name` as any)} ${bead.size}mm`}
                />
            );
        });
    };

    const styles = `
        .watermark-bg {
            position: absolute;
            inset: 0;
            z-index: 0;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-items: center;
            overflow: hidden;
            pointer-events: none;
            border-radius: 0.5rem;
        }
        .watermark-text {
            font-family: 'Cormorant Garamond', serif;
            font-weight: 600;
            font-size: 1.75rem;
            color: rgba(93, 64, 55, 0.15);
            transform: rotate(-45deg);
            padding: 1.5rem 2.5rem;
            white-space: nowrap;
            user-select: none;
            text-shadow: 0 0 5px rgba(255,255,255,0.5);
        }
    `;

    return (
        <div className="space-y-8" style={{ color: 'var(--c-builder-text)' }}>
            <style>{styles}</style>
            
            <BraceletCustomizationGuide />

            <BeadCustomizationModal
                isOpen={selectedPatternIndex !== null}
                onClose={() => setSelectedPatternIndex(null)}
                beadIndex={selectedPatternIndex}
                beadConfigs={pattern}
                onUpdateBead={handleUpdatePatternBead}
            />

            {/* --- Step 1: Wrist Size --- */}
            <div className="bg-[var(--c-surface)] p-6 rounded-lg shadow-sm border border-[var(--c-border)]">
                <h3 className="font-semibold text-lg text-[var(--c-heading)]">{t('bracelet_builder_wrist_size_title')}</h3>
                <p className="text-sm text-[var(--c-text-secondary)] mb-4">{t('bracelet_builder_wrist_size_desc')}</p>
                <div className="relative pt-2">
                    <input
                        type="range"
                        id="wristSize"
                        min="120"
                        max="250"
                        step="1"
                        value={wristSize * 10}
                        onChange={e => setWristSize(Number(e.target.value) / 10)}
                        className="w-full custom-slider"
                        aria-labelledby="wrist-size-label"
                    />
                    <div id="wrist-size-label" className="text-center mt-3">
                        <output htmlFor="wristSize" className="font-bold text-2xl text-[var(--c-accent-primary)] bg-[var(--c-surface-alt)] px-4 py-2 rounded-lg shadow-inner border border-[var(--c-border)]">
                            {wristSize.toFixed(1)} cm
                        </output>
                    </div>
                </div>
            </div>

             {/* --- Step 2: Choose Your Fit --- */}
            <div className="bg-[var(--c-surface)] p-6 rounded-lg shadow-sm border border-[var(--c-border)]">
                <h3 className="font-semibold text-lg text-[var(--c-heading)]">{t('bracelet_builder_fit_title')}</h3>
                <p className="text-sm text-[var(--c-text-secondary)] mb-4">{t('bracelet_builder_fit_desc')}</p>
                <div className="grid sm:grid-cols-2 gap-4">
                    {/* Perfect Fit Option */}
                    <div className="relative">
                        <input
                            type="radio"
                            id="fit-perfect"
                            name="fitPreference"
                            value="perfect"
                            checked={fitPreference === 'perfect'}
                            onChange={() => setFitPreference('perfect')}
                            className="sr-only selection-option-input"
                        />
                        <label htmlFor="fit-perfect" className="selection-option-label">
                            <span className="checkmark-icon" aria-hidden="true">✓</span>
                            <span className="font-bold text-[var(--c-heading)]">{t('bracelet_builder_fit_perfect')}</span>
                            <span className="block text-xs text-[var(--c-text-secondary)] mt-1">{t('bracelet_builder_fit_perfect_desc')}</span>
                        </label>
                    </div>
                    {/* Loose Fit Option */}
                    <div className="relative">
                        <input
                            type="radio"
                            id="fit-loose"
                            name="fitPreference"
                            value="loose"
                            checked={fitPreference === 'loose'}
                            onChange={() => setFitPreference('loose')}
                            className="sr-only selection-option-input"
                        />
                        <label htmlFor="fit-loose" className="selection-option-label">
                            <span className="checkmark-icon" aria-hidden="true">✓</span>
                            <span className="font-bold text-[var(--c-heading)]">{t('bracelet_builder_fit_loose')}</span>
                            <span className="block text-xs text-[var(--c-text-secondary)] mt-1">{t('bracelet_builder_fit_loose_desc')}</span>
                        </label>
                    </div>
                </div>
            </div>

            {/* --- Step 3: Design Pattern --- */}
            <div className="bg-[var(--c-surface)] p-6 rounded-lg shadow-sm border border-[var(--c-border)]">
                <h3 className="font-semibold text-lg text-[var(--c-heading)]">{t('bracelet_builder_pattern_title')}</h3>
                <p className="text-sm text-[var(--c-text-secondary)] mb-4">{t('bracelet_builder_pattern_desc')}</p>
                <div className="flex items-center justify-center gap-2 p-4 bg-[var(--c-surface-alt)] rounded-md border border-[var(--c-border)] min-h-[80px] flex-wrap">
                    {pattern.map((bead, index) => {
                        const color = AMBER_COLOR_DETAILS.find(c => c.id === bead.colorId);
                        return (
                            <button key={bead.id} onClick={() => setSelectedPatternIndex(index)} className="text-center group">
                                <div 
                                    className={`w-12 h-12 rounded-full mx-auto bg-cover bg-center shadow-md border-2 border-transparent group-hover:border-[var(--c-accent-primary)] group-hover:scale-110 transition-all ${getBeadEffectClass(bead.colorId)}`}
                                    style={{ backgroundImage: `url(${color?.imageUrl})`}}
                                ></div>
                                <span className="text-xs mt-1 block font-semibold text-[var(--c-text-secondary)]">{bead.size.toFixed(1)}mm</span>
                            </button>
                        )
                    })}
                </div>
                 <div className="mt-4 text-center space-y-4">
                    <div className="flex items-center justify-center gap-4">
                        <button onClick={handleAddBeadToPattern} className="btn-glass btn-glass-standard">
                           {t('bracelet_builder_add_bead')}
                        </button>
                        <button onClick={handleRemoveBeadFromPattern} className="btn-glass btn-glass-standard" disabled={pattern.length <= 1}>
                            {t('bracelet_builder_remove_bead')}
                        </button>
                    </div>
                    <button onClick={handleAutoDesign} className="btn-glass btn-glass-special w-full">
                        <span className="btn-text">
                            <SparkleIcon className="sparkle-icon" />
                            {t('bracelet_builder_auto_design')}
                        </span>
                    </button>
                </div>
            </div>

            {/* --- Step 4: Preview & Summary --- */}
            <div className="bg-[var(--c-surface-alt)] p-6 rounded-lg shadow-inner border border-[var(--c-border)] sticky top-24 z-10">
                <h3 className="font-semibold text-lg text-center text-[var(--c-heading)]">{t('bracelet_builder_preview_title')}</h3>
                <p className="text-sm text-[var(--c-text-secondary)] mb-4 text-center">{t('bracelet_builder_preview_desc')}</p>
                
                <div ref={captureAreaRef} className="bg-[var(--c-bg)] p-4 my-4 rounded-lg border border-[var(--c-border)]">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-center">
                        <div 
                            ref={previewContainerRef}
                            className="lg:col-span-3 aspect-square relative flex items-center justify-center mx-auto w-full overflow-hidden"
                        >
                            <div 
                                className="w-full h-full relative"
                                style={{
                                    transform: `scale(${scale})`,
                                    transition: 'transform 0.4s ease',
                                    transformOrigin: 'center'
                                }}
                            >
                                <div className="watermark-bg">
                                    {[...Array(20)].map((_, i) => (
                                        <span key={i} className="watermark-text">Vicky LuxGems</span>
                                    ))}
                                </div>
                                {finalBeads.length > 0 ? renderBraceletPreview() : (
                                    <div className="absolute inset-0 flex items-center justify-center text-center text-stone-500">
                                        <p>{t('bracelet_builder_preview_placeholder')}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="lg:col-span-2 p-4 bg-[var(--c-surface)] rounded-lg border border-[var(--c-border)] h-full self-stretch flex flex-col">
                            <h4 className="text-lg font-bold mb-3 text-center text-[var(--c-heading)]">{t('bracelet_builder_spec_title')}</h4>
                             {finalBeads.length > 0 ? (
                                <>
                                    <div className="space-y-2 text-sm flex-grow">
                                        <div className="flex justify-between"><span>{t('bracelet_builder_summary_wrist_size')}</span> <strong className="text-[var(--c-accent-primary)]">{wristSize.toFixed(2)} cm</strong></div>
                                        <div className="flex justify-between"><span>{t('bracelet_builder_summary_fit_preference')}</span> <strong>{t(fitPreference === 'loose' ? 'bracelet_builder_fit_loose' : 'bracelet_builder_fit_perfect' as any)}</strong></div>
                                        <div className="flex justify-between"><span>{t('bracelet_builder_summary_total_beads')}:</span> <strong>{summary.beadCount}</strong></div>
                                        <div className="flex justify-between"><span>{t('bracelet_builder_summary_est_weight')}:</span> <strong>{summary.totalWeight.toFixed(2)} g</strong></div>
                                        <div className="mt-2 pt-2 border-t border-[var(--c-border)]">
                                            <p className="font-semibold mb-1 text-[var(--c-heading)]">{t('bracelet_builder_summary_composition')}</p>
                                            <ul className="space-y-1 text-xs max-h-40 overflow-y-auto pr-2 text-[var(--c-text-secondary)]">
                                                {beadComposition.map(bead => (
                                                    <li key={`${bead.colorName}-${bead.size}`} className="flex justify-between items-center">
                                                        <span>{t(`amber_color_${bead.colorId}_name` as any)} ({bead.size.toFixed(2)}mm)</span>
                                                        <strong>x {bead.count}</strong>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="mt-4 pt-3 border-t-2 border-dashed border-[var(--c-border)]">
                                        <div className="flex justify-between items-baseline">
                                            <span className="font-semibold text-base text-[var(--c-heading)]">{t('bracelet_builder_summary_est_price')}:</span>
                                            <strong className="text-2xl font-bold text-[var(--c-heading)]">{formatCurrency(summary.totalPrice)}</strong>
                                        </div>
                                    </div>
                                </>
                             ) : <p className="text-center text-sm text-[var(--c-text-secondary)] flex-grow flex items-center justify-center">{t('bracelet_builder_summary_placeholder_details')}</p>}
                        </div>
                    </div>
                </div>
                
                {notification && (
                    <div className="mt-4 text-center text-sm bg-[var(--c-accent-secondary)]/20 text-[var(--c-accent-secondary-hover)] p-3 rounded-md border border-[var(--c-accent-secondary)]/30">
                        {notification}
                    </div>
                )}

                {/* --- Actions --- */}
                <div className="mt-6 flex flex-col sm:flex-row gap-4">
                    <button onClick={() => handleAction('capture')} className="w-full sm:w-1/2 bg-[var(--c-accent-secondary)] text-white font-bold py-3 px-6 rounded-lg text-lg shadow-lg disabled:bg-stone-400/80 disabled:cursor-not-allowed transition-all" disabled={finalBeads.length <= 0 || isProcessing}>
                        {isProcessing ? t('bracelet_builder_cta_processing') : t('bracelet_builder_cta_capture')}
                    </button>
                    <button onClick={() => handleAction('submit')} className="w-full sm:w-1/2 btn-primary text-white font-bold py-4 px-6 rounded-lg text-lg shadow-lg disabled:bg-stone-400 disabled:cursor-not-allowed transition-all" disabled={finalBeads.length <= 0 || isProcessing}>
                        {isProcessing ? t('bracelet_builder_cta_processing') : t('bracelet_builder_cta_submit')}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BraceletBuilder;
