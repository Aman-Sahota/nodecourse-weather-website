const express=require('express')
const path=require('path')
const hbs=require('hbs')

const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

var app=express()

//setting up port
const port=process.env.PORT || 3000

//Define Paths for express config
const publicDirectory=path.join(__dirname+'./../public')
const viewPath=path.join(__dirname+'./../templates/views')
const partialsPath=path.join(__dirname+'./../templates/partials')

//Using hbs to add dynamic content like sending variables to our webpage
//Now when we first set view engine the express will byDefault look for "views" folder in the 
//root folder, but if change the name, just like i did(templates), there will be an error
//to rectify this i defined the path of the templates directory 
//and then used the "app.set('views',viewPath)" to setup the new views folder

//SetUP handlebars and the views location
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

//To use stylesheets, images and js in webpage
app.use(express.static(publicDirectory))

//Homepage
//using hbs to send 'title' and 'name' to index.hbs
app.get('/',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Obito Uchiha'
    });
})

//About Page
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'Edward Newgate',
        pirateName:'WhiteBeard'
    })
})

//Help Page
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        helpText:`Help Yourself`,
        name:'Obito Uchiha'
    })
}) 

//Weather Page
//I can simply send an Object and the browser will convert this into JSON
app.get('/weather',(req,res)=>{
    if(!req.query.location){
        return res.send({
            error:'Location must be provided!!!'
        })
    }
    geocode(req.query.location,(error,{longitude,latitude,location}={})=>{
        if(error){
            return res.send({ error })
        }

        forecast(longitude,latitude,(error,(error,forecastData)=>{
            if(error){
                return res.send({ error })
            }

            
            res.send({
                location,
                forecastData:`It is ${forecastData.temperature} degrees out. ${forecastData.summary} There is ${forecastData.precipProbability*100}% chance of rain`,
            })
        }))
    })
})

//help-404
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'Help-404',
        name:'Obito Uchiha',
        message:'Bitch keep crying. Nobody is gonna help you'
    })
})

//my 404 page
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Obito Uchiha',
        message:'My 404 page'
    })
})

//Starting up the server
app.listen(port,()=>{
    console.log('Server is up and running on port- '+port)
})