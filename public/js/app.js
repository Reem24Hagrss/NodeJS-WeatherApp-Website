console.log("Client side javaScript file is loadded");


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const errorMessage = document.querySelector('#error')
const weatherData = document.querySelector('#data')

weatherForm.addEventListener('submit' ,(e)=>{
    e.preventDefault() 
    errorMessage.innerHTML = 'Loading ....'
    weatherData.innerHTML = ''   
    const location = search.value
    search.innerHTML = ''
    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                errorMessage.innerHTML = data.error
            }else{
                const {forecast} = data
                errorMessage.innerHTML = ''
                weatherData.innerHTML = `
                <div class='dataContent' >
                    <p> City : <span> ${data.location} </span> </p>
                    <p> Weather descriptions : <span> ${forecast.weather_descriptions[0]} </span> </p>
                    <p> Temperature : <span> ${forecast.temperature} f </span> </p>
                    <p> Feels like : <span> ${forecast.feelslike} f </span> </p>
                </div>
                <div class='dataImage'>
                    <img src=${forecast.weather_icons[0]} >
                </div>
                `      
            }
        })
    })
})