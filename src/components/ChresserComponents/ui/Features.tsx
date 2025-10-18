import {HTMLAttributes, ReactNode} from "react";

type FeatureProps = HTMLAttributes<HTMLDivElement> & {
    className?: string;
    children: ReactNode;
    color?: FeatureColor;
    size?: FeatureSize;
    overskrift: string;
};

type FeatureColor = "blue" | "black" | "green" | "red";
type FeatureSize = "sm" | "md" | "lg" | "xl";

export default function Button ({className = "", children, color = "green", size = "md", overskrift, ...props}: FeatureProps) {
    const colorClass: Record<FeatureColor, string> = {
        blue: "text-blue-500",
        black: "text-black/80",
        green: "text-green-500",
        red: "text-red-500",
    }
    const sizeClass: Record<FeatureSize, string> = {
        sm: "",
        md: "",
        lg: "",
        xl: "",
    }
    return (
        <div className={`flex items-center flex-col ${colorClass[color]} ${sizeClass[size]} ${className}`} {...props}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                 stroke="currentColor" className="size-12">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5"/>
            </svg>
            <h3 className="text-lg font-bold text-black/80 text-center">{overskrift}</h3>
            <p className="mt-1 text-gray-500 text-center max-w-[40vw] md:max-w-[20vw]">{children}</p>
        </div>
    )
}