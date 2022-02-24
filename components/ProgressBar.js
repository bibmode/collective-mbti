import { useContext } from "react";
import { AppContext } from "./Layout";

const ProgressBar = ({ progress }) => {
  const { setRules } = useContext(AppContext);

  return (
    <div className="fixed top-[100vh] -translate-y-full w-full bg-orange-50 border-t border-gray-700">
      <div className="container py-5 flex items-center sm:border-x border-gray-700">
        <button
          className="uppercase bg-orange-500 text-white text-sm py-1.5 px-3 hover:bg-orange-600 transition ease-in duration-200"
          onClick={() => setRules(true)}
        >
          rules
        </button>

        <div className="flex-1 h-3 rounded-full bg-gray-200 mx-3">
          <div
            className="h-3 rounded-full bg-orange-500"
            style={{
              width: `${progress}%`,
              transition: "all ease-in 0.2s",
            }}
          />
        </div>

        <h3 className="font-bold text-orange-500">{progress}%</h3>
      </div>
    </div>
  );
};

export default ProgressBar;
