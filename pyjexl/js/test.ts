class FTJCurrency {
  private _code: string;
  private _symbol: string;
  constructor(code: string, symbol: string) {
    this._code = code;
    this._symbol = symbol;
  }

  get code(): string {
    return this._code;
  }

  get symbol(): string {
    return this._symbol;
  }

  equals(other: FTJCurrency): boolean {
    return this.code === other.code;
  }

  toString(): string {
    return this.code;
  }

  toJSON(): string {
    return this.code;
  }
}

interface FTJAmountProps {
  originalValue: number;
  convertedValue: number | null;
  baseCurrency: FTJCurrency;
  homeCurrency: FTJCurrency;
}

class FTJAmount {
  private _props: FTJAmountProps;
  constructor(props: FTJAmountProps) {
    this._props = props;
  }

  get originalValue(): number {
    return this._props.originalValue;
  }

  get convertedValue(): number | null {
    return this._props.convertedValue;
  }

  get baseCurrency(): FTJCurrency {
    return this._props.baseCurrency;
  }

  get homeCurrency(): FTJCurrency {
    return this._props.homeCurrency;
  }

  get isSameCurrency(): boolean {
    return this.baseCurrency.equals(this.homeCurrency);
  }

  get isResolved(): boolean {
    return this.convertedValue !== null;
  }

  equals(other: FTJAmount): boolean {
    return (
      this.originalValue === other.originalValue &&
      this.convertedValue === other.convertedValue &&
      this.baseCurrency.equals(other.baseCurrency) &&
      this.homeCurrency.equals(other.homeCurrency)
    );
  }

  add(other: FTJAmount): FTJAmount {
    if (!this.baseCurrency.equals(other.baseCurrency)) {
      throw new Error("Cannot add amounts with different base currencies");
    }
    if (!this.homeCurrency.equals(other.homeCurrency)) {
      throw new Error("Cannot add amounts with different home currencies");
    }

    return new FTJAmount({
      originalValue: this.originalValue + other.originalValue,
      convertedValue:
        this.convertedValue !== null && other.convertedValue !== null
          ? this.convertedValue + other.convertedValue
          : null,
      baseCurrency: this.baseCurrency,
      homeCurrency: this.homeCurrency,
    });
  }

  subtract(other: FTJAmount): FTJAmount {
    if (!this.baseCurrency.equals(other.baseCurrency)) {
      throw new Error("Cannot subtract amounts with different base currencies");
    }
    if (!this.homeCurrency.equals(other.homeCurrency)) {
      throw new Error("Cannot subtract amounts with different home currencies");
    }

    return new FTJAmount({
      originalValue: this.originalValue - other.originalValue,
      convertedValue:
        this.convertedValue !== null && other.convertedValue !== null
          ? this.convertedValue - other.convertedValue
          : null,
      baseCurrency: this.baseCurrency,
      homeCurrency: this.homeCurrency,
    });
  }

  multiply(factor: number): FTJAmount {
    return new FTJAmount({
      originalValue: this.originalValue * factor,
      convertedValue:
        this.convertedValue !== null ? this.convertedValue * factor : null,
      baseCurrency: this.baseCurrency,
      homeCurrency: this.homeCurrency,
    });
  }

  toConvertedValueString(): string {
    return `${this.homeCurrency.symbol}${this.convertedValue?.toLocaleString("en-US") ?? "Calculating..."}`;
  }

  toOriginalValueString(): string {
    return `${this.baseCurrency.symbol}${this.originalValue.toLocaleString("en-US")}`;
  }

  toString(): string {
    if (this.isSameCurrency || !this.isResolved)
      return this.toOriginalValueString();

    return `${this.toOriginalValueString()} (${this.toConvertedValueString()})`;
  }

  toJSON(): object {
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

const addTwoAmounts = (amount1: FTJAmount, amount2: FTJAmount): Object => {
  return amount1.add(amount2).toJSON();
};

const subtractTwoAmounts = (amount1: FTJAmount, amount2: FTJAmount): Object => {
  return amount1.subtract(amount2).toJSON();
};

const multiplyAmount = (amount: FTJAmount, factor: number): Object => {
  return amount.multiply(factor).toJSON();
};