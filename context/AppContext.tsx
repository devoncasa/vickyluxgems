import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Product, CartItem, BeadSize } from '../types';
import { PRODUCTS } from '../constants';
import { calculateFinalPrice } from '../utils/priceLogic';

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
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
    const [products, setProducts] = useState<Product[]>(PRODUCTS);
    const [cart, setCart] = useState<CartItem[]>([]);
    
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
            clearCart
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
