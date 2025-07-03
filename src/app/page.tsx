import Hero from "@/components/Hero";
import OmMig from "@/components/OmMig";
export default function Home() {
  return (
      <div className="bg-standard flex-center w-full">
        <div className="noisy w-full flex justify-center">
    <div className="w-full max-w-400 min-h-screen flex-col flex justify-center">
    <Hero/>
    <OmMig/>
      </div>
    </div>
      </div>
  );
}
