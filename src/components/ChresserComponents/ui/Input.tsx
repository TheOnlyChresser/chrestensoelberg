import {HTMLProps, ReactNode} from "react";

type InputProps = HTMLProps<HTMLInputElement> & {
    children?: ReactNode;
    className?: string;
    containerSize?: SizeProps;
    color?: ColorProps;
}

type TextareaProps = HTMLProps<HTMLTextAreaElement> & {
    children?: ReactNode;
    className?: string;
    containerSize?: SizeProps;
    color?: ColorProps;
}

type SizeProps = "sm" | "md" | "lg" | "xl";
type ColorProps = "black" | "blue" | "yellow" | "green" | "red";

export function Input({children = "", className = "", containerSize = "md", color = "blue", ...props}: InputProps) {
    const sizeClass: Record<SizeProps, string> = {
        "sm": "",
        "md": "w-full border rounded-md py-2 px-4 focus:outline-none ring-4",
        "lg": "",
        "xl": "",
    }
    const colorClass: Record<ColorProps, string> = {
        "black": "dark:text-gray-50 dark:placeholder-white/60",
        "yellow": "",
        "blue": "dark:text-gray-50 dark:placeholder-white/60 border-gray-400/24 ring-transparent focus:ring-blue-600/16 focus:border-blue-600 text-black bg-white",
        "green": "",
        "red": "",
    }

    return (
        <input className={`${sizeClass[containerSize]} ${colorClass[color]} ${className}`} placeholder={children as string} aria-placeholder={children as string} {...props}/>
    )
}

export function Textarea({children = "", className = "", containerSize = "md", color = "blue", ...props}: TextareaProps) {
    const sizeClass: Record<SizeProps, string> = {
        "sm": "",
        "md": "w-full border rounded-md py-2 px-4 focus:outline-none ring-4",
        "lg": "",
        "xl": "",
    }
    const colorClass: Record<ColorProps, string> = {
        "black": "dark:text-gray-50 dark:placeholder-white/60",
        "yellow": "",
        "blue": "dark:text-gray-50 dark:placeholder-white/60 border-gray-400/24 ring-transparent focus:ring-blue-600/16 focus:border-blue-600 text-black bg-white",
        "green": "",
        "red": "",
    }

    return (
        <textarea className={`${sizeClass[containerSize]} ${colorClass[color]} ${className}`} placeholder={children as string} aria-placeholder={children as string} {...props}/>
    )
}