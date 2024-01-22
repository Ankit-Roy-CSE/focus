document.querySelector('.open_search_google').addEventListener('click', function () {
    document.querySelector('.open_search_google').classList.toggle('hover');
    document.querySelector('.down_arrow').classList.toggle('hover');
    document.querySelector('.search_google').classList.toggle('active');
})

function search_js() {
    var a = document.querySelector('.search_google_input');
    var b = a.value.trim();
    var c = b.length;
    if (c > 0) {
        if (b.search('http') == 0 || b.search('file') == 0) {
            b.toLowerCase();
            window.location = b;
        } else if (b.search('www.') == 0) {
            b.toLowerCase();
            window.location = 'https://' + b + '/';
        } else {
            window.location = 'https://www.google.com/search?q=' + b;
        }
    } else {

    }
};
document.querySelector('.search_google_input').addEventListener('keypress', function (event) {
    if (event.keyCode == 13) {
        search_js();
    }
});