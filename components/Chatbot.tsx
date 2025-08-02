import React, { useState, useEffect, useRef } from 'react';
import { ChatBubbleIcon, CloseIcon } from './IconComponents';
import { useLanguage } from '../i18n/LanguageContext';

interface Message {
    sender: 'user' | 'ai';
    text: string;
}

const Chatbot: React.FC = () => {
    const { t } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    // Initial greeting message
    useEffect(() => {
        if (isOpen && messages.length === 0) {
            setMessages([{ sender: 'ai', text: t('chatbot_greeting' as any) as string }]);
        }
    }, [isOpen, messages.length, t]);
    
    // Scroll to bottom when new messages are added
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage: Message = { sender: 'user', text: input };
        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        setInput('');
        setIsLoading(true);
        
        try {
            const systemInstruction = t('chatbot_system_prompt' as any) as string;
            const response = await fetch('/.netlify/functions/chatHandler', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ history: newMessages, systemInstruction })
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Chat handler error:", errorData);
                throw new Error("Failed to get response from chat handler.");
            }
            
            const data = await response.json();
            const aiMessage: Message = { sender: 'ai', text: data.text };
            setMessages(prev => [...prev, aiMessage]);

        } catch (err) {
            console.error("Error sending message:", err);
            const errorMessage: Message = { sender: 'ai', text: t('chatbot_error_connect' as any) as string };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };
    
    const toggleChat = () => setIsOpen(!isOpen);

    const styles = `
        .chatbot-fab {
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            z-index: 1000;
            background-color: var(--c-accent-primary);
            color: white;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            cursor: pointer;
            transition: all 0.3s ease;
        }
        html[dir="rtl"] .chatbot-fab {
            right: auto;
            left: 2rem;
        }
        .chatbot-fab:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 16px rgba(0,0,0,0.25);
        }
        .chatbot-window {
            position: fixed;
            bottom: 6.5rem;
            right: 2rem;
            width: 90vw;
            max-width: 400px;
            height: 60vh;
            max-height: 500px;
            background-color: var(--c-surface);
            border: 1px solid var(--c-border);
            border-radius: 1rem;
            box-shadow: 0 8px 24px rgba(0,0,0,0.2);
            z-index: 1000;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            transform-origin: bottom right;
        }
        html[dir="rtl"] .chatbot-window {
            right: auto;
            left: 2rem;
            transform-origin: bottom left;
        }
        .chatbot-window.closed {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
            pointer-events: none;
        }
        .chatbot-header {
            padding: 1rem;
            background-color: var(--c-surface-alt);
            border-bottom: 1px solid var(--c-border);
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-shrink: 0;
        }
        .chatbot-header h3 {
            font-family: 'Cormorant Garamond', serif;
            font-weight: 700;
            font-size: 1.25rem;
            color: var(--c-heading);
        }
        .chatbot-messages {
            flex-grow: 1;
            overflow-y: auto;
            padding: 1rem;
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
        }
        .message-bubble {
            padding: 0.75rem 1rem;
            border-radius: 1rem;
            max-width: 80%;
            line-height: 1.5;
            word-wrap: break-word;
        }
        .message-bubble.user {
            background-color: var(--c-accent-primary);
            color: white;
            align-self: flex-end;
            border-bottom-right-radius: 0.25rem;
        }
        html[dir="rtl"] .message-bubble.user {
            align-self: flex-start;
            border-bottom-right-radius: 1rem;
            border-bottom-left-radius: 0.25rem;
        }
        .message-bubble.ai {
            background-color: var(--c-surface-alt);
            color: var(--c-text-primary);
            align-self: flex-start;
            border-bottom-left-radius: 0.25rem;
        }
        html[dir="rtl"] .message-bubble.ai {
            align-self: flex-end;
            border-bottom-left-radius: 1rem;
            border-bottom-right-radius: 0.25rem;
        }
        .chatbot-input-area {
            padding: 0.75rem;
            border-top: 1px solid var(--c-border);
            display: flex;
            gap: 0.5rem;
            align-items: center;
            flex-shrink: 0;
        }
        .chatbot-input {
            flex-grow: 1;
            padding: 0.75rem;
            border: 1px solid var(--c-border);
            border-radius: 0.5rem;
            background-color: var(--c-bg);
            color: var(--c-text-primary);
            font-size: 0.9rem;
        }
        .chatbot-input:focus {
            outline: 2px solid var(--c-accent-primary);
            outline-offset: -1px;
        }
        .chatbot-send-btn {
            background-color: var(--c-accent-primary);
            color: white;
            border: none;
            width: 44px;
            height: 44px;
            border-radius: 0.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: background-color 0.2s;
            flex-shrink: 0;
        }
        .chatbot-send-btn:hover {
            background-color: var(--c-accent-primary-hover);
        }
        .chatbot-send-btn:disabled {
            background-color: #ccc;
            cursor: not-allowed;
        }
        .typing-indicator {
            display: flex;
            align-items: center;
            gap: 4px;
            padding: 0.75rem 1rem;
        }
        .typing-indicator span {
            width: 8px;
            height: 8px;
            background-color: #999;
            border-radius: 50%;
            animation: bounce 1.4s infinite ease-in-out both;
        }
        .typing-indicator span:nth-of-type(1) { animation-delay: -0.32s; }
        .typing-indicator span:nth-of-type(2) { animation-delay: -0.16s; }
        @keyframes bounce {
            0%, 80%, 100% { transform: scale(0); }
            40% { transform: scale(1.0); }
        }
    `;

    // Send Icon SVG
    const SendIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
            <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z"/>
        </svg>
    );

    return (
        <>
            <style>{styles}</style>
            <div className={`chatbot-window ${!isOpen ? 'closed' : ''}`} role="dialog" aria-hidden={!isOpen}>
                <div className="chatbot-header">
                    <h3>{t('chatbot_heading' as any)}</h3>
                    <button onClick={toggleChat} className="p-2 -m-2 rounded-full hover:bg-black/10 transition-colors" aria-label={t('chatbot_close_label' as any)}>
                        <CloseIcon className="w-6 h-6 text-[var(--c-text-secondary)]"/>
                    </button>
                </div>
                <div className="chatbot-messages" ref={chatContainerRef}>
                    {messages.map((msg, index) => (
                        <div key={index} className={`message-bubble ${msg.sender}`}>
                            {msg.text}
                        </div>
                    ))}
                    {isLoading && (
                        <div className="message-bubble ai typing-indicator">
                            <span /><span /><span />
                        </div>
                    )}
                </div>
                <div className="chatbot-input-area">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        placeholder={t('chatbot_input_placeholder' as any)}
                        aria-label={t('chatbot_input_aria_label' as any)}
                        className="chatbot-input"
                    />
                    <button onClick={handleSend} disabled={isLoading || !input.trim()} className="chatbot-send-btn" aria-label={t('chatbot_send_label' as any)}>
                        <SendIcon />
                    </button>
                </div>
            </div>
            <button onClick={toggleChat} className="chatbot-fab" aria-label={t(isOpen ? 'chatbot_close_label' : 'chatbot_open_label' as any)}>
                {isOpen ? <CloseIcon className="w-8 h-8"/> : <ChatBubbleIcon className="w-8 h-8"/>}
            </button>
        </>
    );
};

export default Chatbot;