var express = require('express');
var router = express.Router();
var path = require('path');
const got = require('got');

router.get('/', async function(req, res, next) {
    res.render('public/index', { layout: "empty", page_title: 'Welcome', page_description:"A brief overview, about Lien Writer® software. Lien Writing software is designed to offer an easy to use tool for printing forms for the mechanics’ lien process. A user can enter their applicable job data and print the forms they need in moments." });
});

router.route('/flight').get(async function(req, res, next) {
    res.render('public/flight_details', { layout: "empty", page_title: 'Flight Details', page_description:"A brief overview, about Lien Writer® software. Lien Writing software is designed to offer an easy to use tool for printing forms for the mechanics’ lien process. A user can enter their applicable job data and print the forms they need in moments." });
}).post(async function(req, res, next) {
    console.log(req.body);
    const client = got.extend({headers: {'x-apikey': '8e2cff00ff9c6b3f448294736de5908a'}, responseType: 'json'});
    const response = await client.get('https://waittime-qa.api.aero/waittime/v1/current/DAL');
    console.log(response.body);
    res.redirect('/quiz');
});

router.route('/quiz').get(async function(req, res, next) {
    res.render('public/quiz', { layout: "empty", page_title: 'Flight Details', page_description:"A brief overview, about Lien Writer® software. Lien Writing software is designed to offer an easy to use tool for printing forms for the mechanics’ lien process. A user can enter their applicable job data and print the forms they need in moments." });
}).post(async function(req, res, next) {
    console.log(req.body);
    res.json(req.body)
});

router.route('/coupon').get(async function(req, res, next) {
    const client = got.extend({headers: {'x-apikey': '84d718b8a9bd60d1bfe79122d3770870'}});
    // const response = await client.get('https://flightfollower-qa.api.aero/flightfollower/v1/DEL/BOM/AA/281?imgWidth=300&imgLength=300&rfc2397=false&base64=true');
    const client_2 = got.extend({headers: {'x-apikey': '89e15931434731aefdaa04920ec60e44'}, responseType: 'json'});
    const [response, response_2] = await Promise.all([client.get('https://flightfollower-qa.api.aero/flightfollower/v1/DEL/BOM/AA/281?imgWidth=300&imgLength=300&rfc2397=false&base64=true'),client_2.get('https://weather-qa.api.aero/weather/v1/current/HAM?temperatureScale=C')])
    res.render('public/coupon', { layout: "empty", temperature: response_2.body.currentWeather.temperature, img: response.body, page_title: 'Flight Details', page_description:"A brief overview, about Lien Writer® software. Lien Writing software is designed to offer an easy to use tool for printing forms for the mechanics’ lien process. A user can enter their applicable job data and print the forms they need in moments." });
}).post(async function(req, res, next) {
    console.log(req.body);
    res.json(req.body)
});

router.get('/error', function(req, res, next) {
    res.render('public/error', { layout: "empty", page_title: 'Error'});
});

router.get('/robots.txt', (req,res,next)=>{
    res.sendFile(path.resolve('public/robots.txt') );
});

module.exports = router;
