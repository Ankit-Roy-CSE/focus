//color change
let clrs = document.querySelectorAll('.ch_color_div');
clrs.forEach(function (clr) {
  clr.addEventListener('click', function () {
    document.documentElement.style.setProperty('--cont-clr', `${clr.dataset.color}`);
    document.documentElement.style.setProperty('--text-clr', `${clr.dataset.iconcolor}`);
    localStorage.setItem('cont_color', clr.dataset.color);
    localStorage.setItem('text_color', clr.dataset.iconcolor);
  })
})

document.documentElement.style.setProperty('--cont-clr', localStorage.getItem('cont_color'));
document.documentElement.style.setProperty('--text-clr', localStorage.getItem('text_color'));

var ch_blur = document.querySelector('.ch_blur');
ch_blur.addEventListener('change', function () {
    document.documentElement.style.setProperty('--cont-blur', ch_blur.value + 'px');
    localStorage.setItem('blur', ch_blur.value);
})
document.documentElement.style.setProperty('--cont-blur', localStorage.getItem('blur') + 'px');
ch_blur.value = localStorage.getItem('blur');


document.querySelector('.ch_border').addEventListener('click', function () {
    if (this.checked == true) {
        document.documentElement.style.setProperty('--border', '2px solid var(--text-clr)');
        localStorage.setItem('checked', 'true');
    } else {
        document.documentElement.style.setProperty('--border', '2px solid rgba(0,0,0,0)');
        localStorage.setItem('checked', 'false');
    }
});
if (localStorage.getItem('checked') == 'true') {
    document.querySelector('.ch_border').click();
} else {

}

document.querySelector('.reset').addEventListener('click', function () {
    localStorage.clear();
    localStorage.setItem('blur', 4);
    document.documentElement.style.setProperty('--cont-blur', localStorage.getItem('blur') + 'px');
    document.querySelector('.ch_blur').value = localStorage.getItem('blur');
    window.location.reload();
});

document.querySelector('.cont_color_input').addEventListener('change', function () {
    var hexCode = document.querySelector('.cont_color_input').value;
    var hex = hexCode.replace('#', '');
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    var r = parseInt(hex.substring(0, 2), 16),
        g = parseInt(hex.substring(2, 4), 16),
        b = parseInt(hex.substring(4, 6), 16);
    var full = 'rgba(' + r.toString() + ',' + g.toString() + ',' + b.toString() + ',' + '0.5' + ')';
    localStorage.setItem('cont_color', full);
    document.documentElement.style.setProperty('--cont-clr', full);
});
document.querySelector('.icon_color_input').addEventListener('change', function () {
    var a = this.value;
    localStorage.setItem('text_color', a);
    document.documentElement.style.setProperty('--text-clr', a);
})