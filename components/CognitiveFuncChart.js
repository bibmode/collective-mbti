const CognitiveFunctionChart = ({ values }) => {
  return (
    <>
      {values.map((value, index) => (
        <div key={index} className="flex items-center justify-between mb-2">
          <div className="flex flex-col items-center w-10 pr-4 text-center">
            <p className="text-xs font-semibold">{value[0]}</p>
          </div>
          <div className="flex-1 h-2.5 bg-gray-200 rounded-full">
            <div
              className="h-2.5 bg-orange-500 rounded-full"
              style={{
                width: `${value[1]}%`,
              }}
            />
          </div>
          <div className="flex flex-col items-center w-10 pl-4 text-center">
            <p className="text-xs font-semibold">{value[1]}%</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default CognitiveFunctionChart;
