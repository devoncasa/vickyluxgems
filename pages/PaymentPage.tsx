import React, { useState, useMemo, useEffect } from 'react';
import { useAppContext } from '../context/AppContext.tsx';
import SEO from '../components/SEO.tsx';
import { BACKGROUND_IMAGES } from '../constants.ts';
import SectionDivider from '../components/SectionDivider.tsx';

const formatCurrency = (amount: number, currency: 'THB' | 'USDT' = 'THB') => {
    if (currency === 'USDT') {
        return `${amount.toLocaleString('en-US')} USDT`;
    }
    return `฿${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

const PaymentPage: React.FC = () => {
    const { cart, usdtExchangeRate } = useAppContext();
    const [activeAccordion, setActiveAccordion] = useState<string | null>('card');
    const [paymentStatus, setPaymentStatus] = useState<'waiting' | 'confirmed'>('waiting');
    const [copied, setCopied] = useState<{ [key: string]: boolean }>({});

    const subtotal = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.quantity, 0), [cart]);
    
    const usdtDiscount = useMemo(() => subtotal * 0.10, [subtotal]);
    const discountedSubtotal = useMemo(() => subtotal - usdtDiscount, [subtotal, usdtDiscount]);

    const usdtAmount = useMemo(() => {
        if (discountedSubtotal === 0 || usdtExchangeRate <= 0) return 0;
        return Math.ceil(discountedSubtotal / usdtExchangeRate);
    }, [discountedSubtotal, usdtExchangeRate]);

    const isUsdtActive = activeAccordion === 'usdt';

    const handleCopy = (text: string, type: string) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopied({ [type]: true });
            setTimeout(() => setCopied({ [type]: false }), 2000);
        });
    };
    
    // Simulate payment confirmation
    const handleConfirmPayment = () => {
        // In a real app, this would trigger polling a backend endpoint.
        // Here, we'll just simulate the confirmation after a delay.
        setTimeout(() => {
            setPaymentStatus('confirmed');
        }, 5000); // 5-second delay to simulate blockchain confirmation
    };

    const AccordionItem: React.FC<{ id: string; title: string; children: React.ReactNode }> = ({ id, title, children }) => {
        const isActive = activeAccordion === id;
        const buttonClass = id === 'card' ? 'btn-payment-standard' 
                          : id === 'usdt' ? 'btn-payment-crypto' 
                          : id === 'local-qr' ? 'btn-payment-local' 
                          : '';
        return (
            <div className={`payment-accordion-item ${isActive ? 'active' : ''}`}>
                <button
                    onClick={() => setActiveAccordion(isActive ? null : id)}
                    className={`accordion-header w-full flex justify-between items-center p-4 text-left font-semibold text-lg ${buttonClass}`}
                    aria-expanded={isActive}
                >
                    <span>{title}</span>
                    <span className="accordion-icon transition-transform duration-300">▼</span>
                </button>
                <div className="accordion-content">
                    <div className="border-t-2 border-[var(--c-accent-primary)] pt-6 -mt-6">
                         {children}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div 
            className="page-container-with-bg py-16 md:py-24"
            style={{ backgroundImage: `url('${BACKGROUND_IMAGES[25]}')` }}
        >
            <SEO 
                title="Payment Selection | Vicky LuxGems"
                description="Securely complete your purchase using a credit card, PayPal, or cryptocurrency (USDT)."
            />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto">
                    <div className="text-center mb-10 dark-context">
                        <h1 className="text-5xl font-bold">Payment Selection</h1>
                        <p className="mt-4 text-xl">Please choose your preferred payment method.</p>
                    </div>
                    
                    <div className="bg-[var(--c-surface)] p-6 rounded-lg shadow-lg border border-[var(--c-border)]">
                         <div className={`order-summary mb-6 pb-6 border-b border-[var(--c-border)] ${isUsdtActive ? 'usdt-discount-active' : ''}`}>
                            <h2 className="text-2xl font-serif font-bold mb-4">Order Summary</h2>
                            <div className="space-y-2 text-right">
                                
                                {/* This row is always present but changes style and label */}
                                <div className={`original-price-row flex justify-between items-center transition-all duration-300 ${isUsdtActive ? 'text-md' : 'text-lg font-bold'}`}>
                                    <span className="text-[var(--c-heading)]">{isUsdtActive ? 'Original Price:' : 'Your Order Total:'}</span>
                                    <span className={`${isUsdtActive ? 'original-price' : 'text-[var(--c-heading)]'}`}>
                                        {isUsdtActive ? <s>{formatCurrency(subtotal)}</s> : formatCurrency(subtotal)}
                                    </span>
                                </div>

                                {/* Discount Row (animates in) */}
                                <div className="discount-row flex justify-between items-center text-md discount-text">
                                    <span>USDT Discount (10%):</span>
                                    <span>-{formatCurrency(usdtDiscount)}</span>
                                </div>

                                {/* New Total Row (animates in) */}
                                <div className="new-total-row flex justify-between items-center text-lg font-bold">
                                    <span className="text-[var(--c-heading)]">New Total:</span>
                                    <span className="text-[var(--c-heading)]">{formatCurrency(discountedSubtotal)}</span>
                                </div>
                            </div>
                        </div>


                        <div className="space-y-4">
                            <AccordionItem id="card" title="Credit/Debit Card & PayPal">
                                <p className="text-center text-[var(--c-text-secondary)]">This section would contain the integrated payment gateway for standard credit/debit card and PayPal transactions. For now, this is a placeholder.</p>
                                {/* Placeholder for a real payment gateway component */}
                                <div className="mt-4 p-8 bg-[var(--c-surface-alt)] border border-dashed rounded-lg text-center">
                                    [Standard Payment Gateway Form]
                                </div>
                            </AccordionItem>
                            
                            <AccordionItem id="local-qr" title="Pay with Thai QR (Local Bank Transfer)">
                                <div className="text-center space-y-6">
                                    <img 
                                        src="https://raw.githubusercontent.com/devoncasa/VickyLuxGems-Assets/main/Bkk-Bank-QR.jpg" 
                                        alt="Thai QR Code for Bangkok Bank"
                                        className="usdt-qr-code mx-auto"
                                    />
                                    
                                    <div className="space-y-4 payment-info-text text-left px-2 sm:px-4">
                                        <div>
                                            <label className="text-xs font-semibold uppercase text-[var(--c-text-secondary)] tracking-wider">Bank</label>
                                            <p className="font-semibold text-[var(--c-heading)]">Bangkok Bank of Thailand</p>
                                        </div>
                                        
                                        <div>
                                            <label className="text-xs font-semibold uppercase text-[var(--c-text-secondary)] tracking-wider">Account Number</label>
                                            <div className="flex items-center justify-between gap-2 mt-1">
                                                <p className="font-mono text-sm sm:text-base break-all text-[var(--c-heading)]">014 015 0459</p>
                                                <button onClick={() => handleCopy('0140150459', 'account-no')} className="copy-button flex-shrink-0">{copied['account-no'] ? 'Copied!' : 'Copy'}</button>
                                            </div>
                                        </div>
                                    </div>

                                    <p className="text-sm text-gray-500">Please send a proof of payment to our <a href="https://m.me/vkmmamber" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Facebook Messenger</a> to confirm your order.</p>

                                    <div className={`p-3 rounded-lg font-semibold transition-colors text-lg ${paymentStatus === 'waiting' ? 'payment-status-waiting' : 'payment-status-confirmed'}`}>
                                        {paymentStatus === 'waiting' ? 'Waiting for payment...' : '✅ Payment Received!'}
                                    </div>
                                    
                                    {paymentStatus === 'waiting' && (
                                        <button onClick={handleConfirmPayment} className="btn-primary text-white font-bold py-3 px-6 rounded-lg w-full">I Have Sent The Payment</button>
                                    )}
                                </div>
                            </AccordionItem>

                            <AccordionItem id="usdt" title="Pay with Cryptocurrency (USDT) - 10% OFF">
                                <div className="text-center space-y-6">
                                    <img 
                                        src="https://raw.githubusercontent.com/devoncasa/VickyLuxGems-Assets/main/usdt-payment-qr.jpeg" 
                                        alt="USDT Wallet QR Code for BNB Smart Chain (BEP-20)"
                                        className="usdt-qr-code mx-auto"
                                    />
                                    
                                    <div className="space-y-4 payment-info-text text-left px-2 sm:px-4">
                                        <div>
                                            <label className="text-xs font-semibold uppercase text-[var(--c-text-secondary)] tracking-wider">Wallet Address</label>
                                            <div className="flex items-center justify-between gap-2 mt-1">
                                                <p className="font-mono text-sm sm:text-base break-all text-[var(--c-heading)]">0xa1a9f51E0dFF3205c769Be99d7C898Be057fA742</p>
                                                <button onClick={() => handleCopy('0xa1a9f51E0dFF3205c769Be99d7C898Be057fA742', 'address')} className="copy-button flex-shrink-0">{copied['address'] ? 'Copied!' : 'Copy'}</button>
                                            </div>
                                        </div>
                                        
                                        <div>
                                            <label className="text-xs font-semibold uppercase text-[var(--c-text-secondary)] tracking-wider">Network</label>
                                            <p className="font-semibold text-[var(--c-heading)]">BNB Smart Chain (BEP-20)</p>
                                        </div>
                                    </div>

                                    <div className="mt-6 pt-6 border-t border-dashed">
                                        <div className="flex justify-between items-center">
                                            <label className="font-semibold text-lg">Amount to Send</label>
                                            <div className="flex items-center gap-2">
                                                <p className="font-mono text-xl font-bold text-[var(--c-accent-primary)]">{formatCurrency(usdtAmount, 'USDT')}</p>
                                                <button onClick={() => handleCopy(usdtAmount.toString(), 'amount')} className="copy-button">{copied['amount'] ? 'Copied!' : 'Copy'}</button>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="p-4 bg-amber-50/80 text-amber-900 border border-amber-200 rounded-md text-sm payment-info-text text-left">
                                        <h4 className="font-bold mb-2">Conditions of Payment</h4>
                                        <ul>
                                            <li>Please ensure you are sending <strong>USDT</strong> on the <strong>BNB Smart Chain (BEP-20)</strong> network. Transactions sent on other networks are irreversible and will result in a permanent loss of funds.</li>
                                            <li>Your order will be processed once the transaction receives a sufficient number of confirmations on the blockchain (typically 1-5 minutes).</li>
                                            <li>All cryptocurrency transactions are final and cannot be reversed. Please double-check the wallet address and amount before sending.</li>
                                        </ul>
                                    </div>

                                    <div className={`p-3 rounded-lg font-semibold transition-colors text-lg ${paymentStatus === 'waiting' ? 'payment-status-waiting' : 'payment-status-confirmed'}`}>
                                        {paymentStatus === 'waiting' ? 'Waiting for payment...' : '✅ Payment Received!'}
                                    </div>
                                    
                                    {paymentStatus === 'waiting' && (
                                        <button onClick={handleConfirmPayment} className="btn-primary text-white font-bold py-3 px-6 rounded-lg w-full">I Have Sent The Payment</button>
                                    )}
                                </div>
                            </AccordionItem>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;