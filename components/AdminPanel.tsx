import React, { useState, useEffect, useMemo, useRef } from 'react';
import { diamondClarityGrades, coloredGemClarityGrades, certifications, GEM_DATA } from '../data/gem-data';
import { CloseIcon } from './IconComponents';
import { useAppContext } from '../context/AppContext';
import { Product, Material } from '../types';

// --- SKU Generation Mappings and Helpers ---
const categoryCodeMap: { [key: string]: string } = {
    "Precious Gemstones": "PR",
    "Semi-Precious Gemstones": "SP",
    "Burmese Amber": "AM",
};

const typeCodeMap: { [key: string]: string } = {
    "Alexandrite": "ALX", "Diamond": "DIA", "Emerald": "EME", "Pearl": "PEA", "Ruby": "RBY",
    "Sapphire": "SAP", "Tanzanite": "TZN", "Agate": "AGT", "Aquamarine": "AQM",
    "Citrine": "CIT", "Garnet": "GNT", "Jadeite": "JDT", "Lapis Lazuli": "LAP", "Morganite": "MRG",
    "Onyx": "ONX", "Opal": "OPA", "Peridot": "PER", "Spinel": "SPN", "Topaz": "TPZ",
    "Tourmaline": "TRM", "Zircon": "ZIR", "Burmese Amber": "BAM"
};

const cutCodeMap: { [key: string]: string } = {
    "Round": "RD", "Cushion": "CU", "Cabochon": "CB", "Emerald": "EM", "Oval": "OV", "Pear": "PR",
    "Princess": "PC", "Marquise": "MQ", "Heart": "HT", "Asscher": "AS", "Radiant": "RA", "Trillion": "TR"
};

const originCodeMap: { [key: string]: string } = {
    "Afghanistan": "AF", "Australia": "AU", "Botswana": "BW", "Brazil": "BR", "Cambodia": "KH",
    "Canada": "CA", "China": "CN", "Colombia": "CO", "Ethiopia": "ET", "Indonesia": "ID",
    "Kashmir": "KS", "Kenya": "KE", "Madagascar": "MG", "Mexico": "MX", "Mozambique": "MZ",
    "Myanmar": "MM", "Nigeria": "NG", "Pakistan": "PK", "Russia": "RU", "South Africa": "ZA",
    "Sri Lanka": "LK", "Tajikistan": "TJ", "Tanzania": "TZ", "Thailand": "TH", "USA": "US",
    "Vietnam": "VN", "Zambia": "ZM", "Hukawng Valley, Myanmar": "MM"
};

const getAbbreviation = (str: string): string => {
    if (!str) return '';
    return str.split(' ').map(word => word[0]).join('').toUpperCase().replace(/[^A-Z]/g, '');
};

const getClarityCode = (clarityStr: string): string => {
    if (!clarityStr) return 'NA';
    const inParen = clarityStr.match(/\((.*?)\)/);
    if (inParen && inParen[1]) return inParen[1];
    return clarityStr.split(' ')[0].replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
};

const getCertCode = (certStr: string): string => {
    if (!certStr) return 'NA';
    const match = certStr.match(/^[A-Z]+/);
    return match ? match[0] : getAbbreviation(certStr);
};

// New helper without SDK dependency
const fileToSerializable = (file: File): Promise<{ data: string, mimeType: string }> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            if (typeof reader.result === 'string') {
                resolve({
                    data: reader.result.split(',')[1], // base64 string
                    mimeType: file.type
                });
            } else {
                reject(new Error("Failed to read file as data URL."));
            }
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};


interface GeneratedContent {
    en: { name: string; description: {p1: string, p2: string, p3: string}; hashtags: string[] };
    th: { name: string; description: {p1: string, p2: string, p3: string}; hashtags: string[] };
    energyProperties: string[];
}

const productForms = {
    "Spiritual & Prayer Beads (Mala)": ["108-Bead Prayer Mala", "54-Bead Mala", "27-Bead Mala", "18-Bead Wrist Mala", "21-Bead Monk Set", "9-Bead Short Mala (Thai style)"],
    "Jewelry": ["Ring (Men’s/Women’s)", "Pendant (Single Drop or Carved)", "Necklace (Beaded or Pendant Style)", "Bracelet (Elastic or Threaded)", "Bangle (Solid or Hinged)", "Earrings (Stud or Drop)", "Choker (Short Necklace Style)"],
    "Beads (Loose or Semi-finished)": ["Round Beads (Loose, For Custom Stringing)", "Barrel Beads", "Olive-shaped Beads", "Flat or Coin Beads", "Tumbled Nugget Beads", "Faceted Beads", "Disk or Button Beads"],
    "Display or Collectible Items": ["Cabochon (Polished Flat Back)", "Freeform Polished Piece", "Carved Sculpture (Small)", "Polished Amber Stone (Display)", "Encased Insect Amber (Collector’s Item)", "Amber Block (for carving or collectors)"],
    "Custom / Artisan": ["Resin-Amber Combo Jewelry", "Silver-Set Amber (Artisan Style)", "Buddhist Relic Container (Encased)", "Amber Keychain or Amulet"],
};

// --- Main Admin Panel Component ---
const AdminPanel: React.FC<{ isOpen: boolean; onClose: () => void; }> = ({ isOpen, onClose }) => {
    const { products, addProduct, deleteProduct, usdtExchangeRate, setUsdtExchangeRate } = useAppContext();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState<'add' | 'manage' | 'settings'>('add');
    const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

    const initialFormData = useMemo(() => ({
        gemCategory: '', gemType: '', productForm: [] as string[], gemColors: [] as string[], gemOrigins: [] as string[],
        gemClarity: '', gemCuts: [] as string[],
        gemCerts: [] as string[],
        gemDimension: '', gemWeight: '', gemWeightUnit: 'carats' as 'carats' | 'grams',
        basePrice: '',
    }), []);
    
    const [formData, setFormData] = useState(initialFormData);
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
    const [showPostSaveModal, setShowPostSaveModal] = useState(false);
    const [lastAddedProduct, setLastAddedProduct] = useState<Product | null>(null);
    const [showExitConfirm, setShowExitConfirm] = useState(false);
    const [formIsDirty, setFormIsDirty] = useState(false);

    useEffect(() => {
        if (isOpen && sessionStorage.getItem('vlg-admin-auth') === 'true') {
            setIsLoggedIn(true);
        } else if (!isOpen) {
            resetAllState();
            setIsLoggedIn(false);
            setPassword('');
            setError('');
        }
    }, [isOpen]);
    
    useEffect(() => {
        const isDirty = JSON.stringify(formData) !== JSON.stringify(initialFormData) || uploadedFiles.length > 0;
        setFormIsDirty(isDirty);
    }, [formData, uploadedFiles, initialFormData]);

    const resetAllState = () => {
        resetForm();
        setActiveTab('add');
        setConfirmDeleteId(null);
        setShowExitConfirm(false);
        setLastAddedProduct(null);
    };

    const resetForm = () => {
        setFormData(initialFormData);
        setUploadedFiles([]);
        setImagePreviews([]);
        setIsGenerating(false);
        setGeneratedContent(null);
        setShowPostSaveModal(false);
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
        if (/^[0-9xX.\s]*$/.test(value)) {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };
    
    const handleDimensionBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        let value = e.target.value.trim();
        if (!value) return;
        value = value.replace(/\s*mm\s*$/i, '').trim();
        const parts = value.split(/[.\sxX]+/).filter(Boolean);
        const formattedValue = parts.length > 0 ? parts.join(' x ') + ' mm' : '';
        setFormData(prev => ({ ...prev, gemDimension: formattedValue }));
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newCategory = e.target.value;
        setFormData({
            ...initialFormData,
            gemCategory: newCategory,
            gemWeightUnit: newCategory === 'Burmese Amber' ? 'grams' : 'carats'
        });
    };

    const handleUsdtRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value === '' || /^\d*\.?\d*$/.test(value)) {
            setUsdtExchangeRate(parseFloat(value) || 0);
        }
    };

    const generatedSKU = useMemo(() => {
        const cat = categoryCodeMap[formData.gemCategory] || 'NA';
        const type = typeCodeMap[formData.gemType] || getAbbreviation(formData.gemType) || 'NA';
        const form = getAbbreviation(formData.productForm[0] || '') || 'NA';
        const wt = formData.gemWeight || 'NA';
        const run = Date.now().toString().slice(-4);
        return `VLG-${cat}-${type}-${form}-${wt}-${run}`;
    }, [formData]);
    
    const availableGemTypes = useMemo(() => formData.gemCategory ? Object.keys(GEM_DATA.categories[formData.gemCategory] || {}) : [], [formData.gemCategory]);
    const gemData = useMemo(() => (formData.gemCategory && formData.gemType) ? GEM_DATA.categories[formData.gemCategory]?.[formData.gemType] || null : null, [formData.gemCategory, formData.gemType]);
    
    const availableCuts = useMemo(() => {
        if (!gemData) return [];
        let cuts = [...GEM_DATA.cuts.standard];
        if (formData.gemType === 'Jadeite') cuts.push(...GEM_DATA.cuts.jade);
        if (gemData.cuts) cuts.push(...gemData.cuts);
        return [...new Set(cuts)].sort();
    }, [gemData, formData.gemType]);

    const availableClarityGrades = useMemo(() => {
        return formData.gemType === 'Diamond' ? diamondClarityGrades : coloredGemClarityGrades;
    }, [formData.gemType]);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length + uploadedFiles.length > 5) { alert('You can only upload a maximum of 5 images.'); return; }
        const processedImageUrls = await Promise.all(files.map(file => new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = e => resolve(e.target?.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        })));
        setUploadedFiles(prev => [...prev, ...files]);
        setImagePreviews(prev => [...prev, ...processedImageUrls]);
    };

    const removeImage = (index: number) => {
        setUploadedFiles(prev => prev.filter((_, i) => i !== index));
        setImagePreviews(prev => prev.filter((_, i) => i !== index));
    };

    const canGenerateDescription = useMemo(() => (formData.gemType && formData.productForm.length > 0 && formData.basePrice && uploadedFiles.length > 0 && formData.gemColors.length > 0), [formData, uploadedFiles.length]);

    const generateFullProductListing = async () => {
        if (!canGenerateDescription || isGenerating) return;
        setIsGenerating(true); 
        setGeneratedContent(null);
        try {
            const serializableImage = await fileToSerializable(uploadedFiles[0]);
            const responseSchema = {
                type: 'OBJECT', properties: {
                    en: { type: 'OBJECT', properties: { name: { type: 'STRING' }, description: { type: 'OBJECT', properties: { p1: { type: 'STRING' }, p2: { type: 'STRING' }, p3: { type: 'STRING' } } }, hashtags: { type: 'ARRAY', items: { type: 'STRING' } } } },
                    th: { type: 'OBJECT', properties: { name: { type: 'STRING' }, description: { type: 'OBJECT', properties: { p1: { type: 'STRING' }, p2: { type: 'STRING' }, p3: { type: 'STRING' } } }, hashtags: { type: 'ARRAY', items: { type: 'STRING' } } } },
                    energyProperties: { type: 'ARRAY', items: { type: 'STRING' } }
                }
            };
            const textPrompt = `Generate a complete, SEO-optimized product listing in JSON format for "VickyLuxGems", a luxury gemstone business specializing in Burmese amber. The tone should be elegant, spiritual, and authoritative.
            - Details: Type=${formData.gemType}, Product Form/Use=${formData.productForm.join(', ')}, Colors=${formData.gemColors.join(', ')}, Origin=${formData.gemOrigins.join(', ')}, Clarity=${formData.gemClarity}, Cut=${formData.gemCuts.join(', ')}, Weight=${formData.gemWeight} ${formData.gemWeightUnit}
            - Instructions:
            1.  **Names (en, th):** Create a compelling name using the logic [Adjective] + [Gemstone Type] + [Product Form/Use]. Example: “Royal Burmese Amber Prayer Beads – Monastic Edition”.
            2.  **Descriptions (en, th):** Write three short paragraphs: p1 (origin/significance), p2 (material/quality/energy), p3 (ideal users like monks, collectors). Ensure culturally appropriate tones.
            3.  **Hashtags (en, th):** Generate a list of exactly 20 relevant, mixed (direct & indirect) hashtags for social media for each language.
            4.  **Energy Properties:** List 3-5 keywords for the gem's metaphysical properties.`;
            
            const requestBody = {
                prompt: textPrompt,
                responseSchema,
                image: serializableImage
            };

            const response = await fetch('/.netlify/functions/getAiDescription', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                const errorBody = await response.text();
                console.error("Netlify Function Error:", errorBody);
                throw new Error(`AI function failed with status: ${response.status}`);
            }
            
            const parsedJson = await response.json();
            setGeneratedContent(parsedJson);

        } catch (error) {
            console.error("AI Generation Error:", error);
            alert("An error occurred while generating the description. Please check the console for details.");
        } finally {
            setIsGenerating(false);
        }
    };

    const createProductFromState = (): Product | null => {
        if (!generatedContent) return null;

        const weightInGrams = formData.gemWeightUnit === 'carats' ? Number(formData.gemWeight) * 0.2 : Number(formData.gemWeight);
        const certString = formData.gemCerts.join(', ');
        const totalPrice = Number(formData.basePrice) * 1.07;
        const firstForm = formData.productForm[0] || 'general';
        const categorySlug = firstForm.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-\(men-s-women-s\)|-\(.*\)/g, '');

        return {
            id: `prod_${Date.now()}`, sku: generatedSKU, name: generatedContent.en.name,
            category: categorySlug, material: formData.gemType as Material,
            price: totalPrice, story: Object.values(generatedContent.en.description).join('\n\n'),
            energyProperties: generatedContent.energyProperties,
            media: { mainImageUrl: imagePreviews[0], gallery: imagePreviews.slice(1) },
            specifications: {
                totalWeight_grams: weightInGrams,
                origin: formData.gemOrigins.join(', '),
                clarityLevel: formData.gemClarity,
                finish: formData.gemCuts.join(', '),
                dimensions_mm: formData.gemDimension,
            },
            certification: { isCertified: formData.gemCerts.length > 0 && !formData.gemCerts.includes("In-house"), authority: certString || undefined },
            inventory: { stock: 1, isAvailable: true }, isNewArrival: true,
            hashtags: { en: generatedContent.en.hashtags, th: generatedContent.th.hashtags },
        };
    };

    const handleSaveAndShowModal = () => {
        const newProduct = createProductFromState();
        if (!newProduct) {
            alert("Please generate content before saving.");
            return;
        }
        addProduct(newProduct);
        setLastAddedProduct(newProduct);
        setShowPostSaveModal(true);
    };

    const handleDelete = (productId: string) => {
        deleteProduct(productId);
        setConfirmDeleteId(null);
    };

    const handleCloseAttempt = () => {
        if (formIsDirty) { setShowExitConfirm(true); } else { onClose(); }
    };
    const handleConfirmExit = () => { setShowExitConfirm(false); onClose(); };

    // --- Components ---

    const PostSaveModal = () => {
        if (!showPostSaveModal || !lastAddedProduct || !generatedContent) return null;
        const copyToClipboard = () => {
            const contactInfo = `Contact Us:\nLINE: vickyamber\nWhatsApp: +66631959922\nFacebook Page: https://facebook.com/vkmmamber`;
            const specs = [
                `Product Type: ${formData.productForm.join(', ')}`,
                `Material Source: 100% ${lastAddedProduct.material === Material.Amber ? 'Burmese Amber' : `Natural ${lastAddedProduct.material}`}`,
                lastAddedProduct.specifications.dimensions_mm && `Dimensions: ${lastAddedProduct.specifications.dimensions_mm}, ${lastAddedProduct.specifications.totalWeight_grams.toFixed(2)}g`,
                lastAddedProduct.specifications.finish && `Shape or Cut: ${lastAddedProduct.specifications.finish}`,
                `Color & Clarity: ${formData.gemColors.join(', ')} / ${lastAddedProduct.specifications.clarityLevel || 'N/A'}`,
                `Geographic Origin: ${lastAddedProduct.specifications.origin}`,
                `Energy Properties: ${lastAddedProduct.energyProperties.join(', ')}`,
                lastAddedProduct.certification.isCertified && lastAddedProduct.certification.authority && `Certifications: ${lastAddedProduct.certification.authority}`
            ].filter(Boolean).join('\n');
            const hashtagsTh = generatedContent.th.hashtags.slice(0, 15).join(' ');
            const hashtagsEn = generatedContent.en.hashtags.slice(0, 15).join(' ');
            const textToCopy = [ generatedContent.en.name, Object.values(generatedContent.en.description).join('\n\n'), "SPECIFICATIONS", specs, contactInfo, "\n\n---------------\n", hashtagsTh, hashtagsEn ].join('\n');
            navigator.clipboard.writeText(textToCopy).then(() => alert('Content copied to clipboard!'));
        };
        return (
             <div className="admin-confirm-modal">
                <div className="admin-confirm-modal-content max-w-sm">
                    <h3 className="text-xl font-bold mb-2">Product Added!</h3>
                    <p className="mb-6">What would you like to do next?</p>
                    <div className="flex flex-col gap-3">
                        <button onClick={copyToClipboard} className="popup-btn" style={{backgroundColor: '#D2B48C', color: '#3D352E'}}>📋 Copy Text to Post</button>
                        <button onClick={() => { resetForm(); setShowPostSaveModal(false); }} className="popup-btn" style={{backgroundColor: '#ADD8E6', color: '#3D352E'}}>➕ Add Another Product</button>
                        <button onClick={() => onClose()} className="popup-btn bg-stone-500 text-white hover:bg-stone-600">❌ Exit</button>
                    </div>
                </div>
            </div>
        );
    };

    if (!isOpen) return null;
    if (!isLoggedIn) { /* Login Form JSX */ 
        return (
            <div className="admin-modal-overlay"><div className="admin-modal-content admin-login-view"><div className="admin-modal-body"><h2 className="text-2xl font-bold text-center mb-4">Admin Login</h2><form onSubmit={handleLogin}><div className="admin-form-field"><label htmlFor="password">Password</label><input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} className="admin-input" required autoFocus /></div>{error && <p className="text-red-600 text-sm mb-4">{error}</p>}<button type="submit" className="admin-button-primary w-full">Login</button></form></div></div></div>
        );
    }

    return (
        <div className="admin-modal-overlay">
            {showExitConfirm && ( /* Unsaved Changes Modal */ 
                <div className="admin-confirm-modal"><div className="admin-confirm-modal-content"><h3 className="text-xl font-bold mb-2">Unsaved Changes</h3><p className="mb-4">You have unsaved changes. Are you sure you want to exit?</p><div className="flex justify-center gap-4"><button onClick={() => setShowExitConfirm(false)} className="px-6 py-2 rounded-md bg-gray-200">Cancel</button><button onClick={handleConfirmExit} className="admin-delete-btn">Exit Anyway</button></div></div></div>
            )}
            <PostSaveModal />

            <div className="admin-modal-content">
                <button onClick={handleCloseAttempt} className="admin-modal-close-btn" aria-label="Close admin panel"><CloseIcon className="w-8 h-8"/></button>
                <div className="p-6 border-b border-[var(--c-border)]">
                    <h1 className="text-3xl font-bold text-[var(--c-heading)]">Inventory & Content Management</h1>
                    <div className="admin-tabs flex items-center mt-4">
                        <button onClick={() => setActiveTab('add')} className={`admin-tab ${activeTab === 'add' ? 'active' : ''}`}>Add Product</button>
                        <button onClick={() => setActiveTab('manage')} className={`admin-tab ${activeTab === 'manage' ? 'active' : ''}`}>Manage Inventory</button>
                        <button onClick={() => setActiveTab('settings')} className={`admin-tab ${activeTab === 'settings' ? 'active' : ''}`}>Settings</button>
                    </div>
                </div>
                <div className="admin-modal-body">
                    {activeTab === 'add' && (
                        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                            <div className="admin-form-section">
                                <h2>1. Product Specifications</h2>
                                <p className="text-sm -mt-4 mb-4 text-gray-500 bg-gray-50 p-2 rounded-md border">SKU: <span className="font-mono text-gray-700">{generatedSKU}</span></p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="admin-form-field"><label htmlFor="gemCategory">Gem Category</label><select id="gemCategory" name="gemCategory" value={formData.gemCategory} onChange={handleCategoryChange} className="admin-select" required><option value="">Select...</option>{Object.keys(GEM_DATA.categories).map(cat => <option key={cat} value={cat}>{cat}</option>)}</select></div>
                                    <div className="admin-form-field"><label htmlFor="gemType">Material Type</label><select id="gemType" name="gemType" value={formData.gemType} onChange={handleInputChange} className="admin-select" required disabled={!formData.gemCategory}><option value="">Select...</option>{availableGemTypes.map(type => <option key={type} value={type}>{type}</option>)}</select></div>
                                    <div className="admin-form-field md:col-span-2"><label htmlFor="productForm">Product Form / Ready Type (Select one or more)</label><select id="productForm" name="productForm" multiple value={formData.productForm} onChange={handleMultiSelectChange} className="admin-select admin-multi-select h-48" required>{Object.entries(productForms).map(([group, options]) => <optgroup key={group} label={group}>{options.map(opt => <option key={opt} value={opt}>{opt}</option>)}</optgroup>)}</select></div>
                                    <div className="admin-form-field"><label htmlFor="gemColors">Color</label><select id="gemColors" name="gemColors" multiple value={formData.gemColors} onChange={handleMultiSelectChange} className="admin-select admin-multi-select" required disabled={!gemData}>{gemData?.colors.map(color => <option key={color} value={color}>{color}</option>)}</select></div>
                                    <div className="admin-form-field"><label htmlFor="gemOrigins">Origin</label><select id="gemOrigins" name="gemOrigins" multiple value={formData.gemOrigins} onChange={handleMultiSelectChange} className="admin-select admin-multi-select" disabled={!gemData}>{(gemData?.origins || GEM_DATA.origins.standard).map(origin => <option key={origin} value={origin}>{origin}</option>)}</select></div>
                                    <div className="admin-form-field"><label htmlFor="gemClarity">Clarity</label><select id="gemClarity" name="gemClarity" value={formData.gemClarity} onChange={handleInputChange} className="admin-select" disabled={!formData.gemType}><option value="">Select...</option>{availableClarityGrades.map(grade => <option key={grade} value={grade}>{grade}</option>)}</select></div>
                                    <div className="admin-form-field"><label htmlFor="gemCuts">Shape or Cut</label><select id="gemCuts" name="gemCuts" multiple value={formData.gemCuts} onChange={handleMultiSelectChange} className="admin-select admin-multi-select" disabled={!gemData}>{availableCuts.map(cut => <option key={cut} value={cut}>{cut}</option>)}</select></div>
                                    <div className="admin-form-field"><label>Weight</label><div className="flex gap-2"><input type="text" name="gemWeight" placeholder="e.g., 5.25" value={formData.gemWeight} onChange={handleNumericInput} className="admin-input" required /><select name="gemWeightUnit" value={formData.gemWeightUnit} onChange={handleInputChange} className="admin-select w-1/3"><option value="carats">carats</option><option value="grams">grams</option></select></div></div>
                                    <div className="admin-form-field"><label>Dimensions</label><input type="text" name="gemDimension" placeholder="e.g., 10 x 8 x 5 mm" value={formData.gemDimension} onChange={handleDimensionInput} onBlur={handleDimensionBlur} className="admin-input"/></div>
                                    <div className="admin-form-field md:col-span-2"><label>Certifications</label><select id="gemCerts" name="gemCerts" multiple value={formData.gemCerts} onChange={handleMultiSelectChange} className="admin-select admin-multi-select">{certifications.map(cert => <option key={cert} value={cert}>{cert}</option>)}</select></div>
                                </div>
                            </div>
                            <div className="admin-form-section">
                                <h2>2. Pricing & Media</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end"><div className="admin-form-field"><label htmlFor="basePrice">Base Price (THB)</label><input type="text" id="basePrice" name="basePrice" value={formData.basePrice} onChange={handleNumericInput} className="admin-input" required /></div><div className="p-3 bg-gray-50 rounded-md border text-center"><p className="text-sm text-gray-600">Total Price (with 7% VAT):</p><p className="text-xl font-bold text-[var(--c-heading)]">{formData.basePrice ? `฿${(Number(formData.basePrice) * 1.07).toLocaleString('en-US', {maximumFractionDigits: 0})}` : '—'}</p></div></div>
                                <div className="admin-form-field mt-6"><label>Media (First image is main, max 5)</label><input type="file" onChange={handleImageUpload} multiple accept="image/*" className="admin-input" /><div className="mt-4 grid grid-cols-3 sm:grid-cols-5 gap-4">{imagePreviews.map((src, index) => (<div key={index} className="relative group aspect-[3/4]"><img src={src} alt={`Preview ${index}`} className="w-full h-full object-cover rounded-md" /><button type="button" onClick={() => removeImage(index)} className="absolute top-1 right-1 bg-red-600/80 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100">&times;</button></div>))}</div></div>
                            </div>
                             <div className="admin-form-section">
                                <h2>3. Generate AI Content</h2>
                                 <button type="button" onClick={generateFullProductListing} disabled={!canGenerateDescription || isGenerating} className="admin-button-primary w-full disabled:bg-gray-400 text-lg">
                                    {isGenerating ? <><span className="loader mr-2"></span> Generating Product Listing...</> : '✨ Generate with AI'}
                                </button>
                                {generatedContent && (
                                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div><h3 className="text-lg font-semibold mb-2">English Content</h3><div className="p-3 bg-white border rounded-md space-y-3"><input value={generatedContent.en.name} onChange={e => setGeneratedContent(c => c && ({ ...c, en: { ...c.en, name: e.target.value } }))} className="admin-input font-bold" /><textarea value={Object.values(generatedContent.en.description).join('\n\n')} onChange={e => { const [p1,p2,p3] = e.target.value.split('\n\n'); setGeneratedContent(c => c && ({ ...c, en: { ...c.en, description: { p1, p2, p3 } } }))}} rows={8} className="admin-textarea text-sm" /><input value={generatedContent.en.hashtags.join(' ')} onChange={e => setGeneratedContent(c => c && ({ ...c, en: { ...c.en, hashtags: e.target.value.split(' ') } }))} className="admin-input text-xs text-gray-500" /></div></div>
                                        <div><h3 className="text-lg font-semibold mb-2">Thai Content</h3><div className="p-3 bg-white border rounded-md space-y-3"><input value={generatedContent.th.name} onChange={e => setGeneratedContent(c => c && ({ ...c, th: { ...c.th, name: e.target.value } }))} className="admin-input font-bold" /><textarea value={Object.values(generatedContent.th.description).join('\n\n')} onChange={e => { const [p1,p2,p3] = e.target.value.split('\n\n'); setGeneratedContent(c => c && ({ ...c, th: { ...c.th, description: { p1, p2, p3 } } }))}} rows={8} className="admin-textarea text-sm" /><input value={generatedContent.th.hashtags.join(' ')} onChange={e => setGeneratedContent(c => c && ({ ...c, th: { ...c.th, hashtags: e.target.value.split(' ') } }))} className="admin-input text-xs text-gray-500" /></div></div>
                                    </div>
                                )}
                            </div>
                            <div className="mt-8 pt-6 border-t border-[var(--c-border)]"><button type="button" onClick={handleSaveAndShowModal} disabled={!generatedContent} className="admin-button-primary w-full text-xl py-4 disabled:bg-gray-400 disabled:cursor-not-allowed">Save & Add Product</button></div>
                        </form>
                    )}
                    {activeTab === 'manage' && (
                        <div>
                            {confirmDeleteId && (<div className="admin-confirm-modal"><div className="admin-confirm-modal-content"><h3 className="text-xl font-bold mb-2">Confirm Deletion</h3><p className="mb-4">Are you sure you want to delete "{products.find(p => p.id === confirmDeleteId)?.name}"? This action cannot be undone.</p><div className="flex justify-center gap-4"><button onClick={() => setConfirmDeleteId(null)} className="px-6 py-2 rounded-md bg-gray-200">Cancel</button><button onClick={() => handleDelete(confirmDeleteId)} className="admin-delete-btn">Delete</button></div></div></div>)}
                            <div className="admin-inventory-list space-y-3">{products.map(product => (<div key={product.id} className="admin-inventory-item"><img src={product.media.mainImageUrl} alt={product.name} className="admin-inventory-item-img" /><span className="admin-inventory-item-name">{product.name}</span><button onClick={() => setConfirmDeleteId(product.id)} className="admin-delete-btn">Delete</button></div>))}</div>
                        </div>
                    )}
                    {activeTab === 'settings' && (
                         <div className="admin-form-section">
                            <h2>Financial Settings</h2>
                            <div className="admin-form-field">
                                <label htmlFor="usdtRate" className="!mb-2">THB to USDT Exchange Rate</label>
                                <div className="flex items-center gap-2">
                                    <span className="font-semibold text-lg">1 USDT =</span>
                                    <input
                                        type="text"
                                        id="usdtRate"
                                        name="usdtRate"
                                        value={usdtExchangeRate}
                                        onChange={handleUsdtRateChange}
                                        className="admin-input w-40 text-lg"
                                    />
                                    <span className="font-semibold text-lg">Baht</span>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">This rate is used for cryptocurrency payment conversions and rounds up to the next whole USDT.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;