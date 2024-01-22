const timeContainer = document.getElementById('time');
const ampmContainer = document.getElementById('ampm');

function clock() {
    var date = new Date();
    var hour = date.getHours();
    var min = date.getMinutes();
    if (hour >= 12) {
        ampmContainer.innerHTML = 'PM';
    } else {
        ampmContainer.innerHTML = 'AM';
    }

    // converting 24hour clock to 12hour clock
    if (hour > 12) {
        hour = hour - 12;
    } else {
        hour = hour;
    }

    // adding zero before a single digit
    if (hour < 10) {
        hour = "0" + hour;
    } else {
        hour = "" + hour;
    }
    if (min < 10) {
        min = '0' + min;
    } else {
        min = '' + min;
    }
    timeContainer.innerHTML = hour + ':' + min;
}
setInterval(clock, 1000);