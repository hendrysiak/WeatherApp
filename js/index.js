const form = document.getElementById("weather");
const API_KEY = process.env;

form.addEventListener('submit', (event) => getData(event))

const getData = async(event) => {
    event.preventDefault();
    let city = form.elements[0].value;
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&${API_KEY}`);
    let data = await response.json();
    let date = new Date(data.dt * 1000);
    getWeather(data);
    setTemperature(data);
    setTheme(data.timezone * 1000, date);
}

const setInfo = (clientDate, localDate) => {

    let city = form.elements[0].value;
    document.querySelector('.result__city-name').textContent = city;
    document.querySelector('.result__date').textContent = `${clientDate.getHours()}:${clientDate.getMinutes() < 10 ? "0"+clientDate.getMinutes() : clientDate.getMinutes()}:${clientDate.getSeconds() < 10 ? "0"+clientDate.getSeconds() : clientDate.getSeconds()}, ${clientDate.getDate()}.${clientDate.getMonth()+1}.${clientDate.getFullYear()}`
    document.querySelector('.result__local-date').textContent = `${localDate.getHours()}:${localDate.getMinutes() < 10 ? "0"+localDate.getMinutes() : localDate.getMinutes()}:${localDate.getSeconds() < 10 ? "0"+localDate.getSeconds() : localDate.getSeconds()}, ${localDate.getDate()}.${localDate.getMonth()+1}.${localDate.getFullYear()}`;
}

const getWeather = (data) => {
    const result = document.querySelector('.result__weather');
    const description = document.querySelector('.result__result-weather');
    let weather = data.weather[0].description;
    description.textContent = weather;
    // result.style.backgroundImage = '';
    if (weather === 'overcast clouds' || weather === 'broken clouds' || weather === 'scattered clouds') {
        result.style.backgroundImage = "url(https://cdn.pixabay.com/photo/2013/04/01/09/22/clouds-98536_960_720.png)"
    } else if (weather === 'clear sky') {
        result.style.backgroundImage = "url(https://cdn.pixabay.com/photo/2013/07/13/12/12/sun-159392_960_720.png)"
    } else if (weather === 'drizzle rain' || weather === 'light rain' || weather === 'moderate rain' || weather === "heavy intensity rain") {
        result.style.backgroundImage = "url(https://cdn.pixabay.com/photo/2013/04/01/09/22/rain-98538_960_720.png)"
    } else if (weather === 'light snow' || weather === 'light rain and snow' || weather === 'rain and snow' || weather === 'light shower snow') {
        result.style.backgroundImage = "url(https://cdn.pixabay.com/photo/2013/04/01/09/22/snow-98540_960_720.png)"
    } else if (weather === 'mist' || weather === 'fog') {
        result.style.backgroundImage = "url(https://cdn.pixabay.com/photo/2013/07/13/10/23/weather-157120_960_720.png)"
    } else if (weather === 'few clouds') {
        result.style.backgroundImage = "url(https://cdn.pixabay.com/photo/2016/03/18/15/06/starkbewolkt-1265202_960_720.png)"
    }

}

const setTemperature = (data) => {
    const temperature = Math.floor(data.main.temp - 273.15);
    document.getElementById('degrees').style.top = `${50 - temperature}%`;
    document.querySelector('.result__result-temperature').textContent = `${temperature} `;
};

const setTheme = (timezone, date) => {

    const input = document.querySelector('input');
    const button = document.querySelector('button');
    const UTCDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
    const localDate = new Date(UTCDate.getTime() + timezone);
    setInfo(date, localDate);
    if (localDate.getHours() > 22 || localDate.getHours() < 6) {
        document.body.classList = '';
        document.body.classList.add('body-night');
        input.classList = '';
        input.classList.add('input-night');
        button.classList = '';
        button.classList.add('button-night');
    } else {
        document.body.classList = '';
        document.body.classList.add('body-day');
        input.classList = '';
        input.classList.add('input-day');
        button.classList = '';
        button.classList.add('button-day');
    };

};

// 3. Function for handle getting weather according implemented data (date, hour etc.)