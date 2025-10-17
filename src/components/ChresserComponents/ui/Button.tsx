import {ButtonHTMLAttributes, ReactNode} from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    className?: string;
    children: ReactNode;
    color?: ButtonColor;
    size?: ButtonSize;
};

type ButtonColor = "blue" | "black" | "green" | "red";
type ButtonSize = "sm" | "md" | "lg" | "xl";

export default function Button ({className = "", children, color = "blue", size = "md", ...props}: ButtonProps) {
    const colorClass: Record<ButtonColor, string> = {
        blue: "border-blue-500 hover:bg-blue-500 hover:text-blue-50 active:bg-blue-500 hover:text-blue-50",
        black: "border-black/80 hover:bg-black hover:text-gray-50 active:bg-black hover:text-gray-50",
        green: "border-green-500 hover:bg-green-500 hover:text-green-50 active:bg-green-500 hover:text-green-50",
        red: "border-red-500 hover:bg-red-500 hover:text-red-50 active:bg-red-500 hover:text-red-50"
    }
    const sizeClass: Record<ButtonSize, string> = {
        sm: "p-2 border-1 rounded-lg text-sm",
        md: "py-4 px-6 border-2 rounded-2xl text-xl",
        lg: "py-6 px-9 border-2 rounded-2xl text-3xl",
        xl: "py-8 px-12 border-2 rounded-2xl text-4xl",
    }
    return (
        <button className={`text-black/80 cursor-pointer font-semibold shadow-sm hover:shadow-md active:shadow-md ${colorClass[color]} ${sizeClass[size]} ${className}`} {...props}>
            {children}
        </button>
    )
}