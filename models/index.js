import { ocmKey } from "../config.js";
import fetch from "node-fetch";


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

async function returnAPIdata(location) {
  const { lat, long } = location;
  let ncr = null
  let ocm = null
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


  return [ncr.ChargeDevice, ocm]
}


export async function getAllChargingStationsFromLatAndLong(location) {

  const [ncr, ocm] = await returnAPIdata(location)

  const arrayOfChargingpoints = []


  ncr.forEach((v) => {
   const ocmEquiv = ocm.filter((value)=> {
     
      if(value.AddressInfo.Latitude == v.ChargeDeviceLocation.Latitude){
        console.log("hello")
        return true
      }
    })

    if(ocmEquiv.length === 0){}

    console.log(ocmEquiv)
    const chargingpoint = {
      name: v.ChargeDeviceName ,
      long: v.ChargeDeviceLocation.Longitude,
      lat: v.ChargeDeviceLocation.Latitude,
      Connectors: v.Connector,
      FAST: false,
      RAPID: false,
      SLOW: true,
      Available: true,
      ETA: 10,
      Price: 10, 
      Subscriptions: v.SubscriptionDetails,
      NearbyPOI: [{}],
    }

    arrayOfChargingpoints.push(chargingpoint)
   
  })



return arrayOfChargingpoints


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
