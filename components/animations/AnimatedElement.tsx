'use client';
import { motion, useAnimation, useInView } from 'framer-motion';
import { ReactNode, useEffect, useRef } from 'react';

type Direction = "up" | "down" | "left" | "right";
type AnimationType = "fade" | "slide" | "scale" | "blur" | "rotate" | "flip" | "bounce" | "elastic" | "blur-fade";

type AnimatedElementProps = {
    children: ReactNode,
    animation?: AnimationType,
    direction?: Direction,
    delay?: number,
    triggerOnce?: boolean,
    threshold?: number,
    rootMargin?: string,
    duration?: number,
    hover?: boolean,
    blurAmount?: number
}

export default function AnimatedElement({
    children,
    animation = "slide",
    direction = "up",
    delay = 0,
    triggerOnce = false,
    threshold = 0.2,
    rootMargin = "0px",
    duration = 1.2,
    hover = false,
    blurAmount = 15
}: AnimatedElementProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, {
        once: triggerOnce,
        amount: threshold,
        margin: rootMargin as `${number}px` | `${number}%`
    });
    const controls = useAnimation();

    useEffect(() => {
        if (isInView) {
            controls.start("visible");
        } else if (!triggerOnce) {
            controls.start("hidden");
        }
    }, [controls, isInView, triggerOnce]);

    // Animation au chargement si l'élément est déjà visible
    useEffect(() => {
        if (isInView) {
            controls.start("visible");
        }
    }, []);

    // Directions pour les animations slide
    const directions = {
        up: { y: 100, x: 0 },
        down: { y: -100, x: 0 },
        left: { x: 100, y: 0 },
        right: { x: -100, y: 0 },
    };

    // Configuration des variantes d'animation
    const variants: any = {
        fade: {
            hidden: { opacity: 0 },
            visible: {
                opacity: 1,
                transition: { duration, delay, ease: "easeOut" }
            }
        },
        slide: {
            hidden: { opacity: 0, ...directions[direction] },
            visible: {
                opacity: 1,
                x: 0,
                y: 0,
                transition: { duration, delay, ease: [0.22, 1, 0.36, 1] }
            }
        },
        scale: {
            hidden: { opacity: 0, scale: 0.8 },
            visible: {
                opacity: 1,
                scale: 1,
                transition: { duration, delay, ease: [0.34, 1.56, 0.64, 1] }
            }
        },
        blur: {
            hidden: { opacity: 0, filter: `blur(${blurAmount}px)` },
            visible: {
                opacity: 1,
                filter: "blur(0px)",
                transition: { duration, delay, ease: "easeOut" }
            }
        },
        "blur-fade": {
            hidden: {
                opacity: 0,
                filter: `blur(${blurAmount}px)`,
                ...directions[direction]
            },
            visible: {
                opacity: 1,
                filter: "blur(0px)",
                x: 0,
                y: 0,
                transition: {
                    duration,
                    delay,
                    ease: [0.25, 0.46, 0.45, 0.94]
                }
            }
        },
        rotate: {
            hidden: { opacity: 0, rotate: direction === "left" ? -10 : 10, scale: 0.9 },
            visible: {
                opacity: 1,
                rotate: 0,
                scale: 1,
                transition: { duration, delay, ease: "easeOut" }
            }
        },
        flip: {
            hidden: { opacity: 0, rotateX: direction === "up" ? 90 : -90, scale: 0.8 },
            visible: {
                opacity: 1,
                rotateX: 0,
                scale: 1,
                transition: { duration: duration * 1.2, delay, ease: "easeOut" }
            }
        },
        bounce: {
            hidden: { opacity: 0, y: -50, scale: 0.3 },
            visible: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                    duration,
                    delay,
                    type: "spring" as const,
                    bounce: 0.5,
                    damping: 10
                }
            }
        },
        elastic: {
            hidden: { opacity: 0, scale: 0 },
            visible: {
                opacity: 1,
                scale: 1,
                transition: {
                    duration: duration * 1.3,
                    delay,
                    type: "spring" as const,
                    stiffness: 300,
                    damping: 15
                }
            }
        }
    };

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={variants[animation]}
            whileHover={hover ? { scale: 1.05, transition: { duration: 0.2 } } : undefined}
        >
            {children}
        </motion.div>
    );
}

// Composant StaggerContainer pour animer plusieurs éléments en séquence
export function StaggerContainer({
    children,
    staggerDelay = 0.1,
    triggerOnce = false
}: {
    children: ReactNode,
    staggerDelay?: number,
    triggerOnce?: boolean
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, {
        once: triggerOnce,
        amount: 0.1
    });
    const controls = useAnimation();

    useEffect(() => {
        if (isInView) {
            controls.start("visible");
        } else {
            controls.start("hidden");
        }
    }, [controls, isInView]);

    // Animation au chargement si l'élément est déjà visible
    useEffect(() => {
        if (isInView) {
            controls.start("visible");
        }
    }, []);

    const container: any = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: staggerDelay
            }
        }
    };

    const item: any = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    return (
        <motion.div
            ref={ref}
            variants={container}
            initial="hidden"
            animate={controls}
        >
            {Array.isArray(children) ? (
                children.map((child, index) => (
                    <motion.div key={index} variants={item}>
                        {child}
                    </motion.div>
                ))
            ) : (
                <motion.div variants={item}>{children}</motion.div>
            )}
        </motion.div>
    );
}

// Composant pour animer les lettres une par une
export function AnimatedText({
    text,
    delay = 0,
    staggerDelay = 0.03,
    duration = 0.5,
    animation = "fade",
    triggerOnce = false
}: {
    text: string,
    delay?: number,
    staggerDelay?: number,
    duration?: number,
    animation?: "fade" | "slideUp" | "slideDown" | "scale" | "blur" | "wave" | "rotate" | "blur-fade",
    triggerOnce?: boolean
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, {
        once: triggerOnce,
        amount: 0.5
    });
    const controls = useAnimation();

    useEffect(() => {
        if (isInView) {
            controls.start("visible");
        } else if (!triggerOnce) {
            controls.start("hidden");
        }
    }, [controls, isInView, triggerOnce]);

    useEffect(() => {
        if (isInView) {
            controls.start("visible");
        }
    }, []);

    const letters = text.split("");

    const container: any = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: staggerDelay,
                delayChildren: delay
            }
        }
    };

    const letterVariants: any = {
        fade: {
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { duration } }
        },
        slideUp: {
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0, transition: { duration, ease: [0.22, 1, 0.36, 1] } }
        },
        slideDown: {
            hidden: { opacity: 0, y: -50 },
            visible: { opacity: 1, y: 0, transition: { duration, ease: [0.22, 1, 0.36, 1] } }
        },
        scale: {
            hidden: { opacity: 0, scale: 0 },
            visible: { opacity: 1, scale: 1, transition: { duration, type: "spring", stiffness: 200 } }
        },
        blur: {
            hidden: { opacity: 0, filter: "blur(10px)" },
            visible: { opacity: 1, filter: "blur(0px)", transition: { duration } }
        },
        "blur-fade": {
            hidden: {
                opacity: 0,
                filter: "blur(15px)",
                y: 10
            },
            visible: {
                opacity: 1,
                filter: "blur(0px)",
                y: 0,
                transition: {
                    duration: duration * 1.2,
                    ease: [0.25, 0.46, 0.45, 0.94]
                }
            }
        },
        wave: {
            hidden: { opacity: 0, y: 20, rotate: -10 },
            visible: {
                opacity: 1,
                y: 0,
                rotate: 0,
                transition: {
                    duration,
                    type: "spring",
                    stiffness: 300,
                    damping: 15
                }
            }
        },
        rotate: {
            hidden: { opacity: 0, rotateY: 90, scale: 0.5 },
            visible: {
                opacity: 1,
                rotateY: 0,
                scale: 1,
                transition: { duration, ease: "easeOut" }
            }
        }
    };

    return (
        <motion.span
            ref={ref}
            variants={container}
            initial="hidden"
            animate={controls}
            style={{ display: "inline-block" }}
        >
            {letters.map((letter, index) => (
                <motion.span
                    key={index}
                    variants={letterVariants[animation]}
                    style={{ display: "inline-block", whiteSpace: letter === " " ? "pre" : "normal" }}
                >
                    {letter}
                </motion.span>
            ))}
        </motion.span>
    );
}