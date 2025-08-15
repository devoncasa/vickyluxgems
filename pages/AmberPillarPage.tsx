import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { BACKGROUND_IMAGES } from '../constants.ts';
import SEO from '../components/SEO.tsx';
import { useLanguage } from '../i18n/LanguageContext.tsx';
import { ChevronRightIcon } from '../components/IconComponents.tsx';

const GuideSection: React.FC<{
    title: string;
    description: string;
    imageUrl: string;
    links: { name: string; path: string; }[];
}> = ({ title, description, imageUrl, links }) => (
    <section className="py-12 md:py-16 border-b border-white/10 last:border-b-0 bg-transparent">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="prose prose-lg max-w-none">
                <h2 className="!text-4xl">{title}</h2>
                <p>{description}</p>
                <ul className="mt-4 !p-0 !list-none space-y-2">
                    {links.map(link => (
                        <li key={link.path}>
                            <ReactRouterDOM.Link to={link.path} className="flex items-center font-semibold group transition-colors no-underline">
                                <span>{link.name}</span>
                                <ChevronRightIcon className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                            </ReactRouterDOM.Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="aspect-[4/3] bg-gray-200 rounded-lg overflow-hidden shadow-md">
                <img src={imageUrl} alt={`Visual representation for ${title}`} className="w-full h-full object-cover"/>
            </div>
        </div>
    </section>
);

const AmberPillarPage: React.FC = () => {
    const { t } = useLanguage();

    const sections = [
        {
            title: "The Story of Burmite",
            description: "Journey back 99 million years to uncover the origins of the world's oldest amber. Learn about its formation during the age of dinosaurs and its journey through time from the ancient supercontinent of Gondwana to the famed Silk Road.",
            imageUrl: "https://placehold.co/800x600/8A5E3C/FFFFFF?text=Amber+History",
            links: [
                { name: t('nav_History_of_Burmese_Amber'), path: '/amber/history' },
                { name: t('nav_Where_Burmese_Amber_is_Found'), path: '/amber/location' },
                { name: t('nav_Why_Oldest_Amber_is_in_Myanmar'), path: '/amber/uniqueness' },
                { name: t('nav_How_Burmese_Amber_is_Formed'), path: '/amber/formation' },
            ]
        },
        {
            title: "The Science of Authenticity",
            description: "Delve into the science that distinguishes true Burmite. Understand its unique physical and chemical properties, and learn the methods—from simple home tests to advanced lab analysis—used to verify its authenticity and protect your investment.",
            imageUrl: "https://placehold.co/800x600/88929B/FFFFFF?text=Amber+Science",
            links: [
                { name: t('nav_Physical_&_Chemical_Properties'), path: '/amber/properties' },
                { name: t('nav_Authenticate_Burmese_Amber'), path: '/amber/authentication' },
                { name: t('nav_Comparisons_to_Other_Ambers'), path: '/amber/comparison-ambers' },
                { name: t('nav_Comparisons_to_Other_Minerals'), path: '/amber/comparison-minerals' },
            ]
        },
        {
            title: "The Connoisseur's Collection",
            description: "Explore the rich variety and cultural significance of Burmese amber. Learn about its diverse color spectrum, its role in spiritual practices, and its use in the high-end jewelry and collectibles markets.",
            imageUrl: "https://placehold.co/800x600/C8A97E/2a2a2a?text=Amber+Collection",
            links: [
                { name: t('nav_The_Variety_of_Colors_&_Tones'), path: '/policies/colors-and-tones' },
                { name: t('nav_Use_in_the_Gems_Industry'), path: '/amber/industry-use' },
                { name: t('nav_Roles_in_Religious_Practice'), path: '/amber/religion' },
            ]
        },
        {
            title: "The Modern Market",
            description: "Understand the current landscape of the Burmese amber market. From the complexities of ethical sourcing and mining regulations to future trends and the impact of technology, get an inside look at this fascinating industry.",
            imageUrl: "https://placehold.co/800x600/6B4F3A/FFFFFF?text=Amber+Market",
            links: [
                { name: t('nav_Current_Availability'), path: '/amber/availability' },
                { name: t('nav_Mining_Regulations_&_Restrictions'), path: '/amber/regulations' },
                { name: t('nav_Future_Trends'), path: '/amber/future-trends' },
                { name: t('nav_Future_Tech_&_Amber'), path: '/amber/future-tech' },
                { name: t('nav_Roles_in_Current_Markets'), path: '/amber/markets' },
            ]
        }
    ];

    return (
        <div 
            className="page-container-with-bg py-16 md:py-24"
            style={{ backgroundImage: `url('${BACKGROUND_IMAGES[3]}')` }}
        >
            <SEO 
                titleKey="nav_All_About_Burmese_Amber"
                descriptionKey="seo_amber_guide_desc"
                keywordsKey="seo_amber_guide_keywords"
            />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="content-page-block--dark dark-context max-w-7xl mx-auto p-6 md:p-12 rounded-lg">
                    <div className="text-center mb-12">
                        <h1 className="text-5xl font-bold tracking-tight">The Ultimate Guide to Burmese Amber</h1>
                        <p className="mt-4 text-xl">Your complete resource for understanding the history, science, and significance of the world's most ancient amber.</p>
                    </div>

                    <div className="mt-12 space-y-8">
                        {sections.map(section => (
                            <GuideSection key={section.title} {...section} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AmberPillarPage;