const path = require('path')
const express = require('express')
const hbs = require('hbs',)
const geocode = require ('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

//console.log(__dirname)
//console.log(path.join(__dirname, '../public'))

const app = express()
const port = process.env.port || 3000


// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
// Setup handlebars engine and view location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to server
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
        res.render('index',{
            title: 'Weather',
            name: 'Andrew Mead'
        })
})

app.get('/about',(req, res) => {
        res.render('about',{
            title: 'About',
            name: 'Andrew Mead'
        })
})

app.get('/help',(req, res) =>{
        res.render('help',{
            title: 'Help',
            name: 'Andred Mead',
            message: 'This is your custom help message.'
        })
})

app.get('/products', (req,res) =>{

        if(!req.query.search){
            return res.send({
                error: 'You must provide a search term'
            })
        }

        console.log(req.query.search)
        res.send({
            products: []
        })
})

app.get('/weather',(req,res)=>{

    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }
//#########
geocode(req.query.address, (error, {latitude, longitude, location}={}) => {
    if(error){
        return res.send({error})
        //return console.log(error)
    }

    forecast(latitude, longitude, (error, forecastData) => {     
        if(error){
            return res.send({error})
            //return console.log(error)
        } 

        res.send({
            location,
            forecast: forecastData,
            address: req.query.address
        })

    })
})
//##########



    
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name: 'Andrew Mead',
        errorMessage: 'Help article not found.'

    })
    //res.send('Help article not found')
})

app.get('*',(req,res)=>{
    res.render('404',{
        title: '404 Error',
        name: 'Andrew Mead',
        errorMessage: 'Page not found.'
    })
    //res.send('my 404 page')
})

app.listen(port, () =>{
    console.log('Server is up on port '+ port)
})