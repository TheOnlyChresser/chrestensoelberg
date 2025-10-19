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
    amount: string | number;
    currency?: string;
    className?: string;
}

export function PriceBlockWrappper({ children, className = "", ...props }: PriceBlockWrapperProps) {
    return (
        <div className={`flex flex-col rounded-xl bg-white w-full md:w-[28vw] min-h-[40vh] md:min-h-[65vh] border border-gray-200 shadow-lg items-center justify-between p-6 transition-transform hover:scale-105 hover:shadow-xl ${className}`} {...props}>
            {children}
        </div>
    )
}

export function PriceBlockTitle({children, className = "", ...props}: PriceBlockTitleProps) {
    return (
        <div className={`w-full text-3xl font-semibold text-center text-gray-800 mb-4 ${className}`} {...props}>
            {children}
        </div>
    )
}

export function PriceBlockPrice({ children, currency = "kr", className = "", ...props }: PriceBlockPriceProps) {
    return (
        <div className={`text-center text-4xl font-bold text-gray-900 my-2 ${className}`} {...props}>
            {children}{currency}
        </div>
    )
}

export function PriceBlockFeatures({children, className = "", ...props}: PriceBlockFeaturesProps) {
    return (
        <div className="px-4 py-4 w-full flex-1">
            <ul className={`list-disc list-inside marker:text-sky-500 text-base text-gray-700 space-y-2 ${className}`} {...props}>
                {children}
            </ul>
        </div>
    )
}

export function PriceBlockUndertitle({children, className = "", ...props}: PriceBlockUndertitleProps) {
    return (
        <p className={`text-center text-gray-500 text-sm pt-2 ${className}`} {...props}>
            {children}
        </p>
    )
}

export function PriceBlockTextWrapper({children, className = "", ...props}: PriceBlockWrapperProps) {
    return (
        <div className={`space-y-3 w-full ${className}`} {...props}>
            {children}
        </div>
    )
}
