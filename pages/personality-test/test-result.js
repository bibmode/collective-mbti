import { useEffect, useState } from "react";
import Blob from "../../components/Blob";
import CognitiveFunctionChart from "../../components/CognitiveFuncChart";
import Description from "../../components/Description";
import Footer from "../../components/Footer";
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
    <div className="relative overflow-hidden lg:flex flex-col min-h-screen">
      {/* blob */}
      <div className="absolute -z-10" style={{ top: "330px", left: "-25%" }}>
        <Blob size={1200} />
      </div>

      <Header link="/" />

      {/* main content */}
      <div className="border-y border-gray-500 flex flex-1 items-center flex-col overflow-y-hidden">
        <div className="relative lg:flex grow lg:justify-between sm:container sm:border-x sm:border-gray-500 sm:px-0 lg:px-4 lg:py-16 text-center">
          {" "}
          <h1 className="lg:hidden text-2xl uppercase px-9 py-11 leading-relaxed font-semibold">
            you&apos;re most likely an{" "}
            <span className="text-orange-500">{mbtiType}</span>
          </h1>
          {/* description */}
          {description && (
            <Description description={description} mbtiType={mbtiType} />
          )}
          {/* charts */}
          <div className="lg:flex-1 lg:max-w-[40%] lg:flex lg:flex-col lg:items-center">
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
            <button className="uppercase hover:bg-orange-300 transition ease-in duration-200 text-2xl py-4 w-full lg:order-1 lg:border-b border-gray-700 hover:border-white">
              <h2 className="text-2xl pr-4">GET FRIENDS TO TYPE YOU</h2>
            </button>
            <button className="uppercase bg-orange-500 hover:bg-orange-600 text-white transition ease-in duration-200 text-2xl py-4 w-full lg:order-0">
              take test
            </button>
          </div>
        </div>
      </div>

      {/* footer */}
      <Footer />
    </div>
  );
};

export default TestResult;
