

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

class Unit {
    constructor(singularName, pluralName, symbol, alternateSymbols, dimensions, canHaveSIPrefix) {
        this.singularName = singularName;
        this.pluralName = pluralName;
        this.symbol = symbol;
        this.alternateSymbols = alternateSymbols;
        this.dimensions = dimensions;
        this.canHaveSIPrefix = canHaveSIPrefix;
    }
}

class Metre extends Unit {
    constructor() {
        super("Metre", "Metres", "m", [], "L", true);
    }
}

class Inch extends Unit {
    constructor() {
        super("Inch", "Inches", "in", [], "L", false);
    }
}

class Foot extends Unit {
    constructor() {
        super("Foot", "Feet", "ft", [], "L", false);
    }
}

class Yard extends Unit {
    constructor() {
        super("Yard", "Yards", "yd", [], "L", false);
    }
}

class Mile extends Unit {
    constructor() {
        super("Mile", "Miles", "m", ["mi"], "L", false);
    }
}

class Second extends Unit {
    constructor() {
        super("Second", "Seconds", "s", [], "T", true);
    }
}

class Minute extends Unit {
    constructor() {
        super("Minute", "Minutes", "min", ["m", "minute"], "T", false);
    }
}

class Hour extends Unit {
    constructor() {
        super("Hour", "Hours", "h", ["hr", "hrs"], "T", false);
    }
}

class Day extends Unit {
    constructor() {
        super("Day", "Days", "d", ["dy", "dys"], "T", false);
    }
}

class Year extends Unit {
    constructor() {
        super("Year", "Years", "y", ["yr", "yrs"], "T", true);
    }
}

class UnitPrefix {
    constructor(name, symbol, multiplierExponent) {
        this.name = name;
        this.symbol = symbol;
        this.multiplierExponent;
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

class UnitIdentifier {
    constructor() {

        this.units = [new Metre(), new Inch(), new Foot(), new Yard(), new Mile(), new Second(), new Minute(), new Hour(), new Day(), new Year()];

        this.unitPrefixes = [new Deca(), new Hecto(), new Kilo()];
    }

    getMatchingUnit(symbol) {
        var prefixMatches = this.unitPrefixes.filter(p => p.symbol == symbol.substr(0, p.symbol.length));

        if (prefixMatches.length > 0) {
            symbol = symbol.substr(prefixMatches[0].symbol.length);
        }

        var unitMatches = this.units.filter(u => u.symbol == symbol);

        if (unitMatches.length > 0) {

            if (prefixMatches.length > 0) {
               return    new Unit(prefixMatches[0].name + unitMatches[0].singularName, prefixMatches[0].name + unitMatches[0].pluralName, prefixMatches[0].symbol + unitMatches[0].symbol, [], unitMatches[0].dimensions, true);
            }

            return unitMatches[0];
        }

        return null;
    }
}



var application = angular.module("PhysicsUnitConversions", []);

application.controller("UnitConversionController", ["$scope", function UnitConversionController($scope) {

    $scope.$watch("mainInput", function (newValue, oldValue) {
        var inputParser = new InputParser();

        var inputValue = inputParser.parseInput(newValue);

        $scope.mainOutput = "";

        if (inputValue != null) {
            var unitIdentifier = new UnitIdentifier();

            var unit = unitIdentifier.getMatchingUnit(inputValue.unit.text);
            
            if (unit != null) {

                $scope.mainOutput = unit.pluralName;
            }
        }
    });

}]);



