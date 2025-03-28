const userTab=document.querySelector("[data-userWeather]");
const  searchTab=document.querySelector("[data-searchWeather]");
const usercontainer=document.querySelector(".weather-container");
const grantAccessContainer=document.querySelector(".grant-location-container");
const searchForm=document.querySelector("[data-searchForm]");
const loadingScreen=document.querySelector(".loading-container");
const userInfoContainer=document.querySelector(".user-info-container");
const not_waala=document.querySelector(".not");

//initially variables needed...

let currentTab=userTab;
const API_KEY ="0dbad2d4f7b5f29b283ffa00cbb3247a";
currentTab.classList.add("current-tab");                    
// one work is left
getfromSessionStorage();


function switchTab(clickedTab){
    if(clickedTab!=currentTab){
        currentTab.classList.remove("current-tab");
        currentTab=clickedTab;
        currentTab.classList.add("current-tab");

        if(!searchForm.classList.contains("active")){
            //weather->search
            userInfoContainer.classList.remove("active");
            grantAccessContainer.classList.remove("active");
            searchForm.classList.add("active");
        }
        else{
           // search->weather
           not_waala.classList.remove("active");
            searchForm.classList.remove("active");
            userInfoContainer.classList.remove("active");
            getfromSessionStorage();
        }
    }
}


userTab.addEventListener("click",()=>{
    //pass clickeed tab as input parameter
    switchTab(userTab);
});
searchTab.addEventListener("click",()=>{
    //pass clickeed tab as input parameter
    switchTab(searchTab);
});
function getfromSessionStorage(){
    const localCoordinates=sessionStorage.getItem("user-coordinates");
    if(!localCoordinates){
        grantAccessContainer.classList.add("active");
    }
    else{
        const coordinates=JSON.parse(localCoordinates);
        fetchUserWeatherInfo(coordinates);
    }
}

 async function fetchUserWeatherInfo(coordinates){
    const {lat,lon}=coordinates;
    //make grantContainer invisible
    grantAccessContainer.classList.remove("active");

    // make loader visible
    loadingScreen.classList.add("active");

    //API call
    try{
        const result=await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
    const data=await result.json();
    loadingScreen.classList.remove("active");
    userInfoContainer.classList.add("active");
    renderWheatherInfo(data);}
    catch(err){
        loadingScreen.classList.remove("active");
        console.log("error occured",err);

    }
}

// function renderWheatherInfo(data){
//     const cityName=document.querySelector("[data-cityName]");
//     const countryName=document.querySelector("[data-countryIcon]");
//     const desc=document.querySelector("[ data-weatherDesc]");
//     const weatherIcon=document.querySelector("[data-weatherIcon]");
//     const temp=document.querySelector("[data-temp]");
//     const windSpeed=document.querySelector("[data-windspeed]");
//     const humidity=document.querySelector("[data-humidity]");
//     const cloud=document.querySelector("[data-cloudiness]");
// console.log(data);
//    cityName.innerText= data?.name;
//    countryName.src = `https://flagcdn.com/144x108/${data?.sys?.country.toLowerCase()}.png`;
//    desc.innerText=data?.weather?.[0]?.description;
//    weatherIcon.src=`http://openweathermap.org/img/w/${data?.weather?.[0]?.icon}.png`;
//    temp.innerText=data?.main?.temp;
//    windSpeed.innerText=data?.wind?.speed;
//    humidity.innerText=data?.main?.humidity;
//    cloud.innerText=data?.cloud
    //    temp.innerText = `${data?.main?.temp} °C`;
    // windspeed.innerText = `${data?.wind?.speed} m/s`;
    // humidity.innerText = `${data?.main?.humidity}%`;
    // cloudiness.innerText = `${data?.clouds?.all}%`;
// }

function renderWheatherInfo(weatherInfo) {
    //fistly, we have to fethc the elements 

    const cityName = document.querySelector("[data-cityName]");
    const countryIcon = document.querySelector("[data-countryIcon]");
    const desc = document.querySelector("[data-weatherDesc]");
    const weatherIcon = document.querySelector("[data-weatherIcon]");
    const temp = document.querySelector("[data-temp]");
    const windspeed = document.querySelector("[data-windspeed]");
    const humidity = document.querySelector("[data-humidity]");
    const cloudiness = document.querySelector("[data-cloudiness]");

    console.log(weatherInfo);
    not_waala.classList.remove("active");
    //fetch values from weatherINfo object and put it UI elements
    cityName.innerText = weatherInfo?.name;
    countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
    desc.innerText = weatherInfo?.weather?.[0]?.description;
    weatherIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
    temp.innerText = `${weatherInfo?.main?.temp} °C`;
    windspeed.innerText = `${weatherInfo?.wind?.speed} m/s`;
    humidity.innerText = `${weatherInfo?.main?.humidity}%`;
    cloudiness.innerText = `${weatherInfo?.clouds?.all}%`;
    if(weatherInfo?.cod==404){
        userInfoContainer.classList.remove("active");
        not_waala.classList.add("active");

    }
}

function showPosition(position){
    const userCoordinates={
        lat:position.coords.latitude,
        lon:position.coords.longitude,
    }

    sessionStorage.setItem("user-coordinates",JSON.stringify(userCoordinates));
    fetchUserWeatherInfo(userCoordinates);
}

function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else{
        // HW-show an alert for no geolocation support avilable
        alert("NO geolocation avilable");
    }
}

const grantAccessButton=document.querySelector("[data-grantAccess]");
grantAccessButton.addEventListener("click",getLocation);

const searchInput=document.querySelector("[data-searchInput]");
searchForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    let cityName=searchInput.value;
    if(cityName==="")
        return;
    else
    fetchSearchWeatherInfo(cityName);
})

async function fetchSearchWeatherInfo(city){
    loadingScreen.classList.add("active");
    userInfoContainer.classList.remove("active");
    grantAccessContainer.classList.remove("active");

    try{
        const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        const data=await response.json();
        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
       renderWheatherInfo(data);
    }
    catch(err){
        //hw
        userInfoContainer.classList.remove("active");
        console.log("error happened",err);
    }
}












// console.log("hello ");

// const API_KEY ="0dbad2d4f7b5f29b283ffa00cbb3247a";
// // const API_KEY = "d1845658f92b31c64bd94f06f7188c9c";

// function renderWheatherInfo(data){
//     let newPara=document.createElement('p');
//         newPara.textContent=`${data?.main?.temp.toFixed(2)} °C`
//         document.body.appendChild(newPara);
// }

// async function showWheather(cty) {
//     // let latitude=15.3333;
//     // let lat=15.3333;
//     // // let longitude=74.0833;
//     // let lon=74.0833;

//     try{
//         let city=cty;
//         const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
//         // const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
        
//         const data=await response.json();
//         console.log("wheather data:->" ,data);
        
//         // let newPara=document.createElement('p');
//         // newPara.textContent=`${data?.main?.temp.toFixed(2)} °C`
//         // document.body.appendChild(newPara);
//           renderWheatherInfo(data);

//     }
// catch(err){
// //handle the coming error
// }
// // https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
// }

// // showWheather();

// async function getCustomerDetails() {
//     try{
//         let lat=15.6333;
//         let lon=18.333;
    
//         let result=await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
//         let data=await result.json();
    
//         console.log(data);
//     }
//     catch(err){
//         console.log(" error found",err);
//     }
   
// }


// function Getlocation(){
// if(navigator.geolocation){
//     navigator.geolocation.getCurrentPosition(showPosition);
// }
// else{
//     console.log("NO geolocation avilable");
// }
// }

// async function showPosition(position){
// let lat=position.coords.latitude;
// let longi=position.coords.longitude;

// console.log(lat);
// console.log(longi);
// let result=await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${longi}&appid=${API_KEY}&units=metric`);
// let finalanswer=result.json();
// console.log(finalanswer);
// }

// let submit=document.querySelector("[buttn]");
// let insidething=document.querySelector("#citylocation");
// submit.addEventListner('click',()=>{
// let cty=insidething.innertext;
// showWheather(cty);
// });