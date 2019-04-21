
var application = angular.module("PhysicsUnitConversions", ["ngRoute"]);


application.config(function ($routeProvider) {
    $routeProvider
        .when("/", { templateUrl: "unit-conversions.html", controller: "UnitConversionsController" })
        .when("/settings", { templateUrl: "settings.html", controller: "SettingsController" })
        .when("/credits", { templateUrl: "credits.html" });

});

application.directive("compile", ["$compile", function ($compile) {
    return function (scope, element, attributes) {
        scope.$watch(function (scope) {
            return scope.$eval(attributes.compile);
        }, function (value) {
            element.html(value);
            $compile(element.contents())(scope);
        });
    };
}]);

application.directive("result", function () {
    return {
        restrict: "E",
        templateUrl: "result.html",
        scope: {
            outputValue: "=outputValue"
        }
    };
});

application.directive("resultSet", function () {
    return {
        restrict: "E",
        templateUrl: "result-set.html",
        scope: {
            heading: "=heading",
            leftColumnResults: "=leftColumnResults",
            rightColumnResults: "=rightColumnResults"
        }
    };
});

class Settings {
    constructor() {
        this._roundOutput = false;
        this._showKeyboard = true;

        this.loadFromLocalStorage();
    }

    loadFromLocalStorage() {
        var hasBeenSet = window.localStorage.getItem("hasBeenSet");

        if (hasBeenSet) {
            this._roundOutput = (window.localStorage.getItem("roundOutput") == "true");
            this._showKeyboard = (window.localStorage.getItem("showKeyboard") == "true");
        }
    }

    saveToLocalStorage() {
        window.localStorage.setItem("hasBeenSet", true);
        window.localStorage.setItem("roundOutput", this._roundOutput);
        window.localStorage.setItem("showKeyboard", this._showKeyboard);
    }

    get roundOutput() {
        return this._roundOutput;
    }

    set roundOutput(value) {
        if (value != this._roundOutput) {
            this._roundOutput = value;

            this.saveToLocalStorage();
        }
    }

    get showKeyboard() {
        return this._showKeyboard;
    }

    set showKeyboard(value) {
        if (value != this._showKeyboard) {
            this._showKeyboard = value;

            this.saveToLocalStorage();
        }
    }
}

application.factory("settings", function () {
    return new Settings();
});

application.controller("UnitConversionsController", ["$scope", "settings", function UnitConversionController($scope, settings) {

    $scope.settings = settings;

    $scope.identifiedUnits = [];
    $scope.mostLikelyUnit = null;
    $scope.otherUnits = [];

    $scope.identifiedNumberOfSignificantFigures = 0;

    $scope.roundOutput = false;

    $scope.commonResultsLeftColumn = [];
    $scope.commonResultsRightColumn = [];

    $scope.metricResultsLeftColumn = [];
    $scope.metricResultsRightColumn = [];

    $scope.nonMetricResultsLeftColumn = [];
    $scope.nonMetricResultsRightColumn = [];

    $scope.inputParser = new InputParser();
    $scope.unitConverter = new UnitConverter();

    $scope.nsf = 5;

    $scope.keys = ["μ", "Å", "é", "ø", "°"];

    $scope.typeLetter = function (letter) {
        if ($scope.mainInput == "" || $scope.mainInput == undefined) {
            $scope.mainInput = letter;
        }
        else {
            $scope.mainInput += letter;
        }
    }

    $scope.updateConversions = function (oldValue, newValue) {

        $scope.identifiedUnits = [];
        $scope.mostLikelyUnit = null;
        $scope.otherUnits = [];

        $scope.identifiedNumberOfSignificantFigures = 0;

        $scope.commonResultsLeftColumn = [];
        $scope.commonResultsRightColumn = [];

        $scope.metricResultsLeftColumn = [];
        $scope.metricResultsRightColumn = [];

        $scope.nonMetricResultsLeftColumn = [];
        $scope.nonMetricResultsRightColumn = [];

        var inputValue = $scope.inputParser.parseInput(newValue);

        if (inputValue != null) {

            $scope.identifiedNumberOfSignificantFigures = getNumberOfSignificantFigures(inputValue.coefficient.text);
            $scope.nsf = ($scope.settings.roundOutput) ? $scope.identifiedNumberOfSignificantFigures : 5;

            console.log($scope.nsf);

            var unitMatches = $scope.unitConverter.getMatchingUnits(inputValue.unit.text);

            $scope.identifiedUnits = unitMatches;

            if (unitMatches.length > 0) {

                $scope.mostLikelyUnit = unitMatches[0];
                $scope.otherUnits = unitMatches.slice(1);

                var mostLikelyMatch = unitMatches[0];

                var convertibleTo = $scope.unitConverter.getUnitsWithDimensions(mostLikelyMatch.dimensions, 0.7).filter(u => u.pluralName != mostLikelyMatch.pluralName);

                convertibleTo.forEach(u => {
                    var outputValue = $scope.unitConverter.convertValue(inputValue.getNumberAsDecimal(), mostLikelyMatch, u);

                    if (outputValue != null) {
                        var o = getOrderOfMagnitudeDecimal(outputValue.number);

                        if ((outputValue.unit.hasPrefix == false) || (o >= -5 && o <= 5)) {
                            $scope.commonResultsLeftColumn.push(outputValue);
                        }
                    }
                });

                var i = Math.ceil($scope.commonResultsLeftColumn.length / 2);

                $scope.commonResultsRightColumn = $scope.commonResultsLeftColumn.slice(i);
                $scope.commonResultsLeftColumn = $scope.commonResultsLeftColumn.slice(0, i);



                var convertibleToMetric = $scope.unitConverter.getMetricUnitsWithDimensions(mostLikelyMatch.dimensions, 0.3).filter(u => u.pluralName != mostLikelyMatch.pluralName);

                convertibleToMetric.forEach(u => {
                    var outputValue = $scope.unitConverter.convertValue(inputValue.getNumberAsDecimal(), mostLikelyMatch, u);

                    if (outputValue != null) {
                        $scope.metricResultsLeftColumn.push(outputValue);
                    }
                });

                var j = Math.ceil($scope.metricResultsLeftColumn.length / 2);

                $scope.metricResultsRightColumn = $scope.metricResultsLeftColumn.slice(j);
                $scope.metricResultsLeftColumn = $scope.metricResultsLeftColumn.slice(0, j);



                var convertibleToNonMetric = $scope.unitConverter.getNonMetricUnitsWithDimensions(mostLikelyMatch.dimensions, 0).filter(u => u.pluralName != mostLikelyMatch.pluralName);

                convertibleToNonMetric.forEach(u => {
                    var outputValue = $scope.unitConverter.convertValue(inputValue.getNumberAsDecimal(), mostLikelyMatch, u);

                    if (outputValue != null) {
                        $scope.nonMetricResultsLeftColumn.push(outputValue);
                    }
                });

                var j = Math.ceil($scope.nonMetricResultsLeftColumn.length / 2);

                $scope.nonMetricResultsRightColumn = $scope.nonMetricResultsLeftColumn.slice(j);
                $scope.nonMetricResultsLeftColumn = $scope.nonMetricResultsLeftColumn.slice(0, j);
            }
        }
    };


    $scope.$watch("mainInput", function (newValue, oldValue) { $scope.updateConversions(oldValue, newValue); });
    $scope.$watch("roundOutput", function (newValue, oldValue) { $scope.updateConversions("", $scope.mainInput); });

    new ClipboardJS(".copybutton");
}]);


application.controller("SettingsController", ["$scope", "settings", function SettingsController($scope, settings) {
    $scope.settings = settings;
}]);
