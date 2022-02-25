import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { typeDescriptions } from "../data/type-descriptions";
import CognitiveFunctionChart from "./CognitiveFuncChart";
import Description from "./Description";
import FourLetterChart from "./fourLetterChart";

const About = () => {
  const [navChart, setNavChart] = useState([0, 0, 0]);
  const [accordion, setAccordion] = useState([true, false, false]);
  const [descriptionsAccordion, setDescriptionsAccordion] = useState([
    true,
    false,
    false,
  ]);
  // const description = typeDescriptions;

  useEffect(() => {
    console.log(navChart);
  }, [navChart]);

  useEffect(() => {
    console.log(accordion);
  }, [accordion]);

  const results = [
    {
      type: "Self-tested",
      mbtiType: "INTP",
      fourLetters: {
        E: 44,
        F: 31,
        I: 56,
        J: 31,
        N: 72,
        P: 69,
        S: 28,
        T: 69,
      },
      cognitiveFunctions: [
        ["Ti", 100],
        ["Ne", 88],
        ["Ni", 56],
        ["Fi", 50],
        ["Se", 38],
        ["Te", 38],
        ["Si", 19],
        ["Fe", 13],
      ],
    },
    {
      type: "According to friends",
      mbtiType: "ENTP",
      fourLetters: {
        E: 44,
        F: 31,
        I: 56,
        J: 31,
        N: 72,
        P: 69,
        S: 28,
        T: 69,
      },
      cognitiveFunctions: [
        ["Ti", 100],
        ["Ne", 88],
        ["Ni", 56],
        ["Fi", 50],
        ["Se", 38],
        ["Te", 38],
        ["Si", 19],
        ["Fe", 13],
      ],
    },
    {
      type: "Accumulative result",
      mbtiType: "ENTP",

      fourLetters: {
        E: 44,
        F: 31,
        I: 56,
        J: 31,
        N: 72,
        P: 69,
        S: 28,
        T: 69,
      },
      cognitiveFunctions: [
        ["Ti", 100],
        ["Ne", 88],
        ["Ni", 56],
        ["Fi", 50],
        ["Se", 38],
        ["Te", 38],
        ["Si", 19],
        ["Fe", 13],
      ],
    },
  ];

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
      <div className="py-1 mt-4 text-lg font-semibold -mx-4 border-b border-gray-500">
        <h3 className="container">Results</h3>
      </div>

      {results.map((result, index) => (
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
              className="w-4 block peer-checked:rotate-45"
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
                    className="peer-checked:text-gray-600 peer-checked:font-semibold uppercase text-xs text-gray-400 px-4 border-r border-gray-500"
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
                    className="peer-checked:text-gray-600 peer-checked:font-semibold uppercase text-xs text-gray-400 px-4"
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
      <div className="flex items-center py-3 border-y border-gray-700 mt-10 mb-14 -mx-4 px-4">
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
      {results.map((result, index) => (
        <div key={index} className="-mx-4">
          <div className="flex items-center container py-3 border-b border-gray-800">
            <h4 className="mr-1 font-semibold text-md flex-1">
              {result.type}: {result.mbtiType}
            </h4>

            <input
              type="checkbox"
              name="phone-description"
              id={`phone-description-${index}`}
              defaultChecked={descriptionsAccordion[index]}
              onChange={(e) =>
                setDescriptionsAccordion((prev) => {
                  prev[index] = e.target.checked;
                  return [...prev];
                })
              }
              className="peer hidden"
            />

            <label
              htmlFor={`phone-description-${index}`}
              className="w-4 block peer-checked:rotate-45"
            >
              <div className="w-full h-0.5 translate-y-0.5 bg-gray-500" />
              <div className="w-full h-0.5 bg-gray-500 rotate-90" />
            </label>
          </div>

          {descriptionsAccordion[index] && (
            <Description
              description={typeDescriptions.data[result.mbtiType]}
              mbtiType={result.mbtiType}
            />
          )}
        </div>
      ))}

      <div className="lg:max-w-[300px] lg:flex flex-col -mx-4 mt-auto">
        <button className="uppercase bg-orange-500 hover:bg-orange-600 text-white transition ease-in duration-200 text-2xl py-4 w-full lg:order-0 mt-24">
          take test
        </button>
        <button className="uppercase hover:bg-orange-300 transition ease-in duration-200 text-2xl py-4 w-full lg:order-1 lg:border-b border-gray-700 hover:border-white">
          <h2 className="text-2xl pr-4">GET FRIENDS TO TYPE YOU</h2>
        </button>
      </div>
    </>
  );
};

export default About;
