﻿
class Quantity {
    constructor(dimensions, name, colour) {
        this.dimensions = dimensions;
        this.name = name;
        this.colour = colour;
    }
}

const Length = new Quantity("L", "Length", "#1096cc");
const Area = new Quantity("L^{2}", "Area", "#277f4a");
const Volume = new Quantity("L^{3}", "Volume", "#214ab2");
const Time = new Quantity("T", "Time", "#09297a");
const Speed = new Quantity("L T^{-1}", "Speed", "#cc4210");
const Acceleration = new Quantity("L T^{-2}", "Acceleration", "#b20c0c");
const Mass = new Quantity("M", "Mass", "#6b300e");
const Density = new Quantity("M L^{-3}", "Density", "#404040");
const Momentum = new Quantity("M L T^{-1}", "Momentum", "#9e0f29");
const Force = new Quantity("M L T^{-2}", "Force", "#890c5f");
const Energy = new Quantity("M L^{2} T^{-2}", "Energy", "#7c0c89");
const Power = new Quantity("M L^{2} T^{-3}", "Power", "#590c89");
const ElectricPotentialDifference = new Quantity("M L^{2} T^{-3} Q^{-1}", "Electric Potential Difference", "");
const ElectricCurrent = new Quantity("Q T^{-1}", "Electric Current", "");

const quantities = [Length, Area, Volume, Time, Speed, Acceleration, Mass, Density, Momentum, Force, Energy, Power, ElectricPotentialDifference, ElectricCurrent];



class BaseUnit {
    constructor(singularName, pluralName, symbol, alternateSymbols, dimensions, canHaveSIPrefix, commonness, isMetric) {
        this.singularName = singularName;
        this.pluralName = pluralName;
        this.symbol = symbol;
        this.alternateSymbols = alternateSymbols;
        this.dimensions = dimensions;
        this.canHaveSIPrefix = canHaveSIPrefix;
        this.commonness = commonness;
        this.isMetric = isMetric;
    }

    equals(unit) {
        if (unit == null || unit == undefined) {
            return false;
        }

        return unit.pluralName == this.pluralName;
    }
}

const Metre = new BaseUnit("Metre", "Metres", "m", [], "L", true, 1.0, true);
const Inch = new BaseUnit("Inch", "Inches", "in", [], "L", false, 0.9, false);
const Foot = new BaseUnit("Foot", "Feet", "ft", [], "L", false, 0.8, false);
const Yard = new BaseUnit("Yard", "Yards", "yd", [], "L", false, 0.5, false);
const Mile = new BaseUnit("Mile", "Miles", "mi", ["m"], "L", false, 1.0, false);
const Second = new BaseUnit("Second", "Seconds", "s", [], "T", true, 1.0, true);
const Minute = new BaseUnit("Minute", "Minutes", "min", ["m", "minute"], "T", false, 1.0, false);
const Hour = new BaseUnit("Hour", "Hours", "h", ["hr", "hrs"], "T", false, 1.0, false);
const Day = new BaseUnit("Day", "Days", "d", ["dy", "dys"], "T", false, 0.8, false);
const Year = new BaseUnit("Year", "Years", "y", ["yr", "yrs"], "T", true, 0.9, false);
const Gram = new BaseUnit("Gram", "Grams", "g", [], "M", true, 1.0, true);
const Joule = new BaseUnit("Joule", "Joules", "J", [], "M L^{2} T^{-2}", true, 1.0, true);
const ElectronVolt = new BaseUnit("Electron-Volt", "Electron-Volts", "eV", ["ev"], "M L^{2} T^{-2}", true, 1.0, true);
const FootPoundForce = new BaseUnit("Foot Pound-Force", "Foot Pound-Force", "ft lbf", ["ft lb"], "M L^{2} T^{-2}", false, 0.1, false);
const BritishThermalUnitISO = new BaseUnit("British Thermal Unit (ISO)", "British Thermal Units (ISO)", "Btu", ["BTU"], "M L^{2} T^{-2}", false, 0.1, false);
const WattHour = new BaseUnit("Watt-hour", "Watt-hours", "Wh", [], "M L^{2} T^{-2}", true, 0.5, true);
const Watt = new BaseUnit("Watt", "Watts", "W", [], "M L^{2} T^{-3}", true, 1.0, true);
const Volt = new BaseUnit("Volt", "Volts", "V", [], "M L^{2} T^{-2} Q^{-1}", true, 1.0, true);
const Amp = new BaseUnit("Amp", "Amps", "A", [], "Q T^{-1}", true, 1.0, true);

const baseUnits = [Metre, Inch, Foot, Yard, Mile, Second, Minute, Hour, Day, Year, Gram, Joule, ElectronVolt, FootPoundForce, BritishThermalUnitISO, WattHour, Watt, Volt, Amp];



class Ratio {
    constructor(a, b, aToBRatio) {
        this.a = a;
        this.b = b;
        this.aToBRatio = aToBRatio;
    }

    isMatch(c, d) {
        return ((this.a.equals(c) && this.b.equals(d)) || (this.a.equals(d) && this.b.equals(c)));
    }

    getRatio(c, d) {
        if (this.a.equals(c) && this.b.equals(d)) {
            return this.aToBRatio;
        }
        else if (this.a.equals(d) && this.b.equals(c)) {
            return 1 / this.aToBRatio;
        }
        else {
            return 1;
        }
    }
}

var ratios = [new Ratio(Metre, Inch, 1000 / 25.4),
    new Ratio(Metre, Foot, 1000 / (25.4 * 12)),
    new Ratio(Metre, Yard, 1000 / (25.4 * 12 * 3)),
     new Ratio(Metre, Mile, 1000 / (25.4 * 12 * 3 * 1760)),
     new Ratio(Foot, Inch, 12),
     new Ratio(Yard, Inch, 12 * 3),
     new Ratio(Mile, Inch, 12 * 3 * 1760),
     new Ratio(Mile, Foot, 3 * 1760),
     new Ratio(Mile, Yard, 1760),
      new Ratio(FootPoundForce, Joule, 1.3558179483314004),
       new Ratio(BritishThermalUnitISO, Joule, 1055.06),
      new Ratio(WattHour, Joule, 1 / 3600),
      new Ratio(Joule, ElectronVolt, 1 / 1.6021766208e-19)];



class Prefix {
    constructor(name, symbol, multiplierExponent, commonness) {
        this.name = name;
        this.symbol = symbol;
        this.multiplierExponent = multiplierExponent;
        this.commonness = commonness;
    }

    multiplier(s) {
        return (new Decimal(10)).toPower(s * this.multiplierExponent);
    }
}

const Deca = new Prefix("deca", "da", 1, 0.6);
const Hecto = new Prefix("hecto", "h", 2, 0.5);
const Kilo = new Prefix("kilo", "k", 3, 1.0);
const Mega = new Prefix("mega", "M", 6, 0.9);
const Giga = new Prefix("giga", "G", 9, 0.8);
const Tera = new Prefix("tera", "T", 12, 0.7);
const Peta = new Prefix("peta", "P", 15, 0.3);
const Exa = new Prefix("exa", "E", 18, 0.2);
const Zetta = new Prefix("zetta", "Z", 21, 0.1);
const Yotta = new Prefix("yotta", "Y", 24, 0.1);

const Deci = new Prefix("deci", "d", -1, 0.8);
const Centi = new Prefix("centi", "c", -2, 1.0);
const Milli = new Prefix("milli", "m", -3, 1.0);
const Micro = new Prefix("micro", "μ", -6, 0.8);
const Nano = new Prefix("nano", "n", -9, 0.9);
const Pico = new Prefix("pico", "p", -12, 0.5);
const Femto = new Prefix("femto", "f", -15, 0.3);
const Atto = new Prefix("atto", "a", -18, 0.1);
const Zepto = new Prefix("zepto", "z", -21, 0.1);
const Yocto = new Prefix("yocto", "y", -24, 0.1);

const prefixes = [Deca, Hecto, Kilo, Mega, Giga, Tera, Peta, Exa, Zetta, Yotta, Deci, Centi, Milli, Micro, Nano, Pico, Femto, Atto, Zepto, Yocto];

const NONE = new Prefix("", "", 0, 0.9);



class Unit {
    constructor(prefix, baseUnit) {
        this.prefix = prefix;
        this.baseUnit = baseUnit;
    }

    get singularName() {
        return capitaliseFirstLetter(this.prefix.name.toLowerCase()) + decapitaliseFirstLetter(this.baseUnit.singularName);
    }

    get pluralName() {
        return capitaliseFirstLetter(this.prefix.name.toLowerCase()) + decapitaliseFirstLetter(this.baseUnit.pluralName);
    }

    get symbol() {
        return this.prefix.symbol + this.baseUnit.symbol;
    }

    get alternateSymbols() {
        return this.baseUnit.alternateSymbols.map(s =>  this.prefix.symbol + s);
    }

    get dimensions() {
        return this.baseUnit.dimensions;
    }

    get quantity() {
        var a = quantities.filter(q => q.dimensions == this.dimensions);

        if (a.length > 0) {
            return a[0];
        }

        return { name: "" };
    }

    get hasPrefix() {
        return (this.prefix != null && this.prefix != undefined && this.prefix.symbol != "");
    }

    get commonness() {
        return this.prefix.commonness * this.baseUnit.commonness;
    }

    get isMetric() {
        return this.baseUnit.isMetric;
    }
}



class OutputValue {
    constructor(number, unit) {
        this.number = number;
        this.unit = unit;
    }

    toString(nsf) {
        return writeNumberDecimal(this.number, nsf, false, false) + " " + this.unit.symbol;
    }

    asWords(nsf) {
        return writeNumberDecimal(this.number, nsf, false, false) + " " + this.unit.pluralName.toLowerCase();
    }

    toLaTeX(nsf) {
        return writeNumberDecimal(this.number, nsf, false, true) + " \\,\\mathrm{" + this.unit.symbol + "}";
    }
}



function capitaliseFirstLetter(text) {
    return text.substr(0, 1).toUpperCase() + text.substr(1);
}

function decapitaliseFirstLetter(text) {
    return text.substr(0, 1).toLowerCase() + text.substr(1);
}



class UnitConverter {
    constructor() {
        this.prefixes = prefixes.sort(function (a, b) { return b.multiplierExponent - a.multiplierExponent });
        this.baseUnits = baseUnits;
        this.allUnits = this.getAllUnits();
    }

    getMatchingPrefixes(symbol) {
        return this.prefixes.filter(p => symbol.length > p.symbol.length && symbol.startsWith(p.symbol));
    }

    getMatchingUnits(symbol) {
        var unitMatches = [];

        var baseUnitMatches = this.baseUnits.filter(u => u.symbol == symbol || u.singularName.toLowerCase() == symbol.toLowerCase() || u.pluralName.toLowerCase() == symbol.toLowerCase() || u.alternateSymbols.filter(as => as == symbol).length > 0);

        baseUnitMatches.forEach(u => {
            unitMatches.push(new Unit(NONE, u));
        });

        var prefixMatches = this.getMatchingPrefixes(symbol);

        prefixMatches.forEach(p => {

            var s = symbol.substr(p.symbol.length);

            baseUnitMatches = this.baseUnits.filter(u => u.canHaveSIPrefix && (u.symbol == s || u.alternateSymbols.filter(as => as == s).length > 0));

            baseUnitMatches.forEach(u => {
                unitMatches.push(new Unit(p, u));
            });

        });

        unitMatches.sort(function (a, b) { return b.commonness - a.commonness });

        return unitMatches;
    }

    getAllUnits() {
        var units = [];

        this.baseUnits.forEach(u => {
            units.push(new Unit(NONE, u));

            if (u.canHaveSIPrefix) {
                this.prefixes.forEach(p => {
                    units.push(new Unit(p, u));
                });
            }
        });

        return units;
    }

    getUnitsWithDimensions(dimensions, minimumCommonness) {
        return this.allUnits.filter(u => u.dimensions == dimensions && u.commonness >= minimumCommonness);
    }

    getMetricUnitsWithDimensions(dimensions, minimumCommonness) {
        return this.allUnits.filter(u => u.dimensions == dimensions && u.isMetric && u.commonness >= minimumCommonness);
    }

    getNonMetricUnitsWithDimensions(dimensions, minimumCommonness) {
        return this.allUnits.filter(u => u.dimensions == dimensions && !u.isMetric && u.commonness >= minimumCommonness);
    }

    convertValue(value, fromUnit, toUnit) {

        if (fromUnit.hasPrefix) {
            value = value.times(fromUnit.prefix.multiplier(1));
        }
        if (toUnit.hasPrefix) {
            value = value.times(toUnit.prefix.multiplier(-1));
        }

        var a = false;

        ratios.forEach(r => {
            if (r.isMatch(fromUnit.baseUnit, toUnit.baseUnit)) {
                var c = r.getRatio(fromUnit.baseUnit, toUnit.baseUnit);

                value = value.times(c);
                a = true;
            }
            if (fromUnit.baseUnit.equals(toUnit.baseUnit)) {
                a = true;
            }
        });

        if (!a) {
            return null;
        }

        return new OutputValue(value, toUnit);
    }
}