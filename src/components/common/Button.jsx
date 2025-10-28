"use client";
//import { LucideIcon } from "lucide-react"; // যেকোনো lucide icon import করতে পারবে

export default function BrandButton({ text, Icon, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-auto md:min-w-30 text-center rounded bg-[#00acfc] text-white px-6 py-2 font-semibold hover:bg-[#11aafe] transition"
    >
      <span className="text-center">{text}</span>
     
    </button>
  );
}
