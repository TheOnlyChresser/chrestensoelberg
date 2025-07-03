import {Icon} from "@iconify/react"

type SkillCardProps = {
    name: string;
    icon: string;
    website: string;
}

export default function SkillCard({name, icon, website}: SkillCardProps) {
    return (
        <a href={`${website}`} className="cursor-pointer flex-center space-x-2 p-4 bg-white/25 rounded-xl shadow-md hover:shadow-lg group hover:scale-110">
            <Icon icon={`${icon}`} width="24"/>
            <p className="text-md font-medium group-hover:text-lg">{name}</p>
        </a>
    )
}