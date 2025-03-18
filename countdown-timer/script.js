const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minsEl = document.getElementById("mins");
const secondsEl = document.getElementById("seconds");

const newYears = "1 jan 2026";

function countdown(){
   
    const newYearsDate = new Date(newYears);
    const currentDate = new Date();
   

    const totalSeconds = (newYearsDate-currentDate)/ 1000;

    console.log(totalSeconds / 3600 /24)
    const days = Math.floor(totalSeconds / 3600 /24);
  
    const hours = Math.floor(totalSeconds / 3600) % 24;
    const mins = Math.floor(totalSeconds / 60) % 60
    const seconds = Math.floor(totalSeconds) % 60;
    
    daysEl.innerHTML = days;
    hoursEl.innerHTML =fomatTime(hours);
    minsEl.innerHTML =fomatTime(mins);
    secondsEl.innerHTML =fomatTime(seconds);
    
    
    console.log(days, hours,mins,seconds);


}

function fomatTime(time){
  return time < 10 ?(`0${time}`) : time;
}


countdown()

setInterval(countdown, 1000)