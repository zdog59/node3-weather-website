const request = require('request')

const forecast = (latitude,longitude, callback) => {

    //const url = 'https://api.darksky.net/forecast/06707f62615758c3e98ed214d2207d96/37.8267,-122.4233'
    const url = 'https://api.darksky.net/forecast/06707f62615758c3e98ed214d2207d96/'+encodeURIComponent(latitude) +','+encodeURIComponent(longitude)
    //console.log(url)

    //request ({url: url, json: true}, (error, response) => {
    request ({url, json: true}, (error, {body}) => {
     
        if(error) {
            callback('Unable to connect to weather service!', undefined)
        }else if(body.error){
            callback('Unable to find location', undefined)
        }else{
            callback(undefined, body.daily.data[0].summary + ' It is currently '+ body.currently.temperature+' outside.  Todays high temperatue will be '+ body.daily.data[0].temperatureMax+' degrees and low '+ body.daily.data[0].temperatureMin+' degrees.  There is '+body.currently.precipProbability+' % chance of rain.')
        }
    })
}


module.exports = forecast