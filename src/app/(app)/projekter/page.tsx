import Link from "next/link";

export default function Page() {
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-tr from-white via-blue-50 to-green-50  dark:from-black dark:via-[#050A1F] dark:to-[#041F12] flex-col">
            <h1 className="text-7xl text-center font-bold text-gradient-2 drop-shadow-lg drop-shadow-white/50 pb-5">
                Kommer snart!
            </h1>
            <Link
                href="/"
                className="rounded-xl h-14 w-60 flex items-center justify-center text-lg font-semibold cursor-pointer border-1 border-black transition bg-white/20 backdrop-blur-md active:border-white/30 hover:border-white/30 text-black/80 shadow-md hover:bg-black/80 active:bg-blac/80 hover:text-white/80 active:text-white/80"
            >
                Gå tilbage til forsiden
            </Link>
        </div>
    );
}
