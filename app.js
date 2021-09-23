const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
    });

app.post("/", function(req, res) {
  const query = req.body.cityName
  const apiKey = "8b3c60987ffa266e3ba6d91ce2837c31"
  const unit = "metric"
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit
  https.get(url, function(response) {
    console.log(response.statusCode);
    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const iconUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<h1>The weather is currently " + weatherDescription + ".</h1>");
      res.write("<h1>The temperature in " + query + " is " + temp + " degree celcius.</h1>")
      res.write("<img src="+iconUrl+">")
      res.send();
    });
  });
});


// const query = "Hanoi"







app.listen(3000, function() {
  console.log("Server running in port 3000");
})
