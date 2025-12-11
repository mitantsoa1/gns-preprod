import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'

interface ButtonProps {
    text: string;
    href?: string;
    className?: string;
    variant?: 'default' | 'outline';
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
}

const ButtonPrimary: React.FC<ButtonProps> = (
    {
        text,
        href,
        className = '',
        variant = 'default',
        ...props
    }
) => {
    const baseStyles = "bg-black hover:bg-gray-800 text-white font-bold text-sm tracking-wider px-8 h-[50px] w-full md:w-auto"

    const variants = {
        default: 'bg-black text-gray-100 hover:bg-black/80',
        outline: 'bg-transparent text-gray-800 hover:bg-black/40 border border-gray-800'
    };

    const buttonClass = `${baseStyles} ${variants[variant]} ${className}`;

    if (href) {
        return (
            <Button asChild className={buttonClass} {...props}>
                <Link href={href}>
                    {text}
                </Link>
            </Button>
        )
    }
    return (
        <Button className={buttonClass} {...props} >
            {text}
        </Button>
    )
}

export default ButtonPrimary