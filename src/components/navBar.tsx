import Image from "next/image"

export default function Navbar () {
    return (
        <nav className="fixed justify-center items-center w-full flex-col">
            <div className="justify-between px-2 pt-2 items-center flex flex-row w-full">
                <a className="mb-2 flex items-center justify-center cursor-pointer">
                    <Image
                    width={50}
                    height={50}
                    src="/apple-touch-icon.png"
                    alt="Chresten Avatar"
                    className="w-15 h-15"
                    />
                </a>
                <div className="mb-2">
                    <a href="/projekter" className="navLink">Projekter</a>
                    <a href="/om" className="navLink">Om mig</a>
                    <a href="/kontakt" className="navLink">Kontakt</a>
                </div>
            </div>
        </nav>
    )
}