const express = require('express');
const https = require('https');

const app = express();

app.get("/", function(req,res){
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=Manila&units=metric&appid=69e0cbaa5409608159e06708a661a35d';
    
    https.get(url,function(response){
        // console.log(response);
        console.log(response.statusCode);
        response.on("data", function(data){
            // console.log(data);
            const weatherData = JSON.parse(data);
            console.log(weatherData);

            // const object = {
            //     name: 'Hazel',
            //     favoriteAnime: 'none',
            //     specialSkills: 'none'
            // }
            // console.log(JSON.stringify(object));
            // console.log(typeof JSON);
            // const temp = weatherData.main.temp;
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            console.log(weatherDescription);
            console.log(temp);
        });
    });
    res.send("Server is up and running");
    // res.send("The temperature in Manila is " + temp + " degrees celsius.");
});

// app.use(express.static('public'));

app.listen(3000,function(){
    console.log('Server is running on port 3000');
});