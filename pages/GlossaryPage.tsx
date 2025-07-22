import React, { useState, useMemo } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import SEO from '../components/SEO';
import { BACKGROUND_IMAGES } from '../constants';

const GLOSSARY_TERMS = [
  { termKey: 'term_agate', defKey: 'def_agate' }, { termKey: 'term_altar_beads', defKey: 'def_altar_beads' }, { termKey: 'term_amber', defKey: 'def_amber' },
  { termKey: 'term_amulet', defKey: 'def_amulet' }, { termKey: 'term_anointing_oil', defKey: 'def_anointing_oil' }, { termKey: 'term_artisanal_gem', defKey: 'def_artisanal_gem' },
  { termKey: 'term_aura_cleansing', defKey: 'def_aura_cleansing' }, { termKey: 'term_aventurine', defKey: 'def_aventurine' }, { termKey: 'term_balance_stones', defKey: 'def_balance_stones' },
  { termKey: 'term_bezel_setting', defKey: 'def_bezel_setting' }, { termKey: 'term_blessing_ceremony', defKey: 'def_blessing_ceremony' }, { termKey: 'term_bloodstone', defKey: 'def_bloodstone' },
  { termKey: 'term_blue_spinel', defKey: 'def_blue_spinel' }, { termKey: 'term_brahma_knot', defKey: 'def_brahma_knot' }, { termKey: 'term_buddhist_mala', defKey: 'def_buddhist_mala' },
  { termKey: 'term_burmite', defKey: 'def_burmite' }, { termKey: 'term_carnelian', defKey: 'def_carnelian' }, { termKey: 'term_cats_eye', defKey: 'def_cats_eye' },
  { termKey: 'term_chakra_stones', defKey: 'def_chakra_stones' }, { termKey: 'term_citrine', defKey: 'def_citrine' }, { termKey: 'term_cruciform_pendant', defKey: 'def_cruciform_pendant' },
  { termKey: 'term_crystal_grid', defKey: 'def_crystal_grid' }, { termKey: 'term_cultural_beads', defKey: 'def_cultural_beads' }, { termKey: 'term_cut_grade', defKey: 'def_cut_grade' },
  { termKey: 'term_devotional_string', defKey: 'def_devotional_string' }, { termKey: 'term_divination_tools', defKey: 'def_divination_tools' }, { termKey: 'term_divine_geometry', defKey: 'def_divine_geometry' },
  { termKey: 'term_double_terminated_quartz', defKey: 'def_double_terminated_quartz' }, { termKey: 'term_drilled_gem', defKey: 'def_drilled_gem' }, { termKey: 'term_durability_index', defKey: 'def_durability_index' },
  { termKey: 'term_dzi_beads', defKey: 'def_dzi_beads' }, { termKey: 'term_earth_element_stone', defKey: 'def_earth_element_stone' }, { termKey: 'term_elastic_cord', defKey: 'def_elastic_cord' },
  { termKey: 'term_electroplated_gem', defKey: 'def_electroplated_gem' }, { termKey: 'term_emerald', defKey: 'def_emerald' }, { termKey: 'term_energy_resonance', defKey: 'def_energy_resonance' },
  { termKey: 'term_engraved_symbol_beads', defKey: 'def_engraved_symbol_beads' }, { termKey: 'term_evil_eye_beads', defKey: 'def_evil_eye_beads' }, { termKey: 'term_faceted_cut', defKey: 'def_faceted_cut' },
  { termKey: 'term_faith_beads', defKey: 'def_faith_beads' }, { termKey: 'term_feather_inclusion', defKey: 'def_feather_inclusion' }, { termKey: 'term_feldspar', defKey: 'def_feldspar' },
  { termKey: 'term_fire_agate', defKey: 'def_fire_agate' }, { termKey: 'term_fossil_gemstone', defKey: 'def_fossil_gemstone' }, { termKey: 'term_frequency_healing', defKey: 'def_frequency_healing' },
  { termKey: 'term_full_mala', defKey: 'def_full_mala' }, { termKey: 'term_garnet', defKey: 'def_garnet' }, { termKey: 'term_gem_carving', defKey: 'def_gem_carving' },
  { termKey: 'term_geode', defKey: 'def_geode' }, { termKey: 'term_gilded_gemstone', defKey: 'def_gilded_gemstone' }, { termKey: 'term_gold_plated_beads', defKey: 'def_gold_plated_beads' },
  { termKey: 'term_grading_certificate', defKey: 'def_grading_certificate' }, { termKey: 'term_grounding_stone', defKey: 'def_grounding_stone' }, { termKey: 'term_guru_bead', defKey: 'def_guru_bead' },
  { termKey: 'term_halal_gemstone', defKey: 'def_halal_gemstone' }, { termKey: 'term_hand_knotted_mala', defKey: 'def_hand_knotted_mala' }, { termKey: 'term_healing_crystal', defKey: 'def_healing_crystal' },
  { termKey: 'term_hematite', defKey: 'def_hematite' }, { termKey: 'term_heritage_beads', defKey: 'def_heritage_beads' }, { termKey: 'term_holy_water_pearl', defKey: 'def_holy_water_pearl' },
  { termKey: 'term_hypersthene', defKey: 'def_hypersthene' }, { termKey: 'term_idol_beads', defKey: 'def_idol_beads' }, { termKey: 'term_imperial_jade', defKey: 'def_imperial_jade' },
  { termKey: 'term_inclusion', defKey: 'def_inclusion' }, { termKey: 'term_infrared_resonance', defKey: 'def_infrared_resonance' }, { termKey: 'term_intention_beads', defKey: 'def_intention_beads' },
  { termKey: 'term_iolite', defKey: 'def_iolite' }, { termKey: 'term_islamic_tesbih', defKey: 'def_islamic_tesbih' }, { termKey: 'term_jade', defKey: 'def_jade' },
  { termKey: 'term_japa_mala', defKey: 'def_japa_mala' }, { termKey: 'term_jasper', defKey: 'def_jasper' }, { termKey: 'term_jet_stone', defKey: 'def_jet_stone' },
  { termKey: 'term_jewel_tone', defKey: 'def_jewel_tone' }, { termKey: 'term_jewelry_resin', defKey: 'def_jewelry_resin' }, { termKey: 'term_judgment_bead', defKey: 'def_judgment_bead' },
  { termKey: 'term_kabbalah_string', defKey: 'def_kabbalah_string' }, { termKey: 'term_kabir_prayer_beads', defKey: 'def_kabir_prayer_beads' }, { termKey: 'term_karma_beads', defKey: 'def_karma_beads' },
  { termKey: 'term_knotting_technique', defKey: 'def_knotting_technique' }, { termKey: 'term_kundalini_mala', defKey: 'def_kundalini_mala' }, { termKey: 'term_kunzite', defKey: 'def_kunzite' },
  { termKey: 'term_kyanite', defKey: 'def_kyanite' }, { termKey: 'term_labradorite', defKey: 'def_labradorite' }, { termKey: 'term_lapis_lazuli', defKey: 'def_lapis_lazuli' },
  { termKey: 'term_lithotherapy', defKey: 'def_lithotherapy' }, { termKey: 'term_locket_beads', defKey: 'def_locket_beads' }, { termKey: 'term_lotus_bead', defKey: 'def_lotus_bead' },
  { termKey: 'term_love_stone', defKey: 'def_love_stone' }, { termKey: 'term_luxury_rosary', defKey: 'def_luxury_rosary' }, { termKey: 'term_magnetic_clasp', defKey: 'def_magnetic_clasp' },
  { termKey: 'term_mahogany_obsidian', defKey: 'def_mahogany_obsidian' }, { termKey: 'term_mala', defKey: 'def_mala' }, { termKey: 'term_mantra_beads', defKey: 'def_mantra_beads' },
  { termKey: 'term_meditation_mala', defKey: 'def_meditation_mala' }, { termKey: 'term_metaphysical_gem', defKey: 'def_metaphysical_gem' }, { termKey: 'term_moonstone', defKey: 'def_moonstone' },
  { termKey: 'term_mystic_quartz', defKey: 'def_mystic_quartz' }, { termKey: 'term_naga_beads', defKey: 'def_naga_beads' }, { termKey: 'term_natural_amber', defKey: 'def_natural_amber' },
  { termKey: 'term_navaratna', defKey: 'def_navaratna' }, { termKey: 'term_nazar_bead', defKey: 'def_nazar_bead' }, { termKey: 'term_nephrite_jade', defKey: 'def_nephrite_jade' },
  { termKey: 'term_nomadic_crafting', defKey: 'def_nomadic_crafting' }, { termKey: 'term_numerical_prayer_cycle', defKey: 'def_numerical_prayer_cycle' }, { termKey: 'term_obsidian', defKey: 'def_obsidian' },
  { termKey: 'term_offering_beads', defKey: 'def_offering_beads' }, { termKey: 'term_om_symbol_bead', defKey: 'def_om_symbol_bead' }, { termKey: 'term_onyx', defKey: 'def_onyx' },
  { termKey: 'term_opalite', defKey: 'def_opalite' }, { termKey: 'term_organic_gemstone', defKey: 'def_organic_gemstone' }, { termKey: 'term_orthodox_rosary', defKey: 'def_orthodox_rosary' },
  { termKey: 'term_pearl', defKey: 'def_pearl' }, { termKey: 'term_peridot', defKey: 'def_peridot' }, { termKey: 'term_petrified_wood', defKey: 'def_petrified_wood' },
  { termKey: 'term_prayer_beads', defKey: 'def_prayer_beads' }, { termKey: 'term_protection_amulet', defKey: 'def_protection_amulet' }, { termKey: 'term_puja_mala', defKey: 'def_puja_mala' },
  { termKey: 'term_pyrite', defKey: 'def_pyrite' }, { termKey: 'term_qibla_compass_bead', defKey: 'def_qibla_compass_bead' }, { termKey: 'term_queen_s_amber', defKey: 'def_queen_s_amber' },
  { termKey: 'term_quenching_process', defKey: 'def_quenching_process' }, { termKey: 'term_quintuple_wrap_bracelet', defKey: 'def_quintuple_wrap_bracelet' }, { termKey: 'term_quranic_tesbih', defKey: 'def_quranic_tesbih' },
  { termKey: 'term_quartz', defKey: 'def_quartz' }, { termKey: 'term_reiki_stone', defKey: 'def_reiki_stone' }, { termKey: 'term_ritual_incense_bead', defKey: 'def_ritual_incense_bead' },
  { termKey: 'term_root_chakra_beads', defKey: 'def_root_chakra_beads' }, { termKey: 'term_rosary', defKey: 'def_rosary' }, { termKey: 'term_rose_quartz', defKey: 'def_rose_quartz' },
  { termKey: 'term_ruby', defKey: 'def_ruby' }, { termKey: 'term_rudraksha', defKey: 'def_rudraksha' }, { termKey: 'term_sacred_geometry_beads', defKey: 'def_sacred_geometry_beads' },
  { termKey: 'term_sandalwood_beads', defKey: 'def_sandalwood_beads' }, { termKey: 'term_sanskrit_mantra', defKey: 'def_sanskrit_mantra' }, { termKey: 'term_sapphire', defKey: 'def_sapphire' },
  { termKey: 'term_smoky_quartz', defKey: 'def_smoky_quartz' }, { termKey: 'term_spinel', defKey: 'def_spinel' }, { termKey: 'term_sufi_prayer_beads', defKey: 'def_sufi_prayer_beads' },
  { termKey: 'term_tektite', defKey: 'def_tektite' }, { termKey: 'term_tesbih_tasbih', defKey: 'def_tesbih_tasbih' }, { termKey: 'term_thai_buddhist_beads', defKey: 'def_thai_buddhist_beads' },
  { termKey: 'term_tibetan_mala', defKey: 'def_tibetan_mala' }, { termKey: 'term_tiger_s_eye', defKey: 'def_tiger_s_eye' }, { termKey: 'term_tridacna_shell', defKey: 'def_tridacna_shell' },
  { termKey: 'term_turquoise', defKey: 'def_turquoise' }, { termKey: 'term_ultrasonic_cleaning', defKey: 'def_ultrasonic_cleaning' }, { termKey: 'term_umbrella_blessing_beads', defKey: 'def_umbrella_blessing_beads' },
  { termKey: 'term_universal_chakra_bead', defKey: 'def_universal_chakra_bead' }, { termKey: 'term_untreated_gemstone', defKey: 'def_untreated_gemstone' }, { termKey: 'term_urdu_calligraphy_beads', defKey: 'def_urdu_calligraphy_beads' },
  { termKey: 'term_vedic_mala', defKey: 'def_vedic_mala' }, { termKey: 'term_vintage_prayer_beads', defKey: 'def_vintage_prayer_beads' }, { termKey: 'term_virgo_birthstone_bead', defKey: 'def_virgo_birthstone_bead' },
  { termKey: 'term_visualization_stone', defKey: 'def_visualization_stone' }, { termKey: 'term_volcanic_lava_beads', defKey: 'def_volcanic_lava_beads' }, { termKey: 'term_white_agate', defKey: 'def_white_agate' },
  { termKey: 'term_wiccan_beads', defKey: 'def_wiccan_beads' }, { termKey: 'term_wisdom_beads', defKey: 'def_wisdom_beads' }, { termKey: 'term_wooden_mala', defKey: 'def_wooden_mala' },
  { termKey: 'term_worry_beads', defKey: 'def_worry_beads' }, { termKey: 'term_x_ray_gem_testing', defKey: 'def_x_ray_gem_testing' }, { termKey: 'term_xenolith_bead', defKey: 'def_xenolith_bead' },
  { termKey: 'term_xylopal', defKey: 'def_xylopal' }, { termKey: 'term_yellow_jade', defKey: 'def_yellow_jade' }, { termKey: 'term_yin_yang_beads', defKey: 'def_yin_yang_beads' },
  { termKey: 'term_yoga_mala', defKey: 'def_yoga_mala' }, { termKey: 'term_yoni_crystal', defKey: 'def_yoni_crystal' }, { termKey: 'term_yule_beads', defKey: 'def_yule_beads' },
  { termKey: 'term_zikr_beads', defKey: 'def_zikr_beads' }, { termKey: 'term_zircon', defKey: 'def_zircon' }, { termKey: 'term_zodiac_beads', defKey: 'def_zodiac_beads' },
  { termKey: 'term_zoisite', defKey: 'def_zoisite' }, { termKey: 'term_zuni_fetish_beads', defKey: 'def_zuni_fetish_beads' }
];

const AccordionItem: React.FC<{ 
    letter: string; 
    terms: { term: string; definition: string }[];
    isOpen: boolean;
    onClick: () => void;
}> = ({ letter, terms, isOpen, onClick }) => {
    return (
        <div className="border-b border-[var(--c-border)]" id={`letter-${letter}`}>
            <h2 className="text-lg font-semibold w-full">
                <button
                    onClick={onClick}
                    aria-expanded={isOpen}
                    aria-controls={`content-${letter}`}
                    className={`w-full flex justify-between items-center py-4 text-start text-[var(--c-heading)] hover:bg-[var(--c-accent-primary)]/10 px-4 transition-colors font-serif text-4xl`}
                >
                    <span>{letter}</span>
                    <span className={`text-4xl text-[var(--c-accent-primary)] font-normal transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>+</span>
                </button>
            </h2>
            <div 
                id={`content-${letter}`} 
                className={`overflow-hidden transition-all duration-500 ease-out bg-white`}
                style={{ maxHeight: isOpen ? '2000px' : '0' }}
                aria-hidden={!isOpen}
            >
                <dl className="space-y-6 p-6">
                    {terms.map((item, index) => (
                        <div key={index} className="pb-4 border-b border-gray-100 last:border-b-0">
                            <dt className="text-xl font-semibold text-[var(--c-heading)] font-serif">{item.term}</dt>
                            <dd className="mt-1 text-base text-[var(--c-text-primary)]/90" dangerouslySetInnerHTML={{ __html: item.definition }}></dd>
                        </div>
                    ))}
                </dl>
            </div>
        </div>
    );
};

const GlossaryPage: React.FC = () => {
    const { t } = useLanguage();
    const [searchTerm, setSearchTerm] = useState('');
    const [openLetter, setOpenLetter] = useState<string | null>(null);

    const toggleLetter = (letter: string) => {
        setOpenLetter(prev => prev === letter ? null : letter);
    };

    const translatedTerms = useMemo(() => {
        return GLOSSARY_TERMS.map(({ termKey, defKey }) => ({
            term: t(`glossary_${termKey}` as any),
            definition: t(`glossary_${defKey}` as any),
        }))
        .filter(item => item.term && typeof item.term === 'string' && !item.term.startsWith('glossary_')) // Filter out untranslated/missing items
        .sort((a, b) => a.term.localeCompare(b.term, undefined, { sensitivity: 'base' }));
    }, [t]);

    const filteredTerms = useMemo(() => {
        if (!searchTerm) return translatedTerms;
        const lowercasedFilter = searchTerm.toLowerCase();
        return translatedTerms.filter(item =>
            item.term.toLowerCase().includes(lowercasedFilter) ||
            item.definition.toLowerCase().includes(lowercasedFilter)
        );
    }, [searchTerm, translatedTerms]);
    
    const groupedTerms = useMemo(() => {
        return filteredTerms.reduce((acc, item) => {
            if (!item.term || item.term.startsWith('glossary_')) return acc;
            const firstLetter = item.term.charAt(0).toUpperCase();
            if (!acc[firstLetter]) {
                acc[firstLetter] = [];
            }
            acc[firstLetter].push(item);
            return acc;
        }, {} as Record<string, typeof filteredTerms>);
    }, [filteredTerms]);

    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');

    const handleLetterNavClick = (e: React.MouseEvent<HTMLAnchorElement>, letter: string) => {
        e.preventDefault();
        const element = document.getElementById(`letter-${letter}`);
        if (element) {
            // Wait for state to update, then scroll
            setTimeout(() => {
                const headerOffset = 120; // Height of sticky header/search bar
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }, 100);
            setOpenLetter(letter);
        }
    };

    return (
        <div 
            className="page-container-with-bg py-16 md:py-24"
            style={{ backgroundImage: `url('${BACKGROUND_IMAGES[8]}')` }}
        >
            <SEO 
                titleKey="seo_glossary_title"
                descriptionKey="seo_glossary_desc"
                keywordsKey="seo_glossary_keywords"
                imageUrl="https://i.postimg.cc/Twz7P7n1/Vicky-Amber-Gems-background-0017.jpg"
            />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-8">
                        <h1 className="text-5xl font-bold tracking-tight">{t('glossary_title' as any)}</h1>
                        <p className="mt-4 text-xl text-[var(--c-text-secondary)]">{t('glossary_subtitle' as any)}</p>
                    </div>

                    <div className="sticky top-28 z-20 bg-[var(--c-bg)]/80 backdrop-blur-md p-4 rounded-lg shadow-sm border border-[var(--c-border)] mb-8">
                        <input
                            type="search"
                            placeholder={t('glossary_search_placeholder' as any)}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full p-3 border border-[var(--c-border)] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--c-accent-primary)] bg-[var(--c-surface)]"
                            aria-label="Search glossary terms"
                        />
                    </div>
                    
                     <nav className="flex flex-wrap justify-center gap-1 sm:gap-2 my-8">
                        {alphabet.map(letter => (
                            <a 
                                key={letter}
                                href={`#letter-${letter}`}
                                className={`text-sm sm:text-base w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full transition-colors ${groupedTerms[letter] ? 'text-[var(--c-text-secondary)] hover:bg-[var(--c-accent-primary)] hover:text-white' : 'text-gray-300 cursor-not-allowed'}`}
                                onClick={(e) => groupedTerms[letter] && handleLetterNavClick(e, letter)}
                            >
                                {letter}
                            </a>
                        ))}
                    </nav>

                    <div className="space-y-1 bg-white/50 rounded-lg shadow-sm border border-[var(--c-border)] overflow-hidden">
                        {Object.keys(groupedTerms).sort().map(letter => (
                            <AccordionItem
                                key={letter}
                                letter={letter}
                                terms={groupedTerms[letter]}
                                isOpen={openLetter === letter}
                                onClick={() => toggleLetter(letter)}
                            />
                        ))}
                        {filteredTerms.length === 0 && searchTerm && (
                            <div className="text-center p-16 text-[var(--c-text-secondary)]">
                                <p className="text-xl">No terms found for "{searchTerm}".</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GlossaryPage;