const Quiz = ({ questions, page, handleChange, choiceMade }) => {
  return (
    <>
      {" "}
      {questions.map((item, index) => (
        <div
          key={index}
          className="-mx-4 px-4 py-6 md:py-10 flex flex-col md:flex-row items-center border-b md:border-0 border-gray-500"
        >
          <label className="text-sm md:w-6/12 md:pr-8 md:text-2xl hover:cursor-pointer">
            <input
              type="radio"
              name={`item-${index}`}
              value={item[0].function}
              className="peer hidden"
              onChange={() => {
                handleChange(index, item[0].function);
                console.log(item[0].function);
              }}
            />
            <span className="peer-checked:text-orange-600">
              {item[0].statement}
            </span>
          </label>

          <div
            className={`my-3 md:my-0 border border-gray-900 w-11 md:w-16 h-11 md:h-16 md:text-xl uppercase flex items-center justify-center rounded-full ${
              choiceMade[index + 8 * page] &&
              "bg-orange-500 text-white border-0"
            }`}
          >
            <p>or</p>
          </div>

          <label className="text-sm md:w-6/12 md:pl-8 md:text-2xl hover:cursor-pointer">
            <input
              type="radio"
              name={`item-${index}`}
              value={item[1].function}
              className="peer hidden"
              onChange={() => {
                handleChange(index, item[1].function);
              }}
            />
            <span className="peer-checked:text-orange-600">
              {item[1].statement}
            </span>
          </label>
        </div>
      ))}
    </>
  );
};

export default Quiz;
