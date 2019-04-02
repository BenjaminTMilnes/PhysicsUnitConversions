
class Quantity {
    constructor(dimensions, name, colour) {
        this.dimensions = dimensions;
        this.name = name;
        this.colour = colour;
    }
}

class Length extends Quantity { constructor() { super("L", "Length", ""); } }
class Area extends Quantity { constructor() { super("L^{2}", "Area", ""); } }
class Volume extends Quantity { constructor() { super("L^{3}", "Volume", ""); } }
class Time extends Quantity { constructor() { super("T", "Time", ""); } }
class Speed extends Quantity { constructor() { super("L T^{-1}", "Speed", ""); } }
class Acceleration extends Quantity { constructor() { super("L T^{-2}", "Acceleration", ""); } }
class Mass extends Quantity { constructor() { super("M", "Mass", ""); } }
class Density extends Quantity { constructor() { super("M L^{-3}", "Density", ""); } }
class Momentum extends Quantity { constructor() { super("M L T^{-1}", "Momentum", ""); } }
class Force extends Quantity { constructor() { super("M L T^{-2}", "Force", ""); } }
class Energy extends Quantity { constructor() { super("M L^{2} T^{-2}", "Energy", ""); } }
class Power extends Quantity { constructor() { super("M L^{2} T^{-3}", "Power", ""); } }
class ElectricPotentialDifference extends Quantity { constructor() { super("M L^{2} T^{-3} Q^{-1}", "Electric Potential Difference", ""); } }
class ElectricCurrent extends Quantity { constructor() { super("Q T^{-1}", "Electric Current", ""); } }

var quantities = [new Length(), new Area(), new Volume(), new Time(), new Speed(), new Acceleration(), new Mass(), new Density(), new Momentum(), new Force(), new Energy(), new Power(), new ElectricPotentialDifference(), new ElectricCurrent()];






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

class ElectronVolt extends BaseUnit {
    constructor() { super("Electron-Volt", "Electron-Volts", "eV", ["ev"], "M L^{2} T^{-2}", true, 1.0, true); }
}

class Gram extends BaseUnit {
    constructor() { super("Gram", "Grams", "g", [], "M", true, 1.0, true); }
}

class Joule extends BaseUnit {
    constructor() { super("Joule", "Joules", "J", [], "M L^{2} T^{-2}", true, 1.0, true); }
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
            return a[0].name;
        }

        return "";
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

    toString() {
        return writeNumber(this.number, 3, true) + " " + this.unit.symbol;
    }

    toLaTeX() {

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
    return ((n == 0) ? Math.floor(Math.log10(Math.abs(n))) : 0);
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



class UnitConverter {
    constructor() {
        this.prefixes = [new Deca(), new Hecto(), new Kilo(), new Mega(), new Giga(), new Tera(), new Peta(), new Exa(), new Zetta(), new Yotta(), new Deci(), new Centi(), new Milli(), new Micro(), new Nano(), new Pico(), new Femto(), new Atto(), new Zepto(), new Yocto()];

        this.baseUnits = [new Metre(), new Inch(), new Foot(), new Yard(), new Mile(), new Second(), new Minute(), new Hour(), new Day(), new Year(), new ElectronVolt(), new Gram(), new Joule(), new Watt(), new Volt(), new Amp()];
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
            if (u.canHaveSIPrefix) {
                this.prefixes.forEach(p => {
                    units.push(new Unit(p, u));
                });
            }
            else {
                units.push(new Unit(NONE, u));
            }
        });

        return units;
    }

    getUnitsWithDimensions(dimensions, minimumCommonness) {
        return this.getAllUnits().filter(u => u.dimensions == dimensions && u.commonness >= minimumCommonness);
    }

    getMetricUnitsWithDimensions(dimensions) {
        return this.getAllUnits().filter(u => u.dimensions == dimensions && u.isMetric);
    }

    convertValue(value, fromUnit, toUnit) {

        if (fromUnit.hasPrefix) {
            value = value * Math.pow(10, fromUnit.prefix.multiplierExponent);
        }
        if (toUnit.hasPrefix) {
            value = value * Math.pow(10, -toUnit.prefix.multiplierExponent);
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

        if (!a) {
            return null;
        }

        return new OutputValue(value, toUnit);
    }
}