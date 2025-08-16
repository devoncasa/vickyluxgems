import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Product, CartItem, BeadSize } from '../types';
import { calculateFinalPrice } from '../utils/priceLogic';

interface PageContent {
    title?: string;
    url?: string;
    heroTitle?: string;
    heroSubtitle?: string;
    body?: string;
    'data-sb-object-id'?: string;
}

interface AppContextType {
    isAdminPanelOpen: boolean;
    setIsAdminPanelOpen: React.Dispatch<React.SetStateAction<boolean>>;
    products: Product[];
    addProduct: (newProduct: Product) => void;
    deleteProduct: (productId: string) => void;
    cart: CartItem[];
    addToCart: (product: Product, quantity: number, selectedBeadSize?: BeadSize) => void;
    removeFromCart: (cartItemId: string) => void;
    updateCartQuantity: (cartItemId: string, newQuantity: number) => void;
    clearCart: () => void;
    usdtExchangeRate: number;
    setUsdtExchangeRate: React.Dispatch<React.SetStateAction<number>>;
    pageContent: PageContent | null;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const pathToSlug = (p: string): string => {
    if (p === "/") return "home";
    return p.replace(/^\/+/,"").replace(/\//g,"-");
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    const [cart, setCart] = useState<CartItem[]>([]);
    const [usdtExchangeRate, setUsdtExchangeRate] = useState<number>(36.50);
    const [pageContent, setPageContent] = useState<PageContent | null>(null);
    const location = useLocation();

    useEffect(() => {
        fetch('/data/products.json')
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(err => console.error("Failed to fetch products:", err));
    }, []);

    useEffect(() => {
        const currentPath = () => {
            const hash = location.hash || "";
            if (hash.startsWith("#/")) return hash.slice(1).replace(/\/+$/,"") || "/";
            return (location.pathname.replace(/\/+$/,"") || "/");
        };

        const slug = pathToSlug(currentPath());
        const url = `/content/pages/${slug}.json`;

        const fetchData = async () => {
            try {
                const res = await fetch(url, { cache: "no-store" });
                if (res.ok) {
                    const data = await res.json();
                    setPageContent(data);
                } else {
                    setPageContent(null);
                }
            } catch (e) {
                console.error(`Failed to fetch content for ${slug}`, e);
                setPageContent(null);
            }
        };

        fetchData();
    }, [location.pathname, location.hash]);
    
    const addProduct = (newProduct: Product) => {
        setProducts(prevProducts => [newProduct, ...prevProducts]);
    };
    
    const deleteProduct = (productId: string) => {
        setProducts(prevProducts => prevProducts.filter(p => p.id !== productId));
    };

    const addToCart = (product: Product, quantity: number, selectedBeadSize?: BeadSize) => {
        setCart(prevCart => {
            const size = selectedBeadSize || product.specifications.beadSize_mm;
            const cartItemId = `${product.id}-${size || 'std'}`;
            const existingItem = prevCart.find(item => item.id === cartItemId);

            const itemPrice = (size && product.specifications.beadSize_mm)
                ? calculateFinalPrice(product, size)
                : product.price;

            if (existingItem) {
                return prevCart.map(item =>
                    item.id === cartItemId
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            } else {
                const newItem: CartItem = {
                    id: cartItemId,
                    product,
                    quantity,
                    price: itemPrice,
                    selectedBeadSize: size
                };
                return [...prevCart, newItem];
            }
        });
    };

    const removeFromCart = (cartItemId: string) => {
        setCart(prevCart => prevCart.filter(item => item.id !== cartItemId));
    };

    const updateCartQuantity = (cartItemId: string, newQuantity: number) => {
        setCart(prevCart => {
            if (newQuantity <= 0) {
                return prevCart.filter(item => item.id !== cartItemId);
            }
            return prevCart.map(item =>
                item.id === cartItemId ? { ...item, quantity: newQuantity } : item
            );
        });
    };

    const clearCart = () => {
        setCart([]);
    };

    return (
        <AppContext.Provider value={{ 
            isAdminPanelOpen, 
            setIsAdminPanelOpen,
            products,
            addProduct,
            deleteProduct,
            cart,
            addToCart,
            removeFromCart,
            updateCartQuantity,
            clearCart,
            usdtExchangeRate,
            setUsdtExchangeRate,
            pageContent
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};
