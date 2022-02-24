import { Icon } from "@iconify/react";
import Link from "next/link";
import { useEffect } from "react";

const Header = ({ link }) => {
  return (
    <div className="relative flex justify-between container sm:border-x sm:border-gray-500 py-8 uppercase">
      <Link href={link}>
        <a className="text-orange-500 font-black text-2xl max-w-[100px] leading-7 cursor-pointer">
          collective mbti
        </a>
      </Link>

      <div className="absolute w-[18px] h-[18px] bg-gray-900 bottom-9 mb-0.5 left-20" />

      <button className="flex items-center justify-center text-md px-5 bg-gray-900 py-2.5 text-orange-400 my-1">
        Login with
        <Icon className="ml-1" icon="flat-color-icons:google" />
      </button>
    </div>
  );
};

export default Header;
