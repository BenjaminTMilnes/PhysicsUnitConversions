
class Quantity {
    constructor(dimensions, name, colour) {
        this.dimensions = dimensions;
        this.name = name;
        this.colour = colour;
    }
}

class Length extends Quantity { constructor() { super("L", "Length", "#1096cc"); } }
class Area extends Quantity { constructor() { super("L^{2}", "Area", "#277f4a"); } }
class Volume extends Quantity { constructor() { super("L^{3}", "Volume", "#214ab2"); } }
class Time extends Quantity { constructor() { super("T", "Time", "#09297a"); } }
class Speed extends Quantity { constructor() { super("L T^{-1}", "Speed", "#cc4210"); } }
class Acceleration extends Quantity { constructor() { super("L T^{-2}", "Acceleration", "#b20c0c"); } }
class Mass extends Quantity { constructor() { super("M", "Mass", "#6b300e"); } }
class Density extends Quantity { constructor() { super("M L^{-3}", "Density", "#404040"); } }
class Momentum extends Quantity { constructor() { super("M L T^{-1}", "Momentum", "#9e0f29"); } }
class Force extends Quantity { constructor() { super("M L T^{-2}", "Force", "#890c5f"); } }
class Energy extends Quantity { constructor() { super("M L^{2} T^{-2}", "Energy", "#7c0c89"); } }
class Power extends Quantity { constructor() { super("M L^{2} T^{-3}", "Power", "#590c89"); } }
class ElectricPotentialDifference extends Quantity { constructor() { super("M L^{2} T^{-3} Q^{-1}", "Electric Potential Difference", ""); } }
class ElectricCurrent extends Quantity { constructor() { super("Q T^{-1}", "Electric Current", ""); } }

var quantities = [new Length(), new Area(), new Volume(), new Time(), new Speed(), new Acceleration(), new Mass(), new Density(), new Momentum(), new Force(), new Energy(), new Power(), new ElectricPotentialDifference(), new ElectricCurrent()];



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

class Metre extends BaseUnit {
    constructor() { super("Metre", "Metres", "m", [], "L", true, 1.0, true); }
}

class Inch extends BaseUnit {
    constructor() { super("Inch", "Inches", "in", [], "L", false, 0.9, false); }
}

class Foot extends BaseUnit {
    constructor() { super("Foot", "Feet", "ft", [], "L", false, 0.8, false); }
}

class Yard extends BaseUnit {
    constructor() { super("Yard", "Yards", "yd", [], "L", false, 0.5, false); }
}

class Mile extends BaseUnit {
    constructor() { super("Mile", "Miles", "mi", ["m"], "L", false, 1.0, false); }
}

class Second extends BaseUnit {
    constructor() { super("Second", "Seconds", "s", [], "T", true, 1.0, true); }
}

class Minute extends BaseUnit {
    constructor() { super("Minute", "Minutes", "min", ["m", "minute"], "T", false, 1.0, false); }
}

class Hour extends BaseUnit {
    constructor() { super("Hour", "Hours", "h", ["hr", "hrs"], "T", false, 1.0, false); }
}

class Day extends BaseUnit {
    constructor() { super("Day", "Days", "d", ["dy", "dys"], "T", false, 0.8, false); }
}

class Year extends BaseUnit {
    constructor() { super("Year", "Years", "y", ["yr", "yrs"], "T", true, 0.9, false); }
}

class Gram extends BaseUnit {
    constructor() { super("Gram", "Grams", "g", [], "M", true, 1.0, true); }
}

class Joule extends BaseUnit {
    constructor() { super("Joule", "Joules", "J", [], "M L^{2} T^{-2}", true, 1.0, true); }
}

class ElectronVolt extends BaseUnit {
    constructor() { super("Electron-Volt", "Electron-Volts", "eV", ["ev"], "M L^{2} T^{-2}", true, 1.0, true); }
}

class FootPoundForce extends BaseUnit {
    constructor() { super("Foot Pound-Force", "Foot Pound-Force", "ft lbf", ["ft lb"], "M L^{2} T^{-2}", false, 0.1, false); }
}

class BritishThermalUnitISO extends BaseUnit {
    constructor() { super("British Thermal Unit (ISO)", "British Thermal Units (ISO)", "Btu", ["BTU"], "M L^{2} T^{-2}", false, 0.1, false); }
}

class  WattHour extends BaseUnit {
    constructor() { super( "Watt-hour", "Watt-hours", "Wh", [  ""], "M L^{2} T^{-2}", true, 0.5, true); }
}

class Watt extends BaseUnit {
    constructor() { super("Watt", "Watts", "W", [], "M L^{2} T^{-3}", true, 1.0, true); }
}

class Volt extends BaseUnit {
    constructor() { super("Volt", "Volts", "V", [], "M L^{2} T^{-2} Q^{-1}", true, 1.0, true); }
}

class Amp extends BaseUnit {
    constructor() { super("Amp", "Amps", "A", [], "Q T^{-1}", true, 1.0, true); }
}




var ratios = [[new Metre(), new Inch(), 25.4 / 1000],
    [new Metre(), new Foot(), (25.4 / 1000) * 12],
    [new Metre(), new Yard(), (25.4 / 1000) * 12 * 3],
    [new Metre(), new Mile(), (25.4 / 1000) * 12 * 3 * 1760],
    [new Foot(), new Inch(), 1 / 12],
    [new Yard(), new Inch(), 1 / (12 * 3)],
    [new Mile(), new Inch(), 1 / (12 * 3 * 1760)],
      [new FootPoundForce(), new Joule(), 1.3558179483314004],
      [new BritishThermalUnitISO(), new Joule(), 1055.06],
      [new WattHour(), new Joule(), 1/3600]
];



class Prefix {
    constructor(name, symbol, multiplierExponent, commonness) {
        this.name = name;
        this.symbol = symbol;
        this.multiplierExponent = multiplierExponent;
        this.commonness = commonness;
    }
}

class Deca extends Prefix { constructor() { super("deca", "da", 1, 0.6); } }
class Hecto extends Prefix { constructor() { super("hecto", "h", 2, 0.5); } }
class Kilo extends Prefix { constructor() { super("kilo", "k", 3, 1.0); } }
class Mega extends Prefix { constructor() { super("mega", "M", 6, 0.9); } }
class Giga extends Prefix { constructor() { super("giga", "G", 9, 0.8); } }
class Tera extends Prefix { constructor() { super("tera", "T", 12, 0.7); } }
class Peta extends Prefix { constructor() { super("peta", "P", 15, 0.3); } }
class Exa extends Prefix { constructor() { super("exa", "E", 18, 0.2); } }
class Zetta extends Prefix { constructor() { super("zetta", "Z", 21, 0.1); } }
class Yotta extends Prefix { constructor() { super("yotta", "Y", 24, 0.1); } }

class Deci extends Prefix { constructor() { super("deci", "d", -1, 0.8); } }
class Centi extends Prefix { constructor() { super("centi", "c", -2, 1.0); } }
class Milli extends Prefix { constructor() { super("milli", "m", -3, 1.0); } }
class Micro extends Prefix { constructor() { super("micro", "μ", -6, 0.8); } }
class Nano extends Prefix { constructor() { super("nano", "n", -9, 0.9); } }
class Pico extends Prefix { constructor() { super("pico", "p", -12, 0.5); } }
class Femto extends Prefix { constructor() { super("femto", "f", -15, 0.3); } }
class Atto extends Prefix { constructor() { super("atto", "a", -18, 0.1); } }
class Zepto extends Prefix { constructor() { super("zepto", "z", -21, 0.1); } }
class Yocto extends Prefix { constructor() { super("yocto", "y", -24, 0.1); } }

class NonePrefix extends Prefix { constructor() { super("", "", 0, 0.9); } }

var NONE = new NonePrefix();



class Unit {
    constructor(prefix, baseUnit) {
        this.prefix = prefix;
        this.baseUnit = baseUnit;
    }

    get singularName() {
        return capitaliseFirstLetter(this.prefix.name.toLowerCase() + this.baseUnit.singularName.toLowerCase());
    }

    get pluralName() {
        return capitaliseFirstLetter(this.prefix.name.toLowerCase() + this.baseUnit.pluralName.toLowerCase());
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

    toLaTeX(nsf) {
        return writeNumberDecimal(this.number, nsf, false, true) + " \\,\\mathrm{" + this.unit.symbol + "}";
    }
}



function capitaliseFirstLetter(text) {
    return text.substr(0, 1).toUpperCase() + text.substr(1);
}

function getNumberOfSignificantFigures(t, assumeLower) {

    var m = 0; // the number of significant figures that have been seen
    var p = 0; // the number of decimal points that have been seen
    var d = 0; // deferred significant digits

    for (var i = 0; i < t.length; i++) {
        var c = t[i];

        if (isAnyOf("123456789", c)) {
            m += d;
            d = 0;

            m++;
        }
        else if (c == ".") {
            m += d;
            d = 0;

            p++;
        }
        else if (c == "0") {
            if (m > 0) {
                d++;
            }
        }
        else if (isAnyOf("+-", c)) {
            continue;
        }
        else {
            break;
        }
    }

    if (p > 0) {
        m += d;
    }

    return m;
}

function getOrderOfMagnitude(n) {
    return ((n == 0) ? 0 : Math.floor(Math.log10(Math.abs(n))));
}

function getOrderOfMagnitudeDecimal(n) {
    return ((n == 0) ? 0 : n.abs().log().floor().toFixed(0));
}

function writeNumber(n, nsf, sf) {

    var e = 0;
    var o = getOrderOfMagnitude(n);

    if (sf || o > 5 || o < -5) {
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

function writeNumberDecimal(n, nsf, sf, asLaTeX) {

    var e = 0;
    var o = getOrderOfMagnitudeDecimal(n);

    if (sf || o > 5 || o < -5) {
        n = n.times((new Decimal(10)).toPower(-o));
        e = o;
    }

    var t1 = n.toFixed(20); // the input number as a string
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

            if (m <= nsf || p == 0) {
                t2 += c1;
            }
        }
        if (c1 == "e") {
            break;
        }
    }

    if (e != 0) {
        if (asLaTeX) {
            t2 += " \\times 10^{" + e.toString() + "} ";
        }
        else {
            t2 += " × 10<sup>" + e.toString() + "</sup> ";
        }
    }

    return t2;
}



function runWriteNumberDecimalTests() {
    assertEqual("100000", writeNumberDecimal(new Decimal("123456"), 1, false));
    assertEqual("120000", writeNumberDecimal(new Decimal("123456"), 2, false));
    assertEqual("123000", writeNumberDecimal(new Decimal("123456"), 3, false));
    assertEqual("123500", writeNumberDecimal(new Decimal("123456"), 4, false));
    assertEqual("123460", writeNumberDecimal(new Decimal("123456"), 5, false));
    assertEqual("123456", writeNumberDecimal(new Decimal("123456"), 6, false));

    assertEqual("100000", writeNumberDecimal(new Decimal("101010"), 1, false));
    assertEqual("100000", writeNumberDecimal(new Decimal("101010"), 2, false));
    assertEqual("101000", writeNumberDecimal(new Decimal("101010"), 3, false));
    assertEqual("101000", writeNumberDecimal(new Decimal("101010"), 4, false));
    assertEqual("101010", writeNumberDecimal(new Decimal("101010"), 5, false));
    assertEqual("101010", writeNumberDecimal(new Decimal("101010"), 6, false));

    assertEqual("100", writeNumberDecimal(new Decimal("000000123"), 1, false));
    assertEqual("120", writeNumberDecimal(new Decimal("000000123"), 2, false));
    assertEqual("123", writeNumberDecimal(new Decimal("000000123"), 3, false));

    assertEqual("0.1", writeNumberDecimal(new Decimal("0.100000"), 1, false));
    assertEqual("0.10", writeNumberDecimal(new Decimal("0.100000"), 2, false));
    assertEqual("0.100", writeNumberDecimal(new Decimal("0.100000"), 3, false));
    assertEqual("0.1000", writeNumberDecimal(new Decimal("0.100000"), 4, false));
    assertEqual("0.10000", writeNumberDecimal(new Decimal("0.100000"), 5, false));
    assertEqual("0.100000", writeNumberDecimal(new Decimal("0.100000"), 6, false));

    assertEqual("0.01", writeNumberDecimal(new Decimal("0.0100000"), 1, false));
    assertEqual("0.010", writeNumberDecimal(new Decimal("0.0100000"), 2, false));
    assertEqual("0.0100", writeNumberDecimal(new Decimal("0.0100000"), 3, false));
    assertEqual("0.01000", writeNumberDecimal(new Decimal("0.0100000"), 4, false));
    assertEqual("0.010000", writeNumberDecimal(new Decimal("0.0100000"), 5, false));
    assertEqual("0.0100000", writeNumberDecimal(new Decimal("0.0100000"), 6, false));

    assertEqual("0.01", writeNumberDecimal(new Decimal("0.0101010"), 1, false));
    assertEqual("0.010", writeNumberDecimal(new Decimal("0.0101010"), 2, false));
    assertEqual("0.0101", writeNumberDecimal(new Decimal("0.0101010"), 3, false));
    assertEqual("0.01010", writeNumberDecimal(new Decimal("0.0101010"), 4, false));
    assertEqual("0.010101", writeNumberDecimal(new Decimal("0.0101010"), 5, false));
    assertEqual("0.0101010", writeNumberDecimal(new Decimal("0.0101010"), 6, false));

    assertEqual("100", writeNumberDecimal(new Decimal("101.101"), 1, false));
    assertEqual("100", writeNumberDecimal(new Decimal("101.101"), 2, false));
    assertEqual("101", writeNumberDecimal(new Decimal("101.101"), 3, false));
    assertEqual("101.1", writeNumberDecimal(new Decimal("101.101"), 4, false));
    assertEqual("101.10", writeNumberDecimal(new Decimal("101.101"), 5, false));
    assertEqual("101.101", writeNumberDecimal(new Decimal("101.101"), 6, false));
}

runWriteNumberDecimalTests();



class UnitConverter {
    constructor() {
        this.prefixes = [new Deca(), new Hecto(), new Kilo(), new Mega(), new Giga(), new Tera(), new Peta(), new Exa(), new Zetta(), new Yotta(), new Deci(), new Centi(), new Milli(), new Micro(), new Nano(), new Pico(), new Femto(), new Atto(), new Zepto(), new Yocto()];

        this.baseUnits = [new Metre(), new Inch(), new Foot(), new Yard(), new Mile(), new Second(), new Minute(), new Hour(), new Day(), new Year(), new ElectronVolt(), new Gram(), new Joule(), new FootPoundForce(), new BritishThermalUnitISO(), new WattHour(), new Watt(), new Volt(), new Amp()];
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
        return this.getAllUnits().filter(u => u.dimensions == dimensions && u.commonness >= minimumCommonness);
    }

    getMetricUnitsWithDimensions(dimensions, minimumCommonness) {
        return this.getAllUnits().filter(u => u.dimensions == dimensions && u.isMetric && u.commonness >= minimumCommonness);
    }

    getNonMetricUnitsWithDimensions(dimensions, minimumCommonness) {
        return this.getAllUnits().filter(u => u.dimensions == dimensions && !u.isMetric && u.commonness >= minimumCommonness);
    }

    convertValue(value, fromUnit, toUnit) {

        if (fromUnit.hasPrefix) {
            value = value.times((new Decimal(10)).toPower(fromUnit.prefix.multiplierExponent));
        }
        if (toUnit.hasPrefix) {
            value = value.times((new Decimal(10)).toPower(-toUnit.prefix.multiplierExponent));
        }

        var a = false;
        
        ratios.forEach(r => {
            if (fromUnit.baseUnit.equals(r[0]) && toUnit.baseUnit.equals(r[1])) {
                value = value.dividedBy(r[2]);
                a = true;
            }
            if (fromUnit.baseUnit.equals(r[1]) && toUnit.baseUnit.equals(r[0])) {
                value = value.times(r[2]);
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