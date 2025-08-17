import React, { useState, useMemo, useEffect, useRef } from 'react';
import { toPng } from 'html-to-image';
import { useLanguage } from '../i18n/LanguageContext.tsx';
import SEO from '../components/SEO.tsx';
import { BACKGROUND_IMAGES, TESBIH_MATERIALS, BEAD_SPECS, AMBER_COLOR_DETAILS } from '../constants.ts';
import SectionDivider from '../components/SectionDivider.tsx';
import { TesbihConfig, TesbihComponentType, TesbihRosaryGrade } from '../types.ts';
import { ChevronDownIcon } from '../components/IconComponents.tsx';

const formatCurrency = (amount: number) => `฿${amount.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
const findBeadSpec = (size: number) => BEAD_SPECS.reduce((prev, curr) => (Math.abs(curr.size - size) < Math.abs(prev.size - size) ? curr : prev));

// --- Main Page Component ---
const CustomTesbihConfiguratorPage: React.FC = () => {
    const { t } = useLanguage();
    const captureRef = useRef<HTMLDivElement>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [notification, setNotification] = useState<string | null>(null);

    const [config, setConfig] = useState<TesbihConfig>({
        mainBeadSize: 10,
        beadCount: 33,
        mainBeads: { materialId: 'agarwood', grade: TesbihRosaryGrade.Premium },
        imame: { materialId: 'agarwood', grade: TesbihRosaryGrade.Premium },
        separators: { materialId: 'sterling_silver' }, // Small discs
        markerBeads: { materialId: 'jade_green', grade: TesbihRosaryGrade.Premium }, // "The Fours"
        accentBead: { materialId: 'turquoise', grade: TesbihRosaryGrade.Premium }, // "Deus"
        cresset: { materialId: 'sterling_silver' },
        tasselToy: { materialId: 'turquoise' },
        signatureBead: { materialId: 'sterling_silver' },
        tasselCrown: { materialId: 'sterling_silver' },
    });

    const dependentSizes = useMemo(() => {
        const base = config.mainBeadSize;
        return {
            imameHeight: base * 3,
            imameWidth: base * 1.1,
            separatorDiameter: base * 0.9,
            markerBeadDiameter: base * 1.25,
            accentBeadDiameter: base * 0.9,
            cressetDiameter: base * 0.6,
        };
    }, [config.mainBeadSize]);

    const finalPrice = useMemo(() => {
        let price = 0;
        const gradeMultipliers = {
            [TesbihRosaryGrade.Standard]: 1,
            [TesbihRosaryGrade.Premium]: 1.5,
            [TesbihRosaryGrade.Exceptional]: 2.5,
        };

        const getComponentPrice = (size: number, count: number, materialId: string, grade: TesbihRosaryGrade = TesbihRosaryGrade.Standard, weightMultiplier = 1) => {
            const material = TESBIH_MATERIALS.find(m => m.id === materialId);
            if (!material) return 0;
            const spec = findBeadSpec(size);
            const gradeMultiplier = material.type !== 'metal' ? gradeMultipliers[grade] : 1;
            return spec.weight * material.pricePerGram * count * gradeMultiplier * weightMultiplier;
        };
        
        // Main Beads
        price += getComponentPrice(config.mainBeadSize, config.beadCount, config.mainBeads.materialId, config.mainBeads.grade);
        // Imam (estimated as 3x weight of a spherical bead of same width)
        price += getComponentPrice(dependentSizes.imameWidth, 1, config.imame.materialId, config.imame.grade, 3);
        // Marker Beads ("The Fours")
        price += getComponentPrice(dependentSizes.markerBeadDiameter, 2, config.markerBeads.materialId, config.markerBeads.grade);
        // Separators (Discs, estimated as 0.3x weight)
        price += getComponentPrice(dependentSizes.separatorDiameter, 2, config.separators.materialId, TesbihRosaryGrade.Standard, 0.3);
        // Accent Bead ("Deus")
        price += getComponentPrice(dependentSizes.accentBeadDiameter, 1, config.accentBead.materialId, config.accentBead.grade);
        // Cresset
        price += getComponentPrice(dependentSizes.cressetDiameter, 1, config.cresset.materialId, TesbihRosaryGrade.Standard, 0.8);
        
        // Tassel components (fixed weight estimates)
        const getFixedComponentPrice = (materialId: string, estimatedWeightG: number) => {
            const material = TESBIH_MATERIALS.find(m => m.id === materialId);
            return material ? material.pricePerGram * estimatedWeightG : 0;
        };
        price += getFixedComponentPrice(config.tasselCrown.materialId, 5);
        price += getFixedComponentPrice(config.tasselToy.materialId, 2);
        price += getFixedComponentPrice(config.signatureBead.materialId, 3);

        return price * 1.25; // Artisan fee markup
    }, [config, dependentSizes]);

    const handleSubmit = async () => {
        if (!captureRef.current || isProcessing) return;
        setIsProcessing(true);
        setNotification(null);
        try {
            const dataUrl = await toPng(captureRef.current, { backgroundColor: '#FDFBF9', pixelRatio: 2 });
            const link = document.createElement('a');
            link.download = `VLG-Tesbih-Design-${Date.now()}.png`;
            link.href = dataUrl;
            link.click();
            
            const getMatName = (id: string) => TESBIH_MATERIALS.find(m => m.id === id)?.name || id;
            let summary = `Hello! I'd like to pre-order this custom Tesbih design.\n\n--- SUMMARY ---\n`;
            summary += `Main Beads: ${config.beadCount} x ${config.mainBeadSize}mm ${getMatName(config.mainBeads.materialId)} (${config.mainBeads.grade})\n`;
            summary += `Imam: ${getMatName(config.imame.materialId)}\n`;
            summary += `Dividers (The Fours): ${getMatName(config.markerBeads.materialId)}\n`;
            summary += `Separator Discs: ${getMatName(config.separators.materialId)}\n`;
            summary += `Decorative Bead (Deus): ${getMatName(config.accentBead.materialId)}\n`;
            summary += `Cresset: ${getMatName(config.cresset.materialId)}\n`;
            summary += `Tassel Crown: ${getMatName(config.tasselCrown.materialId)}\n`;
            summary += `Tassel Toy: ${getMatName(config.tasselToy.materialId)}\n`;
            summary += `Signature Bead: ${getMatName(config.signatureBead.materialId)}\n\n`;
            summary += `Estimated Price: ${formatCurrency(finalPrice)}\n`;

            await navigator.clipboard.writeText(summary);
            setNotification('Design saved & summary copied! Please paste it into the Facebook chat that will open.');
            window.open('https://www.facebook.com/vkmmamber', '_blank', 'noopener,noreferrer');
        } catch (err) {
            console.error('Failed to capture design:', err);
            setNotification('Error capturing design. Please try again.');
        } finally {
            setIsProcessing(false);
        }
    };
    
    return (
        <>
            <SEO title="Advanced Tesbih Visual Configurator" description="Design your own heirloom-quality Islamic Tesbih with our advanced real-time visual configurator." />
            <div className="page-container-with-bg py-16">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-10">
                        <h1 className="text-5xl font-bold">Advanced Tesbih Configurator</h1>
                        <p className="mt-4 text-xl text-[var(--c-text-secondary)]">Craft a unique piece for your spiritual practice.</p>
                        <SectionDivider />
                    </div>
                    
                    <div className="grid lg:grid-cols-5 gap-8">
                        {/* Visual Preview */}
                        <div ref={captureRef} className="lg:col-span-3 bg-[var(--c-surface)] p-4 rounded-lg shadow-lg border relative min-h-[600px] flex items-center justify-center overflow-hidden">
                            <div className="rosary-preview-watermark-bg">{[...Array(30)].map((_, i) => (<span key={i} className="rosary-preview-watermark-text">Vicky LuxGems</span>))}</div>
                            <VisualPreview config={config} dependentSizes={dependentSizes} />
                        </div>

                        {/* Selection Panel */}
                        <div className="lg:col-span-2 space-y-4">
                             <SelectionPanel config={config} setConfig={setConfig} finalPrice={finalPrice} handleSubmit={handleSubmit} isProcessing={isProcessing} />
                             {notification && <p className="text-sm text-center mt-3 text-green-700 font-semibold p-3 bg-green-50 rounded-md">{notification}</p>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

// --- Child Components ---

const VisualPreview: React.FC<{ config: TesbihConfig; dependentSizes: Record<string, number> }> = ({ config, dependentSizes }) => {
    const getMaterialStyle = (materialId: string) => {
        const material = TESBIH_MATERIALS.find(m => m.id === materialId);
        return {
            backgroundImage: `url(${material?.imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.3), 0 2px 4px rgba(0,0,0,0.15)',
            border: '1px solid rgba(0,0,0,0.2)'
        };
    };

    const beadCountForLoop = config.beadCount === 33 ? 11 : 33;
    const totalItemsInLoop = config.beadCount === 33 ? 3 * beadCountForLoop + 3 : 3 * beadCountForLoop;
    const radius = 140;

    const loopElements = [];
    let currentAngle = -Math.PI / 2;

    for(let section = 0; section < 3; section++) {
        // Main beads in section
        for(let i = 0; i < beadCountForLoop; i++) {
            const size = config.mainBeadSize;
            const angleStep = (2 * Math.PI) / (config.beadCount + 3);
            const x = radius * Math.cos(currentAngle);
            const y = radius * Math.sin(currentAngle);
            loopElements.push(
                <div key={`main-${section}-${i}`} className="absolute top-1/2 left-1/2 rounded-full" style={{ width: `${size}px`, height: `${size}px`, transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`, ...getMaterialStyle(config.mainBeads.materialId) }} />
            );
            currentAngle += angleStep;
        }

        // Separator section (The Fours + Discs)
        if (section < 2 || config.beadCount === 99) {
            const size = dependentSizes.markerBeadDiameter;
             const angleStep = (2 * Math.PI) / (config.beadCount + 3);
            const x = radius * Math.cos(currentAngle);
            const y = radius * Math.sin(currentAngle);
            loopElements.push(
                <div key={`marker-${section}`} className="absolute top-1/2 left-1/2 rounded-full z-10" style={{ width: `${size}px`, height: `${size}px`, transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`, ...getMaterialStyle(config.markerBeads.materialId) }} />
            );
             // Discs
            const discSize = dependentSizes.separatorDiameter;
            const discOffset = (size / 2) + (discSize / 2);
            const discX1 = radius * Math.cos(currentAngle - angleStep/2);
            const discY1 = radius * Math.sin(currentAngle - angleStep/2);
            const discX2 = radius * Math.cos(currentAngle + angleStep/2);
            const discY2 = radius * Math.sin(currentAngle + angleStep/2);
            loopElements.push(
                <div key={`disc-${section}-1`} className="absolute top-1/2 left-1/2 rounded-full" style={{ width: `${discSize}px`, height: `${discSize}px`, transform: `translate(-50%, -50%) translate(${discX1}px, ${discY1}px)`, ...getMaterialStyle(config.separators.materialId), zIndex: 5 }} />
            );
            loopElements.push(
                <div key={`disc-${section}-2`} className="absolute top-1/2 left-1/2 rounded-full" style={{ width: `${discSize}px`, height: `${discSize}px`, transform: `translate(-50%, -50%) translate(${discX2}px, ${discY2}px)`, ...getMaterialStyle(config.separators.materialId), zIndex: 5 }} />
            );
            currentAngle += angleStep;
        }
    }


    return (
        <div className="relative w-full h-[600px] flex items-center justify-center">
            <div className="absolute top-[calc(50%-140px)] left-1/2 -translate-x-1/2" style={{width: '280px', height: '280px'}}>
                {loopElements}
            </div>
            
            {/* Imam and Tassel */}
            <div className="absolute top-[calc(50%+130px)] left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5">
                <div style={{...getMaterialStyle(config.accentBead.materialId), width: `${dependentSizes.accentBeadDiameter}px`, height: `${dependentSizes.accentBeadDiameter}px`}} className="rounded-full" title="Deus" />
                <div style={{...getMaterialStyle(config.imame.materialId), width: `${dependentSizes.imameWidth}px`, height: `${dependentSizes.imameHeight}px` }} className="rounded-md" title="Imam" />
                <div style={{...getMaterialStyle(config.cresset.materialId), width: `${dependentSizes.cressetDiameter}px`, height: `${dependentSizes.cressetDiameter}px`}} className="rounded-full" title="Cresset" />
                <div style={{...getMaterialStyle(config.tasselCrown.materialId), width: '25px', height: '18px' }} className="rounded" title="Crown" />
                <div className="h-10 w-px bg-gray-400" />
                <div style={{...getMaterialStyle(config.tasselToy.materialId), width: '12px', height: '12px' }} className="rounded-full" title="Toy" />
                <div style={{...getMaterialStyle(config.signatureBead.materialId), width: '15px', height: '8px' }} className="rounded-md" title="Signature" />
            </div>
        </div>
    );
};

const SelectionPanel: React.FC<{ config: TesbihConfig, setConfig: React.Dispatch<React.SetStateAction<TesbihConfig>>, finalPrice: number, handleSubmit: () => void, isProcessing: boolean }> = ({ config, setConfig, finalPrice, handleSubmit, isProcessing }) => {
    
    const updateComponent = (component: TesbihComponentType, materialId: string) => {
        setConfig((prev: TesbihConfig) => ({ ...prev, [component]: { ...prev[component], materialId } }));
    };

     const updateGrade = (component: 'mainBeads' | 'imame' | 'markerBeads' | 'accentBead', grade: TesbihRosaryGrade) => {
        setConfig((prev: TesbihConfig) => ({...prev, [component]: { ...prev[component], grade }}));
    };

    const components: { id: TesbihComponentType, name: string, types: ('gem'|'wood'|'amber'|'metal')[], gradable: boolean }[] = [
        { id: 'mainBeads', name: 'Main Beads', types: ['gem', 'wood', 'amber'], gradable: true },
        { id: 'imame', name: 'Imam (Head Bead)', types: ['gem', 'wood', 'amber'], gradable: true },
        { id: 'markerBeads', name: 'The Fours (Dividers)', types: ['gem', 'metal', 'amber'], gradable: true },
        { id: 'separators', name: 'Separator Discs', types: ['metal', 'gem'], gradable: false },
        { id: 'accentBead', name: 'Deus (Accent Bead)', types: ['gem', 'amber'], gradable: true },
        { id: 'cresset', name: 'Cresset (Above Imam)', types: ['metal', 'gem'], gradable: false },
        { id: 'tasselCrown', name: 'Tassel Crown', types: ['metal'], gradable: false },
        { id: 'tasselToy', name: 'Tassel Toy', types: ['gem', 'metal'], gradable: false },
        { id: 'signatureBead', name: 'Artisan Signature', types: ['metal'], gradable: false },
    ];
    
    const [activeAccordion, setActiveAccordion] = useState<string>('beads');

    return (
        <div className="bg-[var(--c-surface)] p-6 rounded-lg shadow-md border space-y-4">
             <div>
                <label className="font-semibold block mb-2">Main Bead Size: {config.mainBeadSize.toFixed(2)}mm</label>
                <input type="range" min="8" max="14" step="0.25" value={config.mainBeadSize} onChange={e => setConfig({ ...config, mainBeadSize: Number(e.target.value) })} className="w-full custom-slider"/>
            </div>
            <div>
                <label className="font-semibold block mb-2">Bead Count</label>
                <div className="grid grid-cols-2 gap-2">
                    <button onClick={() => setConfig({ ...config, beadCount: 33 })} className={`p-2 rounded-md border-2 font-semibold transition ${config.beadCount === 33 ? 'bg-amber-100 border-[var(--c-accent-primary)]' : 'bg-gray-50 border-gray-200'}`}>33 Beads</button>
                    <button onClick={() => setConfig({ ...config, beadCount: 99 })} className={`p-2 rounded-md border-2 font-semibold transition ${config.beadCount === 99 ? 'bg-amber-100 border-[var(--c-accent-primary)]' : 'bg-gray-50 border-gray-200'}`}>99 Beads</button>
                </div>
            </div>
            <div className="max-h-[35vh] overflow-y-auto space-y-1 p-2 border-t border-b -mx-2 px-2">
                {components.map(comp => (
                    <div key={comp.id} className="p-2 bg-gray-50/50 rounded-md">
                        <label className="font-semibold block mb-1 text-sm">{comp.name}</label>
                        <select value={config[comp.id].materialId} onChange={e => updateComponent(comp.id, e.target.value)} className="custom-select w-full text-sm">
                            {TESBIH_MATERIALS.filter(m => comp.types.includes(m.type)).map(mat => (
                                <option key={mat.id} value={mat.id}>{mat.name}</option>
                            ))}
                        </select>
                        {comp.gradable && (
                            <div className="mt-2 text-xs grid grid-cols-3 gap-1">
                                {Object.values(TesbihRosaryGrade).map(grade => (
                                    <button key={grade} onClick={() => updateGrade(comp.id as any, grade)} className={`px-1 py-0.5 rounded transition ${config[comp.id].grade === grade ? 'bg-[var(--c-accent-primary)] text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}>
                                        {grade.split(' ')[0]}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div className="pt-4 border-t">
                <div className="flex justify-between items-baseline">
                    <span className="text-lg font-bold">Estimated Price:</span>
                    <p className="text-3xl font-bold text-right text-[var(--c-heading)]">{formatCurrency(finalPrice)}</p>
                </div>
            </div>
            <button onClick={handleSubmit} disabled={isProcessing} className="w-full mt-2 btn-primary btn--intelligent text-white font-bold py-3 rounded-lg text-lg">
                {isProcessing ? 'Processing...' : 'Submit Design for Pre-Order'}
            </button>
        </div>
    );
};

export default CustomTesbihConfiguratorPage;