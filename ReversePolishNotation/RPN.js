/*
*  Example:
*  Input <- 10 / 2 - 2 * 2
*  Postfix:  10 2 / 2 2 *  -
*
*  1. Input infix
*  2. Create postfix notation
*  3. Calculate
*  4. Final result
*/

// Local variables
var output = ""
var stack = []

function gotOper(curr, p) {
    while (!stack.length == 0) {
        var opTop = stack.pop()
        var oldP = -1
        if (opTop === "+" || opTop == "-") oldP = 1
        else oldP = 2
        if (oldP < p) {
            stack.push(" " + opTop);
            break
        } else output += " " + opTop
    }
    stack.push(curr)
}

// From infix to postfix notation
function postfix(s) {
    var aol = s.split(" ")
    var size = s.length
    for (var i = 0; i < size; i++) {
        if (aol[i] != undefined) {
            if (aol[i] === "+") gotOper(aol[i], 1)
            else if (aol[i] === "-") gotOper(aol[i], 1)
            else if (aol[i] === "*") gotOper(aol[i], 2)
            else if (aol[i] === "/") gotOper(aol[i], 2)
            else output += " " + aol[i]
        }
    }
    while (!stack.length == 0) output += " " + stack.pop();
}

// Calculate via postfix notation
function rpn(input) {
    var ar = input.split(/\s+/), st = [], token;
    while (token = ar.shift()) {
        if (token == +token) {
            st.push(token);
        } else {
            var n2 = st.pop(), n1 = st.pop();
            var re = /^[\+\-\/\*]$/;
            if (n1 != +n1 || n2 != +n2 || !re.test(token)) {
                throw new Error('Invalid expression: ' + input);
            }
            st.push(eval(n1 + token + ' ' + n2));
        }
    }
    if (st.length !== 1) {
        throw new Error('Invalid expression: ' + input);
    }
    return st.pop();
}

// User input
postfix(prompt())
// Check out new postfix notation
alert(output.slice(1))
// Alert result
alert(rpn(output.slice(1)))