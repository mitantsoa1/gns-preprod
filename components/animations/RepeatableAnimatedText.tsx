'use client';

import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { TextEffect, TextEffectProps } from '@/components/motion-primitives/text-effect';

// We omit 'trigger' from TextEffectProps because this component will control it.
type RepeatableAnimatedTextProps = Omit<TextEffectProps, 'trigger'> & {
    // We can add props to control the `useInView` behavior
    threshold?: number;
    rootMargin?: `${number}px` | `${number}px ${number}px` | `${number}px ${number}px ${number}px` | `${number}px ${number}px ${number}px ${number}px`;
};

export default function RepeatableAnimatedText({
    threshold = 0.2,
    rootMargin = "0px",
    ...rest
}: RepeatableAnimatedTextProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, {
        once: false, // This is key for re-triggering
        amount: threshold,
        margin: rootMargin,
    });

    return (
        <div ref={ref}>
            <TextEffect {...rest} trigger={isInView} />
        </div>
    );
}
