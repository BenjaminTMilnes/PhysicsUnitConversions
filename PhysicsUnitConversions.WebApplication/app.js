

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
                return;
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
                return;
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



var application = angular.module("PhysicsUnitConversions", []);

application.controller("UnitConversionController", ["$scope", function UnitConversionController($scope) {

    $scope.$watch("mainInput", function (newValue, oldValue) {
        var inputParser = new InputParser();

        var inputValue = inputParser.parseInput(newValue);

        if (inputValue != null) {
            $scope.mainOutput = inputValue.coefficient.text;
        }
    });

}]);



