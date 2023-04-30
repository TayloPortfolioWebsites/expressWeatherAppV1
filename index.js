/*
const express = require('express');
const https = require('https');

const app = express();

app.get("/", function(req,res){
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=Manila&units=metric&appid=69e0cbaa5409608159e06708a661a35d';
    const query = "London";
    const units = "metric";
    const api = "69e0cbaa5409608159e06708a661a35d";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + units + "&appid=" + api;
    
    https.get(url,function(response){
        console.log(response);
        console.log(response.statusCode);
        response.on("data", function(data){
            console.log(data);
            const weatherData = JSON.parse(data);
            console.log(weatherData);
            //challenge 1: store icon data
            const icon = weatherData.weather[0].icon;
            const imageURL ='https://openweathermap.org/img/wn/' + icon + '@2x.png';
            console.log(icon);

            const object = {
                name: 'Hazel',
                favoriteAnime: 'none',
                specialSkills: 'none'
            }
            console.log(JSON.stringify(object));
            console.log(typeof JSON);
            const temp = weatherData.main.temp;
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            console.log(weatherDescription);
            console.log(temp);
            res.send("<h1> The temperature in Manila is " + temp + " degrees celsius.</h1>");
            res.write("<h1> The temperature in " + query + " is " + temp + " degrees celsius.</h1>");
            res.write("<p> The weather is currently " + weatherDescription + " .</p>");
            res.write("<img src=" + imageURL + ">");
            res.send();
        });
    });
    res.send("Server is up and running");
    res.send("The temperature in Manila is " + temp + " degrees celsius.");
});

app.use(express.static('public'));

app.listen(3000,function(){
    console.log('Server is running on port 3000');
});
*/

/***************************************************************************** */

const express = require('express');
const https = require('https');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

app.get("/", function(req,res){
    res.sendFile(__dirname + "/public/index.html");

});

app.post("/", function(req,res){
    console.log(req.body.cityName);

    const query = req.body.cityName;
    const units = "metric";
    const api = "69e0cbaa5409608159e06708a661a35d";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + units + "&appid=" + api;
    
    https.get(url,function(response){
        console.log(response.statusCode);
        
        response.on("data", function(data){
            const weatherData = JSON.parse(data);

            const icon = weatherData.weather[0].icon;
            const imageURL ='https://openweathermap.org/img/wn/' + icon + '@2x.png';
            console.log(icon);

            const temp = weatherData.main.temp;
            console.log(temp);

            const weatherDescription = weatherData.weather[0].description;
            console.log(weatherDescription);

            res.setHeader("content-type", "text/html");
            res.write("<img src=" + imageURL + ">");   
            res.write("<h1> The temperature in " + query + " is " + temp + " degrees celsius.</h1>");
            res.write("<p> The weather is currently " + weatherDescription + " .</p>"); 
            res.send();
        });
        
    });
});

app.listen(3000,function(){
    console.log('Server is running on port 3000');
});