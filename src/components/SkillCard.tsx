import {Icon} from "@iconify/react"

type SkillCardProps = {
    name: string;
    icon: string;
}

export default function SkillCard({name, icon}: SkillCardProps) {
    return (
        <div className="flex-center space-x-2 p-4 bg-white/25 rounded-xl shadow-md">
            <Icon icon={`${icon}`} width="20"/>
            <p className="text-md font-medium">{name}</p>
        </div>
    )
}