import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

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

type PriceBlockPriceProps = HTMLAttributes<HTMLDivElement> & {
    children: ReactNode;
    currency?: string;
    className?: string;
}

export function PriceBlockWrappper({ children, className = "", ...props }: PriceBlockWrapperProps) {
    return (
        <div className={`group flex flex-col rounded-xl bg-white dark:bg-gray-950 w-full md:w-[28vw] min-h-[40vh] md:min-h-[65vh] border border-gray-200 dark:border-gray-800 shadow-lg items-center justify-between p-6 transition-transform hover:scale-105 hover:shadow-xl ${className}`} {...props}>
            {children}
        </div>
    )
}

export function PriceBlockTitle({children, className = "", ...props}: PriceBlockTitleProps) {
    return (
        <div className={`w-full text-3xl font-semibold text-center text-gray-800 dark:text-gray-200 mb-0 ${className}`} {...props}>
            {children}
        </div>
    )
}

export function PriceBlockPrice({ children, currency = "kr", className = "", ...props }: PriceBlockPriceProps) {
    return (
        <div className={`text-center text-xl font-bold text-gray-900 dark:text-gray-100 mt-0 mb-1 ${className}`} {...props}>
            {children}{currency}
        </div>
    )
}

export function PriceBlockFeatures({children, className = "", ...props}: PriceBlockFeaturesProps) {
    return (
        <div className="px-4 py-4 w-full flex-1">
            <ul className={`list-disc list-inside marker:text-sky-500 text-base text-gray-700 dark:text-gray-300 space-y-1 ${className}`} {...props}>
                {children}
            </ul>
        </div>
    )
}

export function PriceBlockUndertitle({children, className = "", ...props}: PriceBlockUndertitleProps) {
    return (
        <p className={`text-center text-gray-500 dark:text-gray-400 text-sm ${className}`} {...props}>
            {children}
        </p>
    )
}

export function PriceBlockTextWrapper({children, className = "", ...props}: PriceBlockWrapperProps) {
    return (
        <div className={`space-y-1 w-full ${className}`} {...props}>
            {children}
        </div>
    )
}

export function PriceBlockExtra({children, className = "", ...props}: PriceBlockWrapperProps) {
    return (
        <div className={`flex items-center justify-center ${className}`} {...props}>
            <span className="cursor-pointer bg-gradient-to-r from-blue-100 via-sky-100 to-cyan-100 text-sky-900 border border-sky-400 px-4 py-1 rounded-md text-sm md:text-base font-semibold shadow-sm tracking-wide animate-pulse text-center group-hover:animate-none text-wrap">
                {children}
            </span>
        </div>
    )
}