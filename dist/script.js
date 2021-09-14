// DOM Elements
const time = document.getElementById('time'),
  greeting = document.getElementById('greeting'),
  name = document.getElementById('name'),
  focus = document.getElementById('focus');

// Options
//const showAmPm = true;
// Set Background Image
function setBackground(){
 // const url ="https://source.unsplash.com/1600x900/?nature,water"
 // document.body.style.backgroundImage = `url(${url})`;
var a = Math.floor(Math.random() * 41) + 1;
document.body.style.cssText = 'background: url(bg-img/' + a + '.jpg); background-repeat: no-repeat; background-size: cover; background-attachment: fixed;';
}
// Show Time
function clock() {
      var a = document.getElementById('time');
      var b = new Date();
      var hour = b.getHours();
      var min = b.getMinutes();
      var sec = b.getSeconds();
      var d = document.getElementById('ampm');
      if (hour >= 12) {        
        d.innerHTML = 'PM';
      } else {
        d.innerHTML = 'AM';
      }
      if (min < 10) {        
        min = '0' + min;
      } else {
        min = '' + min;
      }
      if (hour < 10) {        
        hour = '0' + hour;
      } else {
        hour = '' + hour;
      }
      var c = hour + ':' + min;      
      a.innerHTML = c; 
    }
    var i = setInterval(clock, 100);

//color change
var conts = document.querySelectorAll('.container');
var menu = document.getElementById('menu');
var ch_color = document.getElementById('ch_color');
var setting_icon_color = document.getElementById('setting_container');
var open_menubar_div = document.querySelector('.open_menubar_div');
var open_menubar = document.querySelector('.open_menubar');
var cont_icons = document.querySelectorAll('.icon_g');
let clrs = document.querySelectorAll('.ch_color_div');
clrs.forEach(function (clr){
  clr.addEventListener('click',function(){
    menu.style.cssText = `background: ${clr.dataset.color}`;
    ch_color.style.cssText = `background: ${clr.dataset.color}`;
    setting_icon_color.style.cssText = `background: ${clr.dataset.color}`;
    open_menubar_div.style.cssText = `background: ${clr.dataset.color}`;
    open_menubar.style.cssText = `color: ${clr.dataset.iconcolor}`;
    cont_icons.forEach(function(cont_icon){
    cont_icon.style.cssText = `fill: ${clr.dataset.iconcolor}`;
    })
    conts.forEach(function(cont){
      cont.style.cssText = `background: ${clr.dataset.color}; color: ${clr.dataset.iconcolor}`;
    })
  })
})
// Set Background and Greeting
// function setBgGreet() {
//   let today = new Date(),
//     hour = today.getHours();

//   if (hour < 12) {
//     // Morning
//     document.body.style.backgroundImage = "url('https://i.ibb.co/7vDLJFb/morning.jpg')";
//     greeting.textContent = 'Good Morning, ';
//   } else if (hour < 18) {
//     // Afternoon
//     document.body.style.backgroundImage = "url('https://i.ibb.co/3mThcXc/afternoon.jpg')";
//     greeting.textContent = 'Good Afternoon, ';
//   } else {
//     // Evening
//     document.body.style.backgroundImage = "url('https://i.ibb.co/924T2Wv/night.jpg')";
//     greeting.textContent = 'Good Evening, ';
//     document.body.style.color = 'white';
//   }
// }


function setGreet(){
  let today = new Date(),
  hour = today.getHours();

  if (hour < 12) {
    // Morning
    greeting.textContent = 'Good Morning, ';
  } else if (hour < 18) {
    // Afternoon
    greeting.textContent = 'Good Afternoon, ';
  } else {
    // Evening
    greeting.textContent = 'Good Evening, ';
    document.body.style.color = 'white';
  }
}


// Get Name
function getName() {
  if (localStorage.getItem('name') === null) {
    name.textContent = '[Enter Name]';
  } else {
    name.textContent = localStorage.getItem('name');
  }
}

// Set Name
function setName(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('name', e.target.innerText);
      name.blur();
    }
  } else {
    localStorage.setItem('name', e.target.innerText);
  }
}

// Get Focus
function getFocus() {
  if (localStorage.getItem('focus') === null) {
    focus.textContent = '[Enter Focus]';
  } else {
    focus.textContent = localStorage.getItem('focus');
  }
}

// Set Focus
function setFocus(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('focus', e.target.innerText);
      focus.blur();
    }
  } else {
    localStorage.setItem('focus', e.target.innerText);
  }
}

name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);


//Setting Toggle
var setting = document.querySelector('#setting_container').addEventListener('click',function(){
  ch_color.classList.toggle('active');
})
//Menubar Toggle
var menubar = document.querySelector('.open_menubar_div').addEventListener('click',function(){
  document.querySelector('.open_menubar_div').classList.toggle('active');
  menu.classList.toggle('active');
})

// Run
setBackground();
setGreet();
getName();
getFocus();

//Weather
const weather = document.querySelector('.weather-container');
const weatherTemp = weather.querySelector('.weather-temp');
const weatherLocation = weather.querySelector('.weather-location');

if('geolocation' in navigator) {
  navigator.geolocation.getCurrentPosition(getWeather);


  function getWeather(position) {
    const lat = position.coords.latitude
    const lon = position.coords.longitude
    const key = 'ee71c5d5dd0ffa6199e391c96de7a8b7'
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`
    fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      weatherTemp.innerHTML = ` ${Math.floor(data.main.temp)} &#8451`
      // weatherLocation.textContent = data.name ;
      // const temp=data.main.temp;
      // const celcius=Math.floor(temp-273.15);
      // const weather=data.weather[0].main;
      // const icon=data.weather[0].icon;
    })
  }
} else {
  console.log('Not supported')
}

document.addEventListener("keydown", function(e) {
  if (e.key === "Enter") {
    toggleFullScreen();
  }
}, false);

function toggleFullScreen() {
  if (!document.fullscreenElement) {
      document.body.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}