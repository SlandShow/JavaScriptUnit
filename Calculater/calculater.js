// Local variables
var output = "";
var stack = [];

function gotOper(curr, p) {
    while (!stack.length == 0) {
        var opTop = stack.pop();
        var oldP = -1;
        if (opTop === "+" || opTop == "-") oldP = 1;
        else oldP = 2;
        if (oldP < p) {
            stack.push(" " + opTop);
            break;
        } else output += " " + opTop
    }
    stack.push(curr);
}

// Convert from infix to postfix notation
function postfix(s) {
    var aol = s.split(" ");
    var size = s.length;
    for (var i = 0; i < size; i++) {
        if (aol[i] != undefined) {
            if (aol[i] === "+") gotOper(aol[i], 1);
            else if (aol[i] === "-") gotOper(aol[i], 1);
            else if (aol[i] === "*") gotOper(aol[i], 2);
            else if (aol[i] === "/") gotOper(aol[i], 2);
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

var tmpStr = "";
var elements = [];
// Write infix string on calculater display
function write(symbol) {
    var last = document.getElementById('output').outerText;
    if (last == 0 && last != "0.") {
        tmpStr = symbol;
        document.getElementById('output').innerText = symbol;
    } else if (symbol == "+" || symbol == "-" || symbol == "*" || symbol == "/") {
        elements.push(tmpStr);
        tmpStr = "";
        elements.push(symbol);
        // '/0' null-byte mark make calculater output more beatiful
        document.getElementById('output').innerText = last + " \0" + symbol + " \0";
    } else {
        tmpStr += symbol;
        document.getElementById('output').innerText = last + symbol;
    }
}
function one() {
    write("1");
}
function two() {
    write("2");
}
function three() {
    write("3");
}
function four() {
    write("4");
}
function five() {
    write("5");
}
function six() {
    write("6");
}
function seven() {
    write("7");
}
function eight() {
    write("8");
}
function nine() {
    write("9");
}
function zero() {
    write("0");
}
function plus() {
    write('+');
}
function minus() {
    write('-');
}
function mult() {
    write('*');
}
function div() {
    write('/');
}
function sin() {
    write('sin(');
}
function cos() {
    write('cos(');
}
function tg() {
    write('tg(');
}
function ctg() {
    write('ctg(');
}
function sup() {
    write('^');
}
function sqrt() {
    write('√(');
}
function obracket() {
    write('(');
}
function cbracket() {
    write(')');
}
// Point sign
function point() {
    var last = document.getElementById('output').outerText;
    if (last == 0) {
        document.getElementById('output').innerText = "0.";
    } else {
        document.getElementById('output').innerText = last + '.';
    }
}
// Delete
function del() {
    var last = document.getElementById('output').outerText;
    if (last == 0) {
    } else if (last.length == 1) {
        document.getElementById('output').innerText = "0";
    } else {
        document.getElementById('output').innerText = last.substring(0, last.length-1);
    }
    // Clear all variables
    output = "";
    tmpStr = "";
    elements = [];
}
// Equal button - calculate postfix notation and view result
function equal() {
    if (tmpStr != undefined)
        elements.push(tmpStr);
    // Debug mode
    console.log(elements)
    var exe = "";
    for (var i = 0; i < elements.length; i++)
        exe += elements[i] + " ";
    console.log(exe);
    elements = [];
    postfix(exe);
    var result = rpn(output.slice(1));
    if (result != 0)
        tmpStr = result;
    output = "";
    document.getElementById("output").innerText = result;
}