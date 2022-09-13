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
const street = '10308 N Main St'
const cityState = 'Richmond, IL'
const zip = '60071'
const date = '9/17/22'
const time = '1:00pm to 8pm or until we sell out!'

router.get('/', async (req, res) => {
    const geoData = await geocoder.forwardGeocode({
        query: `${street}, ${cityState} ${zip}`,
        limit: 1
    }).send();
    const coordinates = geoData.body.features[0].geometry.coordinates;
    res.render('pages/next', { coordinates, location, street, cityState, date, time });
});






module.exports = router;