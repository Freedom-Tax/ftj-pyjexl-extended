"use strict";
const addTwoAmounts = (a, b) => {
    return {
        originalValue: a.originalValue + b.originalValue,
        convertedValue: a.convertedValue + b.convertedValue,
        baseCurrency: a.baseCurrency,
        homeCurrency: a.homeCurrency,
    };
};
const subtractTwoAmounts = (a, b) => {
    return {
        originalValue: a.originalValue - b.originalValue,
        convertedValue: a.convertedValue - b.convertedValue,
        baseCurrency: a.baseCurrency,
        homeCurrency: a.homeCurrency,
    };
};
const multiplyAmountByFactor = (a, factor) => {
    return {
        originalValue: a.originalValue * factor,
        convertedValue: a.convertedValue * factor,
        baseCurrency: a.baseCurrency,
        homeCurrency: a.homeCurrency,
    };
};
