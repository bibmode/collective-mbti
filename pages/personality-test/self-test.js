import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";

const questions = [
  [
    {
      function: "Te",
      statement:
        "My decision-making process is very streamlined and I don’t often second guess my decisions once they are set",
    },
    {
      function: "Ti",
      statement:
        "I tend to ask slightly different versions of the same question to evaluate information.",
    },
  ],
  [
    {
      function: "Te",
      statement:
        "I enjoy planning and I have a knack for using organizational and productivity tools",
    },
    {
      function: "Ti",
      statement:
        "I focus first on the “why?” instead of the “what for?” of things",
    },
  ],
  [
    {
      function: "Te",
      statement: "I am extremely goal-oriented",
    },
    {
      function: "Ti",
      statement: "I like solving puzzles and other analytical games",
    },
  ],
  [
    {
      function: "Te",
      statement: "I am extremely goal-oriented",
    },
    {
      function: "Ti",
      statement: "I like solving puzzles and other analytical games",
    },
  ],
  [
    {
      function: "Te",
      statement: "I am extremely goal-oriented",
    },
    {
      function: "Ti",
      statement: "I like solving puzzles and other analytical games",
    },
  ],
];

const SelfQuiz = () => {
  const initialArray = new Array(questions.length).fill(0);

  const [choiceMade, setChoiceMade] = useState(initialArray);
  const [progress, setProgress] = useState(0);

  const handleChange = (index) => {
    const newValues = [...choiceMade].map((choice, i) => {
      if (i === index) return 1;
      else return choice;
    });
    setChoiceMade(newValues);
  };

  const handleDoneQuiz = (progress) => {
    progress === 100 && console.log(choiceMade);
  };

  // for progress bar
  useEffect(() => {
    const done =
      (choiceMade.filter((item) => item).length / choiceMade.length) * 100;
    setProgress(done);
  }, [choiceMade]);

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
      <div className="border-y border-gray-500 flex items-center flex-col overflow-x-hidden pb-16">
        {/* main header */}
        <div className="relative container sm:border-x sm:border-gray-500 text-center">
          {/* theme buttons */}
          <div className="absolute right-4 top-3 flex justify-between">
            <button className="w-6 h-6 bg-gray-900 rounded-full border border-gray-900"></button>
            <button className="w-6 h-6 bg-orange-500 rounded-full border border-gray-900 ml-2"></button>
          </div>

          <h2 className="uppercase font-bold text-gray-900 text-2xl pt-12 pb-8">
            Which sounds more like you?
          </h2>
        </div>

        {/* quiz */}
        <div className="w-full container border-t md:border-t-0 border-gray-500 sm:border-x sm:border-gray-500 text-center">
          {/* items */}
          {questions.map((item, index) => (
            <div
              key={index}
              className="-mx-4 px-4 py-6 md:py-10 flex flex-col md:flex-row items-center border-b md:border-0 border-gray-500"
            >
              <label className="text-sm md:w-6/12 md:pr-8 md:text-2xl hover:cursor-pointer">
                <input
                  type="radio"
                  name={`item-${index}`}
                  value={item[0].function}
                  className="peer hidden"
                  onChange={() => {
                    handleChange(index);
                  }}
                />
                <span className="peer-checked:text-orange-600">
                  {item[1].statement}
                </span>
              </label>

              <div
                className={`my-3 md:my-0 border border-gray-900 w-11 md:w-16 h-11 md:h-16 md:text-xl uppercase flex items-center justify-center rounded-full ${
                  choiceMade[index] && "bg-orange-500 text-white border-0"
                }`}
              >
                <p>or</p>
              </div>

              <label className="text-sm md:w-6/12 md:pl-8 md:text-2xl hover:cursor-pointer">
                <input
                  type="radio"
                  name={`item-${index}`}
                  value={item[0].function}
                  className="peer hidden"
                  onChange={() => {
                    handleChange(index);
                  }}
                />
                <span className="peer-checked:text-orange-600">
                  {item[1].statement}
                </span>
              </label>
            </div>
          ))}
        </div>

        {/* navigation buttons */}

        <div className="py-12 container flex justify-center sm:border-x border-gray-500">
          <button
            className={`uppercase ${
              progress === 100
                ? "bg-orange-500 cursor-pointer hover:bg-orange-600"
                : "bg-gray-300 cursor-default"
            } text-white text-xl py-2 px-6 transition ease-in duration-200`}
            onClick={handleDoneQuiz}
          >
            finish
          </button>
        </div>
      </div>

      {/* progress bar */}
      <div className="fixed top-[92vh] w-full bg-orange-50 border-t border-gray-700">
        <div className="container py-5 flex items-center sm:border-x border-gray-700">
          <button className="uppercase bg-orange-500 text-white text-sm py-1.5 px-3 hover:bg-orange-600 transition ease-in duration-200">
            rules
          </button>

          <div className="flex-1 h-3 rounded-full bg-gray-200 mx-3">
            <div
              className="h-3 rounded-full bg-orange-500"
              style={{
                width: `${progress}%`,
                transition: "all ease-in 0.2s",
              }}
            />
          </div>

          <h3 className="font-bold text-orange-500">{progress}%</h3>
        </div>
      </div>
    </div>
  );
};

export default SelfQuiz;
