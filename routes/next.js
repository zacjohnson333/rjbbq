const express = require('express');
const router = express.Router();
const ejsMate = require('ejs-mate');    // an engine that makes sense of ejs
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapBoxToken });


// router.get('/', async (req, res) => {
//     const geoData = await geocoder.forwardGeocode({     
//         query: '10115 Main St, Hebron, IL 60034',
//         limit: 1
//     }).send();
//     console.log(geoData.body.features[0].geometry.coordinates);
//     res.render('pages/next');
// });

const location = null
const street = '9805 IL Route 173'
const cityState = 'Hebron, IL'
const zip = '60034'
const date = '9/30/23'
const time = '10:30am to 4:30pm'

router.get('/', async (req, res) => {
    const geoData = await geocoder.forwardGeocode({
        query: `${street}, ${cityState} ${zip}`,
        limit: 1
    }).send();
    const coordinates = geoData.body.features[0].geometry.coordinates;
    res.render('pages/next', { coordinates, location, street, cityState, date, time });
});






module.exports = router;