function time() {
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var arr = [hours, minutes, seconds].map(function (num) {
        return num < 10 ? "0" + num : String(num);
    });
    hours = arr[0];
    minutes = arr[1];
    seconds = arr[2];
    // Return data via string element
    return hours + " : " + minutes + " : " + seconds;
}

function output(time) {
    var color = "#" + time.substring(0, 2) + time.substring(5, 7) + time.substring(10);
    document.body.bgColor = color;
    document.body.textContent = time;
    document.body.style.color = "white";
    document.body.style.fontSize = "95px";
}

// Callback function
setInterval(function () {
    output(time());
}, 1000);