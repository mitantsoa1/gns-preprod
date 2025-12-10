'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';

interface GetStartedArrowProps {
    className?: string;
    text?: string;
    arrowWidth?: number;
    arrowHeight?: number;
    arrowColor?: string;
    hoverColor?: string;
    textClassName?: string;
    arrowHeadSize?: number;
    onClick?: () => void;
    href?: string;
    animated?: boolean;
}

const LearnMore = ({
    className,
    text = "Learn more",
    arrowWidth = 50,
    arrowHeight = 2,
    arrowColor = "#000000",
    hoverColor = "#00367d",
    textClassName,
    arrowHeadSize = 6,
    onClick,
    href,
    animated = true
}: GetStartedArrowProps) => {

    const lineEndX = arrowWidth - arrowHeadSize * 2;

    const content = (
        <>
            <div
                className={cn(
                    "inline-flex justify-center item-center gap-2 group transition-all duration-300",
                    className
                )}
                onClick={onClick}
            >
                {/* Texte */}
                <span
                    className={cn(
                        "text-sm font-bold text-gray-600 transition-colors duration-300",
                        textClassName
                    )}
                // style={{ color: arrowColor }}
                >
                    {text}
                </span>

                {/* SVG Flèche */}
                <svg
                    width={arrowWidth}
                    height={arrowHeight + arrowHeadSize * 2}
                    viewBox={`0 0 ${arrowWidth} ${arrowHeight + arrowHeadSize * 2}`}
                    className="transition-all duration-300 mt-[4px]"
                >
                    <line
                        x1="0"
                        y1={(arrowHeight + arrowHeadSize * 2) / 2}
                        x2={lineEndX}
                        y2={(arrowHeight + arrowHeadSize * 2) / 2}
                        stroke={arrowColor}
                        strokeWidth={arrowHeight}
                        className="transition-colors duration-300"
                    />
                    <polygon
                        points={`
                            ${lineEndX},${((arrowHeight + arrowHeadSize * 2) / 2) - arrowHeadSize} 
                            ${arrowWidth},${(arrowHeight + arrowHeadSize * 2) / 2} 
                            ${lineEndX},${((arrowHeight + arrowHeadSize * 2) / 2) + arrowHeadSize}
                        `}
                        fill={arrowColor}
                        className="transition-colors duration-300"
                    />
                </svg>
            </div>
        </>
    );

    if (href) {
        return (
            <Link href={href} className="inline-block">
                {content}
            </Link>
        );
    }

    return content;
};

export default LearnMore;