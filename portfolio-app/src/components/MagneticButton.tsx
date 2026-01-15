"use client";

import { motion, useSpring, useMotionValue } from "framer-motion";
import { useRef, ReactNode, MouseEvent } from "react";

interface MagneticButtonProps {
    children: ReactNode;
    className?: string;
    strength?: number;
    onClick?: () => void;
    href?: string;
}

export default function MagneticButton({
    children,
    className = "",
    strength = 0.3,
    onClick,
    href,
}: MagneticButtonProps) {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { stiffness: 350, damping: 25 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = (e.clientX - centerX) * strength;
        const deltaY = (e.clientY - centerY) * strength;

        x.set(deltaX);
        y.set(deltaY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const content = (
        <motion.div
            ref={ref}
            className={`relative inline-flex items-center justify-center cursor-pointer ${className}`}
            style={{ x: springX, y: springY }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            whileTap={{ scale: 0.97 }}
            onClick={onClick}
        >
            {children}
        </motion.div>
    );

    if (href) {
        return (
            <a href={href} className="inline-block">
                {content}
            </a>
        );
    }

    return content;
}
