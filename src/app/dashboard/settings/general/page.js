"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronUp } from "lucide-react";
import menuItems from "@/app/settings/setting.json";

export default function Sidebar() {
  const [openMenu, setOpenMenu] = useState(null);
  const pathname = usePathname();

  const toggleMenu = (index) => {
    setOpenMenu(openMenu === index ? null : index);
  };

  return (
    <aside className="w-64 bg-gray-900 text-white h-screen flex flex-col">
      <div className="px-4 py-3 border-b border-gray-700">
        <h1 className="text-xl font-bold">🏨 Admin Panel</h1>
      </div>

      <nav className="flex-1 mt-4 overflow-y-auto">
        {menuItems.map((item, index) => (
          <div key={index}>
            <button
              onClick={() => toggleMenu(index)}
              className="flex justify-between items-center w-full px-4 py-2 hover:bg-gray-800 transition"
            >
              <span className="capitalize">{item.name}</span>
              {item.sub && (
                openMenu === index ? <ChevronUp size={18} /> : <ChevronDown size={18} />
              )}
            </button>

            {item.sub && openMenu === index && (
              <div className="ml-4 mt-1">
                {item.sub.map((subItem, subIndex) => (
                  <Link
                    key={subIndex}
                    href={`/${subItem}`}
                    className={`block px-3 py-1.5 text-sm rounded hover:bg-gray-800 transition capitalize ${
                      pathname === `/${subItem}` ? "bg-gray-800 text-blue-400" : "text-gray-300"
                    }`}
                  >
                    {subItem.replace(/([A-Z])/g, ' $1')}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
}
