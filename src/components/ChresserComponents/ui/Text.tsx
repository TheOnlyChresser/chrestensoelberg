import { HTMLAttributes, ReactNode } from "react";

type TextProps = HTMLAttributes<HTMLHeadingElement> & {
    children?: ReactNode;
    className?: string;
    size?: SizeProps;
    color?: ColorProps;
    position?: PositionProps;
}

type SizeProps = "sm" | "md" | "lg" | "xl"
type ColorProps = "black" | "yellow" | "blue" | "red"
type PositionProps = "left" | "center" | "right"

export function Heading({children = "", className = "", size = "xl", color = "black", position = "center", ...props}: TextProps) {
    const sizeClass: Record<SizeProps, string> = {
        "sm": "",
        "md": "",
        "lg": "",
        "xl": "mt-4 text-5xl px-4 md:text-7xl md:max-w-[60vw]",
    }
    const colorClass: Record<ColorProps, string> = {
        "black": "text-black dark:text-gray-50",
        "yellow": "",
        "blue": "",
        "red": "",
    }
    const positionClass: Record<PositionProps, string> = {
        "left": "text-start",
        "center": "text-center",
        "right": "text-end",
    }

    return (
        <h1 className={`font-bold leading-tighter tracking-tight ${sizeClass[size]} ${colorClass[color]} ${positionClass[position]} ${className}`} {...props}>
            {children}
        </h1>
    )
}

export function Subheading({children = "", className="", size = "md", color = "black", position = "center", ...props}: TextProps) {
    const colorClass: Record<ColorProps, string> = {
        "black": "text-gray-500 dark:text-gray-400",
        "yellow": "",
        "blue": "",
        "red": "",
    }
    const sizeClass: Record<SizeProps, string> = {
        "sm": "",
        "md": "px-4 text-md md:text-xl mt-6 md:max-w-[72vw] md:px-0",
        "lg": "",
        "xl": "",
    }
    const positionClass: Record<PositionProps, string> = {
        "left": "text-start",
        "center": "text-center",
        "right": "text-end"
    }
    return (
        <p className={`wrap-words ${colorClass[color]} ${sizeClass[size]} ${positionClass[position]} ${className}`} {...props}>
            {children}
        </p>
    )
}