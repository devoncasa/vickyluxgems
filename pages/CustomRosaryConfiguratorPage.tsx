import React, { useState, useMemo, useEffect, useRef } from 'react';
import { RosaryConfig, RosaryPathway, RosaryGemstone, RosaryAmber, RosaryMetal, RosaryComponent, RosaryPart } from '../types';
import { ROSARY_GEMSTONES, ROSARY_AMBERS, ROSARY_METALS, ROSARY_CRUCIFIXES, ROSARY_CENTERPIECES } from '../constants';
import { calculateRosaryPrice } from '../utils/rosaryPricing';
import SEO from '../components/SEO';

// --- MAIN PAGE COMPONENT ---
const CustomRosaryConfiguratorPage: React.FC = () => {
  const [mainBeadSize, setMainBeadSize] = useState<number>(8.00);
  const [config, setConfig] = useState<RosaryConfig>(getInitialConfig(mainBeadSize));
  const [activePart, setActivePart] = useState<RosaryPart | 'metal' | 'components' | null>('decadeAveBeads');
  
  useEffect(() => {
    const paterSize = mainBeadSize + 2;
    setConfig(prev => ({
      ...prev,
      decadeAveBeads: { ...prev.decadeAveBeads, size: mainBeadSize },
      invitatoryAveBeads: { ...prev.invitatoryAveBeads, size: mainBeadSize },
      decadePaterBeads: { ...prev.decadePaterBeads, size: paterSize },
      invitatoryPaterBead: { ...prev.invitatoryPaterBead, size: paterSize },
    }));
  }, [mainBeadSize]);

  const resetConfiguration = (pathway: RosaryPathway) => {
    const newMainBeadSize = 8.00;
    const initial = getInitialConfig(newMainBeadSize);
    initial.pathway = pathway;
    const initialMaterialId = pathway === 'Gemstone' ? 'rose_quartz' : 'golden';
    initial.decadeAveBeads.materialId = initialMaterialId;
    initial.decadePaterBeads.materialId = initialMaterialId;
    initial.invitatoryAveBeads.materialId = initialMaterialId;
    initial.invitatoryPaterBead.materialId = initialMaterialId;
    setMainBeadSize(newMainBeadSize);
    setConfig(initial);
    setActivePart('decadeAveBeads');
  };
  
  const handleUpdateBeadMaterial = (part: RosaryPart, materialId: string) => {
    setConfig(prev => ({
      ...prev,
      [part]: { ...prev[part], materialId }
    }));
  };

  const handleUpdateComponent = (type: 'crucifix' | 'centerpiece', component: RosaryComponent | null) => {
    setConfig(prev => ({ ...prev, [type]: component }));
  };
  
  if (!config.pathway) {
    return <PathwaySelectionScreen onSelect={resetConfiguration} />;
  }

  return (
    <>
      <SEO title="Custom Heirloom Rosary Configurator" description="Design your own heirloom-quality rosary with our interactive builder. Choose from gemstones, amber, and precious metals." />
      <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100 text-gray-800 rosary-configurator-font">
        {/* Right Column: Selections & Summary */}
        <div className="w-full lg:w-2/5 xl:w-1/3 p-6 bg-white border-l lg:border-l-0 lg:border-r border-gray-200 overflow-y-auto flex flex-col">
          <SelectionPanel 
            config={config}
            setConfig={setConfig}
            activePart={activePart}
            setActivePart={setActivePart}
            onUpdateBeadMaterial={handleUpdateBeadMaterial}
            onUpdateComponent={handleUpdateComponent}
            mainBeadSize={mainBeadSize}
            setMainBeadSize={setMainBeadSize}
          />
           <div className="flex-shrink-0 pt-6 mt-6 border-t border-gray-200">
            <SummaryManifest config={config} />
          </div>
        </div>
        {/* Left Column: Visual Preview */}
        <div className="w-full lg:w-3/5 xl:w-2/3 p-6 flex items-center justify-center order-first lg:order-last">
           <SimulationPreviewPanel config={config} setActivePart={setActivePart} />
        </div>
      </div>
    </>
  );
};

// --- SUB-COMPONENTS ---

const PathwaySelectionScreen: React.FC<{ onSelect: (pathway: RosaryPathway) => void }> = ({ onSelect }) => (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
        <h1 className="text-4xl rosary-configurator-serif text-gray-800 mb-2">Begin Your Creation</h1>
        <p className="text-lg text-gray-600 mb-8">Choose your foundational material to start designing your heirloom rosary.</p>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl w-full">
            <button onClick={() => onSelect('Gemstone')} className="pathway-card group">
                <img src="https://i.postimg.cc/85k5BztS/gemstone-rosary-pathway.jpg" alt="Assortment of colorful gemstones" className="pathway-image" />
                <div className="pathway-overlay" />
                <div className="pathway-text">
                    <h2 className="text-3xl rosary-configurator-serif">The Gemstone Rosary</h2>
                    <p className="mt-2 opacity-90">Create a vibrant rosary with a diverse palette of precious and semi-precious stones.</p>
                </div>
            </button>
            <button onClick={() => onSelect('Amber')} className="pathway-card group">
                <img src="https://i.postimg.cc/k4J572Bw/amber-rosary-pathway.jpg" alt="Warm, glowing Burmese Amber beads" className="pathway-image" />
                <div className="pathway-overlay" />
                <div className="pathway-text">
                    <h2 className="text-3xl rosary-configurator-serif">The Burmese Amber Rosary</h2>
                    <p className="mt-2 opacity-90">Design a timeless piece with the world's oldest and most treasured amber.</p>
                </div>
            </button>
        </div>
    </div>
);

const SelectionPanel: React.FC<{
  config: RosaryConfig;
  setConfig: React.Dispatch<React.SetStateAction<RosaryConfig>>;
  activePart: RosaryPart | 'metal' | 'components' | null;
  setActivePart: React.Dispatch<React.SetStateAction<RosaryPart | 'metal' | 'components' | null>>;
  onUpdateBeadMaterial: (part: RosaryPart, materialId: string) => void;
  onUpdateComponent: (type: 'crucifix' | 'centerpiece', component: RosaryComponent | null) => void;
  mainBeadSize: number;
  setMainBeadSize: React.Dispatch<React.SetStateAction<number>>;
}> = ({ config, setConfig, activePart, setActivePart, onUpdateBeadMaterial, onUpdateComponent, mainBeadSize, setMainBeadSize }) => {
    
    const beadParts: { id: RosaryPart, name: string }[] = [
        { id: 'decadeAveBeads', name: 'Decade "Ave" Beads (x50)' },
        { id: 'decadePaterBeads', name: 'Decade "Pater" Beads (x5)' },
        { id: 'invitatoryAveBeads', name: 'Invitatory "Ave" Beads (x3)' },
        { id: 'invitatoryPaterBead', name: 'Invitatory "Pater" Bead (x1)' },
    ];
    
    return (
        <div className="space-y-6 flex-grow">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl rosary-configurator-serif">Heirloom Configurator</h2>
                <button onClick={() => setConfig(getInitialConfig(8.00))} className="text-sm text-gray-500 hover:text-red-600 transition-colors">Reset</button>
            </div>
            <p className="text-sm bg-yellow-50 text-yellow-800 p-3 rounded-md border border-yellow-200">
                <strong>{config.pathway} Pathway:</strong> {config.pathway === 'Amber' ? "To protect its organic surface, only amber beads can be used." : "Mix and match from a wide range of durable gemstones."}
            </p>

             <div>
                <label className="font-semibold text-lg text-gray-700">Main "Ave" Bead Size: {mainBeadSize.toFixed(2)}mm</label>
                <p className="text-xs text-gray-500 mb-2">"Pater" beads will be automatically sized to { (mainBeadSize + 2).toFixed(2) }mm for traditional proportions.</p>
                <input type="range" min="6" max="12" step="0.25" value={mainBeadSize} onChange={e => setMainBeadSize(Number(e.target.value))} className="w-full custom-slider"/>
            </div>
            
            <Accordion title="Bead Selection" isOpen={beadParts.some(p => p.id === activePart)} onToggle={() => setActivePart(activePart === 'decadeAveBeads' ? null : 'decadeAveBeads')}>
                {beadParts.map(part => (
                    <BeadMaterialSelector key={part.id} part={part} config={config} onUpdateBeadMaterial={onUpdateBeadMaterial} />
                ))}
            </Accordion>
            
             <Accordion title="Metal & Components" isOpen={activePart === 'components'} onToggle={() => setActivePart(activePart === 'components' ? null : 'components')}>
                <div className="space-y-4">
                    <div>
                        <h4 className="font-semibold mb-2">Metal</h4>
                        <p className="px-3 py-1 rounded-full border-2 text-sm bg-blue-100 border-blue-500 inline-block">{ROSARY_METALS[0].name}</p>
                    </div>
                    <ComponentSelector type="Crucifix" options={ROSARY_CRUCIFIXES} selectedId={config.crucifix?.id} onSelect={(c) => onUpdateComponent('crucifix', c)} />
                    <ComponentSelector type="Centerpiece" options={ROSARY_CENTERPIECES} selectedId={config.centerpiece?.id} onSelect={(c) => onUpdateComponent('centerpiece', c)} />
                </div>
            </Accordion>
        </div>
    )
};

const Accordion: React.FC<{title: string, isOpen: boolean, onToggle: () => void, children: React.ReactNode}> = ({ title, isOpen, onToggle, children }) => (
    <div className="border border-gray-200 rounded-lg">
        <button onClick={onToggle} className="w-full flex items-center justify-between p-3 text-left font-semibold text-lg text-gray-700 rosary-accordion-button">
            <span>{title}</span>
            <span className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>▼</span>
        </button>
        <div className={`overflow-hidden transition-all duration-500 ${isOpen ? 'max-h-screen' : 'max-h-0'}`}>
            <div className="p-4 border-t border-gray-200 rosary-accordion-content">{children}</div>
        </div>
    </div>
);

const BeadMaterialSelector: React.FC<{ part: {id: RosaryPart, name: string}, config: RosaryConfig, onUpdateBeadMaterial: (part: RosaryPart, materialId: string) => void }> = ({ part, config, onUpdateBeadMaterial }) => {
    const [advisory, setAdvisory] = useState<string | null>(null);
    const options = config.pathway === 'Gemstone' ? ROSARY_GEMSTONES : ROSARY_AMBERS;
    
    const handleMaterialSelect = (material: RosaryGemstone | RosaryAmber) => {
        if ('advisory' in material && material.advisory) {
            setAdvisory(material.advisory);
        }
        onUpdateBeadMaterial(part.id, material.id);
    };
    
    return (
        <div className="py-2">
             {advisory && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setAdvisory(null)}>
                    <div className="bg-white p-6 rounded-lg max-w-sm" onClick={e => e.stopPropagation()}>
                        <h3 className="font-bold text-lg">Heirloom Advisory</h3>
                        <p className="py-4">{advisory}</p>
                        <button onClick={() => setAdvisory(null)} className="w-full text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md">Acknowledge</button>
                    </div>
                </div>
            )}
            <h4 className="font-semibold mb-2">{part.name}</h4>
            <div className="rosary-bead-selector-grid">
                {options.map(mat => (
                    <button key={mat.id} onClick={() => handleMaterialSelect(mat)} title={mat.name} className={`w-12 h-12 rounded-full bg-cover bg-center border-2 transition-all ${config[part.id].materialId === mat.id ? 'border-blue-500 scale-110' : 'border-transparent hover:border-blue-300'}`} style={{backgroundImage: `url(${mat.imageUrl})`}}/>
                ))}
            </div>
        </div>
    );
};

const ComponentSelector: React.FC<{ type: string, options: RosaryComponent[], selectedId?: string, onSelect: any }> = ({ type, options, selectedId, onSelect }) => (
    <div>
        <h4 className="font-semibold mb-2">{type}</h4>
        <div className="rosary-component-selector-grid">
            {options.map(comp => (
                <button key={comp.id} onClick={() => onSelect(comp)} className={`p-1 rounded-md border-2 transition-all ${selectedId === comp.id ? 'border-blue-500 bg-blue-100' : 'border-transparent bg-gray-100 hover:border-blue-300'}`}>
                    <img src={comp.imageUrl} alt={comp.name} className="w-full h-auto object-contain aspect-square"/>
                    <span className="text-xs block mt-1 truncate">{comp.name}</span>
                </button>
            ))}
        </div>
    </div>
);

const SimulationPreviewPanel: React.FC<{ config: RosaryConfig, setActivePart: any }> = ({ config, setActivePart }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(1);

    const beadStyle = (beadSelection: typeof config.decadeAveBeads) => {
        const material = (config.pathway === 'Gemstone' ? ROSARY_GEMSTONES.find(g => g.id === beadSelection.materialId) : ROSARY_AMBERS.find(a => a.id === beadSelection.materialId));
        return { backgroundImage: `url(${material?.imageUrl})` };
    };
    const metalColor = config.metal?.color || '#A9A9A9';
    const Wire: React.FC<{ style?: React.CSSProperties }> = ({ style }) => <div className="rosary-preview-wire" style={{ ...style, backgroundColor: metalColor }} />;
    
    const { loopRadius, pendantHeight, totalHeight } = useMemo(() => {
        const spacing = 1.5; // mm
        const loopCircumference = (config.decadePaterBeads.size * 5) + (config.decadeAveBeads.size * 50) + (spacing * 55);
        const loopRadius = loopCircumference / (2 * Math.PI);
        const pendantHeight = (config.centerpiece?.weightG || 4) * 5 + (config.invitatoryPaterBead.size) + (config.invitatoryAveBeads.size * 3) + (config.crucifix?.weightG || 10) * 5 + (spacing * 6);
        const totalHeight = loopRadius * 2 + pendantHeight + 20; // with some padding
        return { loopRadius, pendantHeight, totalHeight };
    }, [config]);

    useEffect(() => {
        const resizeObserver = new ResizeObserver(entries => {
            if (!entries[0]) return;
            const container = entries[0].target as HTMLDivElement;
            const containerHeight = container.offsetHeight;
            const containerWidth = container.offsetWidth;
            
            const requiredWidth = loopRadius * 2 + config.decadePaterBeads.size;
            const requiredHeight = totalHeight;

            const scaleX = containerWidth / requiredWidth;
            const scaleY = containerHeight / requiredHeight;
            setScale(Math.min(scaleX, scaleY, 1));
        });
        if(containerRef.current) resizeObserver.observe(containerRef.current);
        return () => resizeObserver.disconnect();
    }, [loopRadius, totalHeight, config.decadePaterBeads.size]);

    return (
        <div ref={containerRef} className="w-full h-full relative flex items-center justify-center">
            <div className="rosary-preview-watermark-bg">
                {[...Array(30)].map((_, i) => (<span key={i} className="rosary-preview-watermark-text">Vicky LuxGems</span>))}
            </div>
             <div className="relative" style={{ height: `${totalHeight * scale}px`, width: `${loopRadius * 2 * scale}px`, transform: `scale(${scale})`, transformOrigin: 'center' }}>
                {/* Loop */}
                <div className="absolute top-0 left-0" style={{ width: `${loopRadius * 2}px`, height: `${loopRadius * 2}px` }}>
                    {[...Array(5)].map((_, decadeIndex) => {
                        const decadeAngleOffset = -90 + decadeIndex * 72;
                        return ( <React.Fragment key={`decade-${decadeIndex}`}>
                                <div className="absolute top-1/2 left-1/2" style={{ transform: `rotate(${decadeAngleOffset}deg) translateX(${loopRadius}px) rotate(${-decadeAngleOffset}deg)` }}>
                                    <div className="rosary-preview-bead" style={{ ...beadStyle(config.decadePaterBeads), width: config.decadePaterBeads.size, height: config.decadePaterBeads.size, margin: `-${config.decadePaterBeads.size/2}px` }} onClick={() => setActivePart('decadePaterBeads')} />
                                </div>
                                {[...Array(10)].map((_, aveIndex) => {
                                    const aveAngle = decadeAngleOffset + (aveIndex + 1) * (72 / 11);
                                    return ( <div key={`ave-${decadeIndex}-${aveIndex}`} className="absolute top-1/2 left-1/2" style={{ transform: `rotate(${aveAngle}deg) translateX(${loopRadius}px) rotate(${-aveAngle}deg)` }}>
                                        <div className="rosary-preview-bead" style={{ ...beadStyle(config.decadeAveBeads), width: config.decadeAveBeads.size, height: config.decadeAveBeads.size, margin: `-${config.decadeAveBeads.size/2}px` }} onClick={() => setActivePart('decadeAveBeads')} />
                                    </div>);
                                })}
                            </React.Fragment>);
                    })}
                </div>
                {/* Pendant */}
                <div className="absolute flex flex-col items-center" style={{ top: `${loopRadius*2}px`, left: '50%', transform: 'translateX(-50%)' }}>
                    <div className="rosary-preview-component" onClick={() => setActivePart('components')}><img src={config.centerpiece?.imageUrl} alt="Centerpiece" className="h-8 w-auto" /></div>
                    <Wire style={{ height: '10px', width: '1px' }} />
                    <div className="rosary-preview-bead" style={{ ...beadStyle(config.invitatoryPaterBead), width: config.invitatoryPaterBead.size, height: config.invitatoryPaterBead.size }} onClick={() => setActivePart('invitatoryPaterBead')} />
                    <Wire style={{ height: '5px', width: '1px' }} />
                    <div className="rosary-preview-bead" style={{ ...beadStyle(config.invitatoryAveBeads), width: config.invitatoryAveBeads.size, height: config.invitatoryAveBeads.size }} onClick={() => setActivePart('invitatoryAveBeads')} />
                    <Wire style={{ height: '5px', width: '1px' }} />
                    <div className="rosary-preview-bead" style={{ ...beadStyle(config.invitatoryAveBeads), width: config.invitatoryAveBeads.size, height: config.invitatoryAveBeads.size }} onClick={() => setActivePart('invitatoryAveBeads')} />
                     <Wire style={{ height: '5px', width: '1px' }} />
                    <div className="rosary-preview-bead" style={{ ...beadStyle(config.invitatoryAveBeads), width: config.invitatoryAveBeads.size, height: config.invitatoryAveBeads.size }} onClick={() => setActivePart('invitatoryAveBeads')} />
                    <Wire style={{ height: '10px', width: '1px' }} />
                    <div className="rosary-preview-component" onClick={() => setActivePart('components')}><img src={config.crucifix?.imageUrl} alt="Crucifix" className="h-12 w-auto" /></div>
                </div>
            </div>
        </div>
    );
};


const SummaryManifest: React.FC<{ config: RosaryConfig }> = ({ config }) => {
    const { total } = calculateRosaryPrice(config);
    const getMaterialName = (id: string) => (config.pathway === 'Gemstone' ? ROSARY_GEMSTONES.find(g => g.id === id)?.name : ROSARY_AMBERS.find(a => a.id === id)?.name) || 'N/A';
    
    return (
        <div>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 text-sm">
                <div>
                    <h4 className="font-bold">Beads</h4>
                    <p>Decade Aves: ~{config.decadeAveBeads.size.toFixed(2)}mm {getMaterialName(config.decadeAveBeads.materialId)}</p>
                    <p>Decade Paters: ~{config.decadePaterBeads.size.toFixed(2)}mm {getMaterialName(config.decadePaterBeads.materialId)}</p>
                </div>
                <div>
                    <h4 className="font-bold">Components</h4>
                    <p>Metal: {config.metal?.name || 'N/A'}</p>
                    <p>Crucifix: {config.crucifix?.name || 'N/A'}</p>
                    <p>Centerpiece: {config.centerpiece?.name || 'N/A'}</p>
                </div>
                 <div className="md:col-span-2 lg:col-span-1 xl:col-span-2 text-right">
                    <p className="font-bold text-2xl mt-1">{total > 0 ? `${total.toFixed(2)} THB` : "Select Materials"}</p>
                 </div>
            </div>
             <p className="text-xs text-gray-500 mt-2 text-right">Price excludes shipping and any applicable local taxes. Metal prices are based on current market rates and are subject to change.</p>
        </div>
    );
};

// --- HELPERS ---
function getInitialConfig(mainBeadSize: number): RosaryConfig {
  const paterSize = mainBeadSize + 2;
  return {
    pathway: null,
    metal: ROSARY_METALS[0], 
    crucifix: ROSARY_CRUCIFIXES[2],
    centerpiece: ROSARY_CENTERPIECES[0],
    decadeAveBeads: { materialId: '', size: mainBeadSize },
    decadePaterBeads: { materialId: '', size: paterSize },
    invitatoryAveBeads: { materialId: '', size: mainBeadSize },
    invitatoryPaterBead: { materialId: '', size: paterSize },
  };
}

export default CustomRosaryConfiguratorPage;