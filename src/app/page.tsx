import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <section className="absolute top-0 w-full h-screen">
      {/* Background Image */}
      <Image
        src="/hero.png"
        alt="Hero Image"
        fill
        priority
        className="object-cover"
      />

      {/* Overlay Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-100 bg-black/30">
        <h1 className="scroll-m-20 text-center text-5xl sm:text-7xl font-extrabold tracking-tight text-balance">
          Welcome to <span className="text-orange-600">She Can Foundation</span>
        </h1>
        <h4 className="scroll-m-20 mt-2 text-center text-base sm:text-2xl font-semibold tracking-tight brea">
          Official Intern Portal — Track your tasks, progress, and unlock
          opportunities! <Link href={"/login"} className="text-orange-600 underline">Get Started</Link>
        </h4>
      </div>
    </section>
  );
}
