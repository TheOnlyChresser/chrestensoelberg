import Link from "next/link";

export default function Page() {
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br flex-col from-[#e0eafc] to-[#cfdef3]">
            <h1 className="text-7xl font-bold text-gradient-2 drop-shadow-lg drop-shadow-white/50 pb-5">
                Kommer snart!
            </h1>
            <Link
                href="/public"
                className="rounded-xl h-14 w-60 flex items-center justify-center text-lg font-semibold cursor-pointer border-1 border-black transition bg-white/20 backdrop-blur-md hover:border-white/30 text-black/80 shadow-md hover:bg-black/80 hover:text-white/80"
            >
                Gå tilbage til forsiden
            </Link>
        </div>
    );
}
