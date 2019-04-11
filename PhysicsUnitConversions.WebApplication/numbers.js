

const numbersString = "0123456789+-"
const superscriptNumbers = "⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻";
const subscriptNumbers = "₀₁₂₃₄₅₆₇₈₉₊₋";

function convertNumberToSuperscript(t1) {
    var t2 = "";

    for (var i = 0; i < t1.length; i++) {
        var c1 = t1[i];
        var j = numbersString.indexOf(c1);
        var c2 = superscriptNumbers[j];

        t2 += c2;
    }

    return t2;
}



function getNumberOfSignificantFigures(t, assumeLower) {

    var m = 0; // the number of significant figures that have been seen
    var p = 0; // the number of decimal points that have been seen
    var d = 0; // deferred significant digits

    for (var i = 0; i < t.length; i++) {
        var c = t[i];

        if (isAnyOf("123456789", c)) {
            m += d;
            d = 0;

            m++;
        }
        else if (c == ".") {
            m += d;
            d = 0;

            p++;
        }
        else if (c == "0") {
            if (m > 0) {
                d++;
            }
        }
        else if (isAnyOf("+-", c)) {
            continue;
        }
        else {
            break;
        }
    }

    if (p > 0) {
        m += d;
    }

    return m;
}

function getOrderOfMagnitude(n) {
    return ((n == 0) ? 0 : Math.floor(Math.log10(Math.abs(n))));
}

function getOrderOfMagnitudeDecimal(n) {
    return ((n == 0) ? 0 : n.abs().log().floor().toFixed(0));
}

function writeNumber(n, nsf, sf) {

    var e = 0;
    var o = getOrderOfMagnitude(n);

    if (sf || o > 5 || o < -5) {
        n = n * Math.pow(10, -o);
        e = o;
    }

    var t1 = n.toString(); // the input number as a string
    var t2 = ""; // the output string
    var m = 0; // the number of significant figures that have been seen
    var p = 0; // the number of decimal points that have been seen

    for (var i = 0; i < t1.length; i++) {
        var c1 = t1[i];

        if (c1 == "-") {
            t2 += c1;
        }
        if ("123456789".split("").filter(c2 => c2 == c1).length > 0) {
            m += 1;
            if (m <= nsf) {
                t2 += c1;
            }
            else if (m > nsf) {
                if (p == 0) {
                    t2 += "0";
                }
                else {
                    break;
                }
            }
        }
        if (c1 == ".") {
            p += 1;
            if (m < nsf) {
                t2 += c1;
            }
        }
        if (c1 == "0") {

            if (m > 0) {
                m += 1;
            }

            t2 += c1;
        }
        if (c1 == "e") {
            break;
        }
    }

    if (e != 0) {
        t2 += " × 10<sup>" + e.toString() + "</sup> ";
    }

    return t2;
}

function writeNumberDecimal(n, nsf, sf, usingSuperscriptNumbers, asLaTeX) {

    var e = 0;
    var o = getOrderOfMagnitudeDecimal(n);

    if (sf || o > 5 || o < -5) {
        n = n.times((new Decimal(10)).toPower(-o));
        e = o;
    }

    var a = new Decimal(n.toPrecision(nsf)); // rounding step
    var t1 = a.toFixed(20); // the input number as a string
    var t2 = ""; // the output string
    var m = 0; // the number of significant figures that have been seen
    var p = 0; // the number of decimal points that have been seen

    for (var i = 0; i < t1.length; i++) {
        var c1 = t1[i];

        if (c1 == "-") {
            if (asLaTeX) {
                t2 += "-";
            }
            else {
                t2 += "−";
            }
        }
        if ("123456789".split("").filter(c2 => c2 == c1).length > 0) {
            m += 1;
            if (m <= nsf) {
                t2 += c1;
            }
            else if (m > nsf) {
                if (p == 0) {
                    t2 += "0";
                }
                else {
                    break;
                }
            }
        }
        if (c1 == ".") {
            p += 1;
            if (m < nsf) {
                t2 += c1;
            }
        }
        if (c1 == "0") {

            if (m > 0) {
                m += 1;
            }

            if (m <= nsf || p == 0) {
                t2 += c1;
            }
        }
        if (c1 == "e") {
            break;
        }
    }

    if (e != 0) {
        if (asLaTeX) {
            t2 += " \\times 10^{" + e.toString() + "} ";
        }
        else if (usingSuperscriptNumbers) {
            t2 += " × 10" + convertNumberToSuperscript(e.toString()) + " ";
        }
        else {
            if (e > 0) {
                t2 += " × 10<sup>" + e.toString() + "</sup> ";
            }
            if (e < 0) {
                t2 += " × 10<sup>−" + Math.abs(e).toString() + "</sup> ";
            }
        }
    }

    return t2;
}



function runWriteNumberDecimalTests() {
    assertEqual("100000", writeNumberDecimal(new Decimal("123456"), 1, false));
    assertEqual("120000", writeNumberDecimal(new Decimal("123456"), 2, false));
    assertEqual("123000", writeNumberDecimal(new Decimal("123456"), 3, false));
    assertEqual("123500", writeNumberDecimal(new Decimal("123456"), 4, false));
    assertEqual("123460", writeNumberDecimal(new Decimal("123456"), 5, false));
    assertEqual("123456", writeNumberDecimal(new Decimal("123456"), 6, false));

    assertEqual("100000", writeNumberDecimal(new Decimal("101010"), 1, false));
    assertEqual("100000", writeNumberDecimal(new Decimal("101010"), 2, false));
    assertEqual("101000", writeNumberDecimal(new Decimal("101010"), 3, false));
    assertEqual("101000", writeNumberDecimal(new Decimal("101010"), 4, false));
    assertEqual("101010", writeNumberDecimal(new Decimal("101010"), 5, false));
    assertEqual("101010", writeNumberDecimal(new Decimal("101010"), 6, false));

    assertEqual("100", writeNumberDecimal(new Decimal("000000123"), 1, false));
    assertEqual("120", writeNumberDecimal(new Decimal("000000123"), 2, false));
    assertEqual("123", writeNumberDecimal(new Decimal("000000123"), 3, false));

    assertEqual("0.1", writeNumberDecimal(new Decimal("0.100000"), 1, false));
    assertEqual("0.10", writeNumberDecimal(new Decimal("0.100000"), 2, false));
    assertEqual("0.100", writeNumberDecimal(new Decimal("0.100000"), 3, false));
    assertEqual("0.1000", writeNumberDecimal(new Decimal("0.100000"), 4, false));
    assertEqual("0.10000", writeNumberDecimal(new Decimal("0.100000"), 5, false));
    assertEqual("0.100000", writeNumberDecimal(new Decimal("0.100000"), 6, false));

    assertEqual("0.01", writeNumberDecimal(new Decimal("0.0100000"), 1, false));
    assertEqual("0.010", writeNumberDecimal(new Decimal("0.0100000"), 2, false));
    assertEqual("0.0100", writeNumberDecimal(new Decimal("0.0100000"), 3, false));
    assertEqual("0.01000", writeNumberDecimal(new Decimal("0.0100000"), 4, false));
    assertEqual("0.010000", writeNumberDecimal(new Decimal("0.0100000"), 5, false));
    assertEqual("0.0100000", writeNumberDecimal(new Decimal("0.0100000"), 6, false));

    assertEqual("0.01", writeNumberDecimal(new Decimal("0.0101010"), 1, false));
    assertEqual("0.010", writeNumberDecimal(new Decimal("0.0101010"), 2, false));
    assertEqual("0.0101", writeNumberDecimal(new Decimal("0.0101010"), 3, false));
    assertEqual("0.01010", writeNumberDecimal(new Decimal("0.0101010"), 4, false));
    assertEqual("0.010101", writeNumberDecimal(new Decimal("0.0101010"), 5, false));
    assertEqual("0.0101010", writeNumberDecimal(new Decimal("0.0101010"), 6, false));

    assertEqual("100", writeNumberDecimal(new Decimal("101.101"), 1, false));
    assertEqual("100", writeNumberDecimal(new Decimal("101.101"), 2, false));
    assertEqual("101", writeNumberDecimal(new Decimal("101.101"), 3, false));
    assertEqual("101.1", writeNumberDecimal(new Decimal("101.101"), 4, false));
    assertEqual("101.10", writeNumberDecimal(new Decimal("101.101"), 5, false));
    assertEqual("101.101", writeNumberDecimal(new Decimal("101.101"), 6, false));
}

function runGetNumberOfSignificantFiguresTests() {

    assertEqual(1, getNumberOfSignificantFigures("1", true));
    assertEqual(2, getNumberOfSignificantFigures("12", true));
    assertEqual(3, getNumberOfSignificantFigures("123", true));
    assertEqual(3, getNumberOfSignificantFigures("1230", true));
    assertEqual(3, getNumberOfSignificantFigures("101", true));
    assertEqual(3, getNumberOfSignificantFigures("1010", true));
    assertEqual(5, getNumberOfSignificantFigures("10101", true));
    assertEqual(1, getNumberOfSignificantFigures("01", true));
    assertEqual(1, getNumberOfSignificantFigures("001", true));
    assertEqual(1, getNumberOfSignificantFigures("0001", true));
    assertEqual(2, getNumberOfSignificantFigures("011", true));
    assertEqual(2, getNumberOfSignificantFigures("0011", true));
    assertEqual(2, getNumberOfSignificantFigures("00011", true));
    assertEqual(3, getNumberOfSignificantFigures("0101", true));
    assertEqual(3, getNumberOfSignificantFigures("00101", true));
    assertEqual(3, getNumberOfSignificantFigures("000101", true));
    assertEqual(4, getNumberOfSignificantFigures("1001", true));
    assertEqual(5, getNumberOfSignificantFigures("10001", true));

    assertEqual(2, getNumberOfSignificantFigures("1.0", true));
    assertEqual(3, getNumberOfSignificantFigures("1.00", true));
    assertEqual(4, getNumberOfSignificantFigures("1.000", true));
    assertEqual(6, getNumberOfSignificantFigures("1.00000", true));
    assertEqual(3, getNumberOfSignificantFigures("1.01", true));
    assertEqual(4, getNumberOfSignificantFigures("1.010", true));
    assertEqual(5, getNumberOfSignificantFigures("1.0101", true));
    assertEqual(3, getNumberOfSignificantFigures("1.10", true));
    assertEqual(4, getNumberOfSignificantFigures("1.101", true));
    assertEqual(4, getNumberOfSignificantFigures("10.01", true));
    assertEqual(5, getNumberOfSignificantFigures("10.010", true));
    assertEqual(8, getNumberOfSignificantFigures("00100.00100", true));

}

if (RUN_TESTS) {
    runWriteNumberDecimalTests();
    runGetNumberOfSignificantFiguresTests();
}

