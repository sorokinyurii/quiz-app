'use client'

import { usePointsStore } from "@/store";
import Image from "next/image";
import Link from "next/link";
import coins from "@/assets/images/coins.png";

export const Header = () => {
  const { points } = usePointsStore((state) => state);

  return (
    <header className="bg-[#0d0833] text-white py-4 px-6 flex justify-between items-center shadow-md">
      <Link
        href="/"
        className="text-3xl font-bold font-second text-white hover:text-blue-400 transition-colors duration-300"
      >
        Quiz App
      </Link>

      <div className="text-lg font-medium flex">
        <span>
          <Image
            src={coins}
            width={30}
            height={30}
            alt='your coins'
            className="mr-2"
          />
        </span>
        <span className="text-gray-300 mr-2 font-second">Points:</span>
        <span className="font-semibold text-blue-300 font-second">{points}</span>
      </div>
    </header>
  );
};
