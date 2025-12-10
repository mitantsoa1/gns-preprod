'use client';

import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { TextRoll, TextRollProps } from '../motion-primitives/text-roll';

// We omit 'trigger' from TextEffectProps because this component will control it.
type RepeatableTextRollProps = Omit<TextRollProps, 'trigger'> & {
    // We can add props to control the `useInView` behavior
    threshold?: number;
    rootMargin?: `${number}px` | `${number}px ${number}px` | `${number}px ${number}px ${number}px` | `${number}px ${number}px ${number}px ${number}px`;
};

export default function RepeatableTextRoll({
    threshold = 0.2,
    rootMargin = "0px",
    ...rest
}: RepeatableTextRollProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, {
        once: false, // This is key for re-triggering
        amount: threshold,
        margin: rootMargin,
    });

    return (
        <div ref={ref}>
            {isInView && <TextRoll {...rest} />}
        </div>
    );
}
