type FTJCurrency = "JPY" | "USD";

interface FTJAmount {
  originalValue: number;
  convertedValue: number;
  baseCurrency: FTJCurrency;
  homeCurrency: FTJCurrency;
}

const addTwoAmounts = (a: FTJAmount, b: FTJAmount): FTJAmount => {
  return {
    originalValue: a.originalValue + b.originalValue,
    convertedValue: a.convertedValue + b.convertedValue,
    baseCurrency: a.baseCurrency,
    homeCurrency: a.homeCurrency,
  };
};

const subtractTwoAmounts = (a: FTJAmount, b: FTJAmount): FTJAmount => {
  return {
    originalValue: a.originalValue - b.originalValue,
    convertedValue: a.convertedValue - b.convertedValue,
    baseCurrency: a.baseCurrency,
    homeCurrency: a.homeCurrency,
  };
};

const multiplyAmountByFactor = (a: FTJAmount, factor: number): FTJAmount => {
  return {
    originalValue: a.originalValue * factor,
    convertedValue: a.convertedValue * factor,
    baseCurrency: a.baseCurrency,
    homeCurrency: a.homeCurrency,
  };
};
