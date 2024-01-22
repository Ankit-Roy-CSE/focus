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


if ('geolocation' in navigator) {
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
                for (let i = 1; i <= len; i++) {
                    var set_temp = document.documentElement.style;
                    set_temp.setProperty('--day_' + i + '-min', `${Math.round(data.daily[i - 1].temp.min)}` + 'px');
                    set_temp.setProperty('--day_' + i + '-max', `${Math.round(data.daily[i - 1].temp.max)}` + 'px');
                    document.querySelector('.day_' + i + '_min').innerHTML = `${Math.round(data.daily[i - 1].temp.min)}`;
                    document.querySelector('.day_' + i + '_max').innerHTML = `${Math.round(data.daily[i - 1].temp.max)}`;
                    let date = new Date(data.daily[i - 1].dt * 1000);
                    let day = date.getDate();
                    let month = date.getMonth();
                    document.querySelector('.day_date_' + i).innerHTML = `${day}/${month + 1}`;
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
