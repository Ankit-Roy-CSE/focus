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
var a = Math.floor(Math.random() * 34) + 1;
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
    var i = setInterval(clock, 1000);

//color change
let clrs = document.querySelectorAll('.ch_color_div');
clrs.forEach(function(clr){
  clr.addEventListener('click',function(){
    document.documentElement.style.setProperty('--cont-clr', `${clr.dataset.color}`);
    document.documentElement.style.setProperty('--text-clr', `${clr.dataset.iconcolor}`);
    localStorage.setItem('cont_color', clr.dataset.color);
    localStorage.setItem('text_color', clr.dataset.iconcolor);
  })
})
document.documentElement.style.setProperty('--cont-clr', localStorage.getItem('cont_color'));
document.documentElement.style.setProperty('--text-clr', localStorage.getItem('text_color'));

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

//Weather
const weather = document.querySelector('.weather-container');
const weatherTemp = weather.querySelector('.weather-temp');
const weatherLocation = weather.querySelector('.weather-location');
const weatherPop = document.querySelector('.weather-popup');
const humid = weatherPop.querySelector('.humidity')
const sun = weatherPop.querySelector('.sun')
const wind = weatherPop.querySelector('.wind')
const tempMinMax = weatherPop.querySelector('.temp_min-max');
const weatherTable = weatherPop.querySelector('.weather-table');
const header = weatherTable.querySelector('#header');
const minRow = weatherTable.querySelector('#min-row');
const maxRow = weatherTable.querySelector('#max-row');


if('geolocation' in navigator) {
  navigator.geolocation.getCurrentPosition(getWeather);
  function getWeather(position) {
    const lat = position.coords.latitude
    const lon = position.coords.longitude
    const key_weather = 'ee71c5d5dd0ffa6199e391c96de7a8b7'
    const url_weather = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${key_weather}&units=metric&exclude=minutely,hourly`
    
    fetch(url_weather)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      weatherTemp.innerHTML = ` ${Math.round(data.current.temp)}&#8451`;
      humid.innerHTML = `Humidity:<br> ${Math.floor(data.current.humidity)}%`
      let sunrise = new Date(data.current.sunrise);
      let sunset = new Date(data.current.sunset);
      sun.innerHTML = `Sunrise-set:<br> ${sunrise.getHours()}:${sunrise.getMinutes()} - ${sunset.getHours()}:${sunset.getMinutes()}`
      wind.innerHTML = `Wind:<br> ${Math.round(data.current.wind_speed)} m/s`
      tempMinMax.innerHTML = `Min-Max:<br> ${Math.floor(data.daily[0].temp.min)} - ${Math.floor(data.daily[0].temp.max)}`
      document.querySelector('.weather-popup_temp').innerHTML = ` ${Math.round(data.current.temp)}&#8451`;
      let len = 4;
      for(let i = 1; i <= len; i++){
        var set_temp = document.documentElement.style;
        set_temp.setProperty('--day_'+ i +'-min',`${Math.round(data.daily[i-1].temp.min)}`+'px');
        set_temp.setProperty('--day_'+ i +'-max',`${Math.round(data.daily[i-1].temp.max)}`+'px');
        document.querySelector('.day_'+ i +'_min').innerHTML = `${Math.round(data.daily[i-1].temp.min)}`;
        document.querySelector('.day_'+ i +'_max').innerHTML = `${Math.round(data.daily[i-1].temp.max)}`;
        let date = new Date(data.daily[i-1].dt * 1000);
        let day = date.getDate();
        let month = date.getMonth();
        document.querySelector('.day_date_' + i).innerHTML = `${day}/${month+1}`;
      }
      // let len=7;
      
      // for(let i = 1; i <= len; i++){
      //   let date = new Date(data.daily[i-1].dt * 1000);
      //   let day = date.getDate();
      //   let month = date.getMonth();
      //   let head = document.createElement('th');
      //   head.innerHTML = `${day}/${month+1}`;
      //   header.appendChild(head)
      //   let min = document.createElement('td');
      //   min.innerHTML = `${Math.round(data.daily[i-1].temp.min)}&#8451`;
      //   minRow.appendChild(min);
      //   let max = document.createElement('td');
      //   max.innerHTML = `${Math.round(data.daily[i-1].temp.max)}&#8451`;
      //   maxRow.appendChild(max);
        
      // }
    });
    const key_location = 'AIzaSyAfxO-CWu124eg1kEOSBk6cZuRW9p_neKo'
    const url_location = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${key_location}`
    fetch(url_location)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      // weatherLocation.innerHTML = `${data.results[0].address_components[3].long_name}, ${data.results[0].address_components[5].long_name}`;
    })
    
  }
} else {
  console.log('Not supported')
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

    }if (e.which == 42 || e.keyCode == 42) {
      document.querySelector('.mult').click();
    } else {

    }if (e.which == 43 || e.keyCode == 43) {
      document.querySelector('.plus').click();
    } else {

    }if (e.which == 45 || e.keyCode == 45) {
      document.querySelector('.min').click();
    } else {

    }if (e.which == 46 || e.keyCode == 46) {
      document.querySelector('.dot').click();
    } else {

    }if (e.which == 47 || e.keyCode == 47) {
      document.querySelector('.divi').click();
    } else {

    }if (e.which == 48 || e.keyCode == 48) {
      document.querySelector('.zero').click();
    } else {

    }if (e.which == 49 || e.keyCode == 49) {
      document.querySelector('.one').click();
    } else {

    }if (e.which == 50 || e.keyCode == 50) {
      document.querySelector('.two').click();
    } else {

    }if (e.which == 51 || e.keyCode == 51) {
      document.querySelector('.three').click();
    } else {

    }if (e.which == 52 || e.keyCode == 52) {
      document.querySelector('.four').click();
    } else {

    }if (e.which == 53 || e.keyCode == 53) {
      document.querySelector('.five').click();
    } else {

    }if (e.which == 54 || e.keyCode == 54) {
      document.querySelector('.six').click();
    } else {

    }if (e.which == 55 || e.keyCode == 55) {
      document.querySelector('.seven').click();
    } else {

    }if (e.which == 56 || e.keyCode == 56) {
      document.querySelector('.eight').click();
    } else {

    }if (e.which == 57 || e.keyCode == 57) {
      document.querySelector('.nine').click();
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


var ch_blur = document.querySelector('.ch_blur');
ch_blur.addEventListener('change', function () {
  document.documentElement.style.setProperty('--cont-blur', ch_blur.value + 'px');
  localStorage.setItem('blur', ch_blur.value);
})
document.documentElement.style.setProperty('--cont-blur', localStorage.getItem('blur') + 'px');
ch_blur.value = localStorage.getItem('blur');

/*-------------------------------------------
---------------------------------------------
---------------------------------------------
---------------------------------------------
---------------------------------------------
---------------------------------------------
           start search
---------------------------------------------
---------------------------------------------
---------------------------------------------
---------------------------------------------
---------------------------------------------
---------------------------------------------
*/

document.querySelector('.open_search_google').addEventListener('click', function() {
  document.querySelector('.open_search_google').classList.toggle('hover');
  document.querySelector('.down_arrow').classList.toggle('hover');
  document.querySelector('.search_google').classList.toggle('active');
})

function search_js() {
  var a = document.querySelector('.search_google_input');
  var b = a.value.trim();
  var c = b.length;
  if (c > 0) {
    if (b.search('http') == 0 || b.search('file') == 0) {
      b.toLowerCase();
      window.location = b;
    } else if (b.search('www.') == 0) {
      b.toLowerCase();
      window.location = 'https://' + b + '/';
    } else {
      window.location = 'https://www.google.com/search?q=' + b;
    }
  } else {

  }
};
document.querySelector('.search_google_input').addEventListener('keypress', function (event) {
  if (event.keyCode == 13) {
    search_js();
  }
});

/*-------------------------           -------          --------------------------
---------------------------           -------          --------------------------
---------------------------           -------          --------------------------
---------------------------           -------          --------------------------
---------------------------           -------          --------------------------
---------------------------           -------          --------------------------
            end search
---------------------------           -------          --------------------------
---------------------------           -------          --------------------------
---------------------------           -------          --------------------------
---------------------------           -------          --------------------------
---------------------------           -------          --------------------------
---------------------------           -------          --------------------------
*/

document.querySelector('.ch_border').addEventListener('click', function () {
    if (this.checked == true) {
        document.documentElement.style.setProperty('--border','2px solid var(--text-clr)');
        localStorage.setItem('checked','true');
    } else {
        document.documentElement.style.setProperty('--border','2px solid rgba(0,0,0,0)');
        localStorage.setItem('checked','false');
    }
});
if (localStorage.getItem('checked') == 'true') {
    document.querySelector('.ch_border').click();
} else {

}

document.querySelector('.reset').addEventListener('click', function () {
    localStorage.clear();
    localStorage.setItem('blur', 4);
    document.documentElement.style.setProperty('--cont-blur', localStorage.getItem('blur') + 'px');
    document.querySelector('.ch_blur').value = localStorage.getItem('blur');
    window.location.reload();
});

document.querySelector('.cont_color_input').addEventListener('change', function (){
    var hexCode = document.querySelector('.cont_color_input').value;
    var hex = hexCode.replace('#','');
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    var r = parseInt(hex.substring(0,2), 16),
        g = parseInt(hex.substring(2,4), 16),
        b = parseInt(hex.substring(4,6), 16);
    var full = 'rgba(' + r.toString() + ',' + g.toString() + ',' + b.toString() + ',' + '0.5' + ')';
    localStorage.setItem('cont_color',full);
    document.documentElement.style.setProperty('--cont-clr', full);
});
document.querySelector('.icon_color_input').addEventListener('change', function (){
  var a = this.value;
  localStorage.setItem('text_color',a);
  document.documentElement.style.setProperty('--text-clr', a);
})

document.querySelector('.bookmark_icon_con').addEventListener('click', function (){
  document.querySelector('.bookmark_container').classList.add('active');
  this.style.cssText = 'transform: scale(0);';
})
document.querySelector('.cross_con').addEventListener('click', function (){
  document.querySelector('.bookmark_container').classList.remove('active');
  document.querySelector('.bookmark_icon_con').style.cssText = 'transform: scale(1);';
})

document.querySelectorAll('.bookmarks').forEach(function (bookmark) {
  bookmark.addEventListener('click', function (){
    if (bookmark.dataset.link === ' ') {
      var save_btn = document.querySelector('.input_link_save');
      save_btn.dataset.input_save_id = bookmark.dataset.link_id;
      open_input_link_save_con();
    } else {
      document.querySelector('.search_google_input').value = bookmark.dataset.link;
      search_js();
    }
  })
})
document.querySelector('.input_link_save').addEventListener('click',function () {
  var input_name = document.querySelector('.bookmark_name_input');
  if (input_name.value.length > 0 & input_name.value.length < 9) {
    var a = document.querySelector('.input_link_save').dataset.input_save_id;
    localStorage.setItem('bookmark_name_' + a , input_name.value);
    document.querySelector('.link_name_' + a).innerHTML = localStorage.getItem('bookmark_name_' + a);
  } else {

  }
  var input_link = document.querySelector('.bookmark_link_input');
  if (input_link.value.length > 5 & input_link.value.search('http') == 0 || input_link.value.search('www.') == 0 || input_link.value.search('file') == 0) {
    localStorage.setItem('bookmark_link_' + document.querySelector('.input_link_save').dataset.input_save_id , input_link.value.trim().toLowerCase());
    document.querySelector('.bookmark_' + document.querySelector('.input_link_save').dataset.input_save_id).dataset.link = input_link.value.trim().toLowerCase();
    document.querySelector('.short_link_name_icon_' + document.querySelector('.input_link_save').dataset.input_save_id).innerHTML = localStorage.getItem('bookmark_name_' + document.querySelector('.input_link_save').dataset.input_save_id).slice(0,1);
    document.querySelector('.bookmark_link_input_con').classList.remove('active');

  } else {
    alert('Please Type a valid link.');
  }
})

document.querySelectorAll('.bookmarks').forEach(function (bookmark) {
  document.querySelector('.bookmark_icon_con').addEventListener('click',function () {
    if (localStorage.getItem('bookmark_link_' + bookmark.dataset.link_id) !== null) {
      bookmark.dataset.link = localStorage.getItem('bookmark_link_' + bookmark.dataset.link_id);
      bookmark.title = 'URL: ' + localStorage.getItem('bookmark_link_' + bookmark.dataset.link_id) + '\n';
    } else {

    }
    if (localStorage.getItem('bookmark_name_' + bookmark.dataset.link_id) !== null) {
      document.querySelector('.link_name_' + bookmark.dataset.link_id).innerHTML = localStorage.getItem('bookmark_name_' + bookmark.dataset.link_id);
      bookmark.title += 'Name: ' + localStorage.getItem('bookmark_name_' + bookmark.dataset.link_id);
      document.querySelector('.short_link_name_icon_' + bookmark.dataset.link_id).innerHTML = localStorage.getItem('bookmark_name_' + bookmark.dataset.link_id).slice(0,1);
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


function refresh_link_input_name(){
  if (document.querySelector('.bookmark_name_input').value.length > 8) {
    document.querySelector('.bookmark_name_input').value = document.querySelector('.bookmark_name_input').value.slice(0,8);
    alert('Please use 1-8 characters.');
  } else {

  }
}
setInterval(refresh_link_input_name,1000);