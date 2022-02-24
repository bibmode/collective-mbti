import { useEffect, useState } from "react";
import CognitiveFunctionChart from "../../components/CognitiveFuncChart";
import FourLetterChart from "../../components/fourLetterChart";
import Header from "../../components/Header";
import getMBTIAnalysis from "../../util/getMBTIAnalysis";

const TestResult = () => {
  const [fourLetters, setFourLetters] = useState(null);
  const [cognitiveFunctions, setCognitiveFunctions] = useState(null);
  const [mbtiType, setMbtiType] = useState(null);
  const [description, setDescription] = useState(null);

  useEffect(() => {
    const answers = localStorage.getItem("self-quiz")?.split(",");

    const calculatedData = getMBTIAnalysis(answers);
    setFourLetters(calculatedData.fourLetters);
    setCognitiveFunctions(calculatedData.cognitiveFunctions);
    setMbtiType(calculatedData.mbtiType);
    setDescription(calculatedData.description);

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
          {description && (
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
                {description.description}
                <a
                  className="text-orange-500"
                  href={description.source}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {" "}
                  - source
                </a>
              </p>
              <ul className=" container text-orange-500 underline list-disc inline-block px-5">
                <li>
                  <a
                    href="https://personalityjunkie.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    personalityjunkie.com
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.truity.com/myers-briggs/about-myers-briggs-personality-typing"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    truity.com
                  </a>
                </li>
              </ul>
            </div>
          )}
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
          <div className="lg:max-w-[300px] lg:flex flex-col">
            <button className="uppercase hover:bg-orange-300 transition ease-in duration-200 text-2xl py-4 w-full lg:order-1 lg:border-b border-gray-700">
              <h2 className="text-2xl pr-4">GET FRIENDS TO TYPE YOU</h2>
            </button>
            <button className="uppercase bg-orange-500 hover:bg-orange-600 text-white transition ease-in duration-200 text-2xl py-4 w-full lg:order-0">
              take test
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestResult;
