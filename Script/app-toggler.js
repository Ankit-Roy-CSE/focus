const apps = document.querySelectorAll('.app');
apps.forEach(function (app) {
    const app_id = app.dataset.app;
    app.addEventListener('click', function () {
        let active = document.querySelector('.app.active');
        if (active === null) {
            app.classList.add('active');
            toggleApp(app_id);
        } else {
            active.classList.remove('active');
            app.classList.add('active');
            toggleApp(app_id);
        }
    })
})

function toggleApp(app_id) {
    let app_con = document.querySelector(`.app_con[data-app_id="${app_id}"]`);
    let active = document.querySelector('.app_con.active');
    if (active === null) {
        app_con.classList.add('active');
    } else {
        active.classList.remove('active');
        app_con.classList.add('active');
    }

}

const closeIcons = document.querySelectorAll('.control');
closeIcons.forEach(function (closeIcon) {
    closeIcon.addEventListener('click', function () {
        document.querySelector('.app_con.active').classList.remove('active');
        document.querySelector('.app.active').classList.remove('active');
    })
})