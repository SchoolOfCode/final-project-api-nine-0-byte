import { ocmKey } from "../config.js";
import fetch from "node-fetch";

export async function getAllChargingStationsFromLatAndLong(location) {
  const { lat, long } = location;
  let ncr = null
 let  ocm = null
  try {
    ncr = await callApi(
      `https://chargepoints.dft.gov.uk/api/retrieve/registry/format/json/lat/${lat}/long/${long}/dist/10/limit/10`
    );
    ocm = await callApi(
      `https://api.openchargemap.io/v3/poi?key=${ocmKey}/&Latitude=${lat}&Longitude=${long}`
    );
    if (ncr === 200 || ocm === 200) {
      throw "Error: Failure to get data";
    }
  } catch (err) {
    console.log(err);
  }

  console.log(ncr,ocm)
  return ocm
}
async function callApi(url) {
  let response = null;
  try {
    // Call OCM

    const res = await fetch(url);
    response = await res.json();
  } catch (err) {
    console.log(err);
    response = 200;
  }
  return await response;
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
