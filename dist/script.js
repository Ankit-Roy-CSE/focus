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
 var bg_img = document.getElementById('bg_img');
var a = Math.floor(Math.random() * 35) + 1;
bg_img.style.cssText = 'background: url(bg-img/' + a + '.jpg); background-size: cover;';
}
// Show Time
function clock() {
      var a = document.getElementById('time');
      var b = new Date();
      var hour = b.getHours();
      var min = b.getMinutes();
      var sec = b.getSeconds();
      var d = document.getElementById('ampm');
      var add_0 = '';
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
      if (hour > 12) {
        hour = hour - 12;
      } else {
        hour = hour;
      }
      if (hour < 10) {        
        add_0 = '0';
      } else {
        add_0 = '';
      }      
      var c = add_0 + hour + ':' + min;      
      a.innerHTML = c; 
    }
    var i = setInterval(clock, 60000);

//color change
let clrs = document.querySelectorAll('.ch_color_div');
clrs.forEach(function(clr){
  clr.addEventListener('click',function(){
    document.documentElement.style.setProperty('--cont-clr', `${clr.dataset.color}`);
    document.documentElement.style.setProperty('--text-clr', `${clr.dataset.iconcolor}`);
  })
})

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
  var ch_color = document.getElementById('ch_color');
  ch_color.classList.toggle('active');
})
//Menubar Toggle
var menubar = document.querySelector('.open_menubar_div').addEventListener('click',function(){
  var menu = document.getElementById('menu');
  document.querySelector('.open_menubar_div').classList.toggle('active');
  menu.classList.toggle('active');
})

// Run
setBackground();
setGreet();
getName();
getFocus();
clock();

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

if('geolocation' in navigator) {
  navigator.geolocation.getCurrentPosition(getWeather);

  function getWeather(position) {
    const lat=position.coords.latitude
    const lon=position.coords.longitude
    const key='ee71c5d5dd0ffa6199e391c96de7a8b7'
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`
    fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      // const temp=data.main.temp;
      // const celcius=Math.floor(temp-273.15);
      // const weather=data.weather[0].main;
      // const icon=data.weather[0].icon;
    })

  }
}
else{
  console.log('Location Not supported')
}

var apps = document.querySelectorAll('.app');
apps.forEach(function(app) {
  const app_id = app.dataset.app;
  app.addEventListener('click',function () {
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

var close_apps = document.querySelectorAll('.control');
close_apps.forEach(function(close_app) {
  close_app.addEventListener('click', function() {
    document.querySelector('.app_con.active').classList.remove('active');
    document.querySelector('.app.active').classList.remove('active');
  })
})


/*-------------------------------------------
---------------------------------------------
---------------------------------------------
---------------------------------------------
---------------------------------------------
---------------------------------------------
           start calculator app
---------------------------------------------
---------------------------------------------
---------------------------------------------
---------------------------------------------
---------------------------------------------
---------------------------------------------
*/

function backspace(){
  let inp = document.calc.txt.value;
  let res = inp.slice(0,inp.length - 1);
  document.calc.txt.value = res;
}

let calc = document.querySelector('#calculator');
calc.addEventListener('submit',function (e){
  e.preventDefault();
})


window.addEventListener('keypress', function(e){
  var calc_input = document.querySelector('.app_con.active');
  if (calc_input !== null){
    if (e.which == 13 || e.keyCode == 13) {
      document.querySelector('.equal').click();
    } else {

    }
  } else {

  }
})



/*-------------------------           -------          --------------------------
---------------------------           -------          --------------------------
---------------------------           -------          --------------------------
---------------------------           -------          --------------------------
---------------------------           -------          --------------------------
---------------------------           -------          --------------------------
            end calculator app
---------------------------           -------          --------------------------
---------------------------           -------          --------------------------
---------------------------           -------          --------------------------
---------------------------           -------          --------------------------
---------------------------           -------          --------------------------
---------------------------           -------          --------------------------
*/


/*-------------------------------------------
---------------------------------------------
---------------------------------------------
---------------------------------------------
---------------------------------------------
---------------------------------------------
           start relax app
---------------------------------------------
---------------------------------------------
---------------------------------------------
---------------------------------------------
---------------------------------------------
---------------------------------------------
*/

const relax_container = document.getElementById('relax_container');
const text = document.getElementById('text');

const totalTime = 7500;
const breatheTime = (totalTime / 5) * 2;
const holdTime = totalTime / 5;

breathAnimation();

function breathAnimation() {
  text.innerText = 'Breathe In!';
  relax_container.classList.remove("shrink")
  relax_container.classList.add("grow")

  // container.className = 'container grow';

  setTimeout(() => {
    text.innerText = 'Hold';

    setTimeout(() => {
      text.innerText = 'Breathe Out!';
      relax_container.classList.remove("grow")
      relax_container.classList.add("shrink")
    }, holdTime);
  }, breatheTime);
}

setInterval(breathAnimation, totalTime);

/*-------------------------           -------          --------------------------
---------------------------           -------          --------------------------
---------------------------           -------          --------------------------
---------------------------           -------          --------------------------
---------------------------           -------          --------------------------
---------------------------           -------          --------------------------
            end relax app
---------------------------           -------          --------------------------
---------------------------           -------          --------------------------
---------------------------           -------          --------------------------
---------------------------           -------          --------------------------
---------------------------           -------          --------------------------
---------------------------           -------          --------------------------
*/

