import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-[#DDEFFF] to-white shadow-md">
      <div className="max-w-8xl mx-auto px-4 py-3 flex items-center gap-2">
        <Image src="/logo.svg" alt="logo" width={28} height={28} />
        <span className="font-bold text-gray-800 text-2xl">Smart Translator</span>
      </div>
    </header>
  );
}
