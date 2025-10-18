//TODO: tilføj tag som f.eks. "MEST POPULÆRE" eller "MEST VÆRDI"

import {DetailedHTMLProps, HTMLAttributes, ReactNode} from "react";

type PriceBlockWrapperProps = HTMLAttributes<HTMLDivElement> & {
    children: ReactNode;
    className?: string;
}

type PriceBlockTitleProps = HTMLAttributes<HTMLDivElement> & {
    children: ReactNode;
    className?: string;
}

type PriceBlockFeaturesProps = DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement> & {
    children: ReactNode;
    className?: string;
}

type PriceBlockUndertitleProps = HTMLAttributes<HTMLParagraphElement> & {
    children: ReactNode;
    className?: string;
}

export function PriceBlockWrappper({children, className = "", ...props}: PriceBlockWrapperProps) {
    return (
        <div className={`flex flex-col rounded-sm bg-gray-100 w-[28vw] h-[64vh] border-2 shadow-md border-black/80 items-center justify-between p-4 ${className}`} {...props}>
            {children}
        </div>
    )
}

export function PriceBlockTitle({children, className = "", ...props}: PriceBlockWrapperProps) {
    return (
        <div className={`flex flex-col w-full text-2xl pt-4 text-black/80 text-center font-bold ${className}`} {...props}>
            <h2>{children}</h2>
        </div>
    )
}

export function PriceBlockFeatures({children, className = "", ...props}: PriceBlockFeaturesProps) {
    return (
        <div className="px-8 py-4 flex items-start justify-between w-full">
            <ul className={`list-disc marker:text-sky-500 list-inside text-lg ${className}`} {...props}>
                {children}
            </ul>
        </div>
    )
}

export function PriceBlockUndertitle({children, className = "", ...props}: PriceBlockUndertitleProps) {
    return (
        <p className={`text-center text-gray-500 pb-2 ${className}`} {...props}>
            {children}
        </p>
    )
}

export function PriceBlockTextWrapper({children, className = "", ...props}: PriceBlockWrapperProps) {
    return (
        <div className={`space-y-2 justify-start ${className}`} {...props}>
            {children}
        </div>
    )
}