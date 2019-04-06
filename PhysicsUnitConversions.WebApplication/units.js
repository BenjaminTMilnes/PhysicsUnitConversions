
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
    constructor(singularName, pluralName, symbol, alternateSymbols, dimensions, canHaveSIPrefix, prefixRange, isSIBaseUnit, isSIDerivedUnit, isMetric, ratioToSIUnit, commonness) {
        this.singularName = singularName;
        this.pluralName = pluralName;
        this.symbol = symbol;
        this.alternateSymbols = alternateSymbols;
        this.dimensions = dimensions;
        this.canHaveSIPrefix = canHaveSIPrefix;
        this.prefixRange = prefixRange;
        this.isSIBaseUnit = isSIBaseUnit;
        this.isSIDerivedUnit = isSIDerivedUnit;
        this.isMetric = isMetric;
        this.ratioToSIUnit = ratioToSIUnit;
        this.commonness = commonness;
    }

    equals(unit) {
        if (unit == null || unit == undefined) {
            return false;
        }

        return unit.pluralName == this.pluralName;
    }
}

const Metre = new BaseUnit("Metre", "Metres", "m", [], "L", true, [-30, 30], true, false, true, (1.0), 1.0);
const Angstrom = new BaseUnit("Ångström", "Ångströms", "Å", [], "L", false, [], false, false, true, (1e10), 0.7);
const Thou = new BaseUnit("Thou", "Thou", "thou", ["mil"], "L", false, [], false, false, false, ((1000 / 25.4) * 1000), 0.1);
const Line = new BaseUnit("Line", "Lines", "L", ["l", "lin"], "L", false, [], false, false, false, ((1000 / 25.4) * 12), 0.1);
const Inch = new BaseUnit("Inch", "Inches", "in", [], "L", false, [], false, false, false, (1000 / 25.4), 0.9);
const Foot = new BaseUnit("Foot", "Feet", "ft", [], "L", false, [], false, false, false, (1000 / (25.4 * 12)), 0.8);
const Yard = new BaseUnit("Yard", "Yards", "yd", [], "L", false, [], false, false, false, (1000 / (25.4 * 12 * 3)), 0.5);
const Mile = new BaseUnit("Mile", "Miles", "mi", ["m"], "L", false, [], false, false, false, (1000 / (25.4 * 12 * 3 * 1760)), 1.0);
const League = new BaseUnit("League", "Leagues", "leagues", [], "L", false, [], false, false, false, (1000 / (25.4 * 12 * 3 * 1760 * 3)), 0.1);
const Fathom = new BaseUnit("Fathom", "Fathoms", "fathoms", [], "L", false, [], false, false, false, (1000 / (25.4 * 12 * 3 * 2)), 0.1);
const NauticalMile = new BaseUnit("Nautical Mile", "Nautical Miles", "NM", ["M", "nm", "nmi"], "L", false, [], false, false, false, (1000 / (25.4 * 12 * 3 * 2)), 0.1);
const Chain = new BaseUnit("Chain", "Chains", "chains", [], "L", false, [], false, false, false, (1000 / (25.4 * 12 * 3 * 22)), 0.05);
const Link = new BaseUnit("Link", "Links", "l", ["li", "lnk"], "L", false, [], false, false, false, (1000 * 100 / (25.4 * 12 * 3 * 22)), 0.05);
const Rod = new BaseUnit("Rod", "Rods", "rods", [], "L", false, [], false, false, false, (1000 * 4 / (25.4 * 12 * 3 * 22)), 0.05);
const AstronomicalUnit = new BaseUnit("Astronomical Unit", "Astronomical Units", "AU", [], "L", false, [], false, false, true, (1 / 149597870700), 0.9);
const LightYear = new BaseUnit("Lightyear", "Lightyears", "ly", [], "L", true, [0, 30], false, false, true, (1 / 9460730472580800), 0.9);
const Parsec = new BaseUnit("Parsec", "Parsecs", "pc", [], "L", true, [0, 30], false, false, true, (1 / 30856775814913673), 0.9);

const Second = new BaseUnit("Second", "Seconds", "s", [], "T", true, [-30, 0], true, false, true, (1.0), 1.0);
const Minute = new BaseUnit("Minute", "Minutes", "min", ["m", "minute"], "T", false, [], false, false, false, (1 / 60), 1.0);
const Hour = new BaseUnit("Hour", "Hours", "h", ["hr", "hrs"], "T", false, [], false, false, false, (1 / 3600), 1.0);
const Day = new BaseUnit("Day", "Days", "d", ["dy", "dys"], "T", false, [], false, false, false, (1 / (3600 * 24)), 0.8);
const Year = new BaseUnit("Year", "Years", "y", ["yr", "yrs"], "T", true, [0, 30], false, false, false, (1 / (3600 * 24 * 365.25)), 0.9);

const Gram = new BaseUnit("Gram", "Grams", "g", [], "M", true, [-30, 30], true, false, true, (1.0), 1.0);

const Joule = new BaseUnit("Joule", "Joules", "J", [], "M L^{2} T^{-2}", true, [-30, 30], false, true, true, (1.0), 1.0);
const ElectronVolt = new BaseUnit("Electron-Volt", "Electron-Volts", "eV", ["ev"], "M L^{2} T^{-2}", true, [-30, 30], false, false, true, (1 / 1.6021766208e-19), 1.0);
const FootPoundForce = new BaseUnit("Foot Pound-Force", "Foot Pound-Force", "ft lbf", ["ft lb"], "M L^{2} T^{-2}", false, [], false, false, false, (1 / 1.3558179483314004), 0.1);
const BritishThermalUnitISO = new BaseUnit("British Thermal Unit (ISO)", "British Thermal Units (ISO)", "Btu", ["BTU"], "M L^{2} T^{-2}", false, [], false, false, false, (1 / 1055.06), 0.1);
const WattHour = new BaseUnit("Watt-hour", "Watt-hours", "Wh", [], "M L^{2} T^{-2}", true, [-30, 30], false, false, true, (1 / 3600), 0.5);

const Watt = new BaseUnit("Watt", "Watts", "W", [], "M L^{2} T^{-3}", true, [-30, 30], false, true, true, (1.0), 1.0);

const Volt = new BaseUnit("Volt", "Volts", "V", [], "M L^{2} T^{-2} Q^{-1}", true, [-30, 30], false, true, true, (1.0), 1.0);

const Amp = new BaseUnit("Amp", "Amps", "A", [], "Q T^{-1}", true, [-30, 30], true, false, true, (1.0), 1.0);

const baseUnits = [Metre, Angstrom, Thou, Line, Inch, Foot, Yard, Mile, League, Fathom, NauticalMile, Chain, Link, Rod, AstronomicalUnit, LightYear, Parsec, Second, Minute, Hour, Day, Year, Gram, Joule, ElectronVolt, FootPoundForce, BritishThermalUnitISO, WattHour, Watt, Volt, Amp];




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

const Deci = new Prefix("deci", "d", -1, 0.6);
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

        return new Quantity("", "", "");
    }

    get hasPrefix() {
        return (this.prefix != null && this.prefix != undefined && this.prefix.symbol != "");
    }

    get isSIUnit() {
        return (this.baseUnit.isSIBaseUnit || this.baseUnit.isSIDerivedUnit);
    }

    get isMetric() {
        return this.baseUnit.isMetric;
    }

    get commonness() {
        return this.prefix.commonness * this.baseUnit.commonness;
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
                    if (p.multiplierExponent >= u.prefixRange[0] && p.multiplierExponent <= u.prefixRange[1]) {
                        units.push(new Unit(p, u));
                    }
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
        if (fromUnit.quantity != toUnit.quantity) {
            return null;
        }

        if (fromUnit.hasPrefix) {
            value = value.times(fromUnit.prefix.multiplier(1));
        }
        if (toUnit.hasPrefix) {
            value = value.times(toUnit.prefix.multiplier(-1));
        }

        value = value.dividedBy(fromUnit.baseUnit.ratioToSIUnit).times(toUnit.baseUnit.ratioToSIUnit);

        return new OutputValue(value, toUnit);
    }
}