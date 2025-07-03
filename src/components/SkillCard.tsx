import {Icon} from "@iconify/react"

export default function SkillCard({name, icon}) {
    return (
        <div className="flex-center space-x-2 p-4 bg-white/25 rounded-xl shadow-md w-30 h-15">
            <Icon icon={`${icon}`} width="20"/>
            <p className="text-md font-medium">{name}</p>
        </div>
    )
}