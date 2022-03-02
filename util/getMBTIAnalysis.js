const _ = require("lodash");
import { typeDescriptions } from "../data/type-descriptions";

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
  const finalVal =
    letterValues[duplicateArr[0][0]] > letterValues[duplicateArr[1][0]]
      ? `${duplicateArr[0][0]}`
      : `${duplicateArr[1][0]}`;

  return finalVal;
};

// getting highest value
const getHighestValueFunction = (functions) => {
  const maxValue = Math.max(...Object.values(functions));

  const maxFunctionArr = [...Object.keys(functions)].filter(
    (key, index) => functions[key] === maxValue
  );

  if (maxFunctionArr.length > 1) {
    const finalFunc = handleDuplicates(maxFunctionArr);
    return finalFunc;
  }

  return maxFunctionArr[0].charAt(0);
  // if (maxFunction) return maxFunction;
};

// if extroversion === introversion
const compareInferiorFunctions = (functions) => {
  let inferiorFunctions = [];

  const functionPair = {
    Ne: "Si",
    Si: "Ne",
    Ni: "Se",
    Se: "Ni",
    Te: "Fi",
    Fi: "Te",
    Ti: "Fe",
    Fe: "Ti",
  };

  const maxValue = [...functions.map((item) => item[1])][0];
  // const maxValue = Math.max(...Object.values(functions));

  const maxFunctionArr = functions
    .filter((item, index) => item[1] === maxValue)
    .map((item) => item[0]);

  if (maxFunctionArr.length > 1) {
    maxFunctionArr.map((domFuncs, index) => {
      inferiorFunctions[index] = _.flatten(
        functions.filter((item) => {
          return item[0] === `${functionPair[maxFunctionArr[index]]}`;
        })
      );
    });

    return inferiorFunctions[0][1] < inferiorFunctions[1][1]
      ? maxFunctionArr[0]
      : maxFunctionArr[1];
  }

  return maxFunctionArr[0];
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
  } else if (letterValues.E < letterValues.I) {
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
  } else {
    // get dominant function
    const domFunc = compareInferiorFunctions(cognitiveFunctions);

    // get auxiliary function
    if (domFunc === "Ti" || domFunc === "Fi") {
      const auxFunc1 = getHighestValueFunction({
        Ne: extrovertedFunctions.Ne,
        Se: extrovertedFunctions.Se,
      });

      mbtiType = `I${auxFunc1}${domFunc[0]}P`;
    }

    if (domFunc === "Ni" || domFunc === "Si") {
      const auxFunc2 = getHighestValueFunction({
        Te: extrovertedFunctions.Te,
        Fe: extrovertedFunctions.Fe,
      });

      mbtiType = `I${domFunc[0]}${auxFunc2}J`;
    }

    if (domFunc === "Te" || domFunc === "Fe") {
      const auxFunc3 = getHighestValueFunction({
        Ni: introvertedFunctions.Ni,
        Si: introvertedFunctions.Si,
      });

      mbtiType = `E${auxFunc3}${domFunc[0]}J`;
    }

    if (domFunc === "Se" || domFunc === "Ne") {
      const auxFunc2 = getHighestValueFunction({
        Ti: introvertedFunctions.Ti,
        Fi: introvertedFunctions.Fi,
      });

      mbtiType = `E${domFunc[0]}${auxFunc2}P`;
    }
  }
};

const getMBTIAnalysis = (answers, testType) => {
  if (answers) {
    extractValues(answers);
    sortCognitiveFunctions();
    mbtiCalculator();

    const results = {
      testType: testType,
      mbtiType,
      description: typeDescriptions.data[mbtiType],
      fourLetters: {
        E: Math.round((letterValues.E / 64) * 100),
        I: Math.abs(100 - Math.round((letterValues.E / 64) * 100)),
        N: Math.round((letterValues.N / 32) * 100),
        S: Math.abs(100 - Math.round((letterValues.N / 32) * 100)),
        F: Math.round((letterValues.F / 32) * 100),
        T: Math.abs(100 - Math.round((letterValues.F / 32) * 100)),
        P: Math.round((letterValues.P / 64) * 100),
        J: Math.round(100 - Math.round((letterValues.P / 64) * 100)),
      },
      cognitiveFunctions,
    };

    return results;
  }

  return false;
};

export default getMBTIAnalysis;
