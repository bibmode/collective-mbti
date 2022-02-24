import { useEffect, useState } from "react";
import CognitiveFunctionChart from "../../components/CognitiveFuncChart";
import FourLetterChart from "../../components/fourLetterChart";
import Header from "../../components/Header";
import getMBTIAnalysis from "../../util/getMBTIAnalysis";

const TestResult = () => {
  const [fourLetters, setFourLetters] = useState(null);
  const [cognitiveFunctions, setCognitiveFunctions] = useState(null);
  const [mbtiType, setMbtiType] = useState(null);

  useEffect(() => {
    const answers = localStorage.getItem("self-quiz").split(",");

    const calculatedData = getMBTIAnalysis(answers);
    setFourLetters(calculatedData.fourLetters);
    setCognitiveFunctions(calculatedData.cognitiveFunctions);
    setMbtiType(calculatedData.mbtiType);

    console.log(calculatedData);
  }, []);

  return (
    <div>
      <Header link="/" />
      <div className="border-y border-gray-500 flex flex-1 items-center flex-col overflow-x-hidden ">
        <div className="relative lg:flex lg:justify-between sm:container sm:border-x sm:border-gray-500 sm:px-0 lg:px-4 lg:py-16 text-center lg:flex">
          {" "}
          <h1 className="lg:hidden text-2xl uppercase px-9 py-11 leading-relaxed font-semibold">
            you&apos;re most likely an{" "}
            <span className="text-orange-500">{mbtiType}</span>
          </h1>
          {/* description */}
          <div className="py-3 px-4 lg:max-w-[350px] lg:h-fit border-y border-gray-800 text-left">
            {mbtiType && (
              <p className="hidden lg:block border-b border-gray-800 -mx-4 -mt-2 px-4 font-semibold ">
                Result: {mbtiType}
              </p>
            )}
            <p className="text-gray-500">
              Extraverted • iNtuitive • Thinking • Perceiving
            </p>
            <p className="py-7">
              ENTPs are frequently described as clever, cerebrally and verbally
              quick, enthusiastic, outgoing, innovative, flexible, and
              resourceful. -{" "}
              <a
                className="text-orange-500"
                href="#"
                target="_blank"
                rel="noopener noreferrer"
              >
                source
              </a>
            </p>
            <ul className=" container text-orange-500 underline list-disc inline-block px-5">
              <li>psychologyjunkie.com</li>
              <li>16Personalities.com</li>
            </ul>
          </div>
          {/* charts */}
          <div className="lg:flex-1 lg:max-w-xl lg:flex lg:flex-col lg:items-center">
            {mbtiType && (
              <h1 className="hidden lg:block font-semibold text-3xl uppercase ">
                you&apos;re most likely an{" "}
                <span className="text-orange-500">{mbtiType}</span>
              </h1>
            )}

            <div className="container p-4">
              {fourLetters && (
                <div className="py-7">
                  <h2 className="mb-4 font-semibold text-gray-700">
                    4 LETTERS
                  </h2>

                  <FourLetterChart
                    values={[
                      [
                        "Extroversion",
                        fourLetters.E,
                        "Introversion",
                        fourLetters.I,
                      ],
                      ["Intuition", fourLetters.N, "Sensing", fourLetters.S],
                      ["Feeling", fourLetters.F, "Thinking", fourLetters.T],
                      ["Judging", fourLetters.J, "Perceiving", fourLetters.P],
                    ]}
                  />
                </div>
              )}
              {cognitiveFunctions && (
                <div className="pb-7 pt-3">
                  <h2 className="mb-4 font-semibold text-gray-700">
                    COGNITIVE FUNCTIONS
                  </h2>

                  <CognitiveFunctionChart values={cognitiveFunctions} />
                </div>
              )}
            </div>

            <button className="uppercase bg-orange-500 hover:bg-orange-600 text-white transition ease-in duration-200 text-2xl py-4 px-11 w-full lg:w-fit">
              save result
            </button>
          </div>
          {/* test buttons */}
          <div className="lg:max-w-[300px]">
            <button className="uppercase hover:bg-orange-300 transition ease-in duration-200 text-2xl py-4 w-full">
              <h2 className="text-2xl pr-4">GET FRIENDS TO TYPE YOU</h2>
            </button>
            <button className="uppercase bg-orange-500 hover:bg-orange-600 text-white transition ease-in duration-200 text-2xl py-4 w-full">
              take test
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestResult;
