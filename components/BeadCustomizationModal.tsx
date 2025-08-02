import React, { useState, useEffect } from 'react';
import { BeadConfig, BeadSize } from '../types';
import { AMBER_COLOR_DETAILS, BEAD_SPECS } from '../constants';
import { CloseIcon } from './IconComponents';
import { useLanguage } from '../i18n/LanguageContext';

interface BeadCustomizationModalProps {
    isOpen: boolean;
    onClose: () => void;
    beadIndex: number | null;
    beadConfigs: BeadConfig[];
    onUpdateBead: (index: number, newSize: BeadSize, newColorId: string) => void;
}

const BeadCustomizationModal: React.FC<BeadCustomizationModalProps> = ({
    isOpen,
    onClose,
    beadIndex,
    beadConfigs,
    onUpdateBead,
}) => {
    const { t } = useLanguage();
    const currentBead = beadIndex !== null ? beadConfigs[beadIndex] : null;

    const [selectedSize, setSelectedSize] = useState<BeadSize>(10);
    const [selectedColorId, setSelectedColorId] = useState<string>('dark_honey');

    useEffect(() => {
        if (isOpen && currentBead) {
            setSelectedSize(currentBead.size);
            setSelectedColorId(currentBead.colorId);
        }
    }, [isOpen, currentBead]);

    if (!isOpen || currentBead === null || beadIndex === null) {
        return null;
    }

    const handleSave = () => {
        onUpdateBead(beadIndex, selectedSize, selectedColorId);
        onClose();
    };

    const selectedColor = AMBER_COLOR_DETAILS.find(c => c.id === selectedColorId);

    return (
        <div
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="bg-[var(--c-surface)] rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden relative"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="max-h-[90vh] overflow-y-auto">
                    <div className="p-6 md:p-8">
                        <h2 className="text-2xl font-bold text-center text-[var(--c-heading)]">{t('bead_modal_title', { index: beadIndex + 1 })}</h2>
                        <div className="grid md:grid-cols-2 gap-6 mt-6">
                            {/* Color Selection */}
                            <div className="space-y-4">
                                <h3 className="font-semibold text-lg text-[var(--c-heading)]">{t('bead_modal_change_color')}</h3>
                                <div className="grid grid-cols-4 gap-4 max-h-64 overflow-y-auto pr-2">
                                    {AMBER_COLOR_DETAILS.map(color => (
                                        <button
                                            key={color.id}
                                            onClick={() => setSelectedColorId(color.id)}
                                            className="text-center group focus:outline-none"
                                            title={t(`amber_color_${color.id}_name` as any)}
                                            aria-label={`Select ${t(`amber_color_${color.id}_name` as any)}`}
                                        >
                                            <div
                                                style={{ backgroundImage: `url(${color.imageUrl})` }}
                                                className={`w-14 h-14 mx-auto bead-picker ${selectedColorId === color.id ? 'selected' : ''}`}
                                            ></div>
                                            <span className={`mt-1.5 font-semibold text-[10px] text-center block truncate group-hover:text-[var(--c-accent-primary)] transition-colors ${selectedColorId === color.id ? 'text-[var(--c-accent-primary)]' : 'text-[var(--c-text-secondary)]'}`}>
                                                {t(`amber_color_${color.id}_name` as any)}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                            {/* Size & Preview */}
                            <div className="flex flex-col">
                                <div>
                                    <h3 className="font-semibold text-lg text-[var(--c-heading)]">{t('bead_modal_change_size')}</h3>
                                    <div className="my-4">
                                        <label htmlFor="beadSize" className="font-semibold mb-2 block text-sm">
                                            {t('bead_modal_size_label')} <span className="text-[var(--c-accent-primary)] font-bold">{selectedSize.toFixed(2)} mm</span>
                                        </label>
                                        <input
                                            type="range"
                                            id="beadSize"
                                            min="8" max="14" step="0.25"
                                            value={selectedSize}
                                            onChange={e => setSelectedSize(Number(e.target.value))}
                                            className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-[var(--c-accent-primary)]"
                                        />
                                    </div>
                                </div>
                                <div className="mt-4 flex-grow flex flex-col items-center justify-center bg-[var(--c-surface-alt)] rounded-lg p-4 border border-[var(--c-border)]">
                                    <p className="font-semibold text-sm mb-2">{t('bead_modal_preview_label')}</p>
                                    <div className="w-24 h-24 rounded-full bg-cover bg-center shadow-lg"
                                        style={{ backgroundImage: `url(${selectedColor?.imageUrl})` }}
                                    ></div>
                                    <p className="mt-2 text-sm font-semibold">{t(`amber_color_${selectedColor?.id}_name` as any)}</p>
                                </div>
                            </div>
                        </div>
                         <div className="mt-8 pt-6 border-t border-[var(--c-border)] flex justify-end gap-3">
                            <button onClick={onClose} className="px-6 py-2 rounded-lg bg-stone-200 text-stone-700 font-semibold hover:bg-stone-300 transition-colors">
                                {t('bead_modal_cancel')}
                            </button>
                            <button onClick={handleSave} className="px-6 py-2 rounded-lg btn-primary text-white font-bold">
                                {t('bead_modal_update')}
                            </button>
                        </div>
                    </div>
                </div>
                 <button onClick={onClose} className="absolute top-3 right-3 text-stone-500 hover:text-stone-800 transition-colors rounded-full p-2 bg-[var(--c-surface)]/50 hover:bg-[var(--c-surface)]/80">
                    <CloseIcon className="h-6 w-6"/>
                </button>
            </div>
        </div>
    );
};

export default BeadCustomizationModal;