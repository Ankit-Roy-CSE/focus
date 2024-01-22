function drag_drop(event) {
    var a = document.querySelectorAll('.drag_on_off');
    a.forEach(function (dcb) {
        if (dcb.checked == true) {
            var b = document.querySelector(`.app_con[data-app_id=\'${dcb.dataset.appidfdd}\']`);
            var x = event.clientX;
            var y = event.clientY;
            var xd = dcb.dataset.drag_drop_x;
            var yd = dcb.dataset.drag_drop_y;
            var fx = x + parseInt(xd);
            var fy = y + parseInt(yd);
            b.style.cssText = 'left:' + fx + 'px;' + 'top:' + fy + 'px;' + 'transition: 0s;';
        } else {
            var b = document.querySelector(`.app_con[data-app_id=\'${dcb.dataset.appidfdd}\']`);
            b.style.cssText += 'transition: 0.3s;';
        }
    })
}