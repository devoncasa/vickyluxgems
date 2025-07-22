
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { GoogleGenAI } from '@google/genai';
import { GEM_DATA, clarityGrades, certifications } from '../data/gem-data';
import { CloseIcon } from './IconComponents';
import { useAppContext } from '../context/AppContext';
import { Product, Material } from '../types';
import ProductCard from './ProductCard';

interface AdminPanelProps {
    isOpen: boolean;
    onClose: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose }) => {
    const { products, addProduct, deleteProduct } = useAppContext();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState<'add' | 'manage'>('add');
    const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

    const initialFormData = {
        gemCategory: '', gemType: '', gemColors: [] as string[], gemOrigins: [] as string[],
        gemClarity: '', gemCuts: [] as string[], gemCutOther: '',
        gemCerts: [] as string[], gemCertOther: '',
        gemDimension: '', gemWeight: '', gemWeightUnit: 'carats' as 'carats' | 'grams',
        gemPrice: '', gemDescription: ''
    };
    const [formData, setFormData] = useState(initialFormData);

    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [isGenerating, setIsGenerating] = useState(false);
    
    const [productToPreview, setProductToPreview] = useState<Product | null>(null);
    const [showExitConfirm, setShowExitConfirm] = useState(false);
    const [formIsDirty, setFormIsDirty] = useState(false);
    const [showSuccessNotification, setShowSuccessNotification] = useState(false);

    useEffect(() => {
        if (isOpen && sessionStorage.getItem('vlg-admin-auth') === 'true') {
            setIsLoggedIn(true);
        } else if (!isOpen) {
            setIsLoggedIn(false);
            setPassword('');
            setError('');
            resetAllState();
        }
    }, [isOpen]);

    const resetAllState = () => {
        resetForm();
        setActiveTab('add');
        setConfirmDeleteId(null);
        setShowExitConfirm(false);
        setProductToPreview(null);
    };

    useEffect(() => {
        const isDirty = JSON.stringify(formData) !== JSON.stringify(initialFormData) || uploadedFiles.length > 0;
        setFormIsDirty(isDirty);
    }, [formData, uploadedFiles]);
    
    const resetForm = () => {
        setFormData(initialFormData);
        setUploadedFiles([]);
        setImagePreviews([]);
        setIsGenerating(false);
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === '0007') {
            setIsLoggedIn(true);
            setError('');
            sessionStorage.setItem('vlg-admin-auth', 'true');
        } else {
            setError('Incorrect password. Please try again.');
            setPassword('');
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleMultiSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name } = e.target;
        const selected = Array.from(e.target.selectedOptions, option => option.value);
        setFormData(prev => ({ ...prev, [name]: selected }));
    };

    const handleNumericInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (/^\d*\.?\d*$/.test(value)) {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };
    
    const handleDimensionInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        // Allow numbers, 'x', and '.'
        if (/^[0-9xX.]*$/.test(value)) {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newCategory = e.target.value;
        const gemTypes = Object.keys(GEM_DATA.categories[newCategory] || {});
        const newGemType = gemTypes.length === 1 ? gemTypes[0] : '';
        const newWeightUnit = newCategory === 'Burmese Amber' ? 'grams' : 'carats';
        
        setFormData({
            ...initialFormData,
            gemCategory: newCategory,
            gemType: newGemType,
            gemWeightUnit: newWeightUnit
        });
    };
    
    const generatedProductName = useMemo(() => {
        if (!formData.gemType || formData.gemColors.length === 0) return '';
        const parts = ["High Grade"];
        parts.push(formData.gemColors[0]);
        parts.push(formData.gemType);

        let cutPart = '';
        if (formData.gemCuts.length > 0) {
            const firstCut = formData.gemCuts[0];
            if (firstCut === 'Other') cutPart = formData.gemCutOther;
            else if (firstCut) {
                const noCutSuffix = ["Cabochon", "Bangle", "Bead", "Buddha", "Carving", "Coin", "Donut", "Drop", "Figurine", "Gua Sha", "Pendant", "Ring"];
                cutPart = noCutSuffix.includes(firstCut) ? firstCut : `${firstCut} Cut`;
            }
        }
        if(cutPart) parts.push(cutPart);
        return parts.join(' ').replace(/\s+/g, ' ').trim();
    }, [formData.gemColors, formData.gemType, formData.gemCuts, formData.gemCutOther]);

     const generatedSKU = useMemo(() => {
        const cat = formData.gemCategory.substring(0, 3).toUpperCase();
        const mat = formData.gemType.substring(0, 3).toUpperCase();
        const col = (formData.gemColors[0] || 'NOCL').substring(0, 3).toUpperCase();
        const cut = (formData.gemCuts[0] || 'NOCUT').substring(0, 3).toUpperCase();
        const size = formData.gemWeight.replace('.', '');
        return `${cat}-${mat}-${col}-${cut}-${size}`;
    }, [formData]);

    const availableGemTypes = useMemo(() => formData.gemCategory ? Object.keys(GEM_DATA.categories[formData.gemCategory] || {}) : [], [formData.gemCategory]);
    const gemData = useMemo(() => (formData.gemCategory && formData.gemType) ? GEM_DATA.categories[formData.gemCategory]?.[formData.gemType] || null : null, [formData.gemCategory, formData.gemType]);
    
    const availableCuts = useMemo(() => {
        if (!gemData) return [];
        let cuts = [...GEM_DATA.cuts.standard];
        if (formData.gemType === 'Jadeite') cuts.push(...GEM_DATA.cuts.jade);
        if (gemData.cuts) cuts.push(...gemData.cuts);
        cuts.push('Other');
        return [...new Set(cuts)].sort();
    }, [gemData, formData.gemType]);

    const processImage = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    if (!ctx) return reject('Canvas context not available');

                    const targetAspectRatio = 3 / 4;
                    const targetWidth = 600;
                    const targetHeight = 800;

                    canvas.width = targetWidth;
                    canvas.height = targetHeight;

                    let sourceX = 0, sourceY = 0;
                    let sourceWidth = img.width;
                    let sourceHeight = img.height;
                    const sourceAspectRatio = img.width / img.height;

                    if (sourceAspectRatio > targetAspectRatio) {
                        sourceWidth = img.height * targetAspectRatio;
                        sourceX = (img.width - sourceWidth) / 2;
                    } else {
                        sourceHeight = img.width / targetAspectRatio;
                        sourceY = (img.height - sourceHeight) / 2;
                    }
                    
                    ctx.drawImage(img, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, targetWidth, targetHeight);
                    resolve(canvas.toDataURL('image/jpeg', 0.85));
                };
                img.onerror = reject;
                img.src = e.target?.result as string;
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length + uploadedFiles.length > 5) { alert('You can only upload a maximum of 5 images.'); return; }
        
        const processedImageUrls = await Promise.all(files.map(processImage));
        
        setUploadedFiles(prev => [...prev, ...files]);
        setImagePreviews(prev => [...prev, ...processedImageUrls]);
    };

    const removeImage = (index: number) => {
        setUploadedFiles(prev => prev.filter((_, i) => i !== index));
        setImagePreviews(prev => prev.filter((_, i) => i !== index));
    };

    const canGenerateDescription = useMemo(() => (formData.gemCategory && formData.gemType && formData.gemWeight && formData.gemPrice && uploadedFiles.length > 0 && formData.gemColors.length > 0), [formData, uploadedFiles.length]);
    const canPreviewProduct = useMemo(() => (canGenerateDescription && formData.gemDescription.trim() !== ''), [canGenerateDescription, formData.gemDescription]);

    const generateDescription = async () => {
        if (!canGenerateDescription || isGenerating) return;
        
        const apiKey = process.env.API_KEY;
        if (!apiKey) {
            alert("Error: The API_KEY environment variable is not configured. AI features are disabled.");
            return;
        }

        setIsGenerating(true); 
        setFormData(prev => ({...prev, gemDescription: ''}));
        
        try {
            const ai = new GoogleGenAI({ apiKey: apiKey });
            let cutString = formData.gemCuts.filter(c => c !== 'Other').join(', ');
            if (formData.gemCutOther) { cutString += (cutString ? ', ' : '') + formData.gemCutOther; }
            
            let certString = formData.gemCuts.filter(c => c !== 'Other').join(', ');
            if (formData.gemCertOther) { certString += (certString ? ', ' : '') + formData.gemCertOther; }

            const prompt = `Act as an expert gemologist and luxury copywriter for "VickyLuxGems". Write a compelling, SEO-optimized product description for the following gemstone, under 750 characters. Weave the details into an elegant narrative focusing on beauty, rarity, history, and emotional resonance. Highlight key selling points to convince a customer to buy.
                - Product Name: ${generatedProductName}
                - SKU: ${generatedSKU}
                - Type: ${formData.gemType}
                - Color(s): ${formData.gemColors.join(', ')}
                - Origin(s): ${formData.gemOrigins.join(', ')}
                - Clarity: ${formData.gemClarity}
                - Cut/Shape(s): ${cutString}
                - Dimensions: ${formData.gemDimension || 'Not specified'}
                - Weight: ${formData.gemWeight} ${formData.gemWeightUnit}
                - Price: THB ${parseInt(formData.gemPrice).toLocaleString()}
                - Certifications: ${certString}
                Provide only the product description text.`;
            
            const response = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: prompt });
            setFormData(prev => ({...prev, gemDescription: response.text.trim()}));
        } catch (error) {
            console.error("Gemini API Error:", error);
            setFormData(prev => ({...prev, gemDescription: "Error generating description."}));
        } finally {
            setIsGenerating(false);
        }
    };

    const createProductFromState = (): Product => {
        const weightInGrams = formData.gemWeightUnit === 'carats' ? Number(formData.gemWeight) * 0.2 : Number(formData.gemWeight);
        let certString = formData.gemCerts.filter(c => c !== 'Other').join(', ');
        if (formData.gemCertOther) { certString += (certString ? ', ' : '') + formData.gemCertOther; }

        return {
            id: `prod_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
            sku: generatedSKU,
            name: generatedProductName,
            category: formData.gemType.toLowerCase().replace(/\s/g, '-'),
            material: formData.gemType as Material,
            price: Number(formData.gemPrice),
            isNewArrival: true,
            story: formData.gemDescription,
            energyProperties: [],
            media: {
                mainImageUrl: imagePreviews[0] || `https://placehold.co/600x800/EAE0D5/534B42?text=${encodeURIComponent(formData.gemType)}`,
                gallery: imagePreviews.slice(1),
            },
            specifications: {
                totalWeight_grams: weightInGrams,
                origin: formData.gemOrigins.join(', '),
                clarityLevel: formData.gemClarity,
                finish: formData.gemCuts.join(', '),
                dimensions_mm: formData.gemDimension,
            },
            certification: { isCertified: true, authority: 'In-house', certificateNumber: certString },
            inventory: { stock: 1, isAvailable: true },
        };
    };

    const handlePreview = () => {
        if (!canPreviewProduct) return;
        const newProduct = createProductFromState();
        setProductToPreview(newProduct);
    };

    const handleSaveAndPost = () => {
        if (productToPreview) {
            addProduct(productToPreview);
            setProductToPreview(null);
            resetForm();
            setShowSuccessNotification(true);
            setTimeout(() => setShowSuccessNotification(false), 3000);
        }
    };

    const handleEdit = () => setProductToPreview(null);
    const handleAttemptExit = () => formIsDirty ? setShowExitConfirm(true) : onClose();
    const handleConfirmExit = () => { setShowExitConfirm(false); onClose(); };
    const handleDelete = (productId: string) => { deleteProduct(productId); setConfirmDeleteId(null); };

    if (!isOpen) return null;

    const renderLogin = () => (
        <div className="admin-modal-content admin-login-view" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-body">
                <img src="https://i.postimg.cc/BZ7Qgx8s/vkluxgem-logo-smll.webp" alt="Vicky LuxGems Logo" className="mx-auto mb-6 w-32"/>
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold font-serif text-[var(--c-heading)]">Vicky LuxGems</h1>
                    <p className="text-md text-[var(--c-text-secondary)] mt-1">Admin Panel</p>
                </div>
                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="admin-form-field">
                        <label className="admin-form-field label" htmlFor="password">Password</label>
                        <input className={`admin-input ${error ? 'border-red-500' : ''}`} type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required />
                    </div>
                    {error && <p className="text-red-600 text-sm -mt-4">{error}</p>}
                    <button type="submit" className="admin-button-primary w-full">Login</button>
                </form>
            </div>
        </div>
    );

    const renderAddForm = () => (
         <form onSubmit={(e) => e.preventDefault()} className="space-y-10">
            <section className="admin-form-section"><h2 className="font-serif">1. Gemstone Classification</h2><div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6"><div className="admin-form-field"><label htmlFor="gemCategory">Category</label><select id="gemCategory" name="gemCategory" value={formData.gemCategory} onChange={handleCategoryChange} required className="admin-select"><option value="" disabled>-- Select a Category --</option>{Object.keys(GEM_DATA.categories).map(cat => <option key={cat} value={cat}>{cat}</option>)}</select></div>{formData.gemCategory && availableGemTypes.length > 1 && <div className="admin-form-field"><label htmlFor="gemType">Gemstone Type</label><select id="gemType" name="gemType" value={formData.gemType} onChange={handleInputChange} required className="admin-select" disabled={!formData.gemCategory}><option value="" disabled>-- Select a Gemstone --</option>{availableGemTypes.map(type => <option key={type} value={type}>{type}</option>)}</select></div>}{generatedProductName && <div className="admin-form-field md:col-span-2"><label>Generated Product Name</label><div className="admin-input bg-gray-100 text-gray-700 p-3 h-auto min-h-[44px] flex items-center">{generatedProductName}</div></div>}{generatedSKU && <div className="admin-form-field md:col-span-2"><label>Generated SKU</label><div className="admin-input bg-gray-100 text-gray-700 p-3 h-auto min-h-[44px] flex items-center font-mono text-sm">{generatedSKU}</div></div>}</div></section>
            {gemData && <>
                <section className="admin-form-section"><h2 className="font-serif">2. Gemological Attributes</h2><div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">{formData.gemCategory === "Burmese Amber" ? <div className="admin-form-field"><label htmlFor="gemColors">Color</label><select id="gemColors" name="gemColors" value={formData.gemColors[0] || ''} onChange={(e) => setFormData(p => ({...p, gemColors: [e.target.value]}))} className="admin-select"><option value="" disabled>-- Select Color --</option>{gemData.colors.map(c => <option key={c} value={c}>{c}</option>)}</select></div> : <div className="admin-form-field"><label htmlFor="gemColors">Color(s)</label><select id="gemColors" name="gemColors" multiple value={formData.gemColors} onChange={handleMultiSelectChange} className="admin-select admin-multi-select">{gemData.colors.map(c => <option key={c} value={c}>{c}</option>)}</select></div>}<div className="admin-form-field"><label htmlFor="gemOrigins">Origin(s)</label><select id="gemOrigins" name="gemOrigins" multiple value={formData.gemOrigins} onChange={handleMultiSelectChange} className="admin-select admin-multi-select">{(gemData.origins || GEM_DATA.origins.standard).map(o => <option key={o} value={o}>{o}</option>)}</select></div><div className="admin-form-field"><label htmlFor="gemClarity">Clarity</label><select id="gemClarity" name="gemClarity" value={formData.gemClarity} onChange={handleInputChange} className="admin-select"><option value="" disabled>-- Select Clarity --</option>{clarityGrades.map(c => <option key={c} value={c}>{c}</option>)}</select></div><div className="admin-form-field"><label htmlFor="gemCuts">{formData.gemCategory === "Burmese Amber" ? 'Type / Cut(s)' : 'Cut/Shape(s)'}</label><select id="gemCuts" name="gemCuts" multiple value={formData.gemCuts} onChange={handleMultiSelectChange} className="admin-select admin-multi-select">{availableCuts.map(c => <option key={c} value={c}>{c}</option>)}</select>{formData.gemCuts.includes('Other') && <input className="admin-input mt-4" type="text" name="gemCutOther" value={formData.gemCutOther} onChange={handleInputChange} placeholder="Specify other cut/shape" />}</div><div className="admin-form-field md:col-span-2"><label htmlFor="gemCerts">Certification(s)</label><select id="gemCerts" name="gemCerts" multiple value={formData.gemCerts} onChange={handleMultiSelectChange} className="admin-select admin-multi-select">{certifications.map(c => <option key={c} value={c}>{c}</option>)}<option value="Other">Other</option></select>{formData.gemCerts.includes('Other') && <input className="admin-input mt-4" type="text" name="gemCertOther" value={formData.gemCertOther} onChange={handleInputChange} placeholder="Specify other certification" />}</div></div></section>
                <section className="admin-form-section"><h2 className="font-serif">3. Core Data & Media</h2><div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6"><div className="admin-form-field"><label htmlFor="gemDimension">Dimension (mm)</label><input id="gemDimension" name="gemDimension" type="text" value={formData.gemDimension} onChange={handleDimensionInput} placeholder="e.g., 10x12x12" className="admin-input" /></div><div className="admin-form-field"><label htmlFor="gemPrice">Price (THB)</label><input id="gemPrice" name="gemPrice" type="text" value={formData.gemPrice} onChange={handleNumericInput} placeholder="e.g., 50000" required className="admin-input" /></div><div className="admin-form-field"><label htmlFor="gemWeight">Weight</label><div className="flex gap-2"><input id="gemWeight" name="gemWeight" type="text" value={formData.gemWeight} onChange={handleNumericInput} placeholder="e.g., 5.25" required className="admin-input w-2/3" /><select name="gemWeightUnit" value={formData.gemWeightUnit} onChange={handleInputChange} className="admin-select w-1/3"><option value="carats">carats</option><option value="grams">grams</option></select></div></div><div className="admin-form-field md:col-span-2"><label>Images (Max 5, will be cropped to 3:4)</label><label htmlFor="gem-images-input" className="admin-input text-center cursor-pointer hover:border-[var(--c-accent-primary-hover)]">{uploadedFiles.length > 0 ? `${uploadedFiles.length}/5 files selected` : 'Choose files...'}</label><input id="gem-images-input" type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" /><div className="flex flex-wrap gap-4 mt-4">{imagePreviews.map((src, index) => <div key={index} className="relative w-24 h-32 rounded-lg overflow-hidden border-2 border-[var(--c-border)]"><img src={src} alt={`preview ${index}`} className="w-full h-full object-cover" /><button type="button" onClick={() => removeImage(index)} className="absolute top-1 right-1 w-5 h-5 bg-black/50 text-white rounded-full flex items-center justify-center text-xs font-bold leading-none">&times;</button></div>)}</div></div></div></section>
                <section className="admin-form-section"><h2 className="font-serif">4. AI-Powered Content</h2>{formData.gemDescription.trim() === '' ? <div className="admin-form-field"><button type="button" onClick={generateDescription} disabled={!canGenerateDescription || isGenerating} className="admin-button-primary w-full flex items-center justify-center">{isGenerating && <span className="loader mr-3"></span>}{isGenerating ? 'Generating...' : 'Generate Description with AI'}</button></div> : <div className="admin-form-field"><label>AI-Generated Description</label><textarea className="admin-textarea" name="gemDescription" rows={10} value={formData.gemDescription} onChange={handleInputChange} ></textarea></div>}{canPreviewProduct && <div className="admin-button-group"><button type="button" onClick={handlePreview} className="admin-button-primary">Preview</button><button type="button" onClick={handleAttemptExit} className="admin-button-primary admin-button-secondary">Exit</button></div>}</section>
            </>}
        </form>
    );

    const renderManageTab = () => (
        <div><h2 className="admin-form-section font-serif">Manage Existing Inventory</h2><div className="admin-inventory-list">{products.map(product => (<div key={product.id} className="admin-inventory-item"><img src={product.media.mainImageUrl} alt={product.name} className="admin-inventory-item-img" /><span className="admin-inventory-item-name">{product.name}</span><button onClick={() => setConfirmDeleteId(product.id)} className="admin-delete-btn">Delete</button></div>))}</div></div>
    );
    
    const productToDelete = products.find(p => p.id === confirmDeleteId);
    
    const renderPreviewModal = () => {
        if (!productToPreview) return null;
        return (
            <div className="admin-modal-overlay" onClick={handleEdit}>
                <div className="admin-modal-content admin-preview-modal" onClick={e => e.stopPropagation()}>
                    <div className="admin-modal-body">
                        <h2 className="text-3xl font-bold font-serif text-center mb-8 text-[var(--c-heading)]">Product Preview</h2>
                        <div className="max-w-xs mx-auto"><ProductCard product={productToPreview} onAddToCart={() => {}} /></div>
                        <div className="admin-button-group mt-8"><button onClick={handleEdit} className="admin-button-primary admin-button-secondary">Edit</button><button onClick={handleSaveAndPost} className="admin-button-primary">Save & Post to Shop</button></div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            <div className="admin-modal-overlay" onClick={isLoggedIn ? handleAttemptExit : undefined}>
                {!isLoggedIn ? renderLogin() : (
                    <div className="admin-modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="admin-modal-close-btn" onClick={handleAttemptExit} aria-label="Close Admin Panel"><CloseIcon className="h-6 w-6" /></button>
                        <div className="admin-modal-body">
                            <h1 className="text-4xl font-bold font-serif text-[var(--c-heading)] mb-2">Admin Panel</h1>
                            <p className="text-lg text-[var(--c-text-secondary)] mb-8">Inventory & Content Management</p>
                            {showSuccessNotification && (<div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 border border-green-200" role="alert"><span className="font-medium">Success!</span> Product has been added to the shop.</div>)}
                            <div className="flex admin-tabs"><button className={`admin-tab ${activeTab === 'add' ? 'active' : ''}`} onClick={() => setActiveTab('add')}>Add New Gemstone</button><button className={`admin-tab ${activeTab === 'manage' ? 'active' : ''}`} onClick={() => setActiveTab('manage')}>Manage Inventory</button></div>
                            {activeTab === 'add' ? renderAddForm() : renderManageTab()}
                        </div>
                        {confirmDeleteId && productToDelete && (<div className="admin-confirm-modal"><div className="admin-confirm-modal-content"><h3 className="text-xl font-bold mb-2 text-[var(--c-heading)]">Confirm Deletion</h3><p className="mb-6 text-[var(--c-text-secondary)]">Are you sure you want to permanently delete "{productToDelete.name}"?</p><div className="flex justify-center gap-4"><button onClick={() => setConfirmDeleteId(null)} className="px-6 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300">Cancel</button><button onClick={() => handleDelete(confirmDeleteId)} className="admin-delete-btn px-6 py-2">Confirm Delete</button></div></div></div>)}
                        {showExitConfirm && (<div className="admin-confirm-modal"><div className="admin-confirm-modal-content"><h3 className="text-xl font-bold mb-2 text-[var(--c-heading)]">Unsaved Changes</h3><p className="mb-6 text-[var(--c-text-secondary)]">Are you sure you want to exit? Your current progress on this form will be lost.</p><div className="flex justify-center gap-4"><button onClick={() => setShowExitConfirm(false)} className="px-6 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300">Cancel</button><button onClick={handleConfirmExit} className="admin-delete-btn px-6 py-2">Yes, Exit</button></div></div></div>)}
                    </div>
                )}
            </div>
            {renderPreviewModal()}
        </>
    );
};

export default AdminPanel;
