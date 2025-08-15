import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { BACKGROUND_IMAGES, BLOG_POSTS } from '../constants.ts';
import SEO from '../components/SEO.tsx';
import SectionDivider from '../components/SectionDivider.tsx';
import { ChevronRightIcon } from '../components/IconComponents.tsx';

const GemTechPillarPage: React.FC = () => {
    const gemTechArticles = BLOG_POSTS.filter(post => post.category === 'GemTech Insights');

    return (
        <div 
            className="page-container-with-bg py-16 md:py-24"
            style={{ backgroundImage: `url('${BACKGROUND_IMAGES[4]}')` }}
        >
            <SEO 
                title="The Future of Gemology | GemTech Insights | Vicky LuxGems"
                description="Explore our pillar page on GemTech, covering how AI, blockchain, 3D printing, and nanotechnology are revolutionizing gemstone grading, authentication, and design."
                keywords="GemTech, future of gemology, AI in jewelry, blockchain gemstones, 3D printed jewelry, nanotechnology, virtual try-on, robotic lapidary, gemstone investment"
                imageUrl="https://placehold.co/1200x675/3B82F6/FFFFFF?text=The+Future+of+Gemology"
            />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="content-page-block max-w-5xl mx-auto p-8 md:p-12 rounded-lg">
                    <div className="text-center mb-12">
                        <h1 className="text-5xl font-bold tracking-tight">GemTech Insights</h1>
                        <p className="mt-4 text-xl text-[var(--c-text-secondary)]">Exploring the intersection of technology and the ancient art of gemology. Discover the innovations shaping the future of authenticity, design, and value in the world of precious gems.</p>
                        <SectionDivider />
                    </div>

                    <div className="space-y-12">
                        {gemTechArticles.map((post, index) => (
                            <div key={post.id} className={`grid md:grid-cols-2 gap-8 md:gap-12 items-center ${index % 2 !== 0 ? 'md:grid-flow-col-dense' : ''}`}>
                                <div className={`aspect-[4/3] bg-gray-200 rounded-lg overflow-hidden shadow-md ${index % 2 !== 0 ? 'md:col-start-2' : ''}`}>
                                    <ReactRouterDOM.Link to={`/blog/${post.id}`}>
                                        <img src={post.featuredImage} alt={`Visual for ${post.title}`} className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
                                    </ReactRouterDOM.Link>
                                </div>
                                <div className="prose prose-lg max-w-none">
                                    <h2 className="!text-3xl">{post.title}</h2>
                                    <p className="text-sm text-gray-500">{post.date} &bull; {post.readingTime} min read</p>
                                    <p className="text-[var(--c-text-secondary)]">{post.summary}</p>
                                    <ReactRouterDOM.Link to={`/blog/${post.id}`} className="flex items-center text-[var(--c-accent-primary)] hover:text-[var(--c-heading)] font-semibold group transition-colors no-underline">
                                        <span>Read Full Article</span>
                                        <ChevronRightIcon className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                                    </ReactRouterDOM.Link>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default GemTechPillarPage;
