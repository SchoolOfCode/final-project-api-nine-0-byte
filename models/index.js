import { ocmKey } from "../config.js"
import fetch from 'node-fetch';


export async function getAllChargingStationsFromLatAndLong(location) {
    const { lat, long } = location
    console.log(lat, long)
    //?lat=sdsf & long =ggdgdfg
    let response = null
    try { // Call OCM 

        const res = await fetch(`https://api.openchargemap.io/v3/referencedata?key=${ocmKey}/&Latitude=${lat}&Longitude=${long}`)
        response = await res.json()
    } catch (err) {
        console.log(err)
        response = "Bad request D: "
    }
    return await response
}

// Contract:
// IF you call this api with either a postcode or a longitude or lattitude you should expect:
// An array of up to 10 objects [Obj(10)]

// Either object will have
// name:
// long and lat:
// Connectors: [{type:volatge}]
// FAST: true
// RAPID: false
// SLOW: true
// Available:
// ETF: int
// Price
// Subscriptions:["Tesla", "SHELL"]
// NearbyPOI:[{"Greggs", latLong}]



    // query{
    //     lat:fsdffds
    //     long:sdfsdf
    // }

    //api requests
    //return the data processed
