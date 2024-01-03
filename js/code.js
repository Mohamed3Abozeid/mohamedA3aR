// Create a new Date object
var currentDate = new Date();

// Get the current day index (0 for Sunday, 1 for Monday, etc.)
var currentDayIndex = currentDate.getDay();

// Calculate the day's index (using modulo to handle wrapping around)
var DayIndex = currentDayIndex % 7;

// Calculate the  month's index
var MonthIndex = currentDate.getMonth() % 12;

// Array of day names
var dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
// Array of month names
var monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Display the name of the  day
document.getElementById("day1").innerHTML = dayNames[DayIndex];
document.getElementById("day2").innerHTML = dayNames[DayIndex + 1];
document.getElementById("day3").innerHTML = dayNames[DayIndex + 2];

//diplay name of month
document.getElementById("month").innerHTML = DayIndex + monthNames[MonthIndex];

async function getWeatherData(city) {
  const apiKey = "2aa0b6e132f04d4092c152926240101";
  const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3`;

  try {
    // Make a GET request to the API
    const response = await fetch(apiUrl);

    // Check if the request was successful (status code 200)
    if (response.ok) {
      // Parse the JSON response
      const data = await response.json();
      document.getElementById("day1Temp").innerHTML = ` 
      <h5> ${data.location.name}</h5>
            <h1> ${data.current.temp_c}°C</h1>
             <img src="${data.current.condition.icon}" alt="Weather Icon">
            <p class="text-primary">${data.current.condition.text}</p>
           `;

      document.getElementById("next1Day").innerHTML = ` 
       <img src="${data.forecast.forecastday[1].day.condition.icon}" alt="Next Day's Weather Icon">
        <h3> ${data.forecast.forecastday[1].day.maxtemp_c}°C</h3>
            <p> ${data.forecast.forecastday[1].day.mintemp_c}°C</p>
          
            <p class="text-primary">${data.forecast.forecastday[1].day.condition.text}</p>
            
           
           `;
      document.getElementById("next2Day").innerHTML = ` 
             <img src="${data.forecast.forecastday[2].day.condition.icon}" alt="Next Day's Weather Icon">
        <h3> ${data.forecast.forecastday[2].day.maxtemp_c}°C</h3>
            <p> ${data.forecast.forecastday[2].day.mintemp_c}°C</p>
          
            <p class="text-primary">${data.forecast.forecastday[1].day.condition.text}</p>
           `;
    } else {
      // Handle errors if the request was not successful

      console.error(`Error: ${response.status} - ${response.statusText}`);
    }
  } catch (error) {
    // Handle network errors or other exceptions
    console.error("Error:", error.message);
  }
}

getWeatherData("tahta");
