
function isAnyOf(characters, character) {
    return (characters.split("").filter(c => c == character).length > 0);
}


class InputCoefficient {
    constructor(text) {
        this.text = text;
    }

    asFloat() {
        return parseFloat(this.text);
    }

    asDecimal() {
        return new Decimal(this.text);
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
    constructor() { }

    parseInput(inputText) {
        if (inputText == null || inputText == undefined || inputText == "") {
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
            var c = inputText.substr(marker.position, 1);

            if (isAnyOf("0123456789.", c)) {
                t += c;
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
            var c = inputText.substr(marker.position, 1);

            if (isAnyOf("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ^-+{}0123456789", c)) {
                t += c;
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
            var c = inputText.substr(marker.position, 1);

            if (isAnyOf(" \t\n", c)) {
                marker.position += 1;
            }
            else {
                break;
            }
        }
    }
}

function runInputParserTests() {
    var inputParser = new InputParser();

    assertEqual("123.456", inputParser.parseInput("123.456 km").coefficient.text);
    assertEqual("km", inputParser.parseInput("123.456 km").unit.text);

    assertEqual("-123.456", inputParser.parseInput("-123.456 km").coefficient.text);
    assertEqual("km", inputParser.parseInput("-123.456 km").unit.text);

    assertEqual("-123.456", inputParser.parseInput("     -123.456 km").coefficient.text);
    assertEqual("km", inputParser.parseInput("     -123.456 km").unit.text);

    assertEqual("-123.456", inputParser.parseInput("     -123.456     km").coefficient.text);
    assertEqual("km", inputParser.parseInput("     -123.456     km").unit.text);

    assertEqual("123456", inputParser.parseInput("     +123456     km").coefficient.text);
    assertEqual("km", inputParser.parseInput("     +123456     km").unit.text);

    assertEqual("123456", inputParser.parseInput("     +123456     m^{3}").coefficient.text);
    assertEqual("m^{3}", inputParser.parseInput("     +123456     m^{3}").unit.text);
}

runInputParserTests();

