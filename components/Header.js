import { Icon } from "@iconify/react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useEffect } from "react";
import Blob from "./Blob";

const Header = ({ link }) => {
  const { data: session } = useSession();

  useEffect(() => {
    console.log(session);
  }, []);

  return (
    <div className="relative flex justify-between container sm:border-x sm:border-gray-500 py-8 uppercase">
      {/* blob */}
      <div className="absolute -z-10" style={{ top: "-350px", right: "-22%" }}>
        <Blob size={800} />
      </div>

      {link ? (
        <Link href={link}>
          <a className="text-orange-500 font-black text-2xl max-w-[100px] leading-7 cursor-pointer">
            collective mbti
          </a>
        </Link>
      ) : (
        <h1 className="text-orange-500 font-black text-2xl max-w-[100px] leading-7">
          collective mbti
        </h1>
      )}

      <div className="absolute w-[18px] h-[18px] bg-gray-900 bottom-9 mb-0.5 left-20" />

      {session && (
        <>
          <button onClick={() => signOut()}>logout</button>
        </>
      )}

      {session ? (
        <button className="flex flex-col items-end justify-center">
          <div className="w-9 h-1 bg-gray-700 mb-1.5"></div>
          <div className="w-9 h-1 bg-gray-700 mb-1.5"></div>
          <div className="w-5 h-1 bg-gray-700"></div>
        </button>
      ) : (
        <button className="flex items-center justify-center text-md px-5 bg-gray-900 py-2.5 text-orange-400 my-1">
          Login with
          <Icon className="ml-1" icon="flat-color-icons:google" />
        </button>
      )}
    </div>
  );
};

export default Header;
