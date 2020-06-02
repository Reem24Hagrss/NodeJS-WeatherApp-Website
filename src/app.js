const express = require('express')
const path = require('path')
const hbs = require('hbs')
const gecode = require('./utils/gecode.js')
const forecast = require('./utils/forecast.js')

const app = express()
const port = process.env.PORT || 3000

// Define paths of Express config
const publicDirecPath = path.join( __dirname , '../public' )
const viewspath = path.join( __dirname , '../templates/views' )
const partialspath = path.join(__dirname , '../templates/partials')

// Setup handlebars engine and views locations
app.set('view engine' , 'hbs')
app.set('views' , viewspath)
hbs.registerPartials(partialspath)

// Setup static directory to serve
app.use( express.static( publicDirecPath ) )

app.get( '' , ( req, res) =>{
    res.render('index' , {
        title : 'Weather',
        name : 'Reem Hagrss'
    })
})

app.get( '/help' , ( req, res) =>{
    res.render('help' , {
        title : 'Help',
        helpText: 'This is some helpful text',
        name : 'Reem Hagrss'
    })
})

app.get( '/about' , ( req, res) =>{
    res.render('about' , {
        title : 'About me',
        name : 'Reem Hagrss'
    })
})

app.get( '/weather' , ( req, res) =>{
    if(!req.query.address){
        return res.send({
            error:'You must provide a location!'
        })
    }
    const city = req.query.address
    gecode( city , (error1, {latitude , longitude , location} = {}) =>{
        if(error1 !== undefined){
            res.send({
                error : error1
            })
        }else{    
            forecast( latitude , longitude , (error2, forecast) =>{
                if(error2 !== undefined){
                    res.send({
                        error : error1
                    })
                }else{    
                    res.send({
                        location ,
                        forecast
                    })
                }   
            })
            
        }   
    })      
})

app.get( '/product' , ( req, res) =>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term!'
        })
    }else{
        res.send({
            products :[]
        })  
    }    
})

// app.com
// app.com/help.com
// app.com/about.com
// app.com/weather

// Setup an 404 error page must be last thing in the app page 
app.get('/help/*' ,(req , res)=>{
    res.render('404' ,{
        title : 'Error Page',
        message : 'Help artical not found',
        name : 'Reem Hagrss'
    })
})
app.get('*' ,(req , res)=>{
    res.render('404' ,{
        title : 'Error Page',
        message : 'Page not found',
        name : 'Reem Hagrss'
    })
})

app.listen( port , ()=>{
    console.log("Server is up on port "+PORT);
    
})