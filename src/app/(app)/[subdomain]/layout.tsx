"use client"
import {SidebarProvider, SidebarTrigger, useSidebar} from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/ChresserComponents/app-sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider className="font-montserrat">
            <AppSidebar />
            <main className="w-full min-h-500 flex flex-col bg-gray-50">
                <div className="fixed bg-white/40 border rounded-sm backdrop-blur-sm ml-2 mt-2">
                <SidebarTrigger />
                </div>
                {children}
            </main>
        </SidebarProvider>
    )
}