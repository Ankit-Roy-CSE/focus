document.querySelector('.bookmark_icon_con').addEventListener('click', function () {
    document.querySelector('.bookmark_container').classList.add('active');
    this.style.cssText = 'transform: scale(0);';
})
document.querySelector('.cross_con').addEventListener('click', function () {
    document.querySelector('.bookmark_container').classList.remove('active');
    document.querySelector('.bookmark_icon_con').style.cssText = 'transform: scale(1);';
})

document.querySelectorAll('.bookmarks').forEach(function (bookmark) {
    bookmark.addEventListener('click', function () {
        if (bookmark.dataset.link === ' ') {
            var save_btn = document.querySelector('.input_link_save');
            save_btn.dataset.input_save_id = bookmark.dataset.link_id;
            open_input_link_save_con();
            document.querySelector('.bookmark_name_input').value = '';
            document.querySelector('.bookmark_link_input').value = '';
        } else {
            document.querySelector('.search_google_input').value = bookmark.dataset.link;
            search_js();
        }
    })
})
document.querySelector('.input_link_save').addEventListener('click', function () {
    var input_name = document.querySelector('.bookmark_name_input');
    if (input_name.value.length > 0 & input_name.value.length < 9) {
        var a = document.querySelector('.input_link_save').dataset.input_save_id;
        localStorage.setItem('bookmark_name_' + a, input_name.value);
        document.querySelector('.link_name_' + a).innerHTML = localStorage.getItem('bookmark_name_' + a);
    } else {

    }
    var input_link = document.querySelector('.bookmark_link_input');
    if (input_link.value.length > 5 & input_link.value.search('http') == 0 || input_link.value.search('www.') == 0 || input_link.value.search('file') == 0) {
        localStorage.setItem('bookmark_link_' + document.querySelector('.input_link_save').dataset.input_save_id, input_link.value.trim().toLowerCase());
        document.querySelector('.bookmark_' + document.querySelector('.input_link_save').dataset.input_save_id).dataset.link = input_link.value.trim().toLowerCase();
        document.querySelector('.short_link_name_icon_' + document.querySelector('.input_link_save').dataset.input_save_id).innerHTML = localStorage.getItem('bookmark_name_' + document.querySelector('.input_link_save').dataset.input_save_id).slice(0, 1);
        document.querySelector('.bookmark_link_input_con').classList.remove('active');

    } else {
        alert('Please Type a valid link.');
    }
})

document.querySelectorAll('.bookmarks').forEach(function (bookmark) {
    document.querySelector('.bookmark_icon_con').addEventListener('click', function () {
        if (localStorage.getItem('bookmark_link_' + bookmark.dataset.link_id) !== null) {
            bookmark.dataset.link = localStorage.getItem('bookmark_link_' + bookmark.dataset.link_id);
            bookmark.title = 'URL: ' + localStorage.getItem('bookmark_link_' + bookmark.dataset.link_id) + '\n';
        } else {

        }
        if (localStorage.getItem('bookmark_name_' + bookmark.dataset.link_id) !== null) {
            document.querySelector('.link_name_' + bookmark.dataset.link_id).innerHTML = localStorage.getItem('bookmark_name_' + bookmark.dataset.link_id);
            bookmark.title += 'Name: ' + localStorage.getItem('bookmark_name_' + bookmark.dataset.link_id);
            document.querySelector('.short_link_name_icon_' + bookmark.dataset.link_id).innerHTML = localStorage.getItem('bookmark_name_' + bookmark.dataset.link_id).slice(0, 1);
        } else {

        }
    })
})

function open_input_link_save_con() {
    if (document.querySelector('.bookmark_link_input_con.active') === null) {
        document.querySelector('.bookmark_link_input_con').classList.add('active');
    } else {

    }
}

document.querySelector('.input_link_cancel').addEventListener('click', function () {
    document.querySelector('.bookmark_link_input_con').classList.remove('active');
})


function refresh_link_input_name() {
    if (document.querySelector('.bookmark_name_input').value.length > 8) {
        document.querySelector('.bookmark_name_input').value = document.querySelector('.bookmark_name_input').value.slice(0, 8);
        alert('Please use 1-8 characters.');
    } else {

    }
}
setInterval(refresh_link_input_name, 1000);

document.querySelectorAll('.delete_link_input').forEach(function (del) {
    del.addEventListener('click', function () {
        var a = del.dataset.delete_link_id;
        localStorage.removeItem('bookmark_name_' + a);
        localStorage.removeItem('bookmark_link_' + a);
        window.location.reload();
    })
})