const RulesModal = ({ btnMessage, setRules }) => {
  return (
    <div className="w-full h-screen absolute flex justify-center">
      {/* modal content */}
      <div className="fixed z-50 w-full sm:max-w-lg h-full sm:h-[60%] sm:max-h-[490px] flex flex-col justify-between self-center bg-gradient-to-b from-white to-orange-50">
        {/* top bar */}
        <div className="h-8 w-full border-b border-gray-700">
          <div className="hidden sm:block mx-8 h-full flex-1 border-x border-gray-700"></div>
        </div>

        {/* main content */}
        <div className="relative sm:mx-8 flex-1 flex flex-col justify-center items-center sm:border-x border-gray-700">
          <h2 className="uppercase text-2xl font-semibold">
            rules of the quiz
          </h2>
          <ol className="list-decimal py-14 sm:pt-8 px-10 leading-relaxed">
            <li>Choose the sentence that suits you best.</li>
            <li>
              There is no option for neutral for every item so you have to
              really dug into your record of behavior.
            </li>
            <li>
              Choose based on your records of past actions and what you would
              normally do.
            </li>
            <li>
              Be honest. <u className="font-bold">There are no wrong answers</u>{" "}
              and no one is judging you here.
            </li>
          </ol>

          <button
            className="absolute bottom-8 uppercase text-xl text-white bg-orange-500 px-9 py-2 hover:bg-orange-600 transition ease-in duration-200"
            onClick={() => setRules(false)}
          >
            {btnMessage}
          </button>
        </div>

        {/* bottom bar */}
        <div className="h-8 w-full border-t border-gray-700">
          <div className="hidden sm:block mx-8 h-full flex-1 border-x border-gray-700"></div>
        </div>
      </div>

      {/* overlay */}
      <div
        className="fixed top-0 z-40 inset-0 bg-opacity-50 overflow-hidden h-full w-full backdrop-blur-sm bg-zinc-700/30"
        onClick={() => setRules(false)}
      />
    </div>
  );
};

export default RulesModal;
