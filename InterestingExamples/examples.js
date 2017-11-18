// Original - Habrahabr.

/*
* 1. Объявление фукнции
*
* Как видите несмотря на то что вызов функции isNimble() следует до ее объявления, пример не выдает ошибку.
* Весь контекст просматривается JavaScript-ом полностью, только потом начинает исполняться
*/

var canFly = function () {
    return true;
};

window.isDeadly = function () {
    return true;
};

assert(isNimble() && canFly() && isDeadly(), "Все работает")

function isNimble() {
    return true;
}


/*
* 2. Код после «return»
*
* Не смотря на то что функция инициализирована после оператора return, при попытке запустить этот код, мы не получим ошибку, так как все еще действует правило описанное выше.
 */

function stealthCheck() {
    var ret = stealth() == stealth();
    return assert(ret, "Код после оператора return не исполнится, но ошибки не будет!");

    function stealth() {
        return true;
    }
}

stealthCheck();


/*
* 3. Анонимные функции
*
* Анонимные функции могут иметь имена, но они будут видно только в той функции, к которой они относятся.
* Это удобно при рекурсивных вызовах.
 * Вне функции ninja, анонимная функция myNinja уже не видна.
 */

var ninja = function myNinja() {
    assert(ninja == myNinja, "Эта функция с двумя именами");
};
ninja();
assert(typeof myNinja == "undefined", "myNinja не существует, так как она анонимная");