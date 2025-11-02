import Button from "@/components/ChresserComponents/ui/Button";
import {Heading, Subheading} from "@/components/ChresserComponents/ui/Text";

export default function d() {
    return (
        <div className="w-full min-h-screen flex items-center justify-center flex-col">
            <div className="bg-white flex flex-col items-center justify-center p-4 rounded-2xl shadow-md">
                <Heading className="!mt-0">404</Heading>
                <Subheading className="!mt-2">Siden kunne ikke blive fundet.</Subheading>
            </div>
            <Button className="mt-8" button="normal">Gå tilbage til forsiden</Button>
        </div>
    )
}