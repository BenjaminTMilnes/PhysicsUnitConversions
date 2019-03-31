// A microscopic testing framework so that I can run lots of simple tests without faffing around with bigger frameworks

class AssertionError extends Error {
    constructor(message) {
        super(message);
    }
}

function assertEqual(expectedValue, actualValue) {
    if (actualValue != expectedValue) {
        throw new AssertionError("Expected a value of '" + expectedValue + "'; got a value of '" + actualValue + "'.");
    }
    else {
        console.log("Test passed.");
    }
}