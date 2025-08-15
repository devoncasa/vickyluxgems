

import React, { useState, useEffect, useMemo, useRef } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { useAppContext } from '../context/AppContext.tsx';
import { CartIcon, CloseIcon } from './IconComponents.tsx';

const formatCurrency = (amount: number) => `฿${amount.toLocaleString('en-US')}`;

const GlobalCart: React.FC = () => {
    const { cart, removeFromCart, updateCartQuantity } = useAppContext();
    const [isOpen, setIsOpen] = useState(false);
    const cartRef = useRef<HTMLDivElement>(null);

    const totalItems = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);
    const subtotal = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.quantity, 0), [cart]);

    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsOpen(false);
            }
        };
        const handleClickOutside = (event: MouseEvent) => {
            if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.body.style.overflow = 'hidden';
            document.addEventListener('keydown', handleEscape);
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
            document.removeEventListener('keydown', handleEscape);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <>
            <button
                className="relative p-2 rounded-full hover:bg-[var(--c-accent-primary)]/10 transition-colors"
                aria-label={`View shopping cart, ${totalItems} items`}
                onClick={() => setIsOpen(true)}
            >
                <CartIcon className="h-6 w-6 text-[var(--c-text-primary)] opacity-80" />
                {totalItems > 0 && (
                    <span className="absolute -top-1 -end-1 block h-5 w-5 rounded-full bg-[var(--c-accent-secondary)] text-white text-xs flex items-center justify-center border-2 border-[var(--c-bg)]">
                        {totalItems}
                    </span>
                )}
            </button>

            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                aria-hidden="true"
                onClick={() => setIsOpen(false)}
            ></div>

            {/* Cart Panel */}
            <div
                ref={cartRef}
                className={`fixed top-0 right-0 h-full w-full max-w-md bg-[var(--c-bg)] shadow-2xl z-50 flex flex-col transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
                role="dialog"
                aria-modal="true"
                aria-labelledby="cart-heading"
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-[var(--c-border)] flex-shrink-0">
                    <h2 id="cart-heading" className="text-xl font-bold font-serif">Your Cart</h2>
                    <button onClick={() => setIsOpen(false)} className="p-2 rounded-full -m-2 hover:bg-gray-100 transition-colors">
                        <CloseIcon className="h-6 w-6" />
                        <span className="sr-only">Close cart</span>
                    </button>
                </div>

                {/* Cart Content */}
                {cart.length === 0 ? (
                    <div className="flex-grow flex flex-col items-center justify-center text-center p-4">
                        <CartIcon className="w-16 h-16 text-gray-300 mb-4" />
                        <h3 className="text-xl font-semibold">Your cart is empty</h3>
                        <p className="text-gray-500 mt-2">Looks like you haven't added anything yet.</p>
                        <ReactRouterDOM.Link to="/collection" onClick={() => setIsOpen(false)} className="mt-6 btn-primary text-white font-bold py-2 px-6 rounded-lg">
                            Continue Shopping
                        </ReactRouterDOM.Link>
                    </div>
                ) : (
                    <>
                        <div className="flex-grow overflow-y-auto p-4">
                            <ul className="-my-4 divide-y divide-[var(--c-border)]">
                                {cart.map(item => (
                                    <li key={item.id} className="flex py-4 gap-4">
                                        <img src={item.product.media.mainImageUrl} alt={item.product.name} className="w-24 h-32 object-cover rounded-md flex-shrink-0 bg-gray-100" />
                                        <div className="flex-grow flex flex-col">
                                            <div>
                                                <h3 className="font-semibold text-base leading-tight">{item.product.name}</h3>
                                                {item.selectedBeadSize && <p className="text-sm text-gray-500">{item.selectedBeadSize}mm</p>}
                                                <p className="text-base font-semibold text-[var(--c-accent-primary)] mt-1">{formatCurrency(item.price)}</p>
                                            </div>
                                            <div className="flex items-center justify-between mt-auto pt-2">
                                                <div className="flex items-center border border-[var(--c-border)] rounded-md">
                                                    <button onClick={() => updateCartQuantity(item.id, item.quantity - 1)} className="px-2 py-1 text-lg font-bold hover:bg-gray-100 rounded-l-md" aria-label={`Decrease quantity of ${item.product.name}`}>-</button>
                                                    <span className="px-3 py-1 text-sm tabular-nums" aria-live="polite">{item.quantity}</span>
                                                    <button onClick={() => updateCartQuantity(item.id, item.quantity + 1)} className="px-2 py-1 text-lg font-bold hover:bg-gray-100 rounded-r-md" aria-label={`Increase quantity of ${item.product.name}`}>+</button>
                                                </div>
                                                <button onClick={() => removeFromCart(item.id)} className="text-sm text-red-600 hover:underline" aria-label={`Remove ${item.product.name} from cart`}>Remove</button>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Footer */}
                        <div className="p-4 border-t border-[var(--c-border)] bg-[var(--c-surface)] flex-shrink-0">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-lg font-semibold">Subtotal</span>
                                <span className="text-2xl font-bold">{formatCurrency(subtotal)}</span>
                            </div>
                            <div className="flex flex-col gap-3">
                                <ReactRouterDOM.Link to="/payment" onClick={() => setIsOpen(false)} className="w-full text-center btn-primary btn--intelligent text-white font-bold py-3 rounded-lg text-lg">
                                    Checkout
                                </ReactRouterDOM.Link>
                                <button onClick={() => setIsOpen(false)} className="w-full text-center text-sm font-semibold text-[var(--c-accent-primary)] hover:underline">
                                    or Continue Shopping
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default GlobalCart;
