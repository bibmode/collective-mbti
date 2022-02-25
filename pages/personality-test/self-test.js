import Link from "next/link";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import ProgressBar from "../../components/ProgressBar";
import { selfQuestions } from "../../data/self-questions";
import _ from "lodash";
import Quiz from "../../components/Quiz";
import Blob from "../../components/Blob";

const SelfQuiz = ({ questions }) => {
  const initialArray = new Array(64).fill(0);

  const [choiceMade, setChoiceMade] = useState(initialArray);
  const [progress, setProgress] = useState(0);
  const [page, setPage] = useState(0);

  const handleChange = (index, cognitiveFunction) => {
    const currentIndex = 8 * page;
    const newValues = [...choiceMade].map((choice, i) => {
      if (i === index + currentIndex) return cognitiveFunction;
      else return choice;
    });
    setChoiceMade(newValues);
  };

  // page navigations
  const goToPrevPage = () => {
    setPage(page - 1);
  };
  const goToNextPage = () => {
    setPage(page + 1);
  };

  // check if page is completed with answers
  const handleDonePage = () => {
    setPage(page + 1);
  };

  // save answers to local storage
  const handleDoneQuiz = () => {
    localStorage.setItem("self-quiz", choiceMade);
  };

  // for progress bar
  useEffect(() => {
    const done = Math.round(
      (choiceMade.filter((item) => item).length / choiceMade.length) * 100
    );
    setProgress(done);
  }, [choiceMade, progress]);

  return (
    <div className="overflow-hidden">
      {/* header */}
      <Header link="/" />

      {/* main content */}
      <div className="border-y border-gray-500 flex items-center flex-col overflow-hidden">
        {/* blob */}
        <div className="absolute -z-10" style={{ top: "200px", left: "-15%" }}>
          <Blob size={800} />
        </div>

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
        <div className="relative w-full container border-t md:border-t-0 border-gray-500 sm:border-x sm:border-gray-500 text-center overflow-hidden">
          {/* items */}
          {page === 0 && (
            <Quiz
              questions={questions[page]}
              page={page}
              handleChange={handleChange}
              choiceMade={choiceMade}
            />
          )}
          {page === 1 && (
            <Quiz
              questions={questions[page]}
              page={page}
              handleChange={handleChange}
              choiceMade={choiceMade}
            />
          )}
          {page === 2 && (
            <Quiz
              questions={questions[page]}
              page={page}
              handleChange={handleChange}
              choiceMade={choiceMade}
            />
          )}
          {page === 3 && (
            <Quiz
              questions={questions[page]}
              page={page}
              handleChange={handleChange}
              choiceMade={choiceMade}
            />
          )}
          {page === 4 && (
            <Quiz
              questions={questions[page]}
              page={page}
              handleChange={handleChange}
              choiceMade={choiceMade}
            />
          )}
          {page === 5 && (
            <Quiz
              questions={questions[page]}
              page={page}
              handleChange={handleChange}
              choiceMade={choiceMade}
            />
          )}
          {page === 6 && (
            <Quiz
              questions={questions[page]}
              page={page}
              handleChange={handleChange}
              choiceMade={choiceMade}
            />
          )}
          {page === 7 && (
            <Quiz
              questions={questions[page]}
              page={page}
              handleChange={handleChange}
              choiceMade={choiceMade}
            />
          )}
        </div>

        {/* {checkPageProgress() && <h1>hello</h1>} */}

        {/* submit */}
        <div className="py-12 pb-24 container flex justify-center sm:border-x border-gray-500">
          {page === 0 && (
            <button
              className={`uppercase ${
                progress === 13
                  ? "bg-orange-500 cursor-pointer hover:bg-orange-600"
                  : "bg-gray-300 cursor-default"
              } text-white text-xl py-2 px-6 transition ease-in duration-200`}
              disabled={progress !== 13 ? true : false}
              onClick={goToNextPage}
            >
              next
            </button>
          )}

          {page > 0 && page < 7 && (
            <>
              <button
                className="uppercase bg-orange-500 cursor-pointer hover:bg-orange-600 text-white text-xl py-2 px-6 transition ease-in duration-20 mr-8"
                onClick={goToPrevPage}
              >
                back
              </button>
              <button
                className={`uppercase ${
                  progress === Math.round(((8 * (page + 1)) / 64) * 100)
                    ? "bg-orange-500 cursor-pointer hover:bg-orange-600"
                    : "bg-gray-300 cursor-default"
                } text-white text-xl py-2 px-6 transition ease-in duration-200`}
                disabled={
                  progress !== Math.round(((8 * (page + 1)) / 64) * 100)
                    ? true
                    : false
                }
                onClick={goToNextPage}
              >
                next
              </button>
            </>
          )}
          {page === 7 && (
            <>
              <button
                className={`uppercase ${
                  progress === 100
                    ? "bg-orange-500 cursor-pointer hover:bg-orange-600"
                    : "bg-gray-300 cursor-default"
                } text-white text-xl py-2 px-6 transition ease-in duration-200 mr-8`}
                onClick={goToPrevPage}
                disabled={progress !== 100 ? true : false}
              >
                back
              </button>
              <Link href="/personality-test/test-result" passHref>
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
              </Link>
            </>
          )}
        </div>
      </div>

      {/* progress bar */}
      <ProgressBar progress={progress} />
    </div>
  );
};

export default SelfQuiz;

export async function getStaticProps() {
  const data = selfQuestions.data;
  let questions = _.chunk(_.shuffle(data), 8);

  return {
    props: {
      questions,
    },
  };
}
