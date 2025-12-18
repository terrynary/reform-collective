import { Hero } from "@/components/Hero";

export default function Home() {
  return (
    <main className="min-h-screen bg-white flex justify-center">
      <div className="w-full max-w-[1440px]">
        <Hero />
      </div>
    </main>
  );
}
