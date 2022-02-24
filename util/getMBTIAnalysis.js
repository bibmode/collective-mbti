const _ = require("lodash");

let letterValues, extrovertedFunctions, introvertedFunctions;
let mbtiType,
  cognitiveFunctions = {};

const extractValues = (answers) => {
  introvertedFunctions = {
    Ti: answers.filter((answer) => answer === "Ti").length,
    Si: answers.filter((answer) => answer === "Si").length,
    Fi: answers.filter((answer) => answer === "Fi").length,
    Ni: answers.filter((answer) => answer === "Ni").length,
  };

  extrovertedFunctions = {
    Ne: answers.filter((answer) => answer === "Ne").length,
    Te: answers.filter((answer) => answer === "Te").length,
    Se: answers.filter((answer) => answer === "Se").length,
    Fe: answers.filter((answer) => answer === "Fe").length,
  };

  letterValues = {
    E: answers.filter((answer) => answer.includes("e")).length,
    I: answers.filter((answer) => answer.includes("i")).length,
    N: answers.filter((answer) => answer.includes("N")).length,
    S: answers.filter((answer) => answer.includes("S")).length,
    T: answers.filter((answer) => answer.includes("T")).length,
    F: answers.filter((answer) => answer.includes("F")).length,
    J: answers.filter(
      (answer) =>
        answer === "Si" || answer === "Ni" || answer === "Te" || answer === "Fe"
    ).length,
    P: answers.filter(
      (answer) =>
        answer === "Se" || answer === "Ne" || answer === "Ti" || answer === "Fi"
    ).length,
  };
};

const sortCognitiveFunctions = () => {
  // combine introverted and extroverted fucntions in one object
  const combinedFunctions = {
    ...extrovertedFunctions,
    ...introvertedFunctions,
  };

  // creating an array of sorted entries
  cognitiveFunctions = Object.entries(combinedFunctions)
    .sort((a, b) => {
      return a[1] - b[1];
    })
    .reverse();

  // replacing numbers with their percentage equivalent
  cognitiveFunctions.map((item) => {
    item[1] = Math.round((item[1] / 16) * 100);
  });
};

//handleDuplicates
const handleDuplicates = (duplicateArr) => {
  console.log(duplicateArr);
  let finalVal;

  if (duplicateArr[0].charAt(0) === "F" || duplicateArr[0].charAt(0) === "T") {
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

const mbtiCalculator = () => {
  if (letterValues.E > letterValues.I) {
    // get dominant function
    const domFunc = getHighestValueFunction(extrovertedFunctions);

    // get auxiliary function
    if (letterValues.P > letterValues.J) {
      const auxFunc1 = getHighestValueFunction({
        Fi: introvertedFunctions.Fi,
        Ti: introvertedFunctions.Ti,
      });

      mbtiType = `E${domFunc}${auxFunc1}P`;
    }

    if (letterValues.P < letterValues.J) {
      const auxFunc2 = getHighestValueFunction({
        Si: introvertedFunctions.Si,
        Ni: introvertedFunctions.Ni,
      });

      mbtiType = `E${auxFunc2}${domFunc}J`;
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

      mbtiType = `I${auxFunc1}${domFunc}P`;
    }

    if (letterValues.P < letterValues.J) {
      const auxFunc2 = getHighestValueFunction({
        Fe: extrovertedFunctions.Fe,
        Te: extrovertedFunctions.Te,
      });

      mbtiType = `I${domFunc}${auxFunc2}J`;
    }
  }
};

const getMBTIAnalysis = (answers) => {
  extractValues(answers);
  mbtiCalculator();
  sortCognitiveFunctions();
  console.log(letterValues);

  const results = {
    mbtiType,
    fourLetters: {
      E: Math.round((letterValues.E / 64) * 100),
      I: Math.round((letterValues.I / 64) * 100),
      N: Math.round((letterValues.N / 32) * 100),
      S: Math.round((letterValues.S / 32) * 100),
      F: Math.round((letterValues.F / 32) * 100),
      T: Math.round((letterValues.T / 32) * 100),
      P: Math.round((letterValues.P / 64) * 100),
      J: Math.round((letterValues.J / 64) * 100),
    },
    cognitiveFunctions,
  };

  return results;
};

export default getMBTIAnalysis;
