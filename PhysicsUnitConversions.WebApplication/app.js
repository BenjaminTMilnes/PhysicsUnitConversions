

class InputCoefficient {
    constructor(text) {
        this.text = text;
    }
}

class InputUnit {
    constructor(text) {
        this.text = text;
    }
}

class InputValue {
    constructor() {
        this.coefficient = null;
        this.unit = null;
    }
}

class Marker {
    constructor() {
        this.position = 0;
    }
}

class InputParser {
    constructor() {    }

    parseInput(inputText) {

        if (inputText == null || inputText == undefined) {
            return null;
        }

        var marker = new Marker();
        var inputValue = new InputValue();

        this.parseWhiteSpace(inputText, marker, inputValue);
        this.parseCoefficient(inputText, marker, inputValue);
        this.parseWhiteSpace(inputText, marker, inputValue);
        this.parseUnit(inputText, marker, inputValue);

        if (inputValue.coefficient != null && inputValue.unit != null) {
            return inputValue;
        }
        else {
            return null;
        }

    }

    parseCoefficient(inputText, marker, container) {

        var t = "";

        if (inputText.substr(marker.position, 1) == "-") {
            t += inputText.substr(marker.position, 1);
            marker.position += 1;
        }

        if (inputText.substr(marker.position, 1) == "+") {
            marker.position += 1;
        }

        while (marker.position < inputText.length) {
            if ("0123456789.".split("").filter(c =>     c == inputText.substr(marker.position, 1)).length > 0) {
                t += inputText.substr(marker.position, 1);
                marker.position += 1;
            }
            else {
                break;
            }
        }

        container.coefficient = new InputCoefficient(t);
    }

    parseUnit(inputText, marker, container) {

        var t = "";

        while (marker.position < inputText.length) {
            if ("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ^-{}".split("").filter(c =>     c == inputText.substr(marker.position, 1)).length > 0) {
                t += inputText.substr(marker.position, 1);
                marker.position += 1;
            }
            else {
                break;
            }
        }

        container.unit = new InputUnit(t);
    }

    parseWhiteSpace(inputText, marker, container) {
        while (marker.position < inputText.length) {
            if (" \t\n".split("").filter(c =>     c == inputText.substr(marker.position, 1)).length > 0) {
                marker.position += 1;
            }
            else {
                break;
            }
        }
    }
}

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

class BaseUnit {
    constructor(singularName, pluralName, symbol, alternateSymbols, dimensions, canHaveSIPrefix, commonness) {
        this.singularName = singularName;
        this.pluralName = pluralName;
        this.symbol = symbol;
        this.alternateSymbols = alternateSymbols;
        this.dimensions = dimensions;
        this.canHaveSIPrefix = canHaveSIPrefix;
        this.commonness = commonness;
    }
}

class Metre extends BaseUnit {
    constructor() {
        super("Metre", "Metres", "m", [], "L", true, 1.0);
    }
}

class Inch extends BaseUnit {
    constructor() {
        super("Inch", "Inches", "in", [], "L", false, 0.9);
    }
}

class Foot extends BaseUnit {
    constructor() {
        super("Foot", "Feet", "ft", [], "L", false, 0.8);
    }
}

class Yard extends BaseUnit {
    constructor() {
        super("Yard", "Yards", "yd", [], "L", false, 0.5);
    }
}

class Mile extends BaseUnit {
    constructor() {
        super("Mile", "Miles", "m", ["mi"], "L", false, 1.0);
    }
}

class Second extends BaseUnit {
    constructor() {
        super("Second", "Seconds", "s", [], "T", true, 1.0);
    }
}

class Minute extends BaseUnit {
    constructor() {
        super("Minute", "Minutes", "min", ["m", "minute"], "T", false, 1.0);
    }
}

class Hour extends BaseUnit {
    constructor() {
        super("Hour", "Hours", "h", ["hr", "hrs"], "T", false, 1.0);
    }
}

class Day extends BaseUnit {
    constructor() {
        super("Day", "Days", "d", ["dy", "dys"], "T", false, 0.8);
    }
}

class Year extends BaseUnit {
    constructor() {
        super("Year", "Years", "y", ["yr", "yrs"], "T", true, 0.9);
    }
}

class ElectronVolt extends BaseUnit {
    constructor() {
        super("Electron-Volt", "Electron-Volts", "eV", ["ev"], "M L^{2} T^{-2}", true, 1.0);
    }
}

class Gram extends BaseUnit {
    constructor() {
        super("Gram", "Grams", "g", [], "M", true, 1.0);
    }
}

class Joule extends BaseUnit {
    constructor() {
        super("Joule", "Joules", "J", [], "M L^{2} T^{-2}", true, 1.0);
    }
}

class Watt extends BaseUnit {
    constructor() {
        super("Watt", "Watts", "W", [], "M L^{2} T^{-3}", true, 1.0);
    }
}

class Volt extends BaseUnit {
    constructor() {
        super("Volt", "Volts", "V", [], "M L^{2} T^{-2} Q^{-1}", true, 1.0);
    }
}

class Amp extends BaseUnit {
    constructor() {
        super("Amp", "Amps", "A", [], "Q T^{-1}", true, 1.0);
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
                unitMatches.push(  new Unit(p, u));
            });

        });

        unitMatches.sort(function (a, b) { return b.commonness - a.commonness });

        console.log(unitMatches);

        return unitMatches;
    }

    convertValue(value, fromUnit, toUnit) {

        if (fromUnit.hasPrefix) {
            value = value * Math.pow(10, fromUnit.unitPrefix.multiplierExponent);
        }

        if (toUnit.hasPrefix) {
            value = value * Math.pow(10, -toUnit.unitPrefix.multiplierExponent);
        }

        if (fromUnit.baseUnit.symbol == "m" && toUnit.symbol == "in") {
            value = value / 0.0254;
        }

        var outputValue = new OutputValue();

        outputValue.number.significand = value;
        outputValue.unit = toUnit;

        return outputValue;

    }
}



var application = angular.module("PhysicsUnitConversions", []);

application.controller("UnitConversionController", ["$scope", function UnitConversionController($scope) {

    $scope.identifiedUnits = [];
    $scope.mostLikelyUnit = null;
    $scope.otherUnits = [];

    $scope.commonResultsLeftColumn = [];
    $scope.commonResultsRightColumn = [];

    $scope.$watch("mainInput", function (newValue, oldValue) {

        $scope.identifiedUnits = [];
        $scope.mostLikelyUnit = null;
        $scope.otherUnits = [];

        $scope.commonResultsLeftColumn = [];
        $scope.commonResultsRightColumn = [];

        var inputParser = new InputParser();

        var inputValue = inputParser.parseInput(newValue);

        $scope.mainOutput = "";

        if (inputValue != null) {
            var unitIdentifier = new UnitIdentifier();

            var unitMatches = unitIdentifier.getMatchingUnits(inputValue.unit.text);

            $scope.identifiedUnits = unitMatches;

            if (unitMatches.length > 0) {

                $scope.mostLikelyUnit = unitMatches[0];
                $scope.otherUnits = unitMatches.slice(1);

                var mostLikelyMatch = unitMatches[0];

                if (mostLikelyMatch.baseUnit.symbol == "m") {

                    var outputValue = unitIdentifier.convertValue(parseFloat(inputValue.coefficient.text), mostLikelyMatch, new Inch());

                    $scope.commonResultsLeftColumn.push(outputValue);

                }

            }






        }
    });

}]);



