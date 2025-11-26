"use client";
//import { LucideIcon } from "lucide-react"; // যেকোনো lucide icon import করতে পারবে

export default function BrandButton({ text, Icon, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-auto md:min-w-24 text-center rounded bg-green-600 text-white px-6 py-2 font-semibold hover:bg-bg-green-700 transition"
    >
      <span className="text-center">{text}</span>
     
    </button>
  );
}
