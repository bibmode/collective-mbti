import { Icon } from "@iconify/react";
import { useContext, useEffect, useState } from "react";
import CognitiveFunctionChart from "./CognitiveFuncChart";
import FourLetterChart from "./fourLetterChart";
import { AppContext } from "./Layout";

const Typology = ({ customName }) => {
  const { typologyEntries } = useContext(AppContext);
  const [navChart, setNavChart] = useState(null);

  useEffect(() => {
    console.log(typologyEntries);
    const initialNavChart = typologyEntries?.map((item) => 0);
    setNavChart(initialNavChart);
  }, [typologyEntries]);

  return (
    <>
      {navChart ? (
        typologyEntries?.map((entry, index) => (
          <div className="mb-8" key={index}>
            {/* header */}
            <div className="flex">
              {/* image */}
              <div className="uppercase bg-gray-800 text-white font-semibold rounded-full w-11 h-11 flex items-center justify-center">
                {entry?.image ? (
                  <img src={entry.image} alt="user image" />
                ) : (
                  <p>{entry.invited[0]}</p>
                )}
              </div>

              <div className="px-3 mr-auto">
                <p className="text-xl font-semibold">
                  {entry.mbtiResult.mbtiType}
                </p>
                <p className="text-xs text-gray-400">{entry.time}</p>
              </div>

              <div className="flex flex-col items-center justify-center">
                <p className="text-sm font-semibold">{entry.invited}</p>
                <p className="text-xs text-gray-400 font-semibold">
                  {entry.relation}
                </p>
              </div>
            </div>

            {/* comment */}
            {entry?.comment && (
              <p className="text-center py-4">{entry.comment}</p>
            )}

            {/* chart type navigation */}
            <div className="mb-3 mt-4 flex justify-center">
              <div>
                <input
                  className="hidden peer"
                  type="radio"
                  name={`typology-${customName}-navbar-${index}`}
                  id={`typology-${customName}-4Letters-${index}`}
                  defaultChecked
                  onClick={() =>
                    setNavChart((prev) => {
                      prev[index] = 0;
                      return [...prev];
                    })
                  }
                />
                <label
                  htmlFor={`typology-${customName}-4Letters-${index}`}
                  className="peer-checked:text-gray-600 peer-checked:font-semibold uppercase text-xs text-gray-400 px-4 border-r border-gray-500 cursor-pointer"
                >
                  4 letters
                </label>
              </div>

              <div>
                <input
                  className="hidden peer"
                  type="radio"
                  name={`typology-${customName}-navbar-${index}`}
                  id={`typology-${customName}-cogFunc-${index}`}
                  onClick={() =>
                    setNavChart((prev) => {
                      prev[index] = 1;
                      return [...prev];
                    })
                  }
                />
                <label
                  htmlFor={`typology-${customName}-cogFunc-${index}`}
                  className="peer-checked:text-gray-600 peer-checked:font-semibold uppercase text-xs text-gray-400 px-4 cursor-pointer"
                >
                  cognitive functions
                </label>
              </div>
            </div>

            {/* charts */}
            {navChart[index] ? (
              <CognitiveFunctionChart
                values={entry.mbtiResult.cognitiveFunctions}
              />
            ) : (
              <FourLetterChart
                values={[
                  [
                    "Extroversion",
                    entry.mbtiResult.fourLetters.E,
                    "Introversion",
                    entry.mbtiResult.fourLetters.I,
                  ],
                  [
                    "Intuition",
                    entry.mbtiResult.fourLetters.N,
                    "Sensing",
                    entry.mbtiResult.fourLetters.S,
                  ],
                  [
                    "Feeling",
                    entry.mbtiResult.fourLetters.F,
                    "Thinking",
                    entry.mbtiResult.fourLetters.T,
                  ],
                  [
                    "Judging",
                    entry.mbtiResult.fourLetters.J,
                    "Perceiving",
                    entry.mbtiResult.fourLetters.P,
                  ],
                ]}
              />
            )}

            {/* like and comment stats bar */}
            <div className="flex items-end py-3">
              {/* likes */}
              <div className="mr-4">
                <input
                  type="checkbox"
                  name={`likes-${customName}-${index}`}
                  id={`likes-${customName}-${index}-1`}
                  className="peer hidden"
                  onChange={(e) => {
                    if (e.target.checked) {
                      document.getElementById(
                        `likes-${customName}-${index}-2`
                      ).checked = false;
                    }
                  }}
                />

                <label
                  className="flex peer-checked:text-orange-500  cursor-pointer"
                  htmlFor={`likes-${customName}-${index}-1`}
                >
                  <p className="mr-1">4</p>
                  <Icon className="text-lg" icon="ant-design:like-filled" />
                </label>
              </div>

              {/* dislikes */}
              <div className="flex-1">
                <input
                  type="checkbox"
                  name={`likes-${customName}-${index}`}
                  id={`likes-${customName}-${index}-2`}
                  className="peer hidden"
                  onChange={(e) => {
                    if (e.target.checked) {
                      document.getElementById(
                        `likes-${customName}-${index}-1`
                      ).checked = false;
                    }
                  }}
                />

                <label
                  className="flex peer-checked:text-orange-500  cursor-pointer"
                  htmlFor={`likes-${customName}-${index}-2`}
                >
                  <p className="mr-1">2</p>
                  <Icon
                    className="text-lg mt-0.5"
                    icon="ant-design:dislike-filled"
                  />
                </label>
              </div>

              {/* comments */}
              <div className="mr-auto">
                <input
                  type="checkbox"
                  name={`comments-${customName}-${index}`}
                  id={`comments-${customName}-${index}`}
                  className="peer hidden"
                />

                <label
                  className="flex peer-checked:text-orange-500 cursor-pointer"
                  htmlFor={`comments-${customName}-${index}`}
                >
                  <p className="mr-1">5</p>
                  <Icon className="text-lg mt-0.5" icon="bxs:comment-dots" />
                </label>
              </div>
            </div>

            {/* comment input */}
            <div className="w-full flex flex-col items-end">
              <input
                className="w-full bg-gray-100 rounded-full px-4 py-2 text-sm border border-orange-500"
                type="text"
                placeholder="Add a comment"
              />
              <button className="bg-gray-300 text-gray-100 text-xs rounded-full py-2 px-5 mt-3">
                Comment
              </button>
            </div>
          </div>
        ))
      ) : (
        <div>
          <p>no data found</p>
        </div>
      )}
    </>
  );
};

export default Typology;
