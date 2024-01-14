let todayCity = document.getElementById("todayCity");
let todayTemp = document.getElementById("todayTemp");
let todayDesc = document.getElementById("todayDesc");
let todayCondationText = document.getElementById("todayCondationText");
let humidity = document.getElementById("humidity");
let wind = document.getElementById("wind");
let windDirection = document.getElementById("windDirection");
let nextMaxTemp = document.getElementsByClassName("nextMaxTemp");
let nextMinTemp = document.getElementsByClassName("nextMinTemp");
let nextCondationText = document.getElementsByClassName("nextCondationText");
let nextDayImg = document.getElementsByClassName("nextDayImg");
let todayName = document.getElementById("todayName");
let todayNumber = document.getElementById("todayNumber");
let todayMonth = document.getElementById("todayMonth");
let nextDayName = document.querySelectorAll("#nextDayName");
let searchInput = document.getElementById("searchInput");
let Find = document.getElementById("Find");

Find.addEventListener("click" ,function(){
    let searcContent = searchInput.value ;
    getData(searcContent);
})
async function getData(location){
   var data = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=beaa6830775a4e99910131438220406&q=${location}&days=3`);
    var response = await data.json();
    todayData(response);
    nextDay(response);
}

function todayData(data){
    let todayDate = new Date();
    todayName.innerHTML = todayDate.toLocaleDateString("us-en" , {weekday:"long"});
    todayMonth.innerHTML = todayDate.toLocaleDateString("en-us" , {month :"long"});
    todayNumber.innerHTML = todayDate.getDate() ;
    todayCity.innerHTML = data.location.name;
    todayTemp.innerHTML = data.current.temp_c ;
    todayDesc.setAttribute("src", data.current.condition.icon);
    todayCondationText.innerHTML = data.current.condition.text;
    humidity.innerHTML = data.current.humidity +" %";
    wind.innerHTML = data.current.wind_kph + "KPH" ;
    windDirection.innerHTML = data.current.wind_dir;
}

function nextDay(data) {
    let forcastData = data.forecast.forecastday;
    for( let i=0 ; i< nextMaxTemp.length ; i++){
        let nextDay = new Date(forcastData[i+1].date);       
         nextDayName[i].innerHTML = nextDay.toLocaleDateString("en-us" , {weekday:"long"}) ;
        nextDayImg[i].setAttribute("src" , forcastData[i+1].day.condition.icon)
        nextMaxTemp[i].innerHTML = forcastData[i+1].day.maxtemp_c;
        nextMinTemp[i].innerHTML = forcastData[i+1].day.mintemp_c;
        nextCondationText[i].innerHTML = forcastData[i+1].day.condition.text;
    }
}
