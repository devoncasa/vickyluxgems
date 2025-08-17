
import React from 'react';
import { useTranslations } from '../hooks/useTranslations';

const FaqTable: React.FC = () => {
    const { t } = useTranslations();

    return (
        <div className="space-y-4">
            <p>{t('faq.table.intro')}</p>
            <div className="overflow-x-auto rounded-lg border border-stone-200">
                <table className="w-full min-w-[600px] text-sm text-left text-stone-600">
                    <thead className="text-xs text-stone-700 uppercase bg-stone-100">
                        <tr>
                            <th scope="col" className="px-4 py-3 font-semibold border-b border-r border-stone-200">{t('faq.table.headerFeature')}</th>
                            <th scope="col" className="px-4 py-3 font-semibold border-b border-r border-stone-200">{t('faq.table.headerGoldenTaan')}</th>
                            <th scope="col" className="px-4 py-3 font-semibold border-b border-stone-200">{t('faq.table.headerCommonSugar')}</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-200">
                        <tr className="bg-white">
                            <td className="px-4 py-3 font-semibold text-stone-800 border-r">{t('faq.table.row1Title')}</td>
                            <td className="px-4 py-3 border-r">{t('faq.table.row1Taan')}</td>
                            <td className="px-4 py-3">{t('faq.table.row1Common')}</td>
                        </tr>
                        <tr className="bg-stone-50">
                            <td className="px-4 py-3 font-semibold text-stone-800 border-r">{t('faq.table.row2Title')}</td>
                            <td className="px-4 py-3 border-r">{t('faq.table.row2Taan')}</td>
                            <td className="px-4 py-3">{t('faq.table.row2Common')}</td>
                        </tr>
                        <tr className="bg-white">
                            <td className="px-4 py-3 font-semibold text-stone-800 border-r">{t('faq.table.row3Title')}</td>
                            <td className="px-4 py-3 border-r">{t('faq.table.row3Taan')}</td>
                            <td className="px-4 py-3">{t('faq.table.row3Common')}</td>
                        </tr>
                        <tr className="bg-stone-50">
                            <td className="px-4 py-3 font-semibold text-stone-800 border-r">{t('faq.table.row4Title')}</td>
                            <td className="px-4 py-3 border-r">{t('faq.table.row4Taan')}</td>
                            <td className="px-4 py-3">{t('faq.table.row4Common')}</td>
                        </tr>
                        <tr className="bg-white">
                            <td className="px-4 py-3 font-semibold text-stone-800 border-r">{t('faq.table.row5Title')}</td>
                            <td className="px-4 py-3 border-r">{t('faq.table.row5Taan')}</td>
                            <td className="px-4 py-3">{t('faq.table.row5Common')}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FaqTable;
