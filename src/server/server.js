const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fetch = require('node-fetch');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('dist'));

const geoNamesApiUsername = process.env.GEONAMES_API_USERNAME;
const weatherApiKey = process.env.WEATHER_API_KEY;
const photoApiKey = process.env.PHOTO_API_KEY;

app.get('/', function (req, res) {
  res.sendFile(path.resolve('dist/index.html'));
});

app.post('/fetchDestination', async (req, res) => {
  try {
    let latitudeLongitude = [];
    const cityName = req.body.city;
    const geoNamesApi = `http://api.geonames.org/postalCodeLookupJSON?placename=${cityName}&username=${geoNamesApiUsername}`;

    const api1Response = await fetch(geoNamesApi);
    const data1 = await api1Response.json();
    latitudeLongitude.push(data1.postalcodes[0].lng);
    latitudeLongitude.push(data1.postalcodes[0].lat);

    const weatherApi = `https://api.weatherbit.io/v2.0/current?lat=${latitudeLongitude[1]}&lon=${latitudeLongitude[0]}&key=${weatherApiKey}&include=minutely`;

    const api2Response = await fetch(weatherApi);
    const data2 = await api2Response.json();

    const photoApi = `https://pixabay.com/api/?key=${photoApiKey}&q=${cityName}&image_type=photo`;

    const api3Response = await fetch(photoApi);
    const data3 = await api3Response.json();

    res.json({
      geoNames: data1,
      weather: data2,
      photo: data3,
    });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;
