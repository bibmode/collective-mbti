import { useEffect } from "react";

const FourLetterChart = ({ values }) => {
  useEffect(() => {
    console.log(values);
  }, []);

  return (
    <>
      {values.map((value, index) => (
        <div key={index} className="flex items-center justify-between mb-1.5">
          <div className="flex flex-col items-center w-24 pr-3 text-center">
            <p className="text-xs font-semibold">
              {value[1] === value[3]
                ? value[0]
                : value[1] > value[3]
                ? value[0]
                : value[2]}
            </p>
            <p className="text-xs font-semibold">
              {value[1] > value[3] ? `${value[1]}` : `${value[3]}`}%
            </p>
          </div>
          <div className="flex-1 h-2.5 bg-gray-200 rounded-full">
            <div
              className="h-2.5 bg-orange-500 rounded-full"
              style={{
                width: `${value[1] > value[3] ? value[1] : value[3]}%`,
              }}
            />
          </div>
          <div className="flex flex-col items-center w-24 pl-3 text-center">
            <p className="text-xs font-semibold">
              {value[1] === value[3]
                ? value[2]
                : value[1] < value[3]
                ? value[0]
                : value[2]}
            </p>
            <p className="text-xs font-semibold">
              {value[1] < value[3] ? `${value[1]}` : `${value[3]}`}%
            </p>
          </div>
        </div>
      ))}
    </>
  );
};

export default FourLetterChart;
