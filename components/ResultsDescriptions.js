import { useRouter } from "next/router";
import { useContext } from "react";
import { typeDescriptions } from "../data/type-descriptions";
import Description from "./Description";
import { AppContext } from "./Layout";

const ResultsDescriptions = ({ customName }) => {
  const {
    descriptionsAccordion,
    setDescriptionsAccordion,
    results,
    setInvitation,
  } = useContext(AppContext);

  const router = useRouter();

  return (
    <>
      {/* DESCRIPTIONS */}
      {results?.map((result, index) => (
        <div key={index} className="-mx-4 lg:mx-0 lg:w-xs xl:w-[350px]">
          <div className="flex items-center container lg:px-0 py-3 border-b border-gray-800">
            <h4 className="mr-1 font-semibold text-md flex-1">
              {index === 0
                ? "Self-tested"
                : index === 1
                ? "According to Friends"
                : "Accumulative Result"}
              : {result ? result.mbtiType : "no data"}
            </h4>

            <input
              type="checkbox"
              name={`${customName}-description`}
              id={`${customName}-description-${index}`}
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
              htmlFor={`${customName}-description-${index}`}
              className="w-4 h-4 block peer-checked:rotate-45 cursor-pointer"
            >
              <div className="w-full h-0.5 translate-y-0.5 bg-gray-500" />
              <div className="w-full h-0.5 bg-gray-500 rotate-90" />
            </label>
          </div>

          {descriptionsAccordion[index] && result?.mbtiType && (
            <Description
              description={typeDescriptions.data[result?.mbtiType]}
              mbtiType={result?.mbtiType}
            />
          )}
        </div>
      ))}

      <div className="lg:max-w-full lg:flex flex-col -mx-4 lg:mx-0 lg:-mt-1 ">
        <button
          className="uppercase bg-orange-500 hover:bg-orange-600 text-white transition ease-in duration-200 text-2xl py-4 w-full lg:order-0 mt-24 lg:mt-0"
          onClick={() => router.push("/personality-test/self-test")}
        >
          take test
        </button>
        <button
          className="uppercase hover:bg-orange-300 transition ease-in duration-200 text-2xl py-4 w-full lg:order-1 lg:border-b border-gray-700 hover:border-white"
          onClick={() => setInvitation(true)}
        >
          invite a FRIEND TO TYPE YOU
        </button>
      </div>
    </>
  );
};

export default ResultsDescriptions;
