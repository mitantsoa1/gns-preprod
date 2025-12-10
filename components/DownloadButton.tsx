import Image from 'next/image'
import React from 'react'

interface DownloadButtonProps {
    className?: string
    divClassName?: string
    imageClassName?: string
    imageSrc?: string
    imageAlt?: string
    imageWidth?: number
    imageHeight?: number
    onClick?: () => void
}

const DownloadButton: React.FC<DownloadButtonProps> = ({
    className = '',
    divClassName = '',
    imageClassName = '',
    imageSrc = "/download.svg",
    imageAlt = "download",
    imageWidth = 32,
    imageHeight = 32,
    onClick
}) => {
    return (
        <div
            className={`w-12 h-12 rounded-full shadow-[0px_2px_6px_0px_rgba(0,_0,_0,_0.7)] flex items-center justify-center cursor-pointer ${divClassName} ${className}`}
            onClick={onClick}
        >
            <Image
                src={imageSrc}
                alt={imageAlt}
                width={imageWidth}
                height={imageHeight}
                className={imageClassName}
            />
        </div>
    )
}

export default DownloadButton