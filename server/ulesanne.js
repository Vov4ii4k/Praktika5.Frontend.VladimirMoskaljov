var express = require('express');
var app = express();
const cors = require('cors')


const connect = require('./connectbase');
app.use(cors())
app.set('json spaces', 2)

//http://localhost:8000/country/:continentname
app.get('/country/:continentname',async (req, res)=>{
    try {
        const country = await connect.query("SELECT country.code AS CountryCode, country.name AS Country ,country.continent AS Continent FROM country " +
        "WHERE country.continent = '"+req.params.continentname+"'order by country.name ASC")
        res.json(country.rows);
           
    } catch (error) {
        res.json(error.message);
    }
});
//http://localhost:8000/countryinfo/:countryname
app.get('/countryinfo/:countryname',async (req, res)=>{
    try {
        const countryname = await connect.query("SELECT country.name AS Country, country.code AS CountryCode,country.continent AS Continent,country.region AS Region, country.population AS CountryPopulation, country.governmentform AS GovernmentForm, city.name AS Capital, city.district AS District, city.population AS CityPopulation FROM country INNER JOIN city ON city.countrycode = country.code " +
        "WHERE country.capital = city.id AND country.name = '"+req.params.countryname+"'");
        res.json(countryname.rows);
           
    } catch (error) {
        res.json(error.message);
    }
});

   app.listen(8000,()=>{
    console.log("Job started on port 8000")
});