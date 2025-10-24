import NextImage from "next/image";
import {ComponentProps, HTMLAttributes, ReactNode} from "react";

type AsideProps = HTMLAttributes<HTMLDivElement> & {
    className?: string;
    children?: ReactNode
    color?: BackgroundColor
}

type AsideImage = ComponentProps<typeof NextImage> & {
    className?: string;
    children?: ReactNode;
    type?: Position;
}
type Position = "left" | "right" | "top" | "bottom"
type BackgroundColor = "white" | "black" | "blue" | "green";

export function AsideWrapper({children, className = "", color = "white", ...props}: AsideProps) {

    const colorClass: Record<BackgroundColor, string> = {
        white: "bg-white dark:bg-gray-950",
        black: "bg-gray-100/40 dark:bg-gray-900/40 dark:backdrop-blur-sm",
        blue: "bg-blue-100/40 dark:bg-blue-900/50",
        green: "bg-green-100/40 dark:bg-green-900/50",
    }

    return (
        <div className={`w-full md:min-h-screen grid md:grid-cols-12 grid-cols-1 ${className} ${colorClass[color]}`} {...props}>
            {children}
        </div>
    )
}

export function AsideText({children, className = "", ...props}: AsideProps) {
    return (
        <div className={`md:pr-16 py-8 md:col-span-7 text-lg leading-8 mx-5 p-1 text-wrap font-normal list-disc list-inside marker:text-sky-500 text-gray-700 dark:text-gray-200 space-y-1 h-full flex items-center ${className}`} {...props}>
            <div>
                {children}
            </div>
        </div>
    )
}

export function AsideImage({className = "", type="left", ...props}: AsideImage) {
    const positionClass: Record<Position, string> = {
        left: "",
        right: "",
        top: "",
        bottom: "",
    }
    return (
        <div className={`relative md:col-span-5 w-full h-[40vh] md:h-full object-cover ${positionClass[type]} ${className}`}>
            <NextImage fill className="object-cover" {...props}/>
        </div>
    )
}