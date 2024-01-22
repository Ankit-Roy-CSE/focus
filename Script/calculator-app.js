
function backspace() {
    let inp = document.calc.txt.value;
    let res = inp.slice(0, inp.length - 1);
    document.calc.txt.value = res;
}

let calc = document.querySelector('#calculator');
calc.addEventListener('submit', function (e) {
    e.preventDefault();
})


window.addEventListener('keypress', function (e) {
    var calc_input = document.querySelector('.app_con.active');
    if (calc_input !== null) {
        if (e.which == 13 || e.keyCode == 13) {
            document.querySelector('.equal').click();
        } else {

        } if (e.which == 42 || e.keyCode == 42) {
            document.querySelector('.mult').click();
        } else {

        } if (e.which == 43 || e.keyCode == 43) {
            document.querySelector('.plus').click();
        } else {

        } if (e.which == 45 || e.keyCode == 45) {
            document.querySelector('.min').click();
        } else {

        } if (e.which == 46 || e.keyCode == 46) {
            document.querySelector('.dot').click();
        } else {

        } if (e.which == 47 || e.keyCode == 47) {
            document.querySelector('.divi').click();
        } else {

        } if (e.which == 48 || e.keyCode == 48) {
            document.querySelector('.zero').click();
        } else {

        } if (e.which == 49 || e.keyCode == 49) {
            document.querySelector('.one').click();
        } else {

        } if (e.which == 50 || e.keyCode == 50) {
            document.querySelector('.two').click();
        } else {

        } if (e.which == 51 || e.keyCode == 51) {
            document.querySelector('.three').click();
        } else {

        } if (e.which == 52 || e.keyCode == 52) {
            document.querySelector('.four').click();
        } else {

        } if (e.which == 53 || e.keyCode == 53) {
            document.querySelector('.five').click();
        } else {

        } if (e.which == 54 || e.keyCode == 54) {
            document.querySelector('.six').click();
        } else {

        } if (e.which == 55 || e.keyCode == 55) {
            document.querySelector('.seven').click();
        } else {

        } if (e.which == 56 || e.keyCode == 56) {
            document.querySelector('.eight').click();
        } else {

        } if (e.which == 57 || e.keyCode == 57) {
            document.querySelector('.nine').click();
        } else {

        }
    } else {

    }
})  