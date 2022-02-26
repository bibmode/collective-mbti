import { Icon } from "@iconify/react";
import { useContext, useEffect, useState } from "react";
import { typeDescriptions } from "../data/type-descriptions";
import CognitiveFunctionChart from "./CognitiveFuncChart";
import Description from "./Description";
import FourLetterChart from "./fourLetterChart";
import { AppContext } from "./Layout";
import ResultsDescriptions from "./ResultsDescriptions";

const About = ({ results }) => {
  const {
    setAccordion,
    accordion,
    setNavChart,
    navChart,
    descriptionsAccordion,
    setDescriptionsAccordion,
  } = useContext(AppContext);

  useEffect(() => {
    console.log(results);
  }, []);

  return (
    <>
      {/* bio */}
      <div>
        <p className="py-4">
          I am an ENTP breed. Any INTJs out there want to copulate? lol
        </p>
      </div>

      {/* RESULTS */}

      {/* header */}
      <div className="py-1 mt-4 text-lg font-semibold -mx-4 lg:mx-0  border-b border-gray-500">
        <h3 className="container lg:px-0">Results</h3>
      </div>

      {results?.map((result, index) => (
        <div key={index} className="my-3">
          {/* title */}
          <div className="flex items-center text-sm">
            <h4 className="mr-1 font-semibold">{result.type}:</h4>
            <p className="flex-1">{result.mbtiType}</p>

            <input
              type="checkbox"
              name="self-tested"
              id={`self-tested-${index}`}
              defaultChecked={accordion[index]}
              onChange={(e) =>
                setAccordion((prev) => {
                  prev[index] = e.target.checked;
                  return [...prev];
                })
              }
              className="peer hidden"
            />

            <label
              htmlFor={`self-tested-${index}`}
              className="w-4 h-4 block peer-checked:rotate-45 cursor-pointer"
            >
              <div className="w-full h-0.5 translate-y-0.5 bg-gray-500" />
              <div className="w-full h-0.5 bg-gray-500 rotate-90" />
            </label>
          </div>

          {/* main */}
          {accordion[index] ? (
            <div>
              {/* navigation options */}
              <div className="my-2 flex justify-center">
                <div>
                  <input
                    className="hidden peer"
                    type="radio"
                    name={`typology-navbar-${index}`}
                    id={`typology-4Letters-${index}`}
                    defaultChecked
                    onClick={() =>
                      setNavChart((prev) => {
                        console.log(index);
                        prev[index] = 0;
                        return [...prev];
                      })
                    }
                  />
                  <label
                    htmlFor={`typology-4Letters-${index}`}
                    className="peer-checked:text-gray-600 peer-checked:font-semibold uppercase text-xs text-gray-400 px-4 border-r border-gray-500 cursor-pointer"
                  >
                    4 letters
                  </label>
                </div>

                <div>
                  <input
                    className="hidden peer"
                    type="radio"
                    name={`typology-navbar-${index}`}
                    id={`typology-cogFunc-${index}`}
                    onClick={() =>
                      setNavChart((prev) => {
                        console.log(index);
                        prev[index] = 1;
                        return [...prev];
                      })
                    }
                  />
                  <label
                    htmlFor={`typology-cogFunc-${index}`}
                    className="peer-checked:text-gray-600 peer-checked:font-semibold uppercase text-xs text-gray-400 px-4 cursor-pointer"
                  >
                    cognitive functions
                  </label>
                </div>
              </div>

              {/* charts */}
              {navChart[index] ? (
                <CognitiveFunctionChart values={result.cognitiveFunctions} />
              ) : (
                <FourLetterChart
                  values={[
                    [
                      "Extroversion",
                      result.fourLetters.E,
                      "Introversion",
                      result.fourLetters.I,
                    ],
                    [
                      "Intuition",
                      result.fourLetters.N,
                      "Sensing",
                      result.fourLetters.S,
                    ],
                    [
                      "Feeling",
                      result.fourLetters.F,
                      "Thinking",
                      result.fourLetters.T,
                    ],
                    [
                      "Judging",
                      result.fourLetters.J,
                      "Perceiving",
                      result.fourLetters.P,
                    ],
                  ]}
                />
              )}
            </div>
          ) : null}
        </div>
      ))}

      {/* SHARE BAR */}
      <div className="flex items-center py-3 border-y border-gray-700 mt-10 mb-14 -mx-4 lg:mx-0 px-4 lg:px-0">
        <p className="uppercase max-w-[50px] leading-5">share results</p>
        <button
          href="#"
          target="_blank"
          className="group rounded-full border border-gray-900 p-3 ml-auto  hover:border-orange-500 transition ease-in duration-200 cursor-pointer"
        >
          <Icon
            icon="cib:facebook-f"
            className="group-hover:text-orange-500 transition ease-in duration-200"
          />
        </button>
        <button
          href="#"
          target="_blank"
          className="group rounded-full border border-gray-900 p-3 ml-3 hover:border-orange-500 transition ease-in duration-200 cursor-pointer"
        >
          <Icon
            icon="cib:twitter"
            className="group-hover:text-orange-500 transition ease-in duration-200"
          />
        </button>
        <button
          href="#"
          target="_blank"
          className="group rounded-full border border-gray-900 p-3 ml-3 hover:border-orange-500 transition ease-in duration-200 cursor-pointer"
        >
          <Icon
            icon="cib:instagram"
            className="group-hover:text-orange-500 transition ease-in duration-200"
          />
        </button>
        <button
          href="#"
          target="_blank"
          className="group rounded-full border border-gray-900 p-3 ml-3 hover:border-orange-500 transition ease-in duration-200 cursor-pointer"
        >
          <Icon
            icon="akar-icons:link-chain"
            className="group-hover:text-orange-500 transition ease-in duration-200"
          />
        </button>
      </div>

      {/* DESCRIPTIONS */}
      <div className="lg:hidden">
        <ResultsDescriptions results={results} customName="phone" />
      </div>
    </>
  );
};

export default About;
