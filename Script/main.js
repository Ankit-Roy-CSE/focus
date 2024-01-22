//Setting Toggle
var setting = document.querySelector('#setting_container').addEventListener('click', function () {
  var ch_color = document.getElementById('ch_color');
  ch_color.classList.toggle('active');
})

//Menubar Toggle
var menubar = document.querySelector('.open_menubar_div').addEventListener('click', function () {
  var menu = document.getElementById('menu');
  document.querySelector('.open_menubar_div').classList.toggle('active');
  menu.classList.toggle('active');
})

document.documentElement.style.setProperty('--cont-blur', '4px');