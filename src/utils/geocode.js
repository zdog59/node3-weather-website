const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoibWlrZXoxIiwiYSI6ImNqeHV1eGZ1dzE5YmQzYnBicXN1d2Y3cmIifQ.rvp1YEuocyZJ4gkgyf_VUA&limit=1'
    //console.log(url)
    request({ url, json: true}, (error, {body})=>{
        if (error){
            callback('Unable to connect to geocode service', undefined)     
        }else if(body.features.length === 0){
            callback ('Unable to find a result for your input location', undefined)
        }else{
            callback(undefined,{
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode