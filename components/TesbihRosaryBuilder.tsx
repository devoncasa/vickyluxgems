import React, { useState, useMemo, useRef } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { TesbihRosaryGrade, BeadSize, AmberColorDetail } from '../types';
import { TESBIH_ROSARY_MATERIALS, AMBER_COLOR_DETAILS, BEAD_SPECS } from '../constants';
import { toPng } from 'html-to-image';

const formatCurrency = (amount: number) => {
    return `฿${amount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
};

interface TesbihRosaryBuilderProps {
    defaultTradition?: 'Tesbih' | 'Rosary';
}

const TesbihRosaryBuilder: React.FC<TesbihRosaryBuilderProps> = ({ defaultTradition = 'Tesbih' }) => {
    const { t } = useLanguage();
    const [tradition, setTradition] = useState<'Tesbih' | 'Rosary'>(defaultTradition);
    const [grade, setGrade] = useState<TesbihRosaryGrade>(TesbihRosaryGrade.Standard);
    const [mainBeadMaterialId, setMainBeadMaterialId] = useState<string>('agarwood');
    const [amberType, setAmberType] = useState<AmberColorDetail | null>(null);
    const [beadSize, setBeadSize] = useState<BeadSize>(10);
    const [beadCount, setBeadCount] = useState<33 | 99>(99);
    
    const captureRef = useRef<HTMLDivElement>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [notification, setNotification] = useState<string | null>(null);

    const mainBeadMaterial = useMemo(() => {
        return TESBIH_ROSARY_MATERIALS.find(m => m.id === mainBeadMaterialId);
    }, [mainBeadMaterialId]);

    const handleMaterialSelect = (id: string) => {
        setMainBeadMaterialId(id);
        if (id === 'burmese_amber') {
            setAmberType(AMBER_COLOR_DETAILS.find(c => c.id === 'golden') || null);
        } else {
            setAmberType(null);
        }
    };
    
    const { pricePerGram, finalBeadMaterial } = useMemo(() => {
        if (amberType && mainBeadMaterialId === 'burmese_amber') {
            const basePrice = mainBeadMaterial?.prices[grade] || 0;
            const multiplier = amberType.basePricePerGram / AMBER_COLOR_DETAILS.find(c=>c.id === 'golden')!.basePricePerGram;
            return { pricePerGram: basePrice * multiplier, finalBeadMaterial: amberType };
        }
        return { pricePerGram: mainBeadMaterial?.prices[grade] || 0, finalBeadMaterial: mainBeadMaterial };
    }, [grade, mainBeadMaterial, mainBeadMaterialId, amberType]);

    const totalBeads = tradition === 'Rosary' ? 59 : beadCount;

    const { totalPrice, totalWeight } = useMemo(() => {
        const beadSpec = BEAD_SPECS.find(s => s.size === beadSize);
        if (!beadSpec || pricePerGram === 0) return { totalPrice: 0, totalWeight: 0 };
        
        const weight = beadSpec.weight * totalBeads;
        const price = weight * pricePerGram;
        
        return { totalPrice: price, totalWeight: weight };
    }, [beadSize, totalBeads, pricePerGram]);
    
    // --- Automated Proportional Sizing Logic ---
    const dependentSizes = useMemo(() => {
        if (tradition === 'Tesbih') {
            const disksSize = beadSize + 2.5; // +5 steps
            const imameSize = beadSize + 1.5; // +3 steps
            const tasselBeadsSize = Math.max(2, beadSize - 4.5); // -9 steps, min 2mm
            return { disksSize, imameSize, tasselBeadsSize };
        }
        if (tradition === 'Rosary') {
            const ourFatherBeadsSize = beadSize + 2.5; // +5 steps
            const introBeadsSmallSize = beadSize;
            const introBeadsLargeSize = ourFatherBeadsSize;
            return { ourFatherBeadsSize, introBeadsSmallSize, introBeadsLargeSize };
        }
        return {};
    }, [beadSize, tradition]);

    const handleSubmit = async () => {
        if (!captureRef.current || isProcessing) return;
        setIsProcessing(true);
        try {
            const dataUrl = await toPng(captureRef.current, { backgroundColor: '#FCFBF9', pixelRatio: 2 });
            const link = document.createElement('a');
            link.download = `Custom-${tradition}-${Date.now()}.png`;
            link.href = dataUrl;
            link.click();
            
            const message = `I would like to pre-order this custom ${tradition} design. Please provide a final quote and details.`;
            await navigator.clipboard.writeText(message);
            setNotification(t('trb_notification_success' as any));
            window.open('https://www.facebook.com/messages/t/VKMMAmber', '_blank', 'noopener,noreferrer');
        } catch (err) {
            console.error('Failed to capture design:', err);
            setNotification(t('trb_notification_error' as any));
        } finally {
            setIsProcessing(false);
        }
    };

    const renderPreview = () => {
        const beadColor = amberType ? amberType.imageUrl : mainBeadMaterial?.imageUrl;
        return (
            <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                <img src={beadColor} alt="Bead Preview" className="w-32 h-32 rounded-full object-cover shadow-lg mb-4" />
                <h4 className="font-semibold">{tradition} Preview</h4>
                <p className="text-sm text-[var(--c-text-secondary)]">A full visual preview of the final design will be provided during your consultation.</p>
            </div>
        );
    };

    return (
        <div className="grid lg:grid-cols-2 gap-12">
            {/* Controls */}
            <div className="space-y-6">
                {/* Step 1: Tradition */}
                <div>
                    <h3 className="text-xl font-semibold mb-3">Step 1: Choose Your Tradition</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <button onClick={() => setTradition('Tesbih')} className={`p-4 rounded-lg border-2 transition-all ${tradition === 'Tesbih' ? 'border-[var(--c-accent-primary)] bg-[var(--c-accent-primary)]/10' : 'border-[var(--c-border)] hover:border-[var(--c-accent-primary-hover)]/50'}`}>Tesbih</button>
                        <button onClick={() => setTradition('Rosary')} className={`p-4 rounded-lg border-2 transition-all ${tradition === 'Rosary' ? 'border-[var(--c-accent-primary)] bg-[var(--c-accent-primary)]/10' : 'border-[var(--c-border)] hover:border-[var(--c-accent-primary-hover)]/50'}`}>Rosary</button>
                    </div>
                </div>

                {/* Step 2: Quality Grade */}
                <div>
                    <h3 className="text-xl font-semibold mb-3">Step 2: Select Quality Grade</h3>
                    <select value={grade} onChange={e => setGrade(e.target.value as TesbihRosaryGrade)} className="w-full p-3 border border-[var(--c-border)] rounded-md">
                        {Object.values(TesbihRosaryGrade).map(g => <option key={g} value={g}>{g}</option>)}
                    </select>
                </div>

                {/* Step 3: Main Bead Material */}
                <div>
                    <h3 className="text-xl font-semibold mb-3">Step 3: Select Main Bead Material</h3>
                    <div className="grid grid-cols-4 sm:grid-cols-5 gap-4">
                        {TESBIH_ROSARY_MATERIALS.map(mat => (
                            <button key={mat.id} onClick={() => handleMaterialSelect(mat.id)} className="text-center group">
                                <img src={mat.imageUrl} alt={mat.name} className={`w-16 h-16 mx-auto rounded-full object-cover border-4 transition-all ${mainBeadMaterialId === mat.id ? 'border-[var(--c-accent-primary)] scale-110' : 'border-transparent group-hover:border-[var(--c-accent-primary)]/50'}`} />
                                <span className={`mt-2 text-xs font-semibold block truncate ${mainBeadMaterialId === mat.id ? 'text-[var(--c-accent-primary)]' : 'text-[var(--c-text-secondary)]'}`}>{t(mat.name as any)}</span>
                            </button>
                        ))}
                    </div>
                </div>
                 {mainBeadMaterialId === 'burmese_amber' && (
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Select Burmese Amber Type</h3>
                        <select value={amberType?.id || ''} onChange={e => setAmberType(AMBER_COLOR_DETAILS.find(c => c.id === e.target.value) || null)} className="w-full p-3 border border-[var(--c-border)] rounded-md">
                            {AMBER_COLOR_DETAILS.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                    </div>
                )}


                {/* Step 4: Bead Size & Count */}
                <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="beadSize" className="font-semibold mb-2 block">{tradition === 'Tesbih' ? 'Step 4: Define Main Bead Size' : 'Step 4: Define "Hail Mary" Bead Size'}</label>
                        <select id="beadSize" value={beadSize} onChange={e => setBeadSize(Number(e.target.value))} className="w-full p-3 border border-[var(--c-border)] rounded-md">
                            {BEAD_SPECS.map(opt => <option key={opt.size} value={opt.size}>{opt.size.toFixed(2)}mm</option>)}
                        </select>
                    </div>
                     {tradition === 'Tesbih' && (
                        <div>
                            <label htmlFor="beadCount" className="font-semibold mb-2 block">and Bead Count</label>
                            <select id="beadCount" value={beadCount} onChange={e => setBeadCount(Number(e.target.value) as 33|99)} className="w-full p-3 border border-[var(--c-border)] rounded-md">
                                <option value={33}>33 Beads</option>
                                <option value={99}>99 Beads</option>
                            </select>
                        </div>
                    )}
                </div>

                 {/* Step 5 is conceptual */}
                 <div>
                    <h3 className="text-xl font-semibold mb-3">Step 5: Customize Components (Example)</h3>
                    <p className="text-sm text-[var(--c-text-secondary)]">Further customization of tassels, crucifixes, and other components will be finalized during your personal consultation after submitting your design.</p>
                </div>
            </div>

            {/* Summary & Preview */}
            <div ref={captureRef} className="bg-[var(--c-surface-alt)] p-6 rounded-lg shadow-inner border border-[var(--c-border)] sticky top-28 self-start">
                <h3 className="text-2xl font-bold text-center mb-4">{t('trb_summary_title' as any, { tradition })}</h3>
                <div className="h-64 bg-[var(--c-surface)] rounded-lg mb-4">{renderPreview()}</div>
                
                <div className="space-y-3 text-sm">
                    {/* General Info */}
                    <div className="flex justify-between"><span className="text-[var(--c-text-secondary)]">{t('trb_summary_grade' as any)}</span><strong className="font-semibold">{grade}</strong></div>
                    <div className="flex justify-between"><span className="text-[var(--c-text-secondary)]">{t('trb_summary_material' as any)}</span><strong className="font-semibold text-right">{t(mainBeadMaterial?.name as any)}</strong></div>
                    {amberType && <div className="flex justify-between"><span className="text-[var(--c-text-secondary)]">{t('trb_summary_amber_type' as any)}</span><strong className="font-semibold text-right">{t(amberType.name as any)}</strong></div>}
                    
                    {/* Component Breakdown */}
                    <div className="pt-3 mt-3 border-t border-dashed border-[var(--c-border)]">
                        <h4 className="font-semibold text-[var(--c-heading)] mb-2">{t('trb_summary_components' as any)}</h4>
                        {tradition === 'Tesbih' && (
                            <>
                                <div className="flex justify-between"><span className="opacity-80">{t('trb_summary_main_beads' as any, { count: beadCount })}</span><strong>{t('trb_summary_size_mm' as any, { size: beadSize.toFixed(1) })}</strong></div>
                                <div className="flex justify-between"><span className="opacity-80">{t('trb_summary_disks' as any)}</span><strong>{t('trb_summary_size_mm' as any, { size: (dependentSizes as any).disksSize.toFixed(1) })}</strong></div>
                                <div className="flex justify-between"><span className="opacity-80">{t('trb_summary_imame' as any)}</span><strong>{t('trb_summary_size_mm' as any, { size: (dependentSizes as any).imameSize.toFixed(1) })}</strong></div>
                                <div className="flex justify-between"><span className="opacity-80">{t('trb_summary_tassel_beads' as any)}</span><strong>{t('trb_summary_size_mm' as any, { size: (dependentSizes as any).tasselBeadsSize.toFixed(1) })}</strong></div>
                            </>
                        )}
                        {tradition === 'Rosary' && (
                            <>
                                <div className="flex justify-between"><span className="opacity-80">{t('trb_summary_hail_mary_beads' as any)}</span><strong>{t('trb_summary_size_mm' as any, { size: beadSize.toFixed(1) })}</strong></div>
                                <div className="flex justify-between"><span className="opacity-80">{t('trb_summary_our_father_beads' as any)}</span><strong>{t('trb_summary_size_mm' as any, { size: (dependentSizes as any).ourFatherBeadsSize.toFixed(1) })}</strong></div>
                                <div className="flex justify-between"><span className="opacity-80">{t('trb_summary_intro_beads_small' as any)}</span><strong>{t('trb_summary_size_mm' as any, { size: (dependentSizes as any).introBeadsSmallSize.toFixed(1) })}</strong></div>
                                <div className="flex justify-between"><span className="opacity-80">{t('trb_summary_intro_beads_large' as any)}</span><strong>{t('trb_summary_size_mm' as any, { size: (dependentSizes as any).introBeadsLargeSize.toFixed(1) })}</strong></div>
                            </>
                        )}
                    </div>

                    {/* Final Stats */}
                    <div className="flex justify-between pt-2 border-t border-[var(--c-border)]"><span className="text-[var(--c-text-secondary)]">{t('trb_summary_est_weight' as any)}</span><strong className="font-semibold">{totalWeight.toFixed(2)}g</strong></div>
                </div>

                 <div className="mt-6 pt-4 border-t-2 border-dashed border-[var(--c-heading)]/20">
                    <div className="flex justify-between items-baseline">
                         <span className="text-lg font-bold">{t('trb_summary_est_total' as any)}</span>
                         <p className="text-3xl font-bold text-right text-[var(--c-heading)]">{formatCurrency(totalPrice)}</p>
                    </div>
                </div>
                <button onClick={handleSubmit} disabled={isProcessing} className="w-full mt-4 btn-primary text-white font-bold py-3 rounded-lg text-lg">
                    {isProcessing ? t('trb_processing' as any) : t('trb_submit_design' as any)}
                </button>
                {notification && <p className="text-sm text-center mt-3 text-green-700">{notification}</p>}
            </div>
        </div>
    );
};

export default TesbihRosaryBuilder;
