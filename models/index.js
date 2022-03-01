import { ocmKey } from "../config.js";
import fetch from "node-fetch";

async function callApi(url) {
  let response = null;
  try {
    const res = await fetch(url);
    response = await res.json();
  } catch (err) {
    console.log(err);
    response = 200;
  }
  return await response;
}

async function returnAPIdata(lat, long, dist) {

  let ncr = null;
  let ocm = null;
  try {
    ncr = await callApi(
      `https://chargepoints.dft.gov.uk/api/retrieve/registry/format/json/lat/${lat}/long/${long}/dist/${dist}/limit/10`
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

  return [ncr.ChargeDevice, ocm];
}

export async function getAllChargingStationsFromLatAndLong({lat, long, dist}) {
  let price = null;
  let subscriptions = null;
  dist = dist ?? 10;
  lat = lat ??	53.958332;
  long = long ?? -1.080278;
  const [ncr, ocm] = await returnAPIdata(lat, long, dist);

  const arrayOfChargingpoints = [];

  ncr.forEach((v) => {
    const ocmEquiv = ocm.filter((value) => {
      if (value.AddressInfo.Latitude == v.ChargeDeviceLocation.Latitude) {
        console.log("hello");
        return true;
      }
    });

    if (ocmEquiv.length !== 0) {
      price = ocmEquiv[0].UsageCost;
      subscriptions = ocmEquiv[0].UsageType;
    }


    const probability = 35;
    let eta = (() => {
      if (Math.floor(Math.random() * 100) < probability) {
        return 0;
      } else {
        return Math.floor(Math.random() * 60);
      }
    })();


    const chargingpoint = {
      name: v.ChargeDeviceName,

      long: v.ChargeDeviceLocation.Longitude,
      lat: v.ChargeDeviceLocation.Latitude,
      Connectors: v.Connector,
      FAST: false,
      RAPID: false,
      SLOW: true,

      Available: eta == 0 ? true : false,
      ETA: eta,
      Price: price,
      Subscriptions: subscriptions,
      NearbyPOI: [{}],
    };

    arrayOfChargingpoints.push(chargingpoint);
  });

  return arrayOfChargingpoints;
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
