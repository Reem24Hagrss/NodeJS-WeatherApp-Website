const request = require('request')

/////// encodeURIComponent convert the string to url segniture

const gecode = ( address , callback ) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoicmVlbWhhZ3JzcyIsImEiOiJja2FzZWVjcWUwZWdkMnptb2V6NXN2OXV2In0.Z2m46DBPRAVvgkDdcvqsfQ'
    request ({ url , json:true } , (error,{body}) =>{
        if(error){ /// failed connection
            callback("unable to connect to the weather service!" , undefined)        
        }else if(body.message || body.features.length === 0){  /// invalid input
            callback( "Unable to find location please try another search", undefined)       
        }else{            
            callback(undefined , {
                latitude : body.features[0].center[1] ,
                longitude : body.features[0].center[0] ,
                location : body.features[0].place_name
            });
        }  
    })
}

module.exports = gecode