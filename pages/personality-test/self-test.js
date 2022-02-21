import { useEffect, useState } from "react";
import Header from "../../components/Header";
import ProgressBar from "../../components/ProgressBar";

const SelfQuiz = ({ questions }) => {
  const initialArray = new Array(questions.length).fill(0);

  const [choiceMade, setChoiceMade] = useState(initialArray);
  const [progress, setProgress] = useState(0);

  const handleChange = (index, cognitiveFunction) => {
    const newValues = [...choiceMade].map((choice, i) => {
      if (i === index) return cognitiveFunction;
      else return choice;
    });
    setChoiceMade(newValues);
  };

  const handleDoneQuiz = (progress) => {
    progress === 100 && console.log(choiceMade);
  };

  // for progress bar
  useEffect(() => {
    const done = Math.round(
      (choiceMade.filter((item) => item).length / choiceMade.length) * 100
    );
    setProgress(done);
    console.log(choiceMade);
  }, [choiceMade]);

  return (
    <div>
      {/* header */}
      <Header link="/" />

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
          {questions?.map((item, index) => (
            <div
              key={index}
              className="-mx-4 px-4 py-6 md:py-10 flex flex-col md:flex-row items-center border-b md:border-0 border-gray-500"
            >
              <label className="text-sm md:w-6/12 md:pr-8 md:text-2xl hover:cursor-pointer">
                <input
                  type="radio"
                  name={`item-${index}`}
                  value={item.data[0].function}
                  className="peer hidden"
                  onChange={() => {
                    handleChange(index, item.data[0].function);
                  }}
                />
                <span className="peer-checked:text-orange-600">
                  {item.data[0].statement}
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
                  value={item.data[1].function}
                  className="peer hidden"
                  onChange={() => {
                    handleChange(index, item.data[1].function);
                  }}
                />
                <span className="peer-checked:text-orange-600">
                  {item.data[1].statement}
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
            disabled={progress !== 100 ? true : false}
          >
            finish
          </button>
        </div>
      </div>

      {/* progress bar */}
      <ProgressBar progress={progress} />
    </div>
  );
};

export default SelfQuiz;

export async function getServerSideProps() {
  const res = await fetch(`${process.env.PAGE_URL}/api/questions`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ testType: "self-test" }),
  });

  const questions = await res.json();

  return {
    props: {
      questions: JSON.parse(JSON.stringify(questions)),
    },
  };
}
