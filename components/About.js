import { useEffect, useState } from "react";
import CognitiveFunctionChart from "./CognitiveFuncChart";
import FourLetterChart from "./fourLetterChart";

const About = () => {
  const [navChart, setNavChart] = useState([0, 0, 0]);
  const [accordion, setAccordion] = useState([true, false, false]);

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
          <div className="flex items-center">
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
    </>
  );
};

export default About;
