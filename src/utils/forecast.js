const request = require('request')

const forecast = ( lant , lang , callback ) => {
    const address = encodeURIComponent(lant) +","+ encodeURIComponent(lang)
    const url = 'http://api.weatherstack.com/current?access_key=ebf7bbe09f84232cfda0dcf3dd7956d4&query='+address+'&units=f'
    request ({ url , json:true } , (error,{body}) =>{
        if(error){ /// failed connection
            callback("unable to connect to the weather service!" , undefined)        
        }else if(body.error){  /// invalid input
            callback( body.error.info , undefined)       
        }else{            
            // callback(undefined , {
            //     forecast : body.current.weather_descriptions[0] + " it's currently " + body.current.temperature + " degrees out , but feels like " + body.current.feelslike +" degrees out."
            // });
            const forecast = body.current
            callback(undefined , forecast );
        }  
    })
}

module.exports = forecast