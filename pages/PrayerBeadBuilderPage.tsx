
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import SEO from '../components/SEO';
import { BACKGROUND_IMAGES, PRAYER_BEAD_SIZES, JUZU_MATERIAL_PRICES, AMBER_COLOR_DETAILS, TASSEL_OPTIONS, calculateBeadWeightGemstone, METAL_COMPONENT_PRICES, METAL_COMPONENT_MATERIALS, TESBIH_COMPONENT_WEIGHTS, ROSARY_COMPONENT_WEIGHTS, PRAYER_BEAD_VISUAL_MATERIALS } from '../constants';
import SectionDivider from '../components/SectionDivider';
import { JuzuGenderStyle, JuzuType, TasselShape, TasselMaterial, BeadSize, AmberColorDetail, PrayerBeadTradition, TesbihBeadCount, TesbihRosaryGrade } from '../types';
import * as ReactRouterDOM from 'react-router-dom';
import { toPng } from 'html-to-image';

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

const CheckmarkIcon = () => (
    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);


const PrayerBeadBuilderPage: React.FC = () => {
    const { t } = useLanguage();
    const { tradition } = ReactRouterDOM.useParams<{ tradition: string }>();
    const navigate = ReactRouterDOM.useNavigate();
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

        const materialPrices = JUZU_MATERIAL_PRICES[mainBeadMaterial];

        const getBeadPrice = (size: BeadSize, count: number) => {
            if (!size || !count) return 0;
            const weight = calculateBeadWeightGemstone(size);
            if (mainBeadMaterial === 'Burmese Amber') {
                const amberColor = burmeseAmberColor || AMBER_COLOR_DETAILS[4];
                return amberColor.basePricePerGram * weight * count;
            }
            if (materialPrices) {
                const closestSize = PRAYER_BEAD_SIZES.reduce((prev, curr) => (Math.abs(curr - size) < Math.abs(prev - size) ? curr : prev));
                const pricePerGram = materialPrices[closestSize] || 0;
                return pricePerGram * weight * count;
            }
            return 0;
        };
        
        const getMetalPrice = (weight_g: number, material: string) => {
             const pricePerGram = METAL_COMPONENT_PRICES[material]?.[metalGrade] ?? 0;
             return pricePerGram * weight_g;
        };

        if (currentTradition === PrayerBeadTradition.Juzu) {
            mainBeadsPrice = getBeadPrice(mainBeadSize, (componentCounts as any).main);
            accentBeadsPrice += getBeadPrice(dependentBeadSizes.oyadama, (componentCounts as any).parent);
            accentBeadsPrice += getBeadPrice(dependentBeadSizes.shitentama, (componentCounts as any).marker);
            tasselPrice = TASSEL_OPTIONS.materials.find(m => m.name === tasselMaterial)?.price || 0;
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
        return { mainBeadsPrice, accentBeadsPrice, tasselPrice, metalPrice, totalPrice, individualPrices };
    }, [mainBeadMaterial, burmeseAmberColor, mainBeadSize, componentCounts, dependentBeadSizes, tasselMaterial, metalGrade, currentTradition, tesbihBeadCount, tesbihTepelikMaterial, rosaryCenterpieceMaterial, rosaryCrucifixMaterial]);

     const handleSubmit = async () => {
        if (!captureRef.current || isProcessing) return;
        setIsProcessing(true);
        setNotification(null);
        try {
            const dataUrl = await toPng(captureRef.current, { backgroundColor: '#FCFBF9', pixelRatio: 2 });
            const link = document.createElement('a');
            link.download = `VLG-Custom-${currentTradition}-${Date.now()}.png`;
            link.href = dataUrl;
            link.click();
            
            const message = `I would like to pre-order this custom ${currentTradition} design. Please provide a final quote and details.`;
            await navigator.clipboard.writeText(message);
            setNotification('Design captured & message copied! Please paste it into the Facebook chat that will open.');
            window.open('https://www.facebook.com/messages/t/VKMMAmber', '_blank', 'noopener,noreferrer');
        } catch (err) {
            console.error('Failed to capture design:', err);
            setNotification('An error occurred. Please try again or contact us directly.');
        } finally {
            setIsProcessing(false);
        }
    };


    const renderControls = () => {
        switch (currentTradition) {
            case PrayerBeadTradition.Juzu:
                return (
                    <ControlGroup title={t('juzu_step1_title')}>
                        <div>
                            <label className="font-semibold mb-2 block">{t('juzu_gender_style')}</label>
                            <div className="flex gap-2">
                                <button onClick={() => setJuzuGender(JuzuGenderStyle.Mens)} className={`w-full p-3 text-sm rounded-md border-2 transition-all ${juzuGender === JuzuGenderStyle.Mens ? 'border-[var(--c-accent-primary)] bg-[var(--c-accent-primary)]/10 font-bold' : 'border-[var(--c-border)]'}`}>Men's Style</button>
                                <button onClick={() => setJuzuGender(JuzuGenderStyle.Womens)} className={`w-full p-3 text-sm rounded-md border-2 transition-all ${juzuGender === JuzuGenderStyle.Womens ? 'border-[var(--c-accent-primary)] bg-[var(--c-accent-primary)]/10 font-bold' : 'border-[var(--c-border)]'}`}>Women's Style</button>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="juzu-type" className="font-semibold mb-2 block">{t('juzu_type')}</label>
                            <select id="juzu-type" value={juzuType} onChange={e => setJuzuType(e.target.value as JuzuType)} className="w-full custom-select">{Object.values(JuzuType).map(type => <option key={type} value={type}>{type}</option>)}</select>
                        </div>
                        <div>
                            <label htmlFor="tassel-shape" className="font-semibold mb-2 block">{t('juzu_tassel_shape')}</label>
                            <select id="tassel-shape" value={tasselShape} onChange={e => setTasselShape(e.target.value as TasselShape)} className="w-full custom-select">{Object.values(TasselShape).map(shape => <option key={shape} value={shape}>{shape}</option>)}</select>
                        </div>
                         <div>
                            <label htmlFor="tassel-material" className="font-semibold mb-2 block">{t('juzu_tassel_material')}</label>
                            <select id="tassel-material" value={tasselMaterial} onChange={e => setTasselMaterial(e.target.value as TasselMaterial)} className="w-full custom-select">{Object.values(TasselMaterial).map(mat => <option key={mat} value={mat}>{mat}</option>)}</select>
                        </div>
                    </ControlGroup>
                );
            case PrayerBeadTradition.Tesbih:
                return (
                    <ControlGroup title="Step 1: Define Tesbih Structure">
                        <div>
                            <label htmlFor="tesbih-count" className="font-semibold mb-2 block">Bead Count</label>
                            <select id="tesbih-count" value={tesbihBeadCount} onChange={e => setTesbihBeadCount(Number(e.target.value) as TesbihBeadCount)} className="w-full custom-select">
                                <option value={33}>33 Beads</option>
                                <option value={99}>99 Beads</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="tepelik-material" className="font-semibold mb-2 block">Tepelik (Tassel Head) Material</label>
                             <select id="tepelik-material" value={tesbihTepelikMaterial} onChange={e => setTesbihTepelikMaterial(e.target.value)} className="w-full custom-select">
                                {METAL_COMPONENT_MATERIALS.filter(m => m !== 'Pewter/Resin').map(mat => <option key={mat} value={mat}>{mat}</option>)}
                            </select>
                        </div>
                    </ControlGroup>
                );
            case PrayerBeadTradition.Rosary:
                 return (
                    <ControlGroup title="Step 1: Define Rosary Components">
                        <p className="text-sm p-2 bg-blue-50 text-blue-800 border border-blue-200 rounded-md">The structure of a standard 5-decade Rosary is fixed (59 beads total). Customize the materials and bead sizes to make it your own.</p>
                         <div>
                            <label htmlFor="centerpiece-material" className="font-semibold mb-2 block">Centerpiece Material</label>
                             <select id="centerpiece-material" value={rosaryCenterpieceMaterial} onChange={e => setRosaryCenterpieceMaterial(e.target.value)} className="w-full custom-select">
                                {METAL_COMPONENT_MATERIALS.map(mat => <option key={mat} value={mat}>{mat}</option>)}
                            </select>
                        </div>
                         <div>
                            <label htmlFor="crucifix-material" className="font-semibold mb-2 block">Crucifix Material</label>
                             <select id="crucifix-material" value={rosaryCrucifixMaterial} onChange={e => setRosaryCrucifixMaterial(e.target.value)} className="w-full custom-select">
                                {METAL_COMPONENT_MATERIALS.map(mat => <option key={mat} value={mat}>{mat}</option>)}
                            </select>
                        </div>
                    </ControlGroup>
                );
            default: return null;
        }
    };
    
    const BeadPreview: React.FC<{ size: number; imageUrl: string; label: string }> = ({ size, imageUrl, label }) => (
        <div className="flex items-center gap-3">
            <div style={{ width: `${size*2.5}px`, height: `${size*2.5}px`, backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover' }} className="rounded-full shadow-inner border-2 border-white/50 flex-shrink-0"></div>
            <div>
                <div className="font-semibold">{label}</div>
                <div className="text-xs text-[var(--c-text-secondary)]">{size.toFixed(1)} mm</div>
            </div>
        </div>
    );

    const renderPreview = () => {
        const materialImageUrl = mainBeadMaterial === 'Burmese Amber'
            ? burmeseAmberColor?.imageUrl || ''
            : PRAYER_BEAD_VISUAL_MATERIALS.find(m => m.mapsTo === mainBeadMaterial)?.imageUrl || '';

        return (
            <div className="w-full h-full bg-[var(--c-surface)] rounded-lg flex flex-col items-center justify-center p-4 space-y-3">
                <BeadPreview size={mainBeadSize} imageUrl={materialImageUrl} label="Main Bead" />
                {currentTradition === 'Juzu' && <BeadPreview size={dependentBeadSizes.oyadama} imageUrl={materialImageUrl} label="Parent Bead (Oyadama)" />}
                {currentTradition === 'Juzu' && <BeadPreview size={dependentBeadSizes.shitentama} imageUrl={materialImageUrl} label="Marker Bead (Shitentama)" />}
                {currentTradition === 'Tesbih' && <BeadPreview size={dependentBeadSizes.imame} imageUrl={materialImageUrl} label="Head Bead (Imame)" />}
                {currentTradition === 'Rosary' && <BeadPreview size={dependentBeadSizes.ourFather} imageUrl={materialImageUrl} label="'Our Father' Bead" />}
                <p className="text-xs text-center text-[var(--c-text-secondary)] pt-3">Visual representation of components. Final design will be confirmed during consultation.</p>
            </div>
        );
    }
    
    const renderSummary = () => {
        const amberText = burmeseAmberColor ? ` (${t(`amber_color_${burmeseAmberColor.id}_name` as any) || burmeseAmberColor.name})` : '';
        const translationKey = `juzu_material_${mainBeadMaterial.replace(/['’\s()/]/g, '_')}` as any;
        const translatedBase = t(translationKey) || mainBeadMaterial;
        const materialName = mainBeadMaterial === 'Burmese Amber'
            ? `${t('juzu_material_Burmese_Amber') || 'Burmese Amber'}${amberText}`
            : translatedBase;

        const gradeText = mainBeadMaterial === 'Burmese Amber' ? 'Premium Grade' : metalGrade;

        return (
             <div className="space-y-1 text-sm">
                <div className="font-bold text-base border-b pb-2 mb-2">Component Details</div>
                {currentTradition === 'Juzu' && (
                    <>
                        <p>Omodama: {materialName} - {mainBeadSize.toFixed(1)}mm (x{(componentCounts as any).main})</p>
                        <p>Oyadama: {materialName} - {dependentBeadSizes.oyadama.toFixed(1)}mm (x{(componentCounts as any).parent})</p>
                        {(componentCounts as any).marker > 0 && <p>Shitentama: {materialName} - {dependentBeadSizes.shitentama.toFixed(1)}mm (x{(componentCounts as any).marker})</p>}
                        <p>Tassel: {tasselShape}, {tasselMaterial}</p>
                    </>
                )}
                {currentTradition === 'Tesbih' && (
                     <>
                        <p>Main Beads: {materialName} ({gradeText}) - {mainBeadSize.toFixed(1)}mm (x{tesbihBeadCount})</p>
                        <p>Imame: {materialName} ({gradeText}) - {dependentBeadSizes.imame.toFixed(1)}mm (x1)</p>
                        <p>Tepelik: {tesbihTepelikMaterial} ({metalGrade})</p>
                    </>
                )}
                {currentTradition === 'Rosary' && (
                    <>
                        <p>"Hail Mary" Beads: {materialName} ({gradeText}) - {mainBeadSize.toFixed(1)}mm (x53)</p>
                        <p>"Our Father" Beads: {materialName} ({gradeText}) - {dependentBeadSizes.ourFather.toFixed(1)}mm (x6)</p>
                        <p>Centerpiece: {rosaryCenterpieceMaterial} ({metalGrade})</p>
                        <p>Crucifix: {rosaryCrucifixMaterial} ({metalGrade})</p>
                    </>
                )}
            </div>
        );
    }

    const tabClasses = (tradition: PrayerBeadTradition) => `px-6 py-3 text-lg font-semibold rounded-t-lg transition-colors duration-200 focus:outline-none w-full sm:w-auto ${currentTradition === tradition ? 'bg-[var(--c-surface)] text-[var(--c-accent-primary-hover)] shadow-sm' : 'bg-[var(--c-heading)]/5 text-[var(--c-text-secondary)] hover:bg-[var(--c-surface)]/80'}`;

    return (
        <div className="page-container-with-bg min-h-screen py-16 md:py-20" style={{ backgroundImage: `url('${BACKGROUND_IMAGES[15]}')` }}>
            <SEO titleKey="seo_juzu_builder_title" descriptionKey="seo_juzu_builder_desc" keywordsKey="seo_juzu_builder_keywords" />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10"><h1 className="text-5xl font-bold tracking-tight">Custom Prayer Bead Builder</h1><p className="mt-4 text-xl text-[var(--c-text-secondary)] max-w-3xl mx-auto">Craft an authentic Juzu, Tesbih, or Rosary tailored to your spiritual practice.</p><SectionDivider /></div>
                <div className="flex flex-col sm:flex-row border-b-2 border-transparent mb-4">
                    <button onClick={() => navigate('/prayer-bead-builder/Juzu')} className={tabClasses(PrayerBeadTradition.Juzu)}>Japanese Juzu</button>
                    <button onClick={() => navigate('/prayer-bead-builder/Tesbih')} className={tabClasses(PrayerBeadTradition.Tesbih)}>Islamic Tesbih</button>
                    <ReactRouterDOM.Link to="/custom-rosary-configurator" className={tabClasses(PrayerBeadTradition.Rosary)}>Christian Rosary</ReactRouterDOM.Link>
                    <div className="flex-grow border-b-2 border-[var(--c-border)]"></div>
                </div>
                <div className="max-w-7xl mx-auto grid lg:grid-cols-5 gap-8">
                    <div className="lg:col-span-3 space-y-6 bg-[var(--c-surface)] p-6 md:p-8 rounded-lg shadow-lg border border-[var(--c-border)]">
                        {renderControls()}
                        <ControlGroup title="Step 2: Choose Materials & Sizing">
                             <div>
                                <label className="font-semibold mb-2 block">Main Bead Size: <span className="font-bold text-lg text-[var(--c-accent-primary)]">{mainBeadSize.toFixed(1)} mm</span></label>
                                <input type="range" min="6" max={maxBeadSizes[currentTradition]} step="0.5" value={mainBeadSize} onChange={handleBeadSizeChange} className="w-full custom-slider"/>
                            </div>
                            <div className="mt-4">
                                <label className="font-semibold mb-3 block">Main Bead Material</label>
                                <div className="grid grid-cols-5 sm:grid-cols-7 md:grid-cols-8 gap-1">
                                    {PRAYER_BEAD_VISUAL_MATERIALS.map(material => (
                                        <button 
                                            key={material.id} 
                                            onClick={() => {
                                                setMainBeadMaterial(material.mapsTo);
                                                if (material.mapsTo !== 'Burmese Amber') {
                                                    setBurmeseAmberColor(null);
                                                } else if (!burmeseAmberColor) {
                                                    setBurmeseAmberColor(AMBER_COLOR_DETAILS.find(c => c.id === 'golden')!);
                                                }
                                            }}
                                            className={`text-center group focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--c-accent-primary)] rounded-lg transition-transform duration-200 ${
                                                material.mapsTo !== 'Burmese Amber' 
                                                ? 'scale-[0.7] hover:scale-[0.8]' 
                                                : 'hover:scale-105'
                                            }`}
                                            title={material.name}
                                            aria-label={`Select ${material.name} material`}
                                        >
                                            <div className={`relative w-full pt-[100%] rounded-lg overflow-hidden border-2 transition-all duration-200 ${mainBeadMaterial === material.mapsTo ? 'border-amber-500 shadow-lg' : 'border-transparent group-hover:border-amber-400/50'}`}>
                                                <img src={material.imageUrl} alt={material.name} className="absolute inset-0 w-full h-full object-cover" />
                                                {mainBeadMaterial === material.mapsTo && (
                                                    <div className="absolute inset-0 bg-amber-500/50 flex items-center justify-center">
                                                        <CheckmarkIcon />
                                                    </div>
                                                )}
                                            </div>
                                            <span className={`mt-1.5 text-xs font-semibold block truncate ${mainBeadMaterial === material.mapsTo ? 'text-[var(--c-accent-primary)]' : 'text-[var(--c-text-secondary)]'}`}>{t(`juzu_material_${material.name.replace(/['’\s()/]/g, '_')}` as any) || material.name}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                            {mainBeadMaterial === 'Burmese Amber' && (
                                <div className="mt-4 p-4 bg-amber-50/50 rounded-md border border-amber-200">
                                    <label htmlFor="burmeseAmberColor" className="font-semibold mb-3 block">{t('juzu_burmese_amber_color')}</label>
                                    <div className="grid grid-cols-5 sm:grid-cols-7 md:grid-cols-8 gap-2">
                                        {AMBER_COLOR_DETAILS.map(color => (
                                             <button 
                                                key={color.id} 
                                                onClick={() => setBurmeseAmberColor(color)}
                                                className="text-center group focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--c-accent-primary)] rounded-lg"
                                                title={color.name}
                                                aria-label={`Select Burmese Amber color: ${color.name}`}
                                            >
                                                <div className={`relative w-full pt-[100%] rounded-lg overflow-hidden border-2 transition-all duration-200 ${burmeseAmberColor?.id === color.id ? 'border-amber-500 shadow-lg' : 'border-transparent group-hover:border-amber-400/50'}`}>
                                                    <img src={color.imageUrl} alt={color.name} className="absolute inset-0 w-full h-full object-cover" />
                                                    {burmeseAmberColor?.id === color.id && (
                                                        <div className="absolute inset-0 bg-amber-500/50 flex items-center justify-center">
                                                            <CheckmarkIcon />
                                                        </div>
                                                    )}
                                                </div>
                                                <span className={`mt-1.5 text-[10px] leading-tight font-semibold block ${burmeseAmberColor?.id === color.id ? 'text-[var(--c-accent-primary)]' : 'text-[var(--c-text-secondary)]'}`}>{t(`amber_color_${color.id}_name` as any) || color.name}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                             {(currentTradition === 'Tesbih' || currentTradition === 'Rosary') && (<div><label htmlFor="metal-grade" className="font-semibold mb-2 block">Metal Component Grade</label><select id="metal-grade" value={metalGrade} onChange={e => setMetalGrade(e.target.value as TesbihRosaryGrade)} className="w-full custom-select">{Object.values(TesbihRosaryGrade).map(g => <option key={g} value={g}>{g}</option>)}</select></div>)}
                        </ControlGroup>
                    </div>
                    <div className="lg:col-span-2">
                        <div className="bg-[var(--c-surface-alt)] p-6 rounded-lg shadow-inner border border-[var(--c-border)] sticky top-28 self-start">
                            <div ref={captureRef} className="bg-[var(--c-surface)] p-4 rounded-lg">
                                <h3 className="text-2xl font-bold text-center mb-4 text-[var(--c-heading)]">Your Custom {currentTradition}</h3>
                                <div className="h-64 rounded-lg mb-4">{renderPreview()}</div>
                                {renderSummary()}
                                <div className="mt-4 pt-4 border-t-2 border-dashed border-[var(--c-heading)]/20">
                                    <div className="flex justify-between items-baseline"><span className="text-lg font-bold">Estimated Total Price</span><p className="text-3xl font-bold text-right text-[var(--c-heading)]">{formatCurrency(priceBreakdown.totalPrice)}</p></div>
                                </div>
                            </div>
                            <button onClick={handleSubmit} disabled={isProcessing} className="w-full mt-6 btn-primary btn--intelligent text-white font-bold py-3 rounded-lg text-lg">
                                {isProcessing ? 'Processing...' : 'Submit Design for Pre-Order'}
                            </button>
                            {notification && <p className="text-sm text-center mt-3 text-green-700">{notification}</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrayerBeadBuilderPage;
