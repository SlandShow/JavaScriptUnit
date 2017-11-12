/*
* We need to define number uniqueness.
* For example: We have N = 1234.
* Answer is - YES.
* */

// In this variation we use recursion.

let flag = true;
let stackCount = 1;
var number = prompt('Enter number: ', 1000);
var current = number;


function div(val, by) {
    return (val - val % by) / by;
}

function check(n, index) {
    if (stackCount == 4) return;

    ++stackCount

    current = number;
    for (var i = 0; i < 4; i++) {
        if (i != index) {
            if (n % 10 == current % 10) {
                flag = false;
                return
            }
        }
        current = div(current, 10);
    }

    check(div(n, 10), ++index);

}


check(number, 0);


alert(flag ? "Numbers in the number of unique (YES)" : "The numbers in the number are repeated (NO)");