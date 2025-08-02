

import React, { useEffect } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { BLOG_POSTS, BACKGROUND_IMAGES } from '../constants.ts';
import SectionDivider from '../components/SectionDivider.tsx';
import JsonLd from '../components/JsonLd.tsx';
import SEO from '../components/SEO.tsx';
import { useLanguage } from '../i18n/LanguageContext.tsx';
import AuthorBio from '../components/AuthorBio.tsx';

const GemstoneToolsArticleContent = () => {
    return (
        <>
            <p className="lead">In the world of fine gemstones, authenticity is everything. For connoisseurs and collectors, understanding the tools and techniques used to verify a gem's identity is crucial. This guide explores the scientific methods we use at Vicky LuxGems to authenticate Burmese amber and other precious stones, ensuring every piece is genuine.</p>
            <SectionDivider/>
            
            <h3>What are the primary tools for gem identification?</h3>
            <p>A certified gemologist's toolkit includes several key instruments. The <strong>gemological microscope</strong> is essential for examining internal features (inclusions). A <strong>refractometer</strong> measures how light bends through the gem (its refractive index), while a <strong>spectroscope</strong> analyzes how the gem absorbs light, revealing its chemical composition. For amber, a <strong>UV flashlight</strong> is indispensable.</p>

            <blockquote className="border-s-4 border-[var(--c-accent-primary)] ps-4 italic my-8">
                "Science provides the proof, but the story is held within the stone. Our job is to bridge the two."
            </blockquote>
            
            <h3>How does a UV light test work for Burmese Amber?</h3>
            <p>Genuine Burmese amber (Burmite) has a unique chemical structure that causes it to fluoresce strongly under ultraviolet (UV) light. When exposed to a long-wave UV light source, authentic Burmite emits a powerful, milky-blue or sometimes greenish glow. This reaction is very difficult to replicate in fakes like plastic or younger resins like copal, which typically have a much weaker or different colored fluorescence. It is one of the quickest and most reliable first-pass tests for identifying real Burmite.</p>

            <div className="not-prose my-8">
                 <div className="aspect-w-16 aspect-h-9 rounded-lg shadow-md overflow-hidden bg-[var(--c-surface-alt)] flex items-center justify-center">
                    <img src="https://placehold.co/800x450/3D2B1F/FFFFFF?text=Amber+Under+UV+Light" alt="A piece of Burmese amber glowing a distinct milky-blue color under a UV flashlight, demonstrating a key authenticity test." className="w-full h-full object-cover"/>
                </div>
            </div>

            <h3>What is FTIR Spectroscopy and why is it important for amber?</h3>
            <p>Fourier-transform infrared (FTIR) spectroscopy is a powerful laboratory technique that provides a "chemical fingerprint" of a substance. The machine sends infrared radiation through a sample and measures which wavelengths are absorbed. For amber, this creates a unique spectrum graph. Burmese amber has a specific FTIR signature, notably the absence of a "Baltic shoulder" (a specific absorption peak found in Baltic amber). This allows gemological labs to definitively confirm its origin and distinguish it from other types of amber and copal.</p>
            
            <h3>How does Raman Spectroscopy identify gemstones?</h3>
            <p>Raman spectroscopy is a non-destructive laser technique used to identify the molecular structure of a material. When a laser is pointed at a gemstone, it scatters light. Most of this light is unchanged, but a tiny fraction shifts in energy. This shift, known as the "Raman effect," is unique to the crystal structure and chemical bonds of the mineral. By analyzing this shift, a gemologist can precisely identify a gemstone, like distinguishing a natural ruby from a synthetic one or identifying microscopic mineral inclusions within a larger stone.</p>
        </>
    );
};


const BlogPostPage: React.FC = () => {
    const { postId } = ReactRouterDOM.useParams<{ postId: string }>();
    const { lang, t } = useLanguage();
    const post = BLOG_POSTS.find(p => p.id === postId);

    if (!post) {
        return (
            <div className="text-center py-20">
                <SEO 
                    titleKey="seo_blog_post_not_found_title" 
                    descriptionKey="seo_blog_post_not_found_desc"
                    keywordsKey="seo_blog_post_not_found_keywords"
                 />
                <h2 className="text-3xl font-semibold">{t('seo_blog_post_not_found_title')}</h2>
                <ReactRouterDOM.Link to={`/${lang}/blog`} className="mt-4 inline-block text-[var(--c-accent-primary)] hover:text-[var(--c-heading)]">{t('home_blog_cta')}</ReactRouterDOM.Link>
            </div>
        );
    }
    
    const getCategoryStyles = () => {
        switch (post.category) {
            case 'Science':
                return 'text-[var(--c-accent-secondary-hover)]';
            case 'Craftsmanship':
                return 'text-blue-600';
            case 'Soul':
            default:
                return 'text-[var(--c-accent-primary)]';
        }
    };

    const getCategoryLabel = () => {
        switch (post.category) {
            case 'Science':
                return 'Guides & Science';
            case 'Craftsmanship':
                return 'Art & Craftsmanship';
            case 'Soul':
            default:
                return 'Stories & History';
        }
    };

    // Dynamic SEO values
    const seoTitle = `${post.title} | Vicky Lux Gems`;
    const seoDesc = post.summary;
    const seoKeywords = post.title.split(' ').concat(post.category === 'Science' ? ['gemology', 'science'] : ['history', 'spiritual']).join(', ');

    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": window.location.href
        },
        "headline": post.title,
        "image": post.featuredImage,
        "author": {
            "@type": "Person",
            "name": post.author.name,
             "url": window.location.origin
        },
        "publisher": {
            "@type": "Organization",
            "name": "Vicky Lux Gems",
            "logo": {
                "@type": "ImageObject",
                "url": "https://i.postimg.cc/Qd8yW639/vkambergems-logo-small.png"
            }
        },
        "inLanguage": lang,
        "datePublished": new Date(post.date).toISOString(),
        "dateModified": new Date(post.date).toISOString(),
        "description": post.summary,
        "wordCount": "750",
        "keywords": seoKeywords
    };

    return (
        <div 
            className="page-container-with-bg py-16 md:py-24"
            style={{ backgroundImage: `url('${BACKGROUND_IMAGES[19]}')` }}
        >
            <SEO
                title={seoTitle}
                description={seoDesc}
                keywords={seoKeywords}
                imageUrl={post.featuredImage}
                type="article"
            />
            <JsonLd data={articleSchema} />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <article className="max-w-4xl mx-auto">
                    <header className="text-center">
                        <ReactRouterDOM.Link to={`/${lang}/blog?filter=${post.category}`} className={`text-sm font-semibold uppercase tracking-wider ${getCategoryStyles()}`}>
                           {getCategoryLabel()}
                        </ReactRouterDOM.Link>
                        <h1 className="text-4xl md:text-6xl mt-4 font-bold tracking-tight">{post.title}</h1>
                        <p className="mt-6 text-[var(--c-text-secondary)]">
                            By {post.author.name} on {post.date} &bull; {post.readingTime} min read
                        </p>
                    </header>

                    <div className="my-12">
                         <div className="aspect-w-16 aspect-h-9 rounded-lg shadow-lg overflow-hidden bg-[var(--c-surface-alt)] flex items-center justify-center">
                            <img src={post.featuredImage} alt={`Main article image for '${post.title}'`} className="w-full h-full object-cover"/>
                        </div>
                    </div>

                    <div className="prose prose-lg lg:prose-xl max-w-none mx-auto text-[var(--c-text-primary)]/90">
                       {post.id === 'article-5' ? <GemstoneToolsArticleContent /> : (
                            <>
                                <p className="lead">{post.summary}</p>
                                <SectionDivider/>
                                <p>This is placeholder content for a full article. The actual content would explore the topic in depth, offering insights, history, and scientific perspectives relevant to the post's title.</p>
                                <p>For a real article, this section might delve into the historical context, discussing how ancient cultures used the material, what it symbolized, and how its legacy continues today.</p>
                                <blockquote className="border-s-4 border-[var(--c-accent-primary)] ps-4 italic my-8">
                                    "The journey of a thousand miles begins with a single step. The journey to inner peace begins with a single breath."
                                </blockquote>
                                <p>Another paragraph could focus on the scientific aspects, explaining the geological formation, chemical properties, and methods of identification, providing readers with a comprehensive understanding.</p>
                                <p>Finally, a concluding paragraph would summarize the key takeaways, connecting the historical, spiritual, and scientific threads to reinforce the value and meaning of the gemstone, encouraging readers to explore further.</p>
                            </>
                       )}
                    </div>

                    <SectionDivider />

                    <AuthorBio author={post.author} />

                </article>
            </div>
        </div>
    );
};

export default BlogPostPage;