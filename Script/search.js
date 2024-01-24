const searchInput = document.querySelector('.search-input');
const searchToggler = document.querySelector('.search-toggler');

searchToggler.addEventListener('click', function () {
    searchToggler.classList.toggle('hover');
    document.querySelector('.search-container').classList.toggle('active');
})

function search(link) {
    //validating link
    if (link == "" || link == null) return;
    let value = link.trim();
    if (value.length <= 0) return;

    //replacing url
    if (value.indexOf(' ') == -1 && value.indexOf('.') >= 0) {
        if (value.indexOf("http") == 0)
            window.location = value;
        else
            window.location = "http://" + value;
    } else {
        window.location = 'https://www.google.com/search?q=' + value;
    }
}

searchInput.addEventListener('keypress', function (event) {
    if (event.keyCode == 13) {
        let link = searchInput.value;
        search(link);
    }
});

document.querySelector(".search-icon").addEventListener("click", () => {
    let link = searchInput.value;
    search(link);
})