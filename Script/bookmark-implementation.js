let bookmarks = new Bookmarks();
const saveBtn = document.querySelector('.save-bookmark-btn');

document.querySelector('.bookmark_icon_con').addEventListener('click', function () {
    document.querySelector('.bookmark_container').classList.add('active');
    this.style.cssText = 'transform: scale(0);';
})

document.querySelector('.cross_con').addEventListener('click', function () {
    document.querySelector('.bookmark_container').classList.remove('active');
    document.querySelector('.bookmark_icon_con').style.cssText = 'transform: scale(1);';
})


//click listener for bookmarks
document.querySelectorAll('.bookmarks').forEach(function (bookmark) {
    bookmark.addEventListener('click', function () {
        let link = bookmark.dataset.link;
        if (link == '') {
            saveBtn.dataset.input_save_id = bookmark.dataset.link_id;
            openBookmarkPopup();

            //clearing inputs of the bookmark popup
            document.querySelector('.bookmark_name_input').value = '';
            document.querySelector('.bookmark_link_input').value = '';
        } else {
            search(link);
        }
    })
})


//click listener for save btn of bookmark popup
saveBtn.addEventListener('click', function () {
    let inputName = document.querySelector('.bookmark_name_input').value.trim();
    let inputLink = document.querySelector('.bookmark_link_input').value.trim();

    //validating bookmark name
    let inputNameLength = inputName.length;
    if (inputNameLength <= 0 & inputNameLength > 8) {
        alert('Please use 1-8 characters.');
        return;
    };

    let bookmarkId = saveBtn.dataset.input_save_id;

    bookmarks.addBookmark(inputName, inputLink);

    // updating UI
    updateBookmarksInUI(bookmarkId, inputName, inputLink)
    document.querySelector('.bookmark-popup').classList.remove('active');
})


//click listener for cancel btn of bookmark popup
document.querySelector('.cancel-btn').addEventListener('click', function () {
    document.querySelector('.bookmark-popup').classList.remove('active');
})


//click listener for all delete bookmark btns
document.querySelectorAll('.delete_link_input').forEach(function (del) {
    del.addEventListener('click', function () {
        let id = parseInt(del.dataset.delete_link_id);
        bookmarks.deleteBookmark(id-1);

        //update UI
        document.querySelector('.bookmark_' + id).dataset.link = "";
        document.querySelector('.bookmark_' + id + ' .bookmark_name').innerHTML = "Add";
        document.querySelector('.bookmark_' + id).title = "";
        document.querySelector('.bookmark_' + id + ' .icon').innerHTML = "+";
    })
})

function openBookmarkPopup() {
    if (document.querySelector('.bookmark-popup.active') != null) return;
    document.querySelector('.bookmark-popup').classList.add('active');
}

function loadBookmarks() {
    let bookmarksList = bookmarks.retrieveBookmarks();
    for (var i = 0; i < bookmarksList.length; i++) {
        updateBookmarksInUI(i + 1, bookmarksList[i].name, bookmarksList[i].url);
    }
}
loadBookmarks();

function updateBookmarksInUI(bookmarkId, inputName, inputLink) {
    document.querySelector('.bookmark_' + bookmarkId).dataset.link = inputLink;
    document.querySelector('.bookmark_' + bookmarkId + ' .bookmark_name').innerHTML = inputName;
    document.querySelector('.bookmark_' + bookmarkId).title = inputName;
    document.querySelector('.bookmark_' + bookmarkId + ' .icon').innerHTML = inputName[0];
}