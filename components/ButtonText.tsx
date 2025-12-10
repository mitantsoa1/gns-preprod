// components/ui/Button.tsx
import React from 'react';

interface ButtonProps {
    children: React.ReactNode;
    className?: string;
    variant?: 'default' | 'outline';
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
}

const ButtonText: React.FC<ButtonProps> = ({
    children,
    className = '',
    variant = 'default',
    ...props
}) => {
    const baseStyles = 'border border-gray-800 rounded-sm px-4 py-2 whitespace-nowrap transition-colors duration-200';

    const variants = {
        default: 'bg-black text-gray-100 hover:bg-black/80',
        outline: 'bg-transparent text-gray-800 hover:bg-gray-300'
    };

    const buttonClass = `${baseStyles} ${variants[variant]} ${className}`;

    return (
        <button className={buttonClass} {...props}>
            {children}
        </button>
    );
};

export default ButtonText;