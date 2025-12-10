'use client';

import React from 'react';
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from '@/components/ui/select';
import { LucideIcon } from 'lucide-react';

interface Option {
    value: string;
    label: string;
}

interface FormFieldSelectProps {
    icon: LucideIcon;
    label: string;
    placeholder: string;
    options: Option[];
    value?: string;
    onValueChange?: (value: string) => void;
    className?: string;
}

export function FormFieldSelect({
    icon: Icon,
    label,
    placeholder,
    options,
    value,
    onValueChange,
    className = '',
}: FormFieldSelectProps) {
    return (
        <div className={`flex flex-col sm:flex-row md:flex-col md:items-start sm:items-center gap-2 w-full ${className}`}>
            <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center flex-shrink-0">
                    <Icon className="h-5 w-5 text-black" />
                </div>
                <label className="block text-base font-medium text-gray-900 sm:mb-0 text-left whitespace-nowrap">
                    {label}
                </label>
            </div>
            <div className="flex-1 sm:flex-none sm:min-w-40">
                <Select value={value} onValueChange={onValueChange}>
                    <SelectTrigger className="w-full h-10 text-base border-none shadow-none font-semibold justify-between pl-2 sm:pl-2 sm:justify-between">
                        <SelectValue placeholder={placeholder} />
                    </SelectTrigger>
                    <SelectContent>
                        {options.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}