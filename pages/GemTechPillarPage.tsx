
import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { BACKGROUND_IMAGES, BLOG_POSTS } from '../constants';
import SEO from '../components/SEO';
import SectionDivider from '../components/SectionDivider';
import { ChevronRightIcon } from '../components/IconComponents';

const GemTechPillarPage: React.FC = () => {
    const gemTechArticles = BLOG_POSTS.filter(post => post.category === 'GemTech Insights');

    return (
        <div 
            className="page-container-with-bg py-16 md:py-24"
            style={{ backgroundImage: `url('${BACKGROUND_IMAGES[37]}')` }}
        >
            <SEO 
                title="The Future of Gemology | GemTech Insights | Vicky LuxGems"
                description="Explore our pillar page on GemTech, covering how AI, blockchain, 3D printing, and nanotechnology are revolutionizing gemstone grading, authentication, and design."
                keywords="GemTech, future of gemology, AI in jewelry, blockchain gemstones, 3D printed jewelry, nanotechnology, virtual try-on, robotic lapidary, gemstone investment"
                imageUrl="https://placehold.co/1200x675/3B82F6/FFFFFF?text=The+Future+of+Gemology"
            />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="content-page-block max-w-5xl mx-auto p-8 md:p-12 rounded-lg shadow-xl border border-[var(--c-border-muted)]">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <p className="text-sm font-bold uppercase tracking-widest text-blue-800">Pillar Page: GemTech Insights</p>
                        <h1 className="text-5xl font-bold tracking-tight mt-2">The Future of Gemology: How Technology is Transforming the World of Precious Stones</h1>
                        <p className="mt-4 text-xl text-[var(--c-text-secondary)]">From artificial intelligence that grades diamonds with superhuman precision to blockchain that guarantees ethical sourcing, a technological revolution is reshaping the ancient industry of gems. Explore our in-depth articles on the innovations defining the future of jewelry.</p>
                    </div>

                    <div className="mt-12 prose prose-lg lg:prose-xl max-w-none text-[var(--c-text-primary)]/90 mx-auto">
                        <p className="lead">The world of gemstones, once governed by the keen eye of a gemologist and the steady hand of a lapidary, is undergoing a profound transformation. New technologies are emerging that promise unprecedented levels of precision, transparency, and creativity. This collection of articles serves as your definitive guide to the "GemTech" revolution, exploring the key innovations that are enhancing how we discover, authenticate, design, and cherish precious stones.</p>
                        
                        <SectionDivider />

                        <div className="not-prose grid md:grid-cols-2 gap-8">
                            {gemTechArticles.map((article) => (
                                <ReactRouterDOM.Link 
                                    to={`/blog/${article.id}`} 
                                    key={article.id} 
                                    className="block p-6 bg-[var(--c-surface)] rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border border-[var(--c-border)] group"
                                >
                                    <h3 className="text-xl font-bold font-serif text-[var(--c-heading)] group-hover:text-[var(--c-accent-primary)] transition-colors">{article.title}</h3>
                                    <p className="mt-2 text-sm text-[var(--c-text-secondary)]">{article.summary}</p>
                                    <span className="mt-4 inline-flex items-center text-sm font-semibold text-[var(--c-accent-primary)] group-hover:text-[var(--c-heading)]">
                                        Read More
                                        <ChevronRightIcon className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                                    </span>
                                </ReactRouterDOM.Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GemTechPillarPage;
