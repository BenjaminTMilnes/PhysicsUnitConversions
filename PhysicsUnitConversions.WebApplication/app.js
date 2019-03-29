

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
    constructor() {

    }

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

class BaseUnit {
    constructor(singularName, pluralName, symbol, alternateSymbols, dimensions, canHaveSIPrefix) {
        this.singularName = singularName;
        this.pluralName = pluralName;
        this.symbol = symbol;
        this.alternateSymbols = alternateSymbols;
        this.dimensions = dimensions;
        this.canHaveSIPrefix = canHaveSIPrefix;
    }
}

class Metre extends BaseUnit {
    constructor() {
        super("Metre", "Metres", "m", [], "L", true);
    }
}

class Inch extends BaseUnit {
    constructor() {
        super("Inch", "Inches", "in", [], "L", false);
    }
}

class Foot extends BaseUnit {
    constructor() {
        super("Foot", "Feet", "ft", [], "L", false);
    }
}

class Yard extends BaseUnit {
    constructor() {
        super("Yard", "Yards", "yd", [], "L", false);
    }
}

class Mile extends BaseUnit {
    constructor() {
        super("Mile", "Miles", "m", ["mi"], "L", false);
    }
}

class Second extends BaseUnit {
    constructor() {
        super("Second", "Seconds", "s", [], "T", true);
    }
}

class Minute extends BaseUnit {
    constructor() {
        super("Minute", "Minutes", "min", ["m", "minute"], "T", false);
    }
}

class Hour extends BaseUnit {
    constructor() {
        super("Hour", "Hours", "h", ["hr", "hrs"], "T", false);
    }
}

class Day extends BaseUnit {
    constructor() {
        super("Day", "Days", "d", ["dy", "dys"], "T", false);
    }
}

class Year extends BaseUnit {
    constructor() {
        super("Year", "Years", "y", ["yr", "yrs"], "T", true);
    }
}

class ElectronVolt extends BaseUnit {
    constructor() {
        super("Electron-Volt", "Electron-Volts", "eV", ["ev"], "M L^{2} T^{-2}", true);
    }
}

class UnitPrefix {
    constructor(name, symbol, multiplierExponent) {
        this.name = name;
        this.symbol = symbol;
        this.multiplierExponent = multiplierExponent;
    }
}

class Deca extends UnitPrefix {
    constructor() {
        super("deca", "da", 1);
    }
}

class Hecto extends UnitPrefix {
    constructor() {
        super("hecto", "h", 2);
    }
}

class Kilo extends UnitPrefix {
    constructor() {
        super("kilo", "k", 3);
    }
}

class Mega extends UnitPrefix {
    constructor() {
        super("mega", "M", 6);
    }
}

class Giga extends UnitPrefix {
    constructor() {
        super("giga", "G", 9);
    }
}

class Tera extends UnitPrefix {
    constructor() {
        super("tera", "T", 12);
    }
}

class Peta extends UnitPrefix {
    constructor() {
        super("peta", "P", 15);
    }
}

class Exa extends UnitPrefix {
    constructor() {
        super("exa", "E", 18);
    }
}

class Zetta extends UnitPrefix {
    constructor() {
        super("zetta", "Z", 21);
    }
}

class Yotta extends UnitPrefix {
    constructor() {
        super("yotta", "Y", 24);
    }
}

class Deci extends UnitPrefix {
    constructor() {
        super("deci", "d", -1);
    }
}

class Centi extends UnitPrefix {
    constructor() {
        super("centi", "c", -2);
    }
}

class Milli extends UnitPrefix {
    constructor() {
        super("milli", "m", -3);
    }
}

class Micro extends UnitPrefix {
    constructor() {
        super("micro", "μ", -6);
    }
}

class Nano extends UnitPrefix {
    constructor() {
        super("nano", "n", -9);
    }
}

class Pico extends UnitPrefix {
    constructor() {
        super("pico", "p", -12);
    }
}

class Femto extends UnitPrefix {
    constructor() {
        super("femto", "f", -15);
    }
}

class Atto extends UnitPrefix {
    constructor() {
        super("atto", "a", -18);
    }
}

class Zepto extends UnitPrefix {
    constructor() {
        super("zepto", "z", -21);
    }
}

class Yocto extends UnitPrefix {
    constructor() {
        super("yocto", "y", -24);
    }
}

class NonePrefix extends UnitPrefix {
    constructor() {
        super("", "", 0);
    }
}

class Unit {
    constructor(unitPrefix, baseUnit) {
        this.unitPrefix = unitPrefix;
        this.baseUnit = baseUnit;
    }

    get singularName() {
        return  capitaliseFirstLetter( this.unitPrefix.name.toLowerCase() + this.baseUnit.singularName.toLowerCase());
    }

    get pluralName(){
        return  capitaliseFirstLetter(   this.unitPrefix.name.toLowerCase() +  this.baseUnit.pluralName.toLowerCase());
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

    get hasPrefix() {
        return (this.unitPrefix != null && this.unitPrefix != undefined   && this.unitPrefix.symbol != "");
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

        this.baseUnits = [new Metre(), new Inch(), new Foot(), new Yard(), new Mile(), new Second(), new Minute(), new Hour(), new Day(), new Year(), new ElectronVolt()];

        this.unitPrefixes = [new Deca(), new Hecto(), new Kilo(), new Mega(), new Giga(), new Tera(), new Peta(), new Exa(), new Zetta(), new Yotta(), new Deci(), new Centi(), new Milli(), new Micro(), new Nano(),  new Pico(), new Femto(),  new Atto(), new Zepto(), new Yocto()];
    }
    
    applyPrefixToUnit(prefix, unit) {
        return new Unit(prefix, unit);
    }

    getMatchingUnitPrefixes(symbol) {
        var unitPrefixMatches = this.unitPrefixes.filter(p => symbol.length > p.symbol.length && symbol.startsWith(p.symbol));

        return unitPrefixMatches;
    }
    
    getMatchingUnit(symbol) {

        var unitPrefixMatches = this.getMatchingUnitPrefixes(symbol);

        if (unitPrefixMatches.length > 0) {
            symbol = symbol.substr(unitPrefixMatches[0].symbol.length);
        }

        var unitMatches = this.baseUnits.filter(u => u.symbol == symbol);

        if (unitMatches.length > 0) {

            if (unitPrefixMatches.length > 0) {
                return this.applyPrefixToUnit(unitPrefixMatches[0], unitMatches[0]);
            }

            return  this.applyPrefixToUnit( new NonePrefix(), unitMatches[0]);
        }

        return null;
    }

    convertValue(value, fromUnit, toUnit) {

        if (fromUnit.hasPrefix) {
            value = value * Math.pow(10, fromUnit.unitPrefix.multiplierExponent);
           fromUnit.unitPrefix = new NonePrefix();
        }

        if (toUnit.hasPrefix) {
            value = value * Math.pow(10, - toUnit.unitPrefix.multiplierExponent);
        toUnit.unitPrefix = new NonePrefix();
        }

        if (fromUnit.symbol == "m" && toUnit.symbol == "in") {
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

    $scope.commonResultsLeftColumn = [];
    $scope.commonResultsRightColumn = [];

    $scope.$watch("mainInput", function (newValue, oldValue) {

        $scope.identifiedUnits = [];

        $scope.commonResultsLeftColumn = [];
        $scope.commonResultsRightColumn = [];

        var inputParser = new InputParser();

        var inputValue = inputParser.parseInput(newValue);

        $scope.mainOutput = "";

        if (inputValue != null) {
            var unitIdentifier = new UnitIdentifier();

            var unit = unitIdentifier.getMatchingUnit(inputValue.unit.text);
            
            if (unit != null) {

                $scope.identifiedUnits.push(unit);

                if (unit.baseUnit.symbol == "m") {

                    console.log(inputValue.coefficient);

                    var outputValue = unitIdentifier.convertValue(parseFloat(inputValue.coefficient.text), unit, new Inch());

                    $scope.commonResultsLeftColumn.push(outputValue);

                }

            }
        }
    });

}]);



