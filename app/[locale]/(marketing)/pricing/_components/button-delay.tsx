import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import React from 'react'

const ButtonDelay = ({ text, className = '' }: { text: string, className?: string }) => {
    return (
        <Button className={cn(" border px-2 py-2 bg-jaune text-black rounded-xl text-sm whitespace-nowrap hover:bg-jaune/80", className)}>
            {text}
        </Button>
    )
}

export default ButtonDelay