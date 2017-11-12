/*
* We need to define number uniqueness.
* For example: We have N = 1234.
* Answer is - YES.
* */

// In this variation we use loops.


let flag = true;
var number = prompt('Enter number: ', 1000);
var tmp = number;
var current = number;


function div(val, by) {
    return (val - val % by) / by;
}

for (var i = 0; i < 4; i++) {

    current = number;
    for (var j = 0; j < 4; j++) {
        if (j != i) {
            if (tmp % 10 == current % 10) {
                flag = false;
                break;
            }
        }
        current = div(current, 10);
    }
    tmp = div(tmp, 10)
    if (!flag) break
}


alert(flag ? "Numbers in the number of unique (YES)" : "The numbers in the number are repeated (NO)");