﻿



var measures = [{ "dimensions": "L", "name": "Length" },
    { "dimensions": "L^{2}", "name": "Area" },
    { "dimensions": "L^{3}", "name": "Volume" },
    { "dimensions": "T", "name": "Time" },
    { "dimensions": "L T^{-1}", "name": "Speed" },
    { "dimensions": "L T^{-2}", "name": "Acceleration" },
    { "dimensions": "M", "name": "Mass" },
    { "dimensions": "M L^{-3}", "name": "Density" },
    { "dimensions": "M L T^{-1}", "name": "Momentum" },
    { "dimensions": "M L T^{-2}", "name": "Force" },
    { "dimensions": "M L^{2} T^{-2}", "name": "Energy" },
    { "dimensions": "M L^{2} T^{-3}", "name": "Power" },
    { "dimensions": "M L^{2} T^{-2} Q^{-1}", "name": "Electric Potential Difference" },
    { "dimensions": "Q T^{-1}", "name": "Electric Current" },
    { "dimensions": "", "name": "" },
];


var ratios = [["metres", "inches", 0.0254],
    ["metres", "feet", 0.0254 * 12],
    ["metres", "yards", 0.0254 * 12 * 3],
    ["metres", "miles", 0.0254 * 12 * 3 * 1760],
    ["feet", "inches", 1 / 12],
    ["yards", "inches", 1 / (12 * 3)],
    ["miles", "inches", 1 / (12 * 3 * 1760)]

];

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
}

class Metre extends BaseUnit {
    constructor() {
        super("Metre", "Metres", "m", [], "L", true, 1.0, true);
    }
}

class Inch extends BaseUnit {
    constructor() {
        super("Inch", "Inches", "in", [], "L", false, 0.9, false);
    }
}

class Foot extends BaseUnit {
    constructor() {
        super("Foot", "Feet", "ft", [], "L", false, 0.8, false);
    }
}

class Yard extends BaseUnit {
    constructor() {
        super("Yard", "Yards", "yd", [], "L", false, 0.5, false);
    }
}

class Mile extends BaseUnit {
    constructor() {
        super("Mile", "Miles", "mi", ["m"], "L", false, 1.0, false);
    }
}

class Second extends BaseUnit {
    constructor() {
        super("Second", "Seconds", "s", [], "T", true, 1.0, true);
    }
}

class Minute extends BaseUnit {
    constructor() {
        super("Minute", "Minutes", "min", ["m", "minute"], "T", false, 1.0, false);
    }
}

class Hour extends BaseUnit {
    constructor() {
        super("Hour", "Hours", "h", ["hr", "hrs"], "T", false, 1.0, false);
    }
}

class Day extends BaseUnit {
    constructor() {
        super("Day", "Days", "d", ["dy", "dys"], "T", false, 0.8, false);
    }
}

class Year extends BaseUnit {
    constructor() {
        super("Year", "Years", "y", ["yr", "yrs"], "T", true, 0.9, false);
    }
}

class ElectronVolt extends BaseUnit {
    constructor() {
        super("Electron-Volt", "Electron-Volts", "eV", ["ev"], "M L^{2} T^{-2}", true, 1.0, true);
    }
}

class Gram extends BaseUnit {
    constructor() {
        super("Gram", "Grams", "g", [], "M", true, 1.0, true);
    }
}

class Joule extends BaseUnit {
    constructor() {
        super("Joule", "Joules", "J", [], "M L^{2} T^{-2}", true, 1.0, true);
    }
}

class Watt extends BaseUnit {
    constructor() {
        super("Watt", "Watts", "W", [], "M L^{2} T^{-3}", true, 1.0, true);
    }
}

class Volt extends BaseUnit {
    constructor() {
        super("Volt", "Volts", "V", [], "M L^{2} T^{-2} Q^{-1}", true, 1.0, true);
    }
}

class Amp extends BaseUnit {
    constructor() {
        super("Amp", "Amps", "A", [], "Q T^{-1}", true, 1.0, true);
    }
}

class UnitPrefix {
    constructor(name, symbol, multiplierExponent, commonness) {
        this.name = name;
        this.symbol = symbol;
        this.multiplierExponent = multiplierExponent;
        this.commonness = commonness;
    }
}

class Deca extends UnitPrefix {
    constructor() {
        super("deca", "da", 1, 0.6);
    }
}

class Hecto extends UnitPrefix {
    constructor() {
        super("hecto", "h", 2, 0.5);
    }
}

class Kilo extends UnitPrefix {
    constructor() {
        super("kilo", "k", 3, 1.0);
    }
}

class Mega extends UnitPrefix {
    constructor() {
        super("mega", "M", 6, 0.9);
    }
}

class Giga extends UnitPrefix {
    constructor() {
        super("giga", "G", 9, 0.8);
    }
}

class Tera extends UnitPrefix {
    constructor() {
        super("tera", "T", 12, 0.7);
    }
}

class Peta extends UnitPrefix {
    constructor() {
        super("peta", "P", 15, 0.3);
    }
}

class Exa extends UnitPrefix {
    constructor() {
        super("exa", "E", 18, 0.2);
    }
}

class Zetta extends UnitPrefix {
    constructor() {
        super("zetta", "Z", 21, 0.1);
    }
}

class Yotta extends UnitPrefix {
    constructor() {
        super("yotta", "Y", 24, 0.1);
    }
}

class Deci extends UnitPrefix {
    constructor() {
        super("deci", "d", -1, 0.8);
    }
}

class Centi extends UnitPrefix {
    constructor() {
        super("centi", "c", -2, 1.0);
    }
}

class Milli extends UnitPrefix {
    constructor() {
        super("milli", "m", -3, 1.0);
    }
}

class Micro extends UnitPrefix {
    constructor() {
        super("micro", "μ", -6, 0.8);
    }
}

class Nano extends UnitPrefix {
    constructor() {
        super("nano", "n", -9, 0.9);
    }
}

class Pico extends UnitPrefix {
    constructor() {
        super("pico", "p", -12, 0.5);
    }
}

class Femto extends UnitPrefix {
    constructor() {
        super("femto", "f", -15, 0.3);
    }
}

class Atto extends UnitPrefix {
    constructor() {
        super("atto", "a", -18, 0.1);
    }
}

class Zepto extends UnitPrefix {
    constructor() {
        super("zepto", "z", -21, 0.1);
    }
}

class Yocto extends UnitPrefix {
    constructor() {
        super("yocto", "y", -24, 0.1);
    }
}

class NonePrefix extends UnitPrefix {
    constructor() {
        super("", "", 0, 0.9);
    }
}

class Unit {
    constructor(unitPrefix, baseUnit) {
        this.unitPrefix = unitPrefix;
        this.baseUnit = baseUnit;
    }

    get singularName() {
        return capitaliseFirstLetter(this.unitPrefix.name.toLowerCase() + this.baseUnit.singularName.toLowerCase());
    }

    get pluralName() {
        return capitaliseFirstLetter(this.unitPrefix.name.toLowerCase() + this.baseUnit.pluralName.toLowerCase());
    }

    get symbol() {
        return this.unitPrefix.symbol + this.baseUnit.symbol;
    }

    get alternateSymbols() {
        return this.baseUnit.alternateSymbols.map(s =>  this.unitPrefix.symbol + s);
    }

    get dimensions() {
        return this.baseUnit.dimensions;
    }

    get measure() {
        var a = measures.filter(m => m.dimensions == this.dimensions);

        if (a.length > 0) {
            return a[0].name;
        }

        return "";
    }

    get hasPrefix() {
        return (this.unitPrefix != null && this.unitPrefix != undefined && this.unitPrefix.symbol != "");
    }

    get commonness() {
        return this.unitPrefix.commonness * this.baseUnit.commonness;
    }

    get isMetric() {
        return this.baseUnit.isMetric;
    }
}





class Number {
    constructor(significand, exponent) {
        this.significand = significand;
        this.exponent = exponent;
    }
}

class OutputValue {
    constructor() {
        this.number = new Number(0, 0);
        this.unit = new Unit();
    }

    toString() {
        return writeNumber(this.number.significand, 3, false) + " " + this.unit.symbol;

        if (this.number.exponent == 0) {
            return this.number.significand.toString() + " " + this.unit.symbol;
        }
        else {
            return this.number.significand.toString() + " × 10<sup>" + this.number.exponent.toString() + "</sup> " + this.unit.symbol;
        }
    }
}

function capitaliseFirstLetter(text) {
    return text.substr(0, 1).toUpperCase() + text.substr(1);
}



function getOrderOfMagnitude(n) {
    if (n == 0) {
        return 0;
    }

    return Math.floor(Math.log10(Math.abs(n)));
}

function writeNumber(n, nsf, sf) {

    var e = 0;
    var o = getOrderOfMagnitude(n);

    if (sf || o > 7 || o < -7) {
        n = n * Math.pow(10, -o);
        e = o;
    }

    var t1 = n.toString(); // the input number as a string
    var t2 = ""; // the output string
    var m = 0; // the number of significant figures that have been seen
    var p = 0; // the number of decimal points that have been seen

    for (var i = 0; i < t1.length; i++) {
        var c1 = t1[i];

        if (c1 == "-") {
            t2 += c1;
        }
        if ("123456789".split("").filter(c2 => c2 == c1).length > 0) {
            m += 1;
            if (m <= nsf) {
                t2 += c1;
            }
            else if (m > nsf) {
                if (p == 0) {
                    t2 += "0";
                }
                else {
                    break;
                }
            }
        }
        if (c1 == ".") {
            p += 1;
            if (m < nsf) {
                t2 += c1;
            }
        }
        if (c1 == "0") {

            if (m > 0) {
                m += 1;
            }

            t2 += c1;
        }
        if (c1 == "e") {
            break;
        }
    }

    if (e != 0) {
        t2 += " × 10<sup>" + e.toString() + "</sup> ";
    }

    return t2;
}

class UnitIdentifier {
    constructor() {

        this.baseUnits = [new Metre(), new Inch(), new Foot(), new Yard(), new Mile(), new Second(), new Minute(), new Hour(), new Day(), new Year(), new ElectronVolt(), new Gram(), new Joule(), new Watt(), new Volt(), new Amp()];

        this.unitPrefixes = [new Deca(), new Hecto(), new Kilo(), new Mega(), new Giga(), new Tera(), new Peta(), new Exa(), new Zetta(), new Yotta(), new Deci(), new Centi(), new Milli(), new Micro(), new Nano(), new Pico(), new Femto(), new Atto(), new Zepto(), new Yocto()];
    }

    getMatchingUnitPrefixes(symbol) {
        var unitPrefixMatches = this.unitPrefixes.filter(p => symbol.length > p.symbol.length && symbol.startsWith(p.symbol));

        return unitPrefixMatches;
    }

    getMatchingUnits(symbol) {

        var unitMatches = [];

        var baseUnitMatches = this.baseUnits.filter(u => u.symbol == symbol || u.singularName.toLowerCase() == symbol.toLowerCase() || u.pluralName.toLowerCase() == symbol.toLowerCase() || u.alternateSymbols.filter(as => as == symbol).length > 0);

        baseUnitMatches.forEach(u => {
            unitMatches.push(new Unit(new NonePrefix(), u));
        });

        var unitPrefixMatches = this.getMatchingUnitPrefixes(symbol);

        console.log(unitPrefixMatches);

        unitPrefixMatches.forEach(p => {

            var s = symbol.substr(p.symbol.length);
            baseUnitMatches = this.baseUnits.filter(u => u.canHaveSIPrefix && (u.symbol == s || u.alternateSymbols.filter(as => as == s).length > 0));

            baseUnitMatches.forEach(u => {
                unitMatches.push(new Unit(p, u));
            });

        });

        unitMatches.sort(function (a, b) { return b.commonness - a.commonness });

        console.log(unitMatches);

        return unitMatches;
    }

    getUnitsWithDimensions(dimensions, minimumCommonness) {
        var units = [];

        this.baseUnits.forEach(u => {

            if (u.canHaveSIPrefix) {
                this.unitPrefixes.forEach(p => {
                    units.push(new Unit(p, u));
                });
            }
            else {
                units.push(new Unit(new NonePrefix(), u));
            }

        });

        units = units.filter(u => u.dimensions == dimensions && u.commonness >= minimumCommonness);

        return units;
    }

    convertValue(value, fromUnit, toUnit) {

        if (fromUnit.hasPrefix) {
            value = value * Math.pow(10, fromUnit.unitPrefix.multiplierExponent);
        }

        if (toUnit.hasPrefix) {
            value = value * Math.pow(10, -toUnit.unitPrefix.multiplierExponent);
        }

        var a = false;

        ratios.forEach(r => {
            if (fromUnit.baseUnit.pluralName.toLowerCase() == r[0] && toUnit.baseUnit.pluralName.toLowerCase() == r[1]) {
                value = value / r[2];
                a = true;
            }
            if (fromUnit.baseUnit.pluralName.toLowerCase() == r[1] && toUnit.baseUnit.pluralName.toLowerCase() == r[0]) {
                value = value * r[2];
                a = true;
            }
            if (fromUnit.baseUnit.pluralName.toLowerCase() == toUnit.baseUnit.pluralName.toLowerCase()) {
                a = true;
            }
        });

        var outputValue = new OutputValue();

        if (a) {
            outputValue.number.significand = value;
            outputValue.unit = toUnit;
        }

        return outputValue;

    }
}