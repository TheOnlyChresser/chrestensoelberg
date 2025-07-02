export default function Navbar () {
    return (
        <nav className="flex justify-center items-center w-full flex-col">
            <div className="bg-white dark:bg-black justify-between px-10 pt-2 items-center flex flex-row w-full">
                <div className="mb-2 flex items-center justify-center cursor-pointer">
                    <img
                    src="/apple-touch-icon.png"
                    alt="stock photo"
                    className="w-15 h-15"
                    />
                </div>
                <div className="mb-2">
                    <a href="/projekter" className="navLink">Projekter</a>
                    <a href="/om" className="navLink">Om mig</a>
                    <a href="/kontakt" className="navLink">Kontakt</a>
                </div>
            </div>
            <div className="w-full flex justify-center items-center">
                <div className="h-[1px] w-full rounded-2xl bg-gray-500">
                </div>
            </div>
        </nav>
    )
}