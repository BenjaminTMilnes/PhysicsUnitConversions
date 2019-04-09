
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

class InputExponent {
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
        this.exponent = null;
        this.unit = null;
    }

    getNumberAsDecimal() {
        if (this.exponent == undefined || this.exponent == null) {
            return this.coefficient.asDecimal();
        }
        else {
            return this.coefficient.asDecimal().times((new Decimal(10)).toPower(this.exponent.asDecimal()));
        }
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
        this.parseExponent(inputText, marker, inputValue);
        this.parseWhiteSpace(inputText, marker, inputValue);
        this.parseUnit(inputText, marker, inputValue);

        if (inputValue.coefficient != null && inputValue.unit != null) {
            return inputValue;
        }
        else {
            return null;
        }
    }

    expect(inputText, marker, text) {
        if (inputText.substr(marker.position, text.length) == text) {
            marker.position += text.length;
            return true;
        }

        return false;
    }

    expectOneOf(inputText, marker, characters) {
        var c = inputText.substr(marker.position, 1);

        if (isAnyOf(characters, c)) {
            marker.position += 1;
            return true;
        }

        return false;
    }

    parseNumber(inputText, marker) {
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

        return t;
    }

    parseCoefficient(inputText, marker, container) {
        var t = this.parseNumber(inputText, marker);

        if (t.length > 0) {
            container.coefficient = new InputCoefficient(t);
        }
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

    parseExponent(inputText, marker, container) {

        this.parseWhiteSpace(inputText, marker, container);

        if (this.expectOneOf(inputText, marker, "×*x")) {

            this.parseWhiteSpace(inputText, marker, container);

            if (!this.expect(inputText, marker, "10")) { return; }

            this.parseWhiteSpace(inputText, marker, container);

            if (!this.expect(inputText, marker, "^")) { return; }

            this.parseWhiteSpace(inputText, marker, container);

            var t = this.parseNumber(inputText, marker);

            if (t.length > 0) {
                container.exponent = new InputExponent(t);
            }
        }
        else if (this.expectOneOf(inputText, marker, "eE")) {

            this.parseWhiteSpace(inputText, marker, container);

            var t = this.parseNumber(inputText, marker);

            if (t.length > 0) {
                container.exponent = new InputExponent(t);
            }
        }
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

    assertEqual("3", inputParser.parseInput("12 * 10^3 km").exponent.text);
    assertEqual("3", inputParser.parseInput("12*10^3 km").exponent.text);
    assertEqual("3", inputParser.parseInput("12 x 10^3 km").exponent.text);
    assertEqual("3", inputParser.parseInput("12x10^3 km").exponent.text);
    assertEqual("3", inputParser.parseInput("12 * 10 ^ 3 km").exponent.text);
    assertEqual("3", inputParser.parseInput("12e3 km").exponent.text);
    assertEqual("3", inputParser.parseInput("12E3 km").exponent.text);

    assertEqual("1", inputParser.parseInput("12 * 10^1 km").exponent.text);
    assertEqual("11", inputParser.parseInput("12 * 10^11 km").exponent.text);
    assertEqual("111", inputParser.parseInput("12 * 10^111 km").exponent.text);
    assertEqual("2", inputParser.parseInput("12 * 10^+2 km").exponent.text);
    assertEqual("-2", inputParser.parseInput("12 * 10^-2 km").exponent.text);
    assertEqual("-22", inputParser.parseInput("12 * 10^-22 km").exponent.text);
    assertEqual("-222", inputParser.parseInput("12 * 10^-222 km").exponent.text);
    assertEqual("-222.222", inputParser.parseInput("12 * 10^-222.222 km").exponent.text);
}

if (RUN_TESTS) {
    runInputParserTests();
}

