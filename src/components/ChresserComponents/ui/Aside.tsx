import NextImage from "next/image";

type AsideProps = HTMLAttributes<HTMLDivElement> & {
    className?: string;
    children?: ReactNode
    color?: BackgroundColor
}

type AsideImage = HTMLAttributes<HTMLImageElement> & {
    className?: string;
    children?: ReactNode
}

type BackgroundColor = "white" | "black" | "blue" | "green";

export function AsideWrapper({children, className = "", color = "white", ...props}: AsideProps) {

    const colorClass: Record<ButtonColor, ButtonColorTypes> = {
        white: "bg-white",
        black: "bg-gray-100/40",
        blue: "bg-blue-100/40",
        green: "bg-green-100/40",
    }

    return (
        <div className={`w-full md:min-h-screen grid md:grid-cols-12 grid-cols-1 ${className} ${colorClass[color]}`} {...props}>{children}</div>
    )
}

export function AsideText({children, className = "", ...props}: AsideProps) {
    return (
        <div className={`pr-16 py-8 md:col-span-7 text-lg leading-8 mx-5 p-1 text-wrap font-normal list-disc list-inside marker:text-sky-500 text-gray-700 space-y-1 h-full flex items-center ${className}`} {...props}>
            <div>
                {children}
            </div>
        </div>
    )
}

export function AsideImage({className = "", ...props}: AsideImage) {
    return (
        <div className={`relative md:col-span-5 w-full h-[40vh] md:h-full object-cover ${className}`}>
            <NextImage fill className="object-cover" {...props}/>
        </div>
    )
}