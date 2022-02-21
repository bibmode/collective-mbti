import { useEffect, useState } from "react";
import Header from "../../components/Header";

const TestResult = () => {
  const [letterValues, setLetterValues] = useState(null);
  const [extrovertedFunctions, setExtrovertedFunctions] = useState(null);
  const [introvertedFunctions, setIntrovertedFunctions] = useState(null);

  const [mbtiType, setMbtiType] = useState(null);

  useEffect(() => {
    const answers = localStorage.getItem("self-quiz").split(",");

    const letterValues = {
      E: answers.filter((answer) => answer.includes("e")).length,
      I: answers.filter((answer) => answer.includes("i")).length,
      N: answers.filter((answer) => answer.includes("N")).length,
      S: answers.filter((answer) => answer.includes("S")).length,
      T: answers.filter((answer) => answer.includes("T")).length,
      F: answers.filter((answer) => answer.includes("F")).length,
      J: answers.filter(
        (answer) =>
          answer === "Si" ||
          answer === "Ni" ||
          answer === "Te" ||
          answer === "Fe"
      ).length,
      P: answers.filter(
        (answer) =>
          answer === "Se" ||
          answer === "Ne" ||
          answer === "Ti" ||
          answer === "Fi"
      ).length,
    };

    const extrovertedFunctions = {
      Ne: answers.filter((answer) => answer === "Ne").length,
      Te: answers.filter((answer) => answer === "Te").length,
      Se: answers.filter((answer) => answer === "Se").length,
      Fe: answers.filter((answer) => answer === "Fe").length,
    };

    const introvertedFunctions = {
      Ti: answers.filter((answer) => answer === "Ti").length,
      Si: answers.filter((answer) => answer === "Si").length,
      Fi: answers.filter((answer) => answer === "Fi").length,
      Ni: answers.filter((answer) => answer === "Ni").length,
    };

    console.log(letterValues, extrovertedFunctions, introvertedFunctions);

    setLetterValues(letterValues);
    setExtrovertedFunctions(extrovertedFunctions);
    setIntrovertedFunctions(introvertedFunctions);

    // start computation
    getMBTIType(letterValues, extrovertedFunctions, introvertedFunctions);
  }, []);

  //handleDuplicates
  const handleDuplicates = (duplicateArr) => {
    console.log(duplicateArr);
    let finalVal;

    if (
      duplicateArr[0].charAt(0) === "F" ||
      duplicateArr[0].charAt(0) === "T"
    ) {
      finalVal = letterValues?.F > letterValues?.T ? "F" : "T";
    } else {
      finalVal = letterValues?.N > letterValues?.S ? "N" : "S";
    }

    return finalVal;
  };

  // getting highest value
  const getHighestValueFunction = (functions) => {
    const maxValue = Math.max(...Object.values(functions));

    const maxFunctionArr = [...Object.keys(functions)].filter(
      (key, index) => functions[key] === maxValue
    );

    // console.log(letterValues);
    if (maxFunctionArr.length > 1) {
      const finalFunc = handleDuplicates(maxFunctionArr);
      return finalFunc;
    }

    return maxFunctionArr[0].charAt(0);
    // if (maxFunction) return maxFunction;
  };

  // computation function
  const getMBTIType = (
    letterValues,
    extrovertedFunctions,
    introvertedFunctions
  ) => {
    if (letterValues.E > letterValues.I) {
      // get dominant function
      const domFunc = getHighestValueFunction(extrovertedFunctions);

      // get auxiliary function
      if (letterValues.P > letterValues.J) {
        const auxFunc1 = getHighestValueFunction({
          Fi: introvertedFunctions.Fi,
          Ti: introvertedFunctions.Ti,
        });

        setMbtiType(`E${domFunc}${auxFunc1}P`);
      }

      if (letterValues.P < letterValues.J) {
        const auxFunc2 = getHighestValueFunction({
          Si: introvertedFunctions.Si,
          Ni: introvertedFunctions.Ni,
        });

        setMbtiType(`E${auxFunc2}${domFunc}J`);
      }
    } else {
      // get dominant function
      const domFunc = getHighestValueFunction(introvertedFunctions);

      // get auxiliary function
      if (letterValues.P > letterValues.J) {
        const auxFunc1 = getHighestValueFunction({
          Ne: extrovertedFunctions.Ne,
          Se: extrovertedFunctions.Se,
        });

        setMbtiType(`I${auxFunc1}${domFunc}P`);
      }

      if (letterValues.P < letterValues.J) {
        const auxFunc2 = getHighestValueFunction({
          Fe: extrovertedFunctions.Fe,
          Te: extrovertedFunctions.Te,
        });

        setMbtiType(`I${domFunc}${auxFunc2}J`);
      }
    }
  };

  useEffect(() => {
    console.log(mbtiType);
  }, [mbtiType]);

  return (
    <div>
      <Header link="/" />
      <div className="border-y border-gray-500 flex items-center flex-col overflow-x-hidden ">
        <div className="relative container sm:border-x sm:border-gray-500 text-center">
          {" "}
          hello
        </div>
      </div>
    </div>
  );
};

export default TestResult;
