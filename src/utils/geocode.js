const request = require('request')

const geocode = (address, callback) => {
    const url =`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiY29keXBlYWsiLCJhIjoiY2sxdTJ2ajZ4MHFybzNicW13bWlnYnM1eSJ9.yhTHzpGIxWrhD37KyKBidA&limit=1`

    request({ url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services.')  //this takes in (error, data) like below. leaving 2nd arg out means data undefined.
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try again with different search term.') //2nd arg undefined again.
        } else {
            callback(undefined, { //error is undefined bc successfully getting data. 
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}


module.exports = geocode