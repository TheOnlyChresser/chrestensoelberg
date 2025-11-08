import { Clock, Home, Frame, MessageCircle, Settings, AppWindow } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem, useSidebar,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
    {
        title: "Hjem",
        url: "/",
        icon: Home,
    },
    {
        title: "Beskeder",
        url: "/beskeder",
        icon: MessageCircle,
    },
    {
        title: "Opdateringer",
        url: "/opdateringer",
        icon: Clock,
    },
    {
        title: "Design",
        url: "/design",
        icon: AppWindow,
    },
    {
        title: "Indstillinger",
        url: "/indstillinger",
        icon: Settings,
    },
]

export function AppSidebar() {
    const {
        state,
        open,
        setOpen,
        openMobile,
        setOpenMobile,
        isMobile,
        toggleSidebar,
    } = useSidebar()
    return (
        <div className={`${isMobile ? "ml-0": open? "ml-[152px]": "ml-12"} transition delay-150`}>
            <Sidebar collapsible={"icon"} variant={"sidebar"}>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {items.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild>
                                            <a href={item.url}>
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
            </Sidebar>
        </div>
    )
}