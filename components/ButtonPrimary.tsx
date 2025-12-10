import React from 'react'
import { Button } from './ui/button'

const ButtonPrimary = ({ text, className }: { text: string, className?: string }) => {
    return (
        <Button className={`${className} bg-black hover:bg-gray-800 text-white font-bold text-sm tracking-wider px-8 h-[50px] w-full md:w-auto `}>
            {text}
        </Button>
    )
}

export default ButtonPrimary