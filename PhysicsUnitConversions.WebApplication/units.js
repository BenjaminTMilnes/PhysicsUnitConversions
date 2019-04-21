
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
const Temperature = new Quantity("K", "Temperature", "");
const Frequency = new Quantity("T^{-1}", "Frequency", "");
const Angle = new Quantity("", "Angle", "");
const SolidAngle = new Quantity("", "Solid Angle", "");
const Pressure = new Quantity("M L^{-1} T^{-2}", "Pressure", "");
const ElectricCharge = new Quantity("Q", "Electric Charge", "");
const ElectricalCapacitance = new Quantity("M^{-1} L^{-2} T^{2} Q^{2}", "Temperature", "");
const ElectricalResistance = new Quantity("M L^{2} T^{2} Q^{-2}", "Electrical Resistance", "");
const ElectricalConductance = new Quantity("M^{-1} L^{-2} T^{-2} Q^{2}", "Electrical Conductance", "");
const MagneticFlux = new Quantity("M L^{2} T^{-1} Q^{-1}", "Magnetic Flux", "");
const MagneticFluxDensity = new Quantity("M T^{-1} Q^{-1}", "Magnetic Flux Density", "");
const ElectricalInductance = new Quantity("M L^{2} Q^{-2}", "Electrical Inductance", "");
const Jolt = new Quantity("L T^{-3}", "Jolt", "");
const Snap = new Quantity("L T^{-4}", "Snap", "");

const quantities = [Length, Area, Volume, Time, Speed, Acceleration, Mass, Density, Momentum, Force, Energy, Power, ElectricPotentialDifference, ElectricCurrent, Temperature, Frequency, Angle, SolidAngle, Pressure, ElectricCharge, ElectricalCapacitance, ElectricalResistance, ElectricalConductance, MagneticFlux, MagneticFluxDensity, ElectricalInductance, Jolt, Snap];



class BaseUnit {
    constructor(singularName, pluralName, variant, symbol, alternateSymbols, dimensions, canHaveSIPrefix, prefixRange, preferredPrefixes, systems, ratioToSIUnit, commonness, conversionFunctionFromSIUnit, conversionFunctionToSIUnit, reference, dateAccessed) {
        this.singularName = singularName;
        this.pluralName = pluralName;
        this.variant = variant;
        this.symbol = symbol;
        this.alternateSymbols = alternateSymbols;
        this.dimensions = dimensions;
        this.canHaveSIPrefix = canHaveSIPrefix;
        this.prefixRange = prefixRange;
        this.preferredPrefixes = preferredPrefixes;
        this.isSIBaseUnit = (systems.filter(s => s == "SI Base").length > 0);
        this.isSIDerivedUnit = (systems.filter(s => s == "SI Derived").length > 0);
        this.isMetric = (systems.filter(s => s == "Metric").length > 0);
        this.systems = systems;
        this.ratioToSIUnit = ratioToSIUnit;
        this.commonness = commonness;
        this.conversionFunctionFromSIUnit = conversionFunctionFromSIUnit;
        this.conversionFunctionToSIUnit = conversionFunctionToSIUnit;

        if (this.conversionFunctionFromSIUnit == null) {
            this.conversionFunctionFromSIUnit = function (value) { return value.times(this.ratioToSIUnit); }
        }
        if (this.conversionFunctionToSIUnit == null) {
            this.conversionFunctionToSIUnit = function (value) { return value.dividedBy(this.ratioToSIUnit); }
        }

        this.reference = reference;
        this.dateAccessed = dateAccessed;
    }

    equals(unit) {
        if (unit == null || unit == undefined) {
            return false;
        }

        return unit.pluralName == this.pluralName;
    }
}



const Metre = new BaseUnit("Metre", "Metres", "", "m", [], "L", true, [-30, 30], ["n", "μ", "m", "c", "d", "k"], ["Metric", "SI Base"], (1.0), 1.0, null, null, "https://en.wikipedia.org/wiki/Unit_of_length", "2019.04.18");
const Angstrom = new BaseUnit("Ångström", "Ångströms", "", "Å", [], "L", false, [], [], ["Metric"], (1e10), 0.7, null, null, "https://en.wikipedia.org/wiki/Unit_of_length", "2019.04.18");
const Thou = new BaseUnit("Thou", "Thou", "", "thou", ["mil"], "L", false, [], [], ["Imperial", "US Customary"], ((1000 / 25.4) * 1000), 0.1, null, null, "https://en.wikipedia.org/wiki/Unit_of_length", "2019.04.18");
const Line = new BaseUnit("Line", "Lines", "", "L", ["l", "lin"], "L", false, [], [], ["English"], ((1000 / 25.4) * 12), 0.1, null, null, "https://en.wikipedia.org/wiki/Unit_of_length", "2019.04.18");
const Inch = new BaseUnit("Inch", "Inches", "", "in", [], "L", false, [], [], ["Imperial", "US Customary"], (1000 / 25.4), 0.9, null, null, "https://en.wikipedia.org/wiki/Unit_of_length", "2019.04.18");
const Foot = new BaseUnit("Foot", "Feet", "", "ft", [], "L", false, [], [], ["Imperial", "US Customary"], (1000 / (25.4 * 12)), 0.8, null, null, "https://en.wikipedia.org/wiki/Unit_of_length", "2019.04.18");
const Yard = new BaseUnit("Yard", "Yards", "", "yd", [], "L", false, [], [], ["Imperial", "US Customary"], (1000 / (25.4 * 12 * 3)), 0.5, null, null, "https://en.wikipedia.org/wiki/Unit_of_length", "2019.04.18");
const Mile = new BaseUnit("Mile", "Miles", "", "mi", ["m"], "L", false, [], [], ["Imperial", "US Customary", "English"], (1000 / (25.4 * 12 * 3 * 1760)), 1.0, null, null, "https://en.wikipedia.org/wiki/Unit_of_length", "2019.04.18");
const League = new BaseUnit("League", "Leagues", "", "leagues", [], "L", false, [], [], [], (1000 / (25.4 * 12 * 3 * 1760 * 3)), 0.1, null, null, "https://en.wikipedia.org/wiki/Unit_of_length", "2019.04.18");
const Fathom = new BaseUnit("Fathom", "Fathoms", "", "fathoms", [], "L", false, [], [], ["Imperial", "US Customary"], (1000 / (25.4 * 12 * 3 * 2)), 0.1, null, null, "https://en.wikipedia.org/wiki/Unit_of_length", "2019.04.18");
const NauticalMile = new BaseUnit("Nautical Mile", "Nautical Miles", "", "NM", ["M", "nm", "nmi"], "L", false, [], [], [], (1000 / (25.4 * 12 * 3 * 2)), 0.1, null, null, "https://en.wikipedia.org/wiki/Unit_of_length", "2019.04.18");
const Chain = new BaseUnit("Chain", "Chains", "", "chains", [], "L", false, [], [], ["Imperial", "US Customary"], (1000 / (25.4 * 12 * 3 * 22)), 0.05, null, null, "https://en.wikipedia.org/wiki/Unit_of_length", "2019.04.18");
const Link = new BaseUnit("Link", "Links", "", "l", ["li", "lnk"], "L", false, [], [], ["Imperial", "US Customary"], (1000 * 100 / (25.4 * 12 * 3 * 22)), 0.05);
const Rod = new BaseUnit("Rod", "Rods", "", "rods", [], "L", false, [], [], ["Imperial", "US Customary"], (1000 * 4 / (25.4 * 12 * 3 * 22)), 0.05, null, null, "https://en.wikipedia.org/wiki/Unit_of_length", "2019.04.18");
const AstronomicalUnit = new BaseUnit("Astronomical Unit", "Astronomical Units", "", "AU", [], "L", false, [], [], ["Metric"], (1 / 149597870700), 0.9, null, null, "https://en.wikipedia.org/wiki/Unit_of_length", "2019.04.18");
const LightYear = new BaseUnit("Lightyear", "Lightyears", "", "ly", [], "L", true, [0, 30], [], ["Metric"], (1 / 9460730472580800), 0.9, null, null, "https://en.wikipedia.org/wiki/Unit_of_length", "2019.04.18");
const Parsec = new BaseUnit("Parsec", "Parsecs", "", "pc", [], "L", true, [0, 30], [], ["Metric"], (1 / 30856775814913673), 0.9, null, null, "https://en.wikipedia.org/wiki/Unit_of_length", "2019.04.18");



const Second = new BaseUnit("Second", "Seconds", "", "s", [], "T", true, [-30, 0], [], ["Metric", "SI Base"], (1.0), 1.0);
const Minute = new BaseUnit("Minute", "Minutes", "", "min", ["m", "minute"], "T", false, [], [], [], (1 / 60), 1.0);
const Hour = new BaseUnit("Hour", "Hours", "", "h", ["hr", "hrs"], "T", false, [], [], [], (1 / 3600), 1.0);
const Day = new BaseUnit("Day", "Days", "", "d", ["dy", "dys"], "T", false, [], [], [], (1 / (3600 * 24)), 0.8);
const Year = new BaseUnit("Year", "Years", "", "y", ["yr", "yrs"], "T", true, [0, 30], [], [], (1 / (3600 * 24 * 365.25)), 0.9);



const Gram = new BaseUnit("Gram", "Grams", "", "g", [], "M", true, [-30, 30], ["n", "μ", "m", "k"], ["Metric", "SI Base"], (1.0), 1.0);
const AtomicMassUnit = new BaseUnit("Atomic Mass Unit", "Atomic Mass Units", "", "u", ["Da", "AMU"], "M", false, [], [], ["Metric"], (1 / 1.660539040e-24), 1.0);
const Carat = new BaseUnit("Carat", "Carats", "", "ct", [], "M", false, [], [], ["Metric"], (1 / 0.2), 0.2);
const AvoirdupoisOunce = new BaseUnit("Ounce", "Ounces", "Avoirdupois", "oz", [], "M", false, [], [], [], (1 / 28.349523125), 0.8);
const AvoirdupoisPound = new BaseUnit("Pound", "Pounds", "Avoirdupois", "lb", [], "M", false, [], [], [], (1 / (1000 * 0.45359237)), 1.0);
const ShortTon = new BaseUnit("Ton", "Tons", "Short", "tons", ["ton"], "M", false, [], [], [], (1 / (1000 * 907.18474)), 0.9);
const LongTon = new BaseUnit("Ton", "Tons", "Long", "tons", ["ton"], "M", false, [], [], [], (1 / (1000 * 1016.047)), 0.9);
const Tonne = new BaseUnit("Tonne", "Tonnes", "", "t", [], "M", true, [0, 30], ["k", "M", "G"], ["Metric"], (1 / 1000000), 0.9);
const Stone = new BaseUnit("Stone", "Stone", "", "st", [], "M", false, [], [], [], (1 / (1000 * 6.35029318)), 0.7);
const ShortHundredweight = new BaseUnit("Hundredweight", "Hundredweight", "Short", "cwt", [], "M", false, [], [], [], (1 / 45.359237), 0.5);
const LongHundredweight = new BaseUnit("Hundredweight", "Hundredweight", "Long", "cwt", [], "M", false, [], [], [], (1 / 50.802345), 0.5);



const Joule = new BaseUnit("Joule", "Joules", "", "J", [], Energy.dimensions, true, [-30, 30], ["n", "m", "k", "M", "G", "T", "P"], ["Metric", "SI Derived"], (1.0), 1.0);
const ElectronVolt = new BaseUnit("Electron-Volt", "Electron-Volts", "", "eV", ["ev"], Energy.dimensions, true, [-30, 30], ["m", "k", "M", "G", "T", "P"], ["Metric"], (1 / 1.6021766208e-19), 1.0);
const FootPoundForce = new BaseUnit("Foot Pound-Force", "Foot Pound-Force", "", "ft lbf", ["ft lb"], Energy.dimensions, false, [], [], [], (1 / 1.3558179483314004), 0.1);
const BritishThermalUnitISO = new BaseUnit("British Thermal Unit", "British Thermal Units", "ISO", "Btu", ["BTU"], Energy.dimensions, false, [], [], [], (1 / 1055.06), 0.1);
const WattHour = new BaseUnit("Watt-hour", "Watt-hours", "", "Wh", [], Energy.dimensions, true, [-30, 30], ["m", "k", "M", "G", "T", "P"], ["Metric"], (1 / 3600), 0.5);
const MechanicalHorsePowerHour = new BaseUnit("Horsepower-hour", "Horsepower-hours", "Mechanical", "hph", [], Energy.dimensions, false, [], [], [], (1 / (745.69987158227022 * 3600)), 0.1);
const MetricHorsePowerHour = new BaseUnit("Horsepower-hour", "Horsepower-hours", "Metric", "hph", [], Energy.dimensions, false, [], [], [], (1 / (735.49875 * 3600)), 0.1);
const ElectricHorsePowerHour = new BaseUnit("Horsepower-hour", "Horsepower-hours", "Electric", "hph", [], Energy.dimensions, false, [], [], [], (1 / (746 * 3600)), 0.1);
const BoilerHorsePowerHour = new BaseUnit("Horsepower-hour", "Horsepower-hours", "Boiler", "hph", [], Energy.dimensions, false, [], [], [], (1 / (9812.5 * 3600)), 0.1);
const Erg = new BaseUnit("Erg", "Ergs", "", "erg", [], Energy.dimensions, true, [-30, 30], [], ["Metric"], (1e7), 0.4);



const Watt = new BaseUnit("Watt", "Watts", "", "W", [], Power.dimensions, true, [-30, 30], ["n", "m", "k", "M", "G", "T", "P"], ["Metric", "SI Derived"], (1.0), 1.0);
const MechanicalHorsepower = new BaseUnit("Horsepower", "Horsepower", "Mechanical", "hp", [], Power.dimensions, false, [], [], [], (1 / 745.69987158227022), 0.3);
const MetricHorsepower = new BaseUnit("Horsepower", "Horsepower", "Metric", "hp", [], Power.dimensions, false, [], [], [], (1 / 735.49875), 0.3);
const ElectricHorsepower = new BaseUnit("Horsepower", "Horsepower", "Electric", "hp", [], Power.dimensions, false, [], [], [], (1 / 746), 0.1);
const BoilerHorsepower = new BaseUnit("Horsepower", "Horsepower", "Boiler", "hp", [], Power.dimensions, false, [], [], [], (1 / 9812.5), 0.1);
const HydraulicHorsepower = new BaseUnit("Horsepower", "Horsepower", "Hydraulic", "hp", [], Power.dimensions, false, [], [], [], (1 / 745.69987158227022), 0.1);



const Volt = new BaseUnit("Volt", "Volts", "", "V", [], ElectricPotentialDifference.dimensions, true, [-30, 30], ["m", "k", "M", "G"], ["Metric", "SI Derived"], (1.0), 1.0);



const Amp = new BaseUnit("Amp", "Amps", "", "A", [], ElectricCurrent.dimensions, true, [-30, 30], ["m", "k"], ["Metric", "SI Base"], (1.0), 1.0);



const Kelvin = new BaseUnit("Kelvin", "Kelvin", "", "K", [], "K", true, [-30, 30], [], ["Metric", "SI Base"], (1.0), 1.0, null, null);
const Celsius = new BaseUnit("Degrees Celsius", "Degrees Celsius", "", "°C", [], "K", false, [], [], ["Metric"], (0.0), 1.0, function (kelvin) { return kelvin.minus(273.15); }, function (celsius) { return celsius.plus(273.15); });
const Fahrenheit = new BaseUnit("Degrees Fahrenheit", "Degrees Fahrenheit", "", "°F", [], "K", false, [], [], [], (0.0), 0.8, function (kelvin) { return kelvin.minus(273.15).times(9 / 5).plus(32); }, function (fahrenheit) { return fahrenheit.minus(32).times(5 / 9).plus(273.15); });
const Rankine = new BaseUnit("Degrees Rankine", "Degrees Rankine", "", "°R", ["°R"], "K", false, [], [], [], (0.0), 0.5, function (kelvin) { return kelvin.times(9 / 5); }, function (rankine) { return rankine.times(5 / 9); });
const Delisle = new BaseUnit("Degrees Delisle", "Degrees Delisle", "", "°De", [], "K", false, [], [], [], (0.0), 0.1, function (kelvin) { return kelvin.minus(273.15).times(-1).plus(100).times(3 / 2); }, function (delisle) { return delisle.times(-1).plus(100).times(2 / 3).plus(273.15); });
const NewtonTemperature = new BaseUnit("Degrees Newton", "Degrees Newton", "", "°N", [], "K", false, [], [], [], (0.0), 0.1, function (kelvin) { return kelvin.minus(273.15).times(33 / 100); }, function (newton) { return newton.times(100 / 33).plus(273.15); });
const Reaumur = new BaseUnit("Degrees Réaumur", "Degrees Réaumur", "", "°Ré", [], "K", false, [], [], [], (0.0), 0.1, function (kelvin) { return kelvin.minus(273.15).times(4 / 5); }, function (reaumur) { return reaumur.times(5 / 4).plus(273.15); });
const Romer = new BaseUnit("Degrees Rømer", "Degrees Rømer", "", "°Rø", [], "K", false, [], [], [], (0.0), 0.1, function (kelvin) { return kelvin.minus(273.15).times(21 / 40).plus(7.5); }, function (romer) { return romer.minus(7.5).times(40 / 21).plus(273.15); });




const Hertz = new BaseUnit("Hertz", "Hertz", "", "Hz", [], Frequency.dimensions, true, [0, 30], [], ["Metric", "SI Derived"], (1.0), 1.0);



const Radian = new BaseUnit("Radian", "Radians", "", "rad", [], Angle.dimensions, false, [], [], ["Metric", "SI Derived"], (1.0), 1.0);
const Degree = new BaseUnit("Degree", "Degrees", "", "°", [], Angle.dimensions, false, [], [], [], (360 / Math.PI), 1.0);
const Gradian = new BaseUnit("Gradian", "Gradians", "", "grad", [], Angle.dimensions, false, [], [], [], (400 / Math.PI), 0.5);
const Turn = new BaseUnit("Turn", "Turns", "", "turn", [], Angle.dimensions, false, [], [], [], (1 / Math.PI), 0.7);
const Quadrant = new BaseUnit("Quadrant", "Quadrants", "", "quadrant", [], Angle.dimensions, false, [], [], [], (4 / Math.PI), 0.7);
const Sextant = new BaseUnit("Sextant", "Sextants", "", "sextant", [], Angle.dimensions, false, [], [], [], (6 / Math.PI), 0.7);
const Hexacontade = new BaseUnit("Hexacontade", "Hexacontades", "", "hexacontade", [], Angle.dimensions, false, [], [], [], (60 / Math.PI), 0.7);



const Steradian = new BaseUnit("Steradian", "Steradians", "", "sr", [], SolidAngle.dimensions, false, [], [], ["Metric", "SI Derived"], (1.0), 1.0);


const Pascal = new BaseUnit("Pascal", "Pascals", "", "Pa", [], Pressure.dimensions, true, [-30, 30], [], ["Metric", "SI Derived"], (1), 1.0);
const Bar = new BaseUnit("Bar", "Bars", "", "bar", [], Pressure.dimensions, true, [-6, 6], [], ["Metric", "SI Derived"], (1 / 100000), 0.9);
const PoundForcePerSquareInch = new BaseUnit("Pound of Force per Square Inch", "Pounds of Force per Square Inch", "", "psi", ["lbf/in^{2}"], Pressure.dimensions, false, [], [], [], (1 / 6895), 0.7);
const TechnicalAtmosphere = new BaseUnit("Atmosphere", "Atmospheres", "Technical", "at", [], Pressure.dimensions, false, [], [], ["Metric"], (1 / 98066.5), 0.5);
const StandardAtmosphere = new BaseUnit("Atmosphere", "Atmospheres", "Standard", "atm", [], Pressure.dimensions, false, [], [], ["Metric"], (1 / 101325), 1.0);
const Torr = new BaseUnit("Torr", "Torr", "", "Torr", [], Pressure.dimensions, true, [-30, 30], [], ["Metric"], (760 / 101325), 0.3);
const MillimetreOfMercury = new BaseUnit("Millimetre of Mercury", "Millimetres of Mercury", "", "mmHg", ["mm Hg"], Pressure.dimensions, false, [], [], ["Metric"], (1 / 133.322387415), 0.7);




const    MetresPerSecond = new BaseUnit("Metre per Second", "Metres per Second", "", "m/s", ["ms^{-1}", "ms^-1"],  Speed.dimensions, false, [], [], ["Metric", "SI Derived"],1, 1.0);
const  KilometresPerSecond = new BaseUnit("Kilometre per Second", "Kilometres per Second", "", "km/s", ["kms^{-1}", "kms^-1", "kps"],  Speed.dimensions, false, [], [], ["Metric"],(1/1000), 0.5);
const KilometresPerHour = new BaseUnit("Kilometre per Hour", "Kilometres per Hour", "", "kph", ["km/h"],  Speed.dimensions, false, [], [], ["Metric"],(3600/1000), 1.0);
const MilesPerHour = new BaseUnit("Mile per Hour", "Miles per Hour", "", "mph", [], Speed.dimensions, false, [], [], ["Imperial", "US Customary"], (3600 / 1609.344), 0.9);
const AsAFractionOfTheSpeedOfLight = new BaseUnit("Times the Speed of Light", "Times the Speed of Light", "", "c", [], Speed.dimensions, false, [], [], ["Metric"], (1 / 299792458), 0.9);




const baseUnits = [Metre, Angstrom, Thou, Line, Inch, Foot, Yard, Mile, League, Fathom, NauticalMile, Chain, Link, Rod, AstronomicalUnit, LightYear, Parsec, Second, Minute, Hour, Day, Year, Gram, AtomicMassUnit, Carat, AvoirdupoisOunce, AvoirdupoisPound, ShortTon, LongTon, Tonne, Stone, ShortHundredweight, LongHundredweight, Joule, ElectronVolt, FootPoundForce, BritishThermalUnitISO, WattHour, MechanicalHorsePowerHour, MetricHorsePowerHour, ElectricHorsePowerHour, BoilerHorsePowerHour, Erg, Watt, MechanicalHorsepower, MetricHorsepower, ElectricHorsepower, BoilerHorsepower, HydraulicHorsepower, Volt, Amp, Kelvin, Celsius, Fahrenheit, Rankine, Delisle, NewtonTemperature, Reaumur, Romer, Hertz, Radian, Degree, Gradian, Turn, Quadrant, Sextant, Hexacontade, Pascal, Bar, PoundForcePerSquareInch, TechnicalAtmosphere, StandardAtmosphere, Torr, MillimetreOfMercury, MetresPerSecond, KilometresPerSecond, KilometresPerHour, MilesPerHour, AsAFractionOfTheSpeedOfLight];




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

    isPartOfSystem(system) {
        for (var i = 0; i < this.baseUnit.systems.length; i++) {
            if (this.baseUnit.systems[i] == system) {
                return true;
            }
        }

        return false;
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

    toText(nsf, asWords) {
        if (!asWords) {
            return writeNumberDecimal(this.number, nsf, false, true, false) + " " + this.unit.symbol + ((this.unit.baseUnit.variant != "") ? " (" + this.unit.baseUnit.variant.toLowerCase() + ")" : "");
        }
        else {
            return writeNumberDecimal(this.number, nsf, false, true, false) + " " + this.unit.pluralName.toLowerCase();
        }
    }

    toHTML(nsf, asWords) {
        if (!asWords) {
            return writeNumberDecimal(this.number, nsf, false, false, false) + " " + this.unit.symbol + ((this.unit.baseUnit.variant != "") ? " (" + this.unit.baseUnit.variant.toLowerCase() + ")" : "");
        }
        else {
            return writeNumberDecimal(this.number, nsf, false, false, false) + " " + this.unit.pluralName.toLowerCase() + ((this.unit.baseUnit.variant != "") ? " (" + this.unit.baseUnit.variant.toLowerCase() + ")" : "");
        }
    }

    toLaTeX(nsf) {
        return writeNumberDecimal(this.number, nsf, false, false, true) + " \\,\\mathrm{" + this.unit.symbol + "}";
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
        return this.prefixes.filter(p =>(symbol.length > p.symbol.length && symbol.startsWith(p.symbol)) || (symbol.length > p.name.length && symbol.toLowerCase().startsWith(p.name)));
    }

    getMatchingUnits(symbol) {
        var unitMatches = [];

        var baseUnitMatches = this.baseUnits.filter(u => u.symbol == symbol || u.singularName.toLowerCase() == symbol.toLowerCase() || u.pluralName.toLowerCase() == symbol.toLowerCase() || u.alternateSymbols.filter(as => as == symbol).length > 0);

        baseUnitMatches.forEach(u => {
            unitMatches.push(new Unit(NONE, u));
        });

        var prefixMatches = this.getMatchingPrefixes(symbol);

        prefixMatches.forEach(p => {

            if (symbol.startsWith(p.symbol)) {
                var s = symbol.substr(p.symbol.length);

                baseUnitMatches = this.baseUnits.filter(u => u.canHaveSIPrefix && (u.symbol == s || u.alternateSymbols.filter(as => as == s).length > 0));

                baseUnitMatches.forEach(u => {
                    unitMatches.push(new Unit(p, u));
                });
            }
            if (symbol.startsWith(p.name)) {
                var s = symbol.substr(p.name.length);

                baseUnitMatches = this.baseUnits.filter(u => u.canHaveSIPrefix && (u.singularName.toLowerCase() == s.toLowerCase() || u.pluralName.toLowerCase() == s.toLowerCase()));

                baseUnitMatches.forEach(u => {
                    unitMatches.push(new Unit(p, u));
                });
            }

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

        value = fromUnit.baseUnit.conversionFunctionToSIUnit(value);
        value = toUnit.baseUnit.conversionFunctionFromSIUnit(value);

        if (toUnit.hasPrefix) {
            value = value.times(toUnit.prefix.multiplier(-1));
        }

        return new OutputValue(value, toUnit);
    }
}