const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

const port = process.env.PORT || 3000

console.log(publicDirectoryPath)
// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    console.log('I am here on default')
    res.render('index', {
        title: 'Weather',
        name: 'Satish Prabhu'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Satish Prabhu'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Andrew Mead'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: "you must use address"
        })

    }else {
        geocode(req.query.address, (geocodeError, {location, latitude, longitude} = {}) => {

            if (geocodeError) {
                return res.send({
                    Error: geocodeError

                })
            }

            forecast(req.query.address, (forecastError, {weather_descriptions,humidity,is_day}) => {
                if (forecastError) {
                    return res.send({
                        Error: forecastError
                    })
                }
                //console.log(latitude, longitude, weather_descriptions,humidity,is_day)
                return res.send({
                    location: location,
                    latitude: latitude,
                    longitude: longitude,
                    desc: weather_descriptions,
                    humidity: humidity,
                    is_day: is_day
                })

            })
        
        })
    }
})

app.get('/products', (req, res) => {
    console.log(req.query.search)
    if (!req.query.search) {
        return res.send({
            error: "You must use the search query"
        })
    }
    res.send({
        products: []
        
    })
})
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})