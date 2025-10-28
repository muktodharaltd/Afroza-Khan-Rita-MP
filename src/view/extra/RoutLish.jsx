"use client";

import { useState } from "react";
import { List } from "lucide-react"; // icon library
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const [showList, setShowList] = useState(false);

  const items = ["Item 1", "Item 2", "Item 3", "Item 4"];

  const toggleList = () => {
    setShowList(prev => !prev);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-2xl font-bold">Icon Click to Show List</h1>

      {/* Icon button */}
      <Button onClick={toggleList} className="flex items-center gap-2">
        <List size={20} />
        {showList ? "Hide List" : "Show List"}
      </Button>

      {/* List */}
      {showList && (
        <ul className="mt-4 space-y-2 border p-4 rounded w-40 text-center">
          {items.map((item, index) => (
            <li key={index} className="p-2 bg-gray-100 rounded">
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
