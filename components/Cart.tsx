

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiTrash2 } from 'react-icons/fi';
import { CartItem } from '../types';
import { useTranslations } from '../hooks/useTranslations';

interface CartProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  cartItems: CartItem[];
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, setIsOpen, cartItems, removeFromCart, updateQuantity }) => {
  const { t } = useTranslations();
  const backdropVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  const cartVariants = {
    visible: { x: 0 },
    hidden: { x: '100%' },
  };

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50"
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div
            className="absolute inset-0 bg-black/50"
            variants={backdropVariants}
            onClick={() => setIsOpen(false)}
          ></motion.div>
          
          <motion.div
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white shadow-2xl flex flex-col"
            variants={cartVariants}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-2xl font-bold text-stone-800">{t('cart.title')}</h2>
              <button onClick={() => setIsOpen(false)} className="p-2 rounded-full hover:bg-stone-100">
                <FiX className="h-6 w-6 text-stone-600" />
              </button>
            </div>

            <div className="flex-grow p-6 overflow-y-auto">
              {cartItems.length === 0 ? (
                <div className="text-center text-stone-500 mt-20">
                  <p>{t('cart.empty')}</p>
                  <button onClick={() => setIsOpen(false)} className="mt-4 text-amber-800 font-semibold hover:underline">
                    {t('cart.continueShopping')}
                  </button>
                </div>
              ) : (
                <ul className="space-y-4">
                  {cartItems.map(item => (
                    <li key={item.id} className="flex items-start space-x-4">
                      <img src={item.image} alt={item.title} className="w-20 h-20 rounded-lg object-cover" />
                      <div className="flex-grow">
                        <h3 className="font-semibold text-stone-800">{item.title}</h3>
                        <p className="text-sm text-stone-500">${item.price.toFixed(2)}</p>
                        <div className="flex items-center mt-2">
                          <input 
                            type="number" 
                            value={item.quantity}
                            min="1"
                            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                            className="w-16 p-1 border rounded-md text-center"
                          />
                        </div>
                      </div>
                      <div className="text-right">
                         <p className="font-bold text-stone-800">${(item.price * item.quantity).toFixed(2)}</p>
                         <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 mt-2">
                           <FiTrash2 />
                         </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="p-6 border-t">
                <div className="flex justify-between items-center font-bold text-xl">
                  <span>{t('cart.total')}</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <button className="w-full mt-4 bg-amber-800 text-white py-3 rounded-lg font-bold hover:bg-amber-900 transition-colors">
                  {t('cart.checkout')}
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Cart;
