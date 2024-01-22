var full_screen = document.getElementById('full_screen_container').addEventListener('click', function () {
    document.body.requestFullscreen();
    document.getElementById('exit_full_screen_container').style.cssText += 'z-index: 0; display: block;';
    this.style.cssText += 'z-index: -1; display: none;';
});
var exit_full_screen = document.getElementById('exit_full_screen_container').addEventListener('click', function () {
    document.exitFullscreen();
    document.getElementById('full_screen_container').style.cssText += 'z-index: 0; display: block;';
    this.style.cssText += 'z-index: -1; display: none;';
});