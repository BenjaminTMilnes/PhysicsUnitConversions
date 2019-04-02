﻿
var application = angular.module("PhysicsUnitConversions", []);

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

application.controller("UnitConversionController", ["$scope", function UnitConversionController($scope) {

    $scope.identifiedUnits = [];
    $scope.mostLikelyUnit = null;
    $scope.otherUnits = [];

    $scope.identifiedNumberOfSignificantFigures = 0;

    $scope.commonResultsLeftColumn = [];
    $scope.commonResultsRightColumn = [];

    $scope.metricResultsLeftColumn = [];
    $scope.metricResultsRightColumn = [];

    $scope.inputParser = new InputParser();
    $scope.unitConverter = new UnitConverter();

    $scope.$watch("mainInput", function (newValue, oldValue) {

        $scope.identifiedUnits = [];
        $scope.mostLikelyUnit = null;
        $scope.otherUnits = [];

        $scope.identifiedNumberOfSignificantFigures = 0;

        $scope.commonResultsLeftColumn = [];
        $scope.commonResultsRightColumn = [];

        $scope.metricResultsLeftColumn = [];
        $scope.metricResultsRightColumn = [];

        var inputValue = $scope.inputParser.parseInput(newValue);

        if (inputValue != null) {

            $scope.identifiedNumberOfSignificantFigures = getNumberOfSignificantFigures(inputValue.coefficient.text);

            var unitMatches = $scope.unitConverter.getMatchingUnits(inputValue.unit.text);

            $scope.identifiedUnits = unitMatches;

            if (unitMatches.length > 0) {

                $scope.mostLikelyUnit = unitMatches[0];
                $scope.otherUnits = unitMatches.slice(1);

                var mostLikelyMatch = unitMatches[0];

                var convertibleTo = $scope.unitConverter.getUnitsWithDimensions(mostLikelyMatch.dimensions, 0.7);

                convertibleTo.forEach(u => {
                    var outputValue = $scope.unitConverter.convertValue(parseFloat(inputValue.coefficient.text), mostLikelyMatch, u);

                    if (outputValue != null) {
                        $scope.commonResultsLeftColumn.push(outputValue);
                    }
                });

                var i = Math.ceil($scope.commonResultsLeftColumn.length / 2);

                $scope.commonResultsRightColumn = $scope.commonResultsLeftColumn.slice(i);
                $scope.commonResultsLeftColumn = $scope.commonResultsLeftColumn.slice(0, i);



                var convertibleToMetric = $scope.unitConverter.getMetricUnitsWithDimensions(mostLikelyMatch.dimensions);

                convertibleToMetric.forEach(u => {
                    var outputValue = $scope.unitConverter.convertValue(parseFloat(inputValue.coefficient.text), mostLikelyMatch, u);

                    if (outputValue != null) {
                        $scope.metricResultsLeftColumn.push(outputValue);
                    }
                });

                var j = Math.ceil($scope.metricResultsLeftColumn.length / 2);

                $scope.metricResultsRightColumn = $scope.metricResultsLeftColumn.slice(j);
                $scope.metricResultsLeftColumn = $scope.metricResultsLeftColumn.slice(0, j);
            }
        }
    });
}]);
