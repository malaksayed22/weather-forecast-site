var searchInput = document.getElementById('searchInput')

async function fetchWeather(city){
    const apiKey = "4827b65015d04e57863174322250211";
    const url = `https://corsproxy.io/?https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${encodeURIComponent(city)}&days=3`;
    try{
        const response = await fetch(url);
        const data = await response.json();
        const dayElements = document.querySelectorAll('.day');
        const dateElements = document.querySelectorAll('.date');
        if (data.forecast && data.forecast.forecastday){
        data.forecast.forecastday.forEach((day, i) => {
          const dateObj = new Date(day.date);
          const weekday = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
          if (dayElements[i]){
            dayElements[i].textContent = weekday;
          }
        });
        
        if(dateElements[0]){
          const todayObj = new Date(data.forecast.forecastday[0].date);
          const dayNum = todayObj.getDate();
          const monthName = todayObj.toLocaleDateString('en-US', { month: 'long' });
          dateElements[0].textContent = `${dayNum} ${monthName}`;
        }

        if(data.location.name){
          const countryElem = document.querySelector('.country');
          if (countryElem){
            countryElem.textContent = data.location.name;
          }
        }

        const iconElems = document.querySelectorAll('.icon');
        const avgTempElems = document.querySelectorAll('.avg-temp');
        const maxTempElems = document.querySelectorAll('.max-temp');
        const minTempElems = document.querySelectorAll('.min-temp');
        const weatherElems = document.querySelectorAll('.weather');

        data.forecast.forecastday.forEach((day, i)=>{
          if (iconElems[i] && day.day && day.day.condition && day.day.condition.icon) {
            const iconUrl = "https:" + day.day.condition.icon;
            iconElems[i].innerHTML = `<img src="${iconUrl}" alt="Weather icon">`;
          }

          if (avgTempElems[i] && day.day && typeof day.day.avgtemp_c !== 'undefined') {
            avgTempElems[i].textContent = day.day.avgtemp_c + '°C';
          }

          if (maxTempElems[i] && day.day && typeof day.day.maxtemp_c !== 'undefined') {
            maxTempElems[i].textContent = day.day.maxtemp_c + '°C';
          }
          if (minTempElems[i] && day.day && typeof day.day.mintemp_c !== 'undefined') {
            minTempElems[i].textContent = day.day.mintemp_c + '°C';
          }

          if (weatherElems[i] && day.day && day.day.condition && day.day.condition.text) {
            weatherElems[i].textContent = day.day.condition.text;
          }
        });
        } 
        else{
        console.error("No forecast data found", data);
        }
    } 
    catch(error){
      console.error("Error fetching weather data:", error);
    }
}
function searchCity(){
    var city=searchInput.value;
    if(city !== ""){
    fetchWeather(city);
  }
}

fetchWeather("cairo");
