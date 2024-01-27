class Bookmarks {
    constructor() {
        this.bookmarksList = [];
    }

    addBookmark(name = "", url = "", iconPath = "") {
        this.retrieveBookmarks();
        this.editBookmark(this.bookmarksList.length, name, url, iconPath);
    }

    editBookmark(index, name = "", url = "", iconPath = "") {
        let bookmark = {
            name: name,
            url: url,
            iconPath: iconPath
        }
        this.retrieveBookmarks();
        this.bookmarksList[index] = bookmark;
        this.storeBookmarks();
    }

    deleteBookmark(index) {
        this.retrieveBookmarks();
        if (index >= this.bookmarksList.length) return;
        this.bookmarksList.splice(index, 1);
        this.storeBookmarks();
    }

    storeBookmarks() {
        try {
            let stringDataOfBookmarks = JSON.stringify(this.bookmarksList);
            localStorage.setItem("bookmarks", `${stringDataOfBookmarks}`)
        } catch (err) {
            console.log("An error occured when storing bookmarks");
        }
    }

    retrieveBookmarks() {
        try {
            this.bookmarksList = JSON.parse(localStorage.getItem("bookmarks"));
        } catch (err) {
            console.log("An error occured when retrieveing bookmarks");
        }
        if (this.bookmarksList == null || this.bookmarksList == "") {
            this.bookmarksList = [];
        }
        return this.bookmarksList;
    }

    getLength() {
        return this.bookmarksList.length;
    }

    findByURL(url) {
        let len = this.getLength();
        for (var i = 0; i < len; i++) {
            if (this.bookmarksList[i].url == url) {
                return i;
            }
        }
        return -1;
    }

    clearAllBookmarks() {
        try {
            localStorage.removeItem("bookmarks");
        } catch (err) {
            console.log("An error occured when deleting bookmarks");
        }
        this.bookmarksList = [];
    }

    isEmpty() {
        if (this.getLength() <= 0) return true;
        return false;
    }
}