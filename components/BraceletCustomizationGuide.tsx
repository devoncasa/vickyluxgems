import React, { useState } from 'react';
import { CloseIcon } from './IconComponents.tsx';
import { useLanguage } from '../i18n/LanguageContext.tsx';

const DailyColorGuideModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const { lang } = useLanguage();

    const dailyData = {
        th: [
            { day: 'วันอาทิตย์', color: 'สีแดง', meaning: 'เสริมอำนาจ บารมี ความมั่นใจ' },
            { day: 'วันจันทร์', color: 'สีเหลืองอ่อน / ครีม', meaning: 'เสริมเมตตา สงบใจ นำความสงบสุข' },
            { day: 'วันอังคาร', color: 'สีชมพู', meaning: 'เสริมความรัก เสน่ห์ ความอบอุ่น' },
            { day: 'วันพุธ', color: 'สีเขียว', meaning: 'ส่งเสริมสุขภาพ ความเจริญงอกงาม' },
            { day: 'วันพฤหัสบดี', color: 'สีส้ม / ทอง', meaning: 'เสริมปัญญา การเรียนรู้ ความสำเร็จ' },
            { day: 'วันศุกร์', color: 'สีฟ้า / น้ำเงิน', meaning: 'เสริมความสงบเยือกเย็น ความเข้าใจ' },
            { day: 'วันเสาร์', color: 'สีม่วง / ดำ', meaning: 'เสริมความแข็งแกร่ง ความมั่นคง คุ้มครอง' }
        ],
        en: [
            { day: 'Sunday', color: 'Red', meaning: 'Boosts power, authority, and confidence' },
            { day: 'Monday', color: 'Light Yellow / Cream', meaning: 'Brings compassion, calmness, and peace' },
            { day: 'Tuesday', color: 'Pink', meaning: 'Enhances love, charm, and warmth' },
            { day: 'Wednesday', color: 'Green', meaning: 'Promotes health, vitality, and growth' },
            { day: 'Thursday', color: 'Orange / Gold', meaning: 'Supports wisdom, learning, and success' },
            { day: 'Friday', color: 'Blue', meaning: 'Encourages calmness, communication, and understanding' },
            { day: 'Saturday', color: 'Purple / Black', meaning: 'Builds strength, stability, and spiritual protection' }
        ]
    };
    
    const content = lang === 'th' ? dailyData.th : dailyData.en;
    const title = lang === 'th' ? '📅 สีประจำวันและความหมาย' : '📅 Daily Colors & Their Meanings';

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm" onClick={onClose}>
            <div className="bg-[var(--c-surface)] rounded-xl shadow-2xl w-full max-w-lg overflow-hidden relative" onClick={(e) => e.stopPropagation()}>
                <div className="p-6">
                    <h3 className="text-2xl font-bold text-center !text-[var(--c-heading)] mb-4">
                        {title}
                    </h3>
                    <div className="space-y-2 text-left text-sm sm:text-base text-[var(--c-text-primary)]/90">
                        {content.map(item => (
                            <div key={item.day} className="grid grid-cols-3 gap-2 items-start p-2 rounded-md hover:bg-[var(--c-surface-alt)]">
                                <div className="font-semibold col-span-1">{item.day}</div>
                                <div className="text-gray-700 col-span-1">{item.color}</div>
                                <div className="text-gray-600 italic text-xs sm:text-sm col-span-1">{item.meaning}</div>
                            </div>
                        ))}
                    </div>
                     <div className="text-center mt-6">
                        <button onClick={onClose} className="px-6 py-2 rounded-lg bg-stone-200 text-stone-700 font-semibold hover:bg-stone-300 transition-colors">
                            ปิด / Close
                        </button>
                    </div>
                </div>
                 <button onClick={onClose} className="absolute top-4 right-4 text-stone-500 hover:text-stone-800 transition-colors rounded-full p-1 hover:bg-stone-100" aria-label="Close">
                    <CloseIcon className="h-6 w-6"/>
                </button>
            </div>
        </div>
    );
};


const BraceletCustomizationGuide: React.FC = () => {
    const { lang } = useLanguage();
    const [isColorGuideOpen, setIsColorGuideOpen] = useState(false);

    const instructions = {
        th: {
            title: '🧠 วิธีออกแบบกำไลอำพันในแบบของคุณ',
            steps: [
                '<strong>1. เริ่มจากเลือกขนาดข้อมือของคุณ</strong><br/>&emsp;เลือกความกระชับที่ต้องการ:<br/>&emsp;🔘 กระชับพอดี หรือ 🔘 ใส่หลวมสบาย',
                '<strong>2. เลือกสไตล์การออกแบบ:</strong>',
            ],
            styles: [
                '<strong>🔸 กำไลโทนสีเดียว</strong><br/>&ndash; คลิก “ลบเม็ดอำพัน” จนเหลือเพียง 1 เม็ด<br/>&ndash; จากนั้นคลิกที่เม็ดอำพันเพื่อเลือกสีและขนาด',
                '<strong>🔸 กำไลหลากสี / Fancy – มี 2 วิธี:</strong><br/>1️⃣ คลิก “เพิ่มเม็ดอำพัน” แล้วปรับสีและขนาดโดยแตะเม็ดในแถวตัวอย่าง<br/>2️⃣ เลือกใช้ระบบออกแบบอัจฉริยะ แล้วแตะเม็ดในแถวตัวอย่างหากต้องการเปลี่ยนสีหรือขนาด'
            ]
        },
        en: {
            title: '🧠 How to Design Your Custom Amber Bracelet',
            steps: [
                '<strong>1. Start by selecting your wrist size.</strong><br/>&emsp;Choose between:<br/>&emsp;🔘 Snug Fit or 🔘 Loose Fit',
                '<strong>2. Choose your bracelet style:</strong>',
            ],
            styles: [
                '<strong>🔸 Single-Color Design</strong><br/>&ndash; Click “Remove Bead(s)” until only 1 bead remains<br/>– Then click that bead to select color and size',
                '<strong>🔸 Fancy / Multi-Color – 2 Options:</strong><br/>1️⃣ Click “Add Bead(s)” and customize by tapping the preview beads to adjust color and size<br/>2️⃣ Use the Intelligent Designer to generate a pattern, then tap beads in the preview row to tweak colors or sizes as needed'
            ]
        }
    };
    
    const currentInstructions = lang === 'th' ? instructions.th : instructions.en;
    const dailyColorGuideButtonText = lang === 'th' ? '📅 สีประจำวันและความหมาย' : '📅 Daily Colors & Meanings';

    return (
        <>
            {isColorGuideOpen && <DailyColorGuideModal onClose={() => setIsColorGuideOpen(false)} />}
            
            <div className="prose-none text-[var(--c-text-primary)]/90 mx-auto mb-12 p-6 rounded-lg border border-[#AD8141] bg-[#FDF6EC]">
                <h2 className="text-2xl md:text-3xl font-bold text-[var(--c-heading)] my-0">{currentInstructions.title}</h2>

                <div className="mt-4 space-y-4 text-base md:text-lg">
                    {currentInstructions.steps.map((step, i) => <p key={i} dangerouslySetInnerHTML={{ __html: step }} />)}
                    <div className="pl-4">
                        {currentInstructions.styles.map((style, i) => <p key={i} dangerouslySetInnerHTML={{ __html: style }} />)}
                    </div>
                </div>

                <div className="text-center mt-6 pt-4 border-t border-[#AD8141]/30">
                    <button 
                        onClick={() => setIsColorGuideOpen(true)}
                        className="text-sm font-semibold text-amber-800 hover:text-amber-900 transition-colors underline"
                    >
                        {dailyColorGuideButtonText}
                    </button>
                </div>
            </div>
        </>
    );
};

export default BraceletCustomizationGuide;
