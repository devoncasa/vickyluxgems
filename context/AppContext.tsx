import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Product } from '../types';
import { PRODUCTS } from '../constants';

interface AppContextType {
    isAdminPanelOpen: boolean;
    setIsAdminPanelOpen: React.Dispatch<React.SetStateAction<boolean>>;
    products: Product[];
    addProduct: (newProduct: Product) => void;
    deleteProduct: (productId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
    const [products, setProducts] = useState<Product[]>(PRODUCTS);
    
    const addProduct = (newProduct: Product) => {
        setProducts(prevProducts => [newProduct, ...prevProducts]);
    };
    
    const deleteProduct = (productId: string) => {
        setProducts(prevProducts => prevProducts.filter(p => p.id !== productId));
    };

    return (
        <AppContext.Provider value={{ 
            isAdminPanelOpen, 
            setIsAdminPanelOpen,
            products,
            addProduct,
            deleteProduct
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
