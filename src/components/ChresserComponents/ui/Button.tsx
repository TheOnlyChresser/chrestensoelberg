import {ButtonHTMLAttributes, ReactNode} from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    className?: string;
    children: ReactNode;
    color?: ButtonColor;
    size?: ButtonSize;
    button?: ButtonType;
};

type ButtonColor = "blue" | "black" | "green" | "red";
type ButtonSize = "sm" | "md" | "lg" | "xl" | "form-md" | "form-lg";
type ButtonType = "normal" | "outline" | "reverse" | "animated";
type ButtonColorTypes = {
    border: string;
    bg: string;
    text: string;
}
export default function Button ({className = "", children, color = "blue", size = "md", button="outline", ...props}: ButtonProps) {
    const colorClass: Record<ButtonColor, ButtonColorTypes> = {
        blue: {border: "border-blue-500", bg: "bg-blue-500", text: "text-blue-50"},
        black: {border: "border-black/80", bg: "bg-black", text: "text-gray-50"},
        green: {border: "border-green-500", bg: "bg-green-500", text: "text-green-50"},
        red: {border: "border-red-500", bg: "bg-red-500", text: "text-red-50"},
    }
    const sizeClass: Record<ButtonSize, string> = {
        sm: "p-2 border-1 rounded-lg text-sm",
        md: "py-4 px-6 border-2 rounded-2xl text-xl",
        lg: "py-6 px-9 border-2 rounded-2xl text-3xl",
        xl: "py-8 px-12 border-2 rounded-2xl text-4xl",
        "form-md": "py-3 px-6 w-full border-2 rounded-xl text-xl",
        "form-lg": "py-4 px-6 w-full border-2 rounded-xl text-xl"
    }

    const buttonClass = (color: ButtonColor, button: ButtonType) => {
        const basecolor = colorClass[color];

        switch (button) {
            case "normal":
                return `${basecolor.bg} ${basecolor.text} hover:opacity-90 active:opacity-90 border-transparent !rounded-sm`
            case "outline":
                return `${basecolor.border} hover:${basecolor.bg} hover:${basecolor.text} active:${basecolor.bg} active:${basecolor.text}`
            case "reverse":
                return `${basecolor.border} ${basecolor.bg} ${basecolor.text} hover:bg-transparent active:bg-transparent hover:text-black/80 active:text-black/80`
            case "animated":
                return `text-black/80 ${basecolor.border} hover:${basecolor.bg} hover:duration-500 hover:scale-[1.02] active:scale-[0.98] transition-transform duration-300 ease-out hover:${basecolor.text}`
        }

    }
    return (
        <button className={`text-black/80 cursor-pointer font-semibold shadow-sm hover:shadow-md active:shadow-md ${buttonClass(color, button)} ${sizeClass[size]} ${className}`} {...props}>
            {children}
        </button>
    )
}