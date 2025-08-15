import React, { useState, useMemo, useEffect, useRef } from 'react';
import { BeadSize, AmberColorDetail, BeadConfig, CustomBraceletFromBuilderDetails } from '../types';
import { BEAD_SPECS, AMBER_COLOR_DETAILS } from '../constants';
import BeadCustomizationModal from './BeadCustomizationModal';
import { useLanguage } from '../i18n/LanguageContext';
import BraceletCustomizationGuide from './BraceletCustomizationGuide.tsx';
import { SparkleIcon } from './IconComponents.tsx';

const formatCurrency = (amount: number) => {
    return `฿${amount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
};

const WristGuideModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) {
            panelRef.current?.focus();
        }

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (modalRef.current && e.target === modalRef.current) {
            onClose();
        }
    };

    return (
        <div id="wristGuideModal" className="vk-modal" role="dialog" aria-modal="true" aria-labelledby="wristGuideTitle" aria-hidden={!isOpen} onClick={handleBackdropClick} ref={modalRef}>
            <div className="vk-modal__panel glass" role="document" tabIndex={-1} ref={panelRef}>
                <button className="vk-modal__close" aria-label="Close" onClick={onClose}>&times;</button>
                <h2 id="wristGuideTitle" className="vk-modal__title">📏 วิธีวัดขนาดข้อมือ / How to Measure Your Wrist</h2>
                <div className="vk-modal__content prose">
                    <p><strong>ภาษาไทย:</strong> ใช้สายวัด หรือกระดาษตัดเป็นแผ่นเล็กๆ ยาวพอที่พันรอบข้อมือในตำแหน่งที่เล็กที่สุด โดยที่ไม่แน่นจนเกินไป (<em>ไม่ต้องวัดขนาดเผื่อ</em> เพราะทางร้านจะมีสูตรสำหรับขนาดแต่ละข้อมือให้ใส่ได้แบบพอดีกับหลวมในสไตล์ที่ผู้หญิงใส่) จากนั้นจดตัวเลขที่ได้ และนำมาปรับแต่งกับขนาดในโปรแกรม</p>
                    <p><strong>English:</strong> Use a measuring tape or cut a thin strip of paper long enough to wrap around the smallest part of your wrist. Keep it snug but not tight. <em>Do not add extra allowance</em>—our workshop applies a fit formula so your amber bracelet wears comfortably with a feminine, slightly loose style. Write down the number you get and adjust/select that size in the builder.</p>
                </div>
            </div>
        </div>
    );
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
    const captureAreaRef = useRef<HTMLDivElement>(null);
    const [isWristGuideModalOpen, setIsWristGuideModalOpen] = useState(false);

    // New state for save design feature
    const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
    const [snapshot, setSnapshot] = useState<{ dataUrl: string; blob: Blob | null } | null>(null);
    const [modalMessage, setModalMessage] = useState('Generating preview…');
    const lastFocusRef = useRef<HTMLElement | null>(null);
    const modalPanelRef = useRef<HTMLDivElement>(null);
    const downloadLinkRef = useRef<HTMLAnchorElement>(null);

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
        const pickRandom = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
        const allAmberColorIds = AMBER_COLOR_DETAILS.map(c => c.id);
        const availableBeadSizes = BEAD_SPECS.map(s => s.size);

        const patternLength = pickRandom([3, 5, 7]);
        const newPattern: BeadConfig[] = [];
        for (let i = 0; i < patternLength; i++) {
            const colorId = pickRandom(allAmberColorIds);
            const size = pickRandom(availableBeadSizes.filter(s => s >= 9 && s <= 13));
            newPattern.push({ id: `auto-${i}-${Date.now()}`, colorId, size });
        }
        setPattern(newPattern);
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

    // --- Save Design Modal Logic ---
    const openSaveModal = () => {
        lastFocusRef.current = document.activeElement as HTMLElement;
        setIsSaveModalOpen(true);
    };

    const closeSaveModal = () => {
        setIsSaveModalOpen(false);
        setSnapshot(null);
        setModalMessage('Generating preview…');
        if (lastFocusRef.current) {
            lastFocusRef.current.focus();
        }
    };

    useEffect(() => {
        if (isSaveModalOpen) {
            document.body.style.overflow = 'hidden';
            modalPanelRef.current?.focus();
        } else {
            document.body.style.overflow = '';
        }

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && isSaveModalOpen) {
                closeSaveModal();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [isSaveModalOpen]);

    const handleCaptureAndShow = async () => {
        openSaveModal();
        setIsProcessing(true);
        
        if (!captureAreaRef.current) {
            setModalMessage('Error: Capture area not found.');
            setIsProcessing(false);
            return;
        }

        try {
            const hti = await import('html-to-image');
            const dataUrl = await hti.toPng(captureAreaRef.current, {
                cacheBust: true,
                pixelRatio: Math.min(window.devicePixelRatio || 1, 2),
                backgroundColor: '#FDFBF8',
            });
            
            const res = await fetch(dataUrl);
            const blob = await res.blob();
            
            setSnapshot({ dataUrl, blob });
            if (downloadLinkRef.current && blob) {
                downloadLinkRef.current.href = URL.createObjectURL(blob);
            }
        } catch (err) {
            console.error(err);
            setModalMessage('Sorry—could not generate snapshot. Please try again.');
        } finally {
            setIsProcessing(false);
        }
    };
    
    const shareToMessenger = async () => {
        if (!snapshot?.blob) return;
        
        const fbUrl = 'https://www.facebook.com/vkmmamber';
        const shareText = 'Hi Vicky Amber, I would like to inquire about this bracelet design.';
        const file = new File([snapshot.blob], 'vicky-amber-design.png', { type: snapshot.blob.type || 'image/png' });

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
            try {
                await navigator.share({
                    files: [file],
                    title: 'Vicky Amber — Bracelet Design',
                    text: shareText
                });
                return;
            } catch (e) {
                // User cancelled share, fall-through to opening Messenger link
            }
        }

        try {
            await navigator.clipboard.writeText(shareText);
        } catch(_) {}
        window.open(fbUrl.replace(/^http:/,'https:'), '_blank', 'noopener');
    };
    
    const handleModalKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key !== 'Tab' || !modalPanelRef.current) return;
        
        const focusables = modalPanelRef.current.querySelectorAll<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        const list = Array.from(focusables).filter(el => !el.hasAttribute('disabled'));
        if (list.length === 0) return;

        const first = list[0];
        const last = list[list.length - 1];

        if (e.shiftKey && document.activeElement === first) {
            last.focus();
            e.preventDefault();
        } else if (!e.shiftKey && document.activeElement === last) {
            first.focus();
            e.preventDefault();
        }
    };


    const renderBraceletPreview = () => {
        let cumulativeAngle = -Math.PI / 2;

        return finalBeads.map((bead) => {
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

    return (
        <>
            <div className="space-y-8" style={{ color: 'var(--c-builder-text)' }}>
                
                <WristGuideModal isOpen={isWristGuideModalOpen} onClose={() => setIsWristGuideModalOpen(false)} />
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
                    <div className="flex flex-wrap gap-x-6 gap-y-2 items-center">
                        <h3 className="font-semibold text-lg text-[var(--c-heading)]">{t('bracelet_builder_wrist_size_title')}</h3>
                        {/* Links are injected by a global script from index.html */}
                    </div>
                    <p className="text-sm text-[var(--c-text-secondary)] my-4">{t('bracelet_builder_wrist_size_desc')}</p>
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
                        <div className="relative">
                            <input type="radio" id="fit-perfect" name="fitPreference" value="perfect" checked={fitPreference === 'perfect'} onChange={() => setFitPreference('perfect')} className="sr-only selection-option-input" />
                            <label htmlFor="fit-perfect" className="selection-option-label">
                                <span className="checkmark-icon" aria-hidden="true">✓</span>
                                <span className="font-bold text-[var(--c-heading)]">{t('bracelet_builder_fit_perfect')}</span>
                                <span className="block text-xs text-[var(--c-text-secondary)] mt-1">{t('bracelet_builder_fit_perfect_desc')}</span>
                            </label>
                        </div>
                        <div className="relative">
                            <input type="radio" id="fit-loose" name="fitPreference" value="loose" checked={fitPreference === 'loose'} onChange={() => setFitPreference('loose')} className="sr-only selection-option-input" />
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
                                    <div className={`w-12 h-12 rounded-full mx-auto bg-cover bg-center shadow-md border-2 border-transparent group-hover:border-[var(--c-accent-primary)] group-hover:scale-110 transition-all ${getBeadEffectClass(bead.colorId)}`} style={{ backgroundImage: `url(${color?.imageUrl})`}} ></div>
                                    <span className="text-xs mt-1 block font-semibold text-[var(--c-text-secondary)]">{bead.size.toFixed(1)}mm</span>
                                </button>
                            )
                        })}
                    </div>
                    <div className="mt-4 text-center space-y-4">
                        <div className="flex items-center justify-center gap-4">
                            <button onClick={handleAddBeadToPattern} className="btn-glass btn-glass-standard">{t('bracelet_builder_add_bead')}</button>
                            <button onClick={handleRemoveBeadFromPattern} className="btn-glass btn-glass-standard" disabled={pattern.length <= 1}>{t('bracelet_builder_remove_bead')}</button>
                        </div>
                         <button onClick={handleAutoDesign} className="btn-glass btn-glass-special">
                            <span className="btn-text">
                                <SparkleIcon className="sparkle-icon" />
                                {t('bracelet_builder_auto_design')}
                            </span>
                        </button>
                    </div>
                </div>

                {/* --- Step 4: Preview & Summary --- */}
                <div id="braceletSection" ref={captureAreaRef} className="bg-[var(--c-surface-alt)] p-6 rounded-lg shadow-inner border border-[var(--c-border)] sticky top-24 z-10">
                    <h3 className="font-semibold text-lg text-center text-[var(--c-heading)]">{t('bracelet_builder_preview_title')}</h3>
                    <p className="text-sm text-[var(--c-text-secondary)] mb-4 text-center">{t('bracelet_builder_preview_desc')}</p>
                    
                    <div className="bg-[var(--c-bg)] p-4 my-4 rounded-lg border border-[var(--c-border)]">
                        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-center">
                            <div ref={previewContainerRef} className="lg:col-span-3 aspect-square relative flex items-center justify-center mx-auto w-full overflow-hidden" >
                                <div className="w-full h-full relative" style={{ transform: `scale(${scale})`, transition: 'transform 0.4s ease', transformOrigin: 'center' }} >
                                    <div className="rosary-preview-watermark-bg">{[...Array(30)].map((_, i) => (<span key={i} className="rosary-preview-watermark-text">Vicky LuxGems</span>))}</div>
                                    {finalBeads.length > 0 ? renderBraceletPreview() : (<div className="absolute inset-0 flex items-center justify-center text-center text-stone-500"><p>{t('bracelet_builder_preview_placeholder')}</p></div>)}
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
                                            <div className="mt-2 pt-2 border-t border-[var(--c-border)]"><p className="font-semibold mb-1 text-[var(--c-heading)]">{t('bracelet_builder_summary_composition')}</p>
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

                    {/* --- Actions --- */}
                    <div className="mt-6 flex flex-col sm:flex-row gap-4">
                       <button id="saveDesignBtn" className="w-full vlg-save-btn gold-inner text-lg" onClick={handleCaptureAndShow} data-capture="#braceletSection" data-fb="https://www.facebook.com/vkmmamber" aria-haspopup="dialog" aria-controls="saveDesignModal" disabled={finalBeads.length <= 0 || isProcessing} >
                            💾 บันทึกภาพดีไซน์ / Save Design Image
                        </button>
                    </div>
                </div>
            </div>
            
            <div id="saveDesignModal" className="vlg-modal" role="dialog" aria-modal="true" aria-labelledby="saveDesignTitle" aria-hidden={!isSaveModalOpen} onClick={e => { if (e.currentTarget === e.target) closeSaveModal() }} >
                <div className="vlg-panel glass" role="document" tabIndex={-1} ref={modalPanelRef} onKeyDown={handleModalKeyDown}>
                    <button className="vlg-close" aria-label="Close" onClick={closeSaveModal}>&times;</button>
                    <h2 id="saveDesignTitle" className="vlg-title">บันทึกภาพดีไซน์ / Save Your Design</h2>

                    <div className="vlg-preview-wrap">
                        {snapshot ? (<img id="designSnapshot" src={snapshot.dataUrl} alt="Design Snapshot" />) : (<div className="vlg-preview-placeholder" id="designPreviewPlaceholder">{isProcessing ? 'Generating...' : modalMessage}</div>)}
                    </div>

                    <p className="vlg-note">เลือกว่าจะ <strong>บันทึกภาพ</strong> ลงเครื่อง หรือ <strong>ส่งข้อความถึง Vicky Amber</strong> ทาง Facebook Messenger</p>

                    <div className="vlg-actions">
                        <a id="downloadSnapshot" ref={downloadLinkRef} className={`vlg-btn vlg-btn--primary gold-inner ${!snapshot ? 'opacity-50 pointer-events-none' : ''}`} href={snapshot?.dataUrl} download="vicky-amber-design.png">⬇️ Save Image</a>
                        <button id="shareToMessenger" className={`vlg-btn vlg-btn--ghost gold-inner ${!snapshot ? 'opacity-50 pointer-events-none' : ''}`} onClick={shareToMessenger} disabled={!snapshot}>📩 Send to Vicky Amber</button>
                    </div>
                    <small className="vlg-help">Tip: On mobile, we’ll try to share the image via your Messenger app. On desktop, we’ll open Messenger and you can attach the saved image.</small>
                </div>
            </div>
        </>
    );
};

export default BraceletBuilder;