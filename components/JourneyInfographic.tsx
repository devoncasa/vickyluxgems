
import React, { useEffect, useRef, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale, Title, RadarController, PointElement, LineElement, RadialLinearScale, Filler, type ChartOptions } from 'chart.js';
import { Doughnut, Bar, Radar } from 'react-chartjs-2';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { INFOGRAPHIC_BACKGROUND_IMAGES } from '../constants';
import { useTranslations } from '../hooks/useTranslations';
import { FiMousePointer } from 'react-icons/fi';

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale, Title, RadarController, PointElement, LineElement, RadialLinearScale, Filler);

const AnimatedCounter: React.FC<{ target: number; prefix?: string; suffix?: string; isVisible: boolean; }> = ({ target, prefix = '', suffix = '', isVisible }) => {
    const [displayValue, setDisplayValue] = useState(`${prefix}0${suffix}`);

    useEffect(() => {
        if (isVisible) {
            let current = 0;
            const duration = 1500;
            const stepTime = 20;
            const steps = duration / stepTime;
            const increment = target / steps;

            const step = () => {
                current += increment;
                if (current < target) {
                    setDisplayValue(prefix + Math.ceil(current).toLocaleString() + suffix);
                    setTimeout(step, stepTime);
                } else {
                    setDisplayValue(prefix + target.toLocaleString() + suffix);
                }
            };
            step();
        }
    }, [isVisible, target, prefix, suffix]);

    return <span>{displayValue}</span>;
};


const JourneyInfographic: React.FC = () => {
    const { t } = useTranslations();
    const [parallaxBg, setParallaxBg] = useState<string>('');
    const [isExpanded, setIsExpanded] = useState(false);
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { margin: "0px 0px -40% 0px" });

    useEffect(() => {
        if (!isInView) {
            setIsExpanded(false);
        }
    }, [isInView]);

    useEffect(() => {
        const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * INFOGRAPHIC_BACKGROUND_IMAGES.length);
        setParallaxBg(INFOGRAPHIC_BACKGROUND_IMAGES[randomIndex]);
    }, []);

    const handleMouseEnter = () => { if (isDesktop) setIsExpanded(true); };
    const handleMouseLeave = () => { if (isDesktop) setIsExpanded(false); };
    const handleClick = () => { if (!isDesktop) setIsExpanded(!isExpanded); };

    const cleanLabelData = {
        labels: t('infographic.authenticity.chartLabels'),
        datasets: [{ data: [70, 30], backgroundColor: ['#8BC34A', '#EEEEEE'], borderColor: '#FFFFFF', borderWidth: 4 }]
    };
    const cleanLabelOptions: ChartOptions<'doughnut'> = {
        responsive: true, maintainAspectRatio: false, cutout: '70%', plugins: { legend: { display: false }, tooltip: { enabled: false } }
    };
    
    const mineralData = {
        labels: t('infographic.difference.chartYAxisLabels'),
        datasets: [
            { label: t('infographic.difference.chartLabelTaan'), data: [1030, 31, 2.6, 0.3], backgroundColor: '#E57373', borderRadius: 6 },
            { label: t('infographic.difference.chartLabelRefined'), data: [2, 0, 0.1, 0], backgroundColor: '#E0E0E0', borderRadius: 6 }
        ]
    };
    const mineralOptions: ChartOptions<'bar'> = {
        indexAxis: 'y', responsive: true, maintainAspectRatio: false,
        scales: { x: { beginAtZero: true, grid: { color: '#f0f0f0' } }, y: { grid: { display: false } } },
        plugins: { legend: { position: 'bottom' }, title: { display: true, text: t('infographic.difference.chartTitle'), font: { size: 16, family: "'Inter', sans-serif" }, padding: { top: 10, bottom: 20 } } }
    };

    const sustainabilityData = {
        labels: t('infographic.sustainability.chartRadarLabels'),
        datasets: [
            { label: t('infographic.sustainability.chartLabelTaan'), data: [9, 9, 10, 8, 7], backgroundColor: 'rgba(139, 195, 74, 0.2)', borderColor: '#8BC34A', pointBackgroundColor: '#8BC34A'},
            { label: t('infographic.sustainability.chartLabelSugarcane'), data: [3, 2, 3, 4, 3], backgroundColor: 'rgba(229, 115, 115, 0.2)', borderColor: '#E57373', pointBackgroundColor: '#E57373'}
        ]
    };
    const sustainabilityOptions: ChartOptions<'radar'> = {
        responsive: true, maintainAspectRatio: false,
        scales: { r: { beginAtZero: true, max: 10, pointLabels: { font: { size: 12, family: "'Inter', sans-serif" } }, ticks: { display: false } } },
        plugins: { legend: { position: 'bottom' }, title: { display: true, text: t('infographic.sustainability.chartTitle'), font: { size: 16, family: "'Inter', sans-serif" }, padding: { top: 10, bottom: 20 } } }
    };
    
    return (
        <section 
            ref={sectionRef}
            id="journey-infographic" 
            className="infographic-parallax-container py-12"
            style={{ backgroundImage: `url(${parallaxBg})` }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
        >
            <style>{`
                .infographic-parallax-container {
                    position: relative;
                    background-attachment: fixed;
                    background-position: center;
                    background-repeat: no-repeat;
                    background-size: cover;
                    font-family: 'Inter', 'Noto Sans Thai', sans-serif;
                    cursor: ${isDesktop ? 'default' : 'pointer'};
                }
                .infographic-parallax-container::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: rgba(255, 255, 255, 0.6);
                }
                .infographic-content-wrapper {
                    position: relative;
                    z-index: 1;
                    background-color: transparent;
                }
                .content-card {
                    position: relative;
                    z-index: 3;
                }
                .chart-container {
                    position: relative;
                    width: 100%;
                    max-width: 500px;
                    margin-left: auto;
                    margin-right: auto;
                    height: 300px;
                    max-height: 400px;
                }
                @media (min-width: 768px) {
                    .chart-container {
                        height: 350px;
                    }
                }
            `}</style>
            <div className="infographic-content-wrapper text-gray-800">
                <div className="container mx-auto p-4 md:p-8 max-w-5xl">
                    <header className="text-center mb-6">
                         <img src="https://i.postimg.cc/mrQKP5dZ/taan-logo-small.webp" alt="Golden Taan Logo" className="mx-auto h-16 mb-4"/>
                         <h1 className="text-4xl md:text-6xl font-black text-[#78350f] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>{t('infographic.title')}</h1>
                         <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">{t('infographic.subtitle')}</p>
                    </header>

                     <motion.div 
                        className="overflow-hidden relative"
                        animate={{ maxHeight: isExpanded ? 5000 : 80 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                     >
                        <AnimatePresence>
                        {!isExpanded && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="absolute inset-0 flex items-center justify-center bg-white/20 backdrop-blur-sm"
                            >
                                <div className="flex items-center space-x-3 text-[#78350f] font-semibold text-lg p-3 rounded-full bg-white/70">
                                    <FiMousePointer />
                                    <span>{isDesktop ? t('infographic.cta.desktop') : t('infographic.cta.mobile')}</span>
                                </div>
                            </motion.div>
                        )}
                        </AnimatePresence>
                        
                        <main className="space-y-16 md:space-y-24 mt-12">
                            {/* Global Shift */}
                            <section id="global-shift" className="rounded-2xl p-1">
                                <div className="content-card text-center p-6 md:p-8 bg-white/80 rounded-xl shadow-lg">
                                    <h2 className="text-2xl md:text-3xl font-bold text-[#78350f] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>{t('infographic.authenticity.title')}</h2>
                                    <p className="text-gray-600 mb-8 max-w-2xl mx-auto">{t('infographic.authenticity.subtitle')}</p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                                        <div className="text-center border-r-0 md:border-r-2 border-dashed border-[#8BC34A] pr-0 md:pr-8">
                                            <p className="text-gray-500 text-lg mb-2">{t('infographic.authenticity.marketSize')}</p>
                                            <div className="text-6xl md:text-8xl font-black text-[#8BC34A]">
                                                <AnimatedCounter target={55} prefix="$" suffix="B" isVisible={isExpanded} />
                                            </div>
                                            <p className="text-gray-500 text-lg mt-2">{t('infographic.authenticity.marketSizeSuffix')}</p>
                                            <p className="text-sm text-gray-400 mt-2">{t('infographic.authenticity.sourceMordor')}</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-gray-600 mb-4 text-lg"><AnimatedCounter target={70} suffix="% " isVisible={isExpanded}/>{t('infographic.authenticity.consumerChoice')}</p>
                                            <div className="chart-container h-[250px] md:h-[300px]">
                                                <Doughnut data={cleanLabelData} options={cleanLabelOptions} />
                                            </div>
                                            <p className="text-sm text-gray-400 mt-2">{t('infographic.authenticity.sourceMckinsey')}</p>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            
                            {/* Nutritional Advantage */}
                            <section id="nutritional-advantage" className="rounded-2xl p-1">
                                <div className="content-card p-6 md:p-8 bg-white/80 rounded-xl shadow-lg">
                                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[#78350f] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>{t('infographic.difference.title')}</h2>
                                    <p className="text-gray-600 mb-8 max-w-2xl mx-auto text-center">{t('infographic.difference.subtitle')}</p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                                        <div className="chart-container h-[400px] md:h-[450px]">
                                            <Bar data={mineralData} options={mineralOptions} />
                                        </div>
                                        <div className="text-center">
                                            <h3 className="font-bold text-xl text-[#78350f] mb-2">{t('infographic.difference.giTitle')}</h3>
                                            <p className="text-gray-600 mb-4">{t('infographic.difference.giSubtitle')}</p>
                                            <div className="flex justify-center items-end gap-8">
                                                <div className="text-center">
                                                    <p className="text-5xl font-black text-[#E57373]"><AnimatedCounter target={65} isVisible={isExpanded} /></p>
                                                    <p className="font-bold mt-2">{t('infographic.difference.giRefined')}</p>
                                                </div>
                                                <div className="text-center">
                                                    <p className="text-5xl font-black text-[#8BC34A]"><AnimatedCounter target={35} isVisible={isExpanded} /></p>
                                                    <p className="font-bold mt-2">{t('infographic.difference.giTaan')}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            
                            {/* Processing Comparison */}
                            <section id="processing-comparison" className="rounded-2xl p-1">
                                <div className="content-card p-6 md:p-8 bg-white/80 rounded-xl shadow-lg">
                                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[#78350f] mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>{t('infographic.process.title')}</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div>
                                            <h3 className="text-xl font-bold text-center text-[#78350f] mb-4">{t('infographic.process.taanTitle')}</h3>
                                            <div className="space-y-4">
                                                <div className="p-4 bg-green-50/80 rounded-lg">
                                                    <p className="font-bold">{t('infographic.process.taanStep1Title')}</p>
                                                    <p className="text-sm text-gray-700">{t('infographic.process.taanStep1Desc')}</p>
                                                </div>
                                                <div className="text-center text-2xl text-gray-400">↓</div>
                                                <div className="p-4 bg-green-50/80 rounded-lg">
                                                    <p className="font-bold">{t('infographic.process.taanStep2Title')}</p>
                                                    <p className="text-sm text-gray-700">{t('infographic.process.taanStep2Desc')}</p>
                                                </div>
                                                <div className="text-center text-2xl text-gray-400">↓</div>
                                                <div className="p-4 bg-green-50/80 rounded-lg">
                                                    <p className="font-bold">{t('infographic.process.taanStep3Title')}</p>
                                                    <p className="text-sm text-gray-700">{t('infographic.process.taanStep3Desc')}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-center text-gray-600 mb-4">{t('infographic.process.refinedTitle')}</h3>
                                            <div className="space-y-4">
                                                <div className="p-4 bg-red-50/80 rounded-lg">
                                                    <p className="font-bold">{t('infographic.process.refinedStep1Title')}</p>
                                                    <p className="text-sm text-gray-700">{t('infographic.process.refinedStep1Desc')}</p>
                                                </div>
                                                <div className="text-center text-2xl text-gray-400">↓</div>
                                                <div className="p-4 bg-red-50/80 rounded-lg">
                                                    <p className="font-bold">{t('infographic.process.refinedStep2Title')}</p>
                                                    <p className="text-sm text-gray-700">{t('infographic.process.refinedStep2Desc')}</p>
                                                </div>
                                                <div className="text-center text-2xl text-gray-400">↓</div>
                                                <div className="p-4 bg-red-50/80 rounded-lg">
                                                    <p className="font-bold">{t('infographic.process.refinedStep3Title')}</p>
                                                    <p className="text-sm text-gray-700">{t('infographic.process.refinedStep3Desc')}</p>
                                                </div>
                                                <div className="text-center text-2xl text-gray-400">↓</div>
                                                <div className="p-4 bg-red-50/80 rounded-lg">
                                                    <p className="font-bold">{t('infographic.process.refinedStep4Title')}</p>
                                                    <p className="text-sm text-gray-700">{t('infographic.process.refinedStep4Desc')}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            
                            {/* Sustainability */}
                            <section id="sustainability" className="rounded-2xl p-1">
                                <div className="content-card text-center p-6 md:p-8 bg-white/80 rounded-xl shadow-lg">
                                    <h2 className="text-2xl md:text-3xl font-bold text-[#78350f] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>{t('infographic.sustainability.title')}</h2>
                                    <p className="text-gray-600 mb-8 max-w-2xl mx-auto">{t('infographic.sustainability.subtitle')}</p>
                                    <div className="chart-container h-[400px] md:h-[450px]">
                                        <Radar data={sustainabilityData} options={sustainabilityOptions}/>
                                    </div>
                                </div>
                            </section>
                            
                            {/* Local Impact */}
                             <section id="local-impact" className="rounded-2xl p-1">
                                 <div className="content-card text-center p-6 md:p-8 bg-white/80 rounded-xl shadow-lg">
                                    <h2 className="text-2xl md:text-3xl font-bold text-[#78350f] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>{t('infographic.community.title')}</h2>
                                    <p className="text-gray-600 mb-10 max-w-2xl mx-auto">{t('infographic.community.subtitle')}</p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                                        <div className="flex flex-col items-center p-4 bg-green-50/80 rounded-xl">
                                            <span className="text-5xl mb-3">🌳</span>
                                            <p className="text-gray-600">{t('infographic.community.card1_line1')}</p>
                                            <p className="text-3xl font-black text-[#8BC34A]"><AnimatedCounter target={40} suffix="+" isVisible={isExpanded}/></p>
                                            <p className="text-gray-600">{t('infographic.community.card1_line2')}</p>
                                        </div>
                                        <div className="flex flex-col items-center p-4 bg-orange-50/80 rounded-xl">
                                            <span className="text-5xl mb-3">👨‍👩‍👧‍👦</span>
                                            <p className="text-gray-600">{t('infographic.community.card2_line1')}</p>
                                            <p className="text-3xl font-black text-[#E57373]"><AnimatedCounter target={2000} isVisible={isExpanded} /></p>
                                            <p className="text-gray-600">{t('infographic.community.card2_line2')}</p>
                                        </div>
                                        <div className="flex flex-col items-center p-4 bg-yellow-50/80 rounded-xl">
                                            <span className="text-5xl mb-3">💰</span>
                                            <p className="text-gray-600">{t('infographic.community.card3_line1')}</p>
                                            <p className="text-3xl font-black text-[#78350f]"><AnimatedCounter target={25} prefix="$" suffix="M" isVisible={isExpanded}/></p>
                                            <p className="text-gray-600">{t('infographic.community.card3_line2')}</p>
                                        </div>
                                        <div className="flex flex-col items-center p-4 bg-blue-50/80 rounded-xl">
                                            <span className="text-5xl mb-3">📈</span>
                                            <p className="text-gray-600">{t('infographic.community.card4_line1')}</p>
                                            <p className="text-3xl font-black text-blue-500"><AnimatedCounter target={15} suffix="%" isVisible={isExpanded}/></p>
                                            <p className="text-gray-600">{t('infographic.community.card4_line2')}</p>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            
                            {/* Cultural Legacy */}
                            <section id="cultural-legacy" className="rounded-2xl p-1">
                                <div className="content-card p-6 md:p-8 bg-white/80 rounded-xl shadow-lg">
                                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[#78350f] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>{t('infographic.legacy.title')}</h2>
                                    <div className="relative mt-8">
                                        <div className="absolute left-1/2 h-full w-1 bg-[#78350f]/30 -translate-x-1/2 hidden md:block"></div>
                                        <div className="space-y-12">
                                            {[1, 2, 3, 4].map((item, index) => (
                                                <div key={item} className={`relative md:flex items-center w-full ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                                                    <div className="w-full md:w-1/2 mb-4 md:mb-0">
                                                        <div className={`p-4 rounded-lg shadow-md inline-block max-w-sm ${index % 2 !== 0 ? 'md:ml-auto' : 'md:mr-auto'} ${
                                                            ['bg-green-100/80', 'bg-orange-100/80', 'bg-yellow-100/80', 'bg-blue-100/80'][index]
                                                        }`}>
                                                            <p className={`font-bold ${['text-green-800', 'text-orange-800', 'text-yellow-800', 'text-blue-800'][index]}`}>{t(`infographic.legacy.item${item}_title`)}</p>
                                                            <p className="text-sm text-gray-700">{t(`infographic.legacy.item${item}_desc`)}</p>
                                                        </div>
                                                    </div>
                                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full border-4 border-white shadow-lg z-10 hidden md:flex items-center justify-center" style={{backgroundColor: ['#8BC34A', '#E57373', '#78350f', '#3b82f6'][index]}}></div>
                                                    <div className="hidden md:block w-1/2"></div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </main>
                     </motion.div>
                </div>
            </div>
        </section>
    );
};

export default JourneyInfographic;
