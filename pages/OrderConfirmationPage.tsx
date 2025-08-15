
import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { PriceBreakdown, CustomPreOrderDetails, CustomBraceletFromBuilderDetails, Amulet, Metal } from '../types.ts';
import { AMBER_COLOR_DETAILS } from '../constants.ts';
import SEO from '../components/SEO.tsx';
import { useLanguage } from '../i18n/LanguageContext.tsx';

const formatCurrency = (amount: number) => {
    return `฿${amount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
};

const OrderConfirmationPage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { t } = useLanguage();
    const [notification, setNotification] = useState<string | null>(null);
    const { details, breakdown } = (location.state || {}) as { details?: CustomPreOrderDetails | CustomBraceletFromBuilderDetails, breakdown?: PriceBreakdown };

    const isBraceletBuilderOrder = (details: any): details is CustomBraceletFromBuilderDetails => {
        return details && typeof details.designCode === 'string' && Array.isArray(details.beads);
    };

    const isMalaBuilderOrder = (details: any): details is CustomPreOrderDetails => {
        return details && typeof details.grade === 'string' && !isBraceletBuilderOrder(details);
    };

    const getClipboardMessage = () => {
        if (isBraceletBuilderOrder(details)) {
            // This case might not be used if BraceletBuilder has its own modal, but implemented for completeness
            const beadSummary = details.beads
                .reduce((acc, bead) => {
                    const colorName = AMBER_COLOR_DETAILS.find(c => c.id === bead.colorId)?.name || 'Unknown Color';
                    const key = `${colorName} (${bead.size.toFixed(2)}mm)`;
                    acc.set(key, (acc.get(key) || 0) + 1);
                    return acc;
                }, new Map<string, number>());
            
            let summaryString = '';
            for (const [beadDesc, count] of beadSummary.entries()) {
                summaryString += `- ${count}x ${beadDesc}\n`;
            }
            return `Hello! I'd like to pre-order this bracelet:\n- Design Code: ${details.designCode}\n- Est. Wrist Size: ${details.estimatedWristSize_cm}cm\n- Beads:\n${summaryString}- Est. Total: ${formatCurrency(details.totalPrice)}`;

        }
        if (isMalaBuilderOrder(details) && breakdown) {
            const amberColor = t(`amber_color_${details.amberColor.id}_name` as any);
            return `Hello! I'd like to pre-order this custom Mala:\n- Amber Color: ${amberColor}\n- Grade: ${details.grade}\n- Bead Size: ${details.beadSize}mm\n- Quantity: ${details.beadQuantity} beads\n- Amulet: ${details.amulet?.name || 'None'}\n- Metal Caps: ${details.metal}\n- Estimated Total: ${formatCurrency(breakdown.totalPrice)}`;
        }
        return 'Could not generate order details.';
    };

    const handleSubmitOrder = async () => {
        const message = getClipboardMessage();
        if (message.startsWith('Could not')) {
            setNotification(t('order_confirmation_notification_error_details' as any));
            return;
        }

        try {
            await navigator.clipboard.writeText(message);
            setNotification(t('order_confirmation_notification_success' as any));
            window.open('https://www.facebook.com/messages/t/VKMMAmber', '_blank', 'noopener,noreferrer');
        } catch (err) {
            console.error('Failed to copy: ', err);
            setNotification(t('order_confirmation_notification_error_clipboard' as any));
        }
    };

    if (!details || !breakdown) {
        return (
            <div className="text-center py-20">
                <SEO titleKey="order_confirmation_no_details_title" descriptionKey="order_confirmation_no_details_subtitle" />
                <h2 className="text-3xl font-semibold">{t('order_confirmation_no_details_title' as any)}</h2>
                <p className="mt-2 text-lg text-[var(--c-text-secondary)]">{t('order_confirmation_no_details_subtitle' as any)}</p>
                <Link to="/build-your-set" className="mt-6 inline-block btn-primary text-white font-bold py-3 px-6 rounded-lg">{t('order_confirmation_no_details_cta' as any)}</Link>
            </div>
        );
    }
    
    const renderMalaDetails = (d: CustomPreOrderDetails, b: PriceBreakdown) => (
        <>
            <h2 className="text-2xl font-bold font-serif mb-4">{t('order_confirmation_mala_title' as any)}</h2>
            <div className="space-y-3 text-lg">
                <div className="flex justify-between"><span>{t('build_summary_amber_color')}</span> <strong>{t(`amber_color_${d.amberColor.id}_name` as any)}</strong></div>
                <div className="flex justify-between"><span>{t('build_summary_quality_grade')}</span> <strong>{d.grade}</strong></div>
                <div className="flex justify-between"><span>{t('build_summary_config')}</span> <strong>{t('build_summary_beads' as any, { size: d.beadSize, quantity: d.beadQuantity })}</strong></div>
                {d.amulet && <div className="flex justify-between"><span>{t('build_addon_amulet')}</span> <strong>{d.amulet.name}</strong></div>}
                {d.metal !== Metal.None && <div className="flex justify-between"><span>{t('build_addon_metal')}</span> <strong>{d.metal}</strong></div>}
            </div>
            <div className="mt-6 pt-6 border-t-2 border-dashed">
                <h3 className="text-xl font-semibold mb-3">{t('build_summary_breakdown_title')}</h3>
                <div className="space-y-2 text-md">
                    <div className="flex justify-between"><span>{t('build_summary_breakdown_beads')}</span> <span>{formatCurrency(b.beadsPrice)}</span></div>
                    {b.amuletPrice > 0 && <div className="flex justify-between"><span>{t('build_addon_amulet')}</span> <span>{formatCurrency(b.amuletPrice)}</span></div>}
                    {b.metalPrice > 0 && <div className="flex justify-between"><span>{t('build_addon_metal')}</span> <span>{formatCurrency(b.metalPrice)}</span></div>}
                </div>
            </div>
             <div className="mt-6 pt-4 border-t-2">
                <div className="flex justify-between items-baseline">
                    <span className="text-2xl font-bold">{t('order_confirmation_est_total_title' as any)}</span>
                    <strong className="text-4xl font-bold text-[var(--c-accent-primary)]">{formatCurrency(b.totalPrice)}</strong>
                </div>
            </div>
        </>
    );

    return (
        <div className="page-container-with-bg py-16">
            <SEO titleKey="seo_order_confirmation_title" descriptionKey="seo_order_confirmation_desc" keywordsKey="seo_robots_noindex" />
            <div className="container mx-auto px-4">
                <div className="max-w-2xl mx-auto bg-[var(--c-surface)] p-8 rounded-lg shadow-xl border">
                    <div className="text-center mb-6">
                        <h1 className="text-4xl font-bold">{t('order_confirmation_title' as any)}</h1>
                        <p className="mt-2 text-[var(--c-text-secondary)]">{t('order_confirmation_subtitle' as any)}</p>
                    </div>
                    <div className="p-6 bg-[var(--c-surface-alt)] rounded-lg border shadow-inner">
                        {isMalaBuilderOrder(details) && breakdown && renderMalaDetails(details, breakdown)}
                        {/* Add renderBraceletDetails if needed in the future */}
                    </div>
                    <div className="mt-8 text-center">
                        <button onClick={handleSubmitOrder} className="btn-primary text-white font-bold py-4 px-8 rounded-lg text-xl shadow-lg">
                            {t('order_confirmation_button_submit' as any)}
                        </button>
                        {notification && <p className="mt-4 text-sm text-green-700 font-semibold">{notification}</p>}
                        <p className="mt-4 text-xs text-[var(--c-text-secondary)] max-w-md mx-auto">{t('order_confirmation_instructions' as any)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderConfirmationPage;
