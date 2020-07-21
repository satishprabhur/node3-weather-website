const request = require('request')

const forecast = (address, callback) => {
    //http://api.weatherstack.com/current?access_key=426209c6d103e85aedde12e4fcceb30c&query=New%20York
    const url = 'http://api.weatherstack.com/current?access_key=426209c6d103e85aedde12e4fcceb30c&query=' + address + '&units=f'

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect weather services!', undefined)
        } else if (body.success === false) {
            callback('Incorrect location. correct and try again.', undefined)
        }else {
            console.log(body.current.weather_descriptions,body.current.humidity,body.current.is_day)
            callback(undefined, {
                weather_descriptions:  body.current.weather_descriptions[0],
                humidity: body.current.humidity,
                is_day: body.current.is_day

            })
        }
    })
}

module.exports = forecast