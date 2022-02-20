import { Icon } from "@iconify/react";

const SelfQuiz = () => {
  return (
    <div>
      {/* header */}
      <div className="relative flex justify-between container sm:border-x sm:border-gray-500 pt-8 md:pt-16 pb-8 uppercase">
        <h1 className="text-orange-500 font-black text-2xl max-w-[100px] leading-7">
          collective mbti
        </h1>

        <div className="absolute w-[18px] h-[18px] bg-gray-900 bottom-9 mb-0.5 left-20" />

        <button className="flex items-center justify-center text-md px-5 bg-gray-900 py-2.5 text-orange-400 my-1">
          Login with
          <Icon className="ml-1" icon="flat-color-icons:google" />
        </button>
      </div>

      {/* main content */}
      <div className="border-y border-gray-500 flex items-center flex-col overflow-x-hidden">
        <div className="relative container sm:border-x sm:border-gray-500">
          <h1>hello</h1>
        </div>
      </div>
    </div>
  );
};

export default SelfQuiz;
