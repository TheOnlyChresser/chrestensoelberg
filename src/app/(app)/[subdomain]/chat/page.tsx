"use client"
import { useSubdomain } from "../SubdomainProvider"

export default function Page() {
    const { loggedIn } = useSubdomain()

    if (!loggedIn) {
        return null // login
    }

    return (
        <div className="w-full min-h-screen p-8">
            <h1 className="text-2xl font-bold mb-4">Chat</h1>
            <p className="text-gray-600">Her kan du chatte med support.</p>
        </div>
    )
}

