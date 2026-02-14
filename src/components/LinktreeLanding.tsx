'use client';

import React, { useEffect, useRef, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ExternalLink, Youtube } from 'lucide-react';

// Utility for Tailwind classes
function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// Aurora Background Component
interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
    children: ReactNode;
    showRadialGradient?: boolean;
}

const AuroraBackground = ({
    className,
    children,
    showRadialGradient = true,
    ...props
}: AuroraBackgroundProps) => {
    return (
        <main>
            <div
                className={cn(
                    'relative flex flex-col h-[100vh] items-center justify-center bg-zinc-900 text-slate-950 transition-bg overflow-hidden',
                    className
                )}
                {...props}
            >
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div
                        className={cn(
                            `
            [--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)]
            [--dark-gradient:repeating-linear-gradient(100deg,var(--black)_0%,var(--black)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%)]
            [--aurora:repeating-linear-gradient(100deg,#3b82f6_10%,#6366f1_15%,#60a5fa_20%,#a78bfa_25%,#60a5fa_30%)]
            [background-image:var(--dark-gradient),var(--aurora)]
            [background-size:300%,_200%]
            [background-position:50%_50%,50%_50%]
            filter blur-[10px] invert-0
            after:content-[""] after:absolute after:inset-0
            after:[background-image:var(--dark-gradient),var(--aurora)]
            after:[background-size:200%,_100%] 
            after:animate-aurora after:[background-attachment:fixed] after:mix-blend-difference
            pointer-events-none
            absolute -inset-[10px] opacity-50 will-change-transform`,
                            showRadialGradient &&
                            `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,transparent_70%)]`
                        )}
                    ></div>
                </div>

                {/* Helper styles for animation */}
                <style dangerouslySetInnerHTML={{
                    __html: `
          @keyframes aurora {
            from { background-position: 50% 50%, 50% 50%; }
            to { background-position: 350% 50%, 350% 50%; }
          }
          .animate-aurora {
            animation: aurora 60s linear infinite;
          }
        `}} />

                <div className="relative z-10 w-full h-full overflow-y-auto overflow-x-hidden">
                    {children}
                </div>
            </div>
        </main>
    );
};

// Glow Card Component
interface GlowCardProps {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
    hue?: number;
}

const GlowCard: React.FC<GlowCardProps> = ({
    children,
    className = '',
    onClick,
    hue = 220,
}) => {
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const syncPointer = (e: PointerEvent) => {
            const { clientX: x, clientY: y } = e;
            if (cardRef.current) {
                const rect = cardRef.current.getBoundingClientRect();
                cardRef.current.style.setProperty('--x', (x - rect.left).toString());
                cardRef.current.style.setProperty('--y', (y - rect.top).toString());
            }
        };

        const currentCard = cardRef.current;
        if (currentCard) {
            // Use local mouse move for better performance on card
            currentCard.addEventListener('pointermove', syncPointer);
        }
        return () => {
            if (currentCard) currentCard.removeEventListener('pointermove', syncPointer);
        };
    }, []);

    return (
        <div
            ref={cardRef}
            role="button"
            onClick={onClick}
            className={cn(
                "group relative rounded-2xl border border-white/10 bg-zinc-900/50 p-0.5 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-lg",
                className
            )}
            style={{
                // @ts-ignore
                '--x': '0',
                '--y': '0',
                '--hue': hue,
            } as React.CSSProperties}
        >
            <div className="absolute inset-0 -z-10 overflow-hidden rounded-2xl">
                <div className="absolute -inset-full top-0 block h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(closest-side,hsla(var(--hue),80%,60%,0.3),transparent)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{ left: 'calc(var(--x) * 1px)', top: 'calc(var(--y) * 1px)' }} />
            </div>

            <div className="relative h-full w-full rounded-xl bg-zinc-950/80 p-6 backdrop-blur-xl">
                {children}
            </div>
        </div>
    );
};

// Main Linktree Component
export default function LinktreeLanding() {

    const handleUrlClick = (url: string) => {
        window.open(url, '_blank');
    };

    return (
        <AuroraBackground>
            <div className="w-full min-h-screen py-12 px-4 flex flex-col items-center justify-center">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-md space-y-8"
                >
                    {/* 1. Profile Section */}
                    <div className="text-center space-y-4">
                        <div className="relative mx-auto w-32 h-32">
                            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 blur-sm animate-pulse" />
                            <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white/20 bg-zinc-800 flex items-center justify-center">
                                {/* Placeholder image or avatar */}
                                <img
                                    src="/profile.png"
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <h1 className="text-2xl font-bold text-white flex items-center justify-center gap-2">
                                흑흑이의 놀이터 <span className="text-2xl">🎪</span>
                            </h1>
                            <p className="text-zinc-400 text-sm leading-relaxed max-w-xs mx-auto">
                                여름에 일본으로 떠나는 예비 외노자의<br />코딩 장난감 모음집
                            </p>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleUrlClick('https://www.youtube.com/@%ED%9D%91%ED%9D%91%EC%9E%85%EB%8B%88%EB%8B%A4')}
                            className="inline-flex items-center gap-2 px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-full font-medium transition-colors shadow-lg shadow-red-600/20"
                        >
                            <Youtube size={18} />
                            <span>유튜브 구경가기</span>
                        </motion.button>
                    </div>

                    {/* 2. App List Section */}
                    <div className="space-y-4">
                        {/* Card 1 */}
                        <GlowCard onClick={() => handleUrlClick('https://beauty-ai.vercel.app/')} hue={320}>
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-lg bg-pink-500/10 text-pink-400">
                                    <span className="text-2xl">🎭</span>
                                </div>
                                <div className="flex-1 space-y-1">
                                    <h3 className="text-lg font-semibold text-white/90">AI 성형 상담소</h3>
                                    <p className="text-sm text-zinc-400 leading-snug">
                                        무료 AI가 내주는 매운맛 성형 견적<br />
                                        <span className="text-xs text-zinc-500">(※ 팩폭 주의, 재미로만 보세요!)</span>
                                    </p>
                                </div>
                                <ExternalLink size={16} className="text-zinc-600 mt-1" />
                            </div>
                        </GlowCard>

                        {/* Card 2 */}
                        <GlowCard onClick={() => handleUrlClick('https://kpop-idol-ai.vercel.app/')} hue={260}>
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-lg bg-violet-500/10 text-violet-400">
                                    <span className="text-2xl">🎤</span>
                                </div>
                                <div className="flex-1 space-y-1">
                                    <h3 className="text-lg font-semibold text-white/90">K-POP 아이돌 닮은꼴 찾기</h3>
                                    <p className="text-sm text-zinc-400 leading-snug">
                                        억지로 찾아주는 나의 아이돌 닮은꼴<br />
                                        <span className="text-xs text-zinc-500">(※ 어이없음 주의)</span>
                                    </p>
                                </div>
                                <ExternalLink size={16} className="text-zinc-600 mt-1" />
                            </div>
                        </GlowCard>

                        {/* Card 3 */}
                        <GlowCard onClick={() => handleUrlClick('https://v0-project-huekhuek.vercel.app/')} hue={150}>
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-lg bg-green-500/10 text-green-400">
                                    <span className="text-2xl">💴</span>
                                </div>
                                <div className="flex-1 space-y-1">
                                    <h3 className="text-lg font-semibold text-white/90">한일 생존 가계부</h3>
                                    <p className="text-sm text-zinc-400 leading-snug">
                                        돈 막 쓰던 과거는 안녕! 일본 외노자 생활 버티기용 짠내나는 돈 관리 앱
                                    </p>
                                </div>
                                <ExternalLink size={16} className="text-zinc-600 mt-1" />
                            </div>
                        </GlowCard>
                    </div>

                    {/* 3. Footer Section */}
                    <footer className="pt-8 pb-4 text-center">
                        <p className="text-xs text-zinc-600">
                            아이디어가 있을때마다 업데이트 됩니다 💡
                        </p>
                    </footer>

                </motion.div>
            </div>
        </AuroraBackground>
    );
}
