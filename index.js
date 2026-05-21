const cityname = document.getElementById("city-name");
const actTemp = document.getElementById("act-temp");
const tempImg = document.getElementById("temp-img");
const speed =document.getElementById("speed");
const humidity =document.getElementById("humid");

const inputCity = document.getElementById("input");
const SearchBtn = document.getElementById("SearchBtn");

const Day1 = document.getElementById("1day");
const Day2 = document.getElementById("2day");
const Day3 = document.getElementById("3day");
const Day4 = document.getElementById("4day");
const Day5 = document.getElementById("5day");

const box = document.querySelectorAll(".box");
const boxDate = document.querySelectorAll(".box-date");
const boxTemp = document.querySelectorAll(".box-temp");
const boxImg = document.querySelectorAll(".box-img");
const boxWind = document.querySelectorAll(".box-wind");
const boxHum = document.querySelectorAll(".box-hum");

const warning = document.getElementById("warning");
const warnText = document.getElementById("warn-text");
const warnBtn = document.getElementById("warn-btn");

const apikey = "7ead8a7677a4da1fe14a21664fdee012";
let city="Mumbai",url;
whether();

function warnUser(para)
{
     warnText.innerText=para;
    warning.style.visibility="visible";
    warnBtn.addEventListener("click",()=>{
        warnText.innerText=para;
        warning.style.visibility="hidden";
})
}
function showData(data){
     if(data.cod == 404)
        {
            warnUser("invalid city or city not found!");
            inputCity.value = "";return;
        }
        console.log(data);
        cityname.innerText ="📍" + city.toUpperCase();
        inputCity.value = "";
        
        actTemp.innerText = `${Math.floor(data.list[0].main.temp)} °C`;
        switch(data.list[0].weather[0].main)
        { 
            case "Clear": tempImg.src = 'sun.png';break;
            case "Clouds": tempImg.src = 'clouds.png';break;
            case "Rain": tempImg.src = 'rain.png';break;
            case "Haze": tempImg.src = 'Haze.png';break;
            case "Snow": tempImg.src = 'snow.png';break;
            case "Storm": tempImg.src = 'storm.png';break;
        }
        speed.innerText = `Wind speed: ${Math.floor(data.list[0].wind.speed * 3.6)} km/h`;
        humidity.innerText = `Humidity: ${data.list[0].main.humidity} %`;

        let idx = 2;
        boxDate.forEach((element) => {
             element.innerText = `${data.list[idx].dt_txt.slice(0,10)}`;
            //  ${Math.floor(data.list[idx].main.temp)} °C
            //                       wind speed: ${Math.floor(data.list[idx].wind.speed * 3.6)} km/h
            //                       humidity: ${data.list[idx].main.humidity} %;
            idx += 8;
        });

        idx = 2;
        boxTemp.forEach(element => {
            element.innerText = `${Math.floor(data.list[idx].main.temp)} °C`;
            idx += 8;
        });

        idx = 2;
        boxImg.forEach(element => {
            switch(data.list[idx].weather[0].main)
            { 
                case "Clear": element.src = 'sun.png';break;
                case "Clouds": element.src = 'clouds.png';break;
                case "Rain": element.src = 'rain.png';break;
            }
            idx += 8;
        });

        idx = 2;
        boxWind.forEach(element => {
            element.innerText =`Wind speed: ${Math.floor(data.list[idx].wind.speed * 3.6)} km/h`;
            idx += 8;
        });

        idx =2;
        boxHum.forEach(element => {
            element.innerText =`Humidity: ${data.list[idx].main.humidity} %`;
            idx = idx +2;
        });
}

SearchBtn.addEventListener("click",()=>{
    if(inputCity.value != "")
    {
        city = inputCity.value;
        console.log(city);
        whether();
    }
    else{
        warnUser("Enter a city!");
    }
})
inputCity.addEventListener("keypress",(event)=>{
    if(event.key === 'Enter')
    {
        SearchBtn.click();
    }
})
    

async function whether (){
    let p = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apikey}&units=metric`)
    .then((response)=>{
       let data = response.json()
        return data;
    })
    .then((data)=>{
       showData(data);
    })
    
    
}
