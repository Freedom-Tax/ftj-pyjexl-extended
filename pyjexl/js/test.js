"use strict";
class FTJCurrency {
    constructor(code, symbol) {
        this._code = code;
        this._symbol = symbol;
    }
    get code() {
        return this._code;
    }
    get symbol() {
        return this._symbol;
    }
    equals(other) {
        return this.code === other.code;
    }
    toString() {
        return this.code;
    }
    toJSON() {
        return this.code;
    }
}
class FTJAmount {
    constructor(props) {
        this._props = props;
    }
    get originalValue() {
        return this._props.originalValue;
    }
    get convertedValue() {
        return this._props.convertedValue;
    }
    get baseCurrency() {
        return this._props.baseCurrency;
    }
    get homeCurrency() {
        return this._props.homeCurrency;
    }
    get isSameCurrency() {
        return this.baseCurrency.equals(this.homeCurrency);
    }
    get isResolved() {
        return this.convertedValue !== null;
    }
    equals(other) {
        return (this.originalValue === other.originalValue &&
            this.convertedValue === other.convertedValue &&
            this.baseCurrency.equals(other.baseCurrency) &&
            this.homeCurrency.equals(other.homeCurrency));
    }
    add(other) {
        if (!this.baseCurrency.equals(other.baseCurrency)) {
            throw new Error("Cannot add amounts with different base currencies");
        }
        if (!this.homeCurrency.equals(other.homeCurrency)) {
            throw new Error("Cannot add amounts with different home currencies");
        }
        return new FTJAmount({
            originalValue: this.originalValue + other.originalValue,
            convertedValue: this.convertedValue !== null && other.convertedValue !== null
                ? this.convertedValue + other.convertedValue
                : null,
            baseCurrency: this.baseCurrency,
            homeCurrency: this.homeCurrency,
        });
    }
    subtract(other) {
        if (!this.baseCurrency.equals(other.baseCurrency)) {
            throw new Error("Cannot subtract amounts with different base currencies");
        }
        if (!this.homeCurrency.equals(other.homeCurrency)) {
            throw new Error("Cannot subtract amounts with different home currencies");
        }
        return new FTJAmount({
            originalValue: this.originalValue - other.originalValue,
            convertedValue: this.convertedValue !== null && other.convertedValue !== null
                ? this.convertedValue - other.convertedValue
                : null,
            baseCurrency: this.baseCurrency,
            homeCurrency: this.homeCurrency,
        });
    }
    multiply(factor) {
        return new FTJAmount({
            originalValue: this.originalValue * factor,
            convertedValue: this.convertedValue !== null ? this.convertedValue * factor : null,
            baseCurrency: this.baseCurrency,
            homeCurrency: this.homeCurrency,
        });
    }
    toConvertedValueString() {
        return `${this.homeCurrency.symbol}${this.convertedValue?.toLocaleString("en-US") ?? "Calculating..."}`;
    }
    toOriginalValueString() {
        return `${this.baseCurrency.symbol}${this.originalValue.toLocaleString("en-US")}`;
    }
    toString() {
        if (this.isSameCurrency || !this.isResolved)
            return this.toOriginalValueString();
        return `${this.toOriginalValueString()} (${this.toConvertedValueString()})`;
    }
    toJSON() {
        return {
            originalValue: this.originalValue,
            convertedValue: this.convertedValue,
            baseCurrency: this.baseCurrency.code,
            homeCurrency: this.homeCurrency.code,
        };
    }
}
const JPY = new FTJCurrency("JPY", "¥");
const USD = new FTJCurrency("USD", "$");
const amount1 = new FTJAmount({
    originalValue: 1000,
    convertedValue: 9.09,
    baseCurrency: JPY,
    homeCurrency: USD,
});
const amount2 = new FTJAmount({
    originalValue: 2000,
    convertedValue: 18.18,
    baseCurrency: JPY,
    homeCurrency: USD,
});
const addTwoAmounts = (amount1, amount2) => {
    return amount1.add(amount2).toJSON();
};
const subtractTwoAmounts = (amount1, amount2) => {
    return amount1.subtract(amount2).toJSON();
};
const multiplyAmount = (amount, factor) => {
    return amount.multiply(factor).toJSON();
};
