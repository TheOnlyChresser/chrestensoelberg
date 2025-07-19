"use client";

import {Icon} from "@iconify/react"
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

type SkillCardProps = {
    name: string;
    icon: string;
    website: string;
    description: string;
}

export default function SkillCard({name, icon, website, description}: SkillCardProps) {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleClick = () => {
        setIsPopupOpen(true);
    };

    const handleClose = () => {
        setIsPopupOpen(false);
    };

    const handleVisitWebsite = () => {
        window.open(website, '_blank');
        setIsPopupOpen(false);
    };

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setIsPopupOpen(false);
            }
        };

        if (isPopupOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isPopupOpen]);

    return (
        <div className="skill-card">
            <div 
                onClick={handleClick}
                className="cursor-pointer flex-center space-x-2 p-4 bg-white/25 rounded-xl shadow-md hover:shadow-lg focus:shadow-lg group hover:bg-black/25 hover:text-white transition-all duration-200"
            >
                <Icon icon={`${icon}`} width="24"/>
                <p className="text-md font-medium">{name}</p>
            </div>

            {isPopupOpen && mounted && createPortal(
                <div 
                    className="fixed inset-0 bg-black/10 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
                    onClick={handleClose}
                    style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
                >
                    <div 
                        className="bg-white/20 backdrop-blur-xl rounded-2xl p-6 max-w-md w-full shadow-2xl border border-white/20 transform transition-all duration-200"
                        onClick={(e) => e.stopPropagation()}
                        style={{ 
                            maxHeight: '90vh',
                            overflowY: 'auto'
                        }}
                    >
                        <div className="flex items-center space-x-3 mb-4">
                            <Icon icon={`${icon}`} width="32" className="text-blue-600"/>
                            <h3 className="text-xl font-bold text-gray-800">{name}</h3>
                        </div>
                        
                        <p className="text-gray-700 mb-6 leading-relaxed">
                            {description}
                        </p>
                        
                        <div className="flex space-x-3">
                            <button
                                onClick={handleVisitWebsite}
                                className="rounded-md flex-1 text-base font-semibold cursor-pointer transition delay-[25ms] hover:bg-blue-500/75 active:bg-blue-500/75 backdrop-blur-2xl border-black/30 border-1 hover:text-white/90 active:text-white/90 bg-white/30 text-blue-500/90"
                            >
                                Besøg Hjemmeside
                            </button>
                            <button
                                onClick={handleClose}
                                className="rounded-md flex-1 py-2 text-base font-semibold cursor-pointer transition delay-[25ms] bg-white/30 backdrop-blur-2xl border-black/30 border-1 text-black/90 hover:bg-black/30 active:bg-black/30 hover:text-white/90 active:text-white/90"
                            >
                                Luk
                            </button>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </div>
    )
}