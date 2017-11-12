function blink() {
    var div = document.getElementById("greetings");
    if (div.style.color == "black") {
        div.style.color = "white";
    }
    else {
        div.style.color = "black";
    }
}
window.setInterval(blink, 500); // Blink every half second