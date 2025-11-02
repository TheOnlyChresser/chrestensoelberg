import Button from "@/components/ChresserComponents/ui/Button";
import {Heading, Subheading} from "@/components/ChresserComponents/ui/Text";

export default function d() {
    return (
        <div className="w-full min-h-screen flex items-center justify-center flex-col">
            <Heading>404</Heading>
            <Subheading className="!mt-2">Siden kunne ikke blive fundet.</Subheading>
            <Button className="mt-8" button="normal">Gå tilbage til forsiden</Button>
        </div>
    )
}