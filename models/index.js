import fetch from "node-fetch";
import {getCommentsByLocation} from "./comments.js";



export async function getAllChargingStationsFromLatAndLong({
  lat,
  long,
  dist,
}) {
  dist = dist ?? 10;
  lat = lat ?? 53.958332;
  long = long ?? -1.080278;

  

  const [ncr] = await returnAPIdata(lat, long, dist);

  let subscriptions = [{ Test: "Placeholder until dummy data is ready" }];

  const arrayOfChargingPoints = await Promise.all(ncr?.map(async v => {

    
    let eta = getEta()

    let price = getPrice()

    const comments = await getCommentsByLocation(
      String([v.ChargeDeviceLocation.Latitude, v.ChargeDeviceLocation.Longitude])
    );

  

    const chargingpoint = {
      
      comments: comments,
      location:String([v.ChargeDeviceLocation.Latitude,v.ChargeDeviceLocation.Longitude]),
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

    
    return await chargingpoint
  }));


  return await arrayOfChargingPoints;
}

//dev4.0





//// Utility functions: 

function getEta(){

  const probability = 35;
  
    if (Math.floor(Math.random() * 100) < probability) {
      return 0;
    } else {
      return Math.floor(Math.random() * 60);
    }
  
}

function getPrice(){

  const getPrice = () => {
    let randomNumber = Math.floor(Math.random() * 100);
    randomNumber =
      randomNumber > 70 || randomNumber === 0 ? "Free" : randomNumber;
    return randomNumber > 25 && randomNumber !== "Free"
      ? getPrice()
      : randomNumber;
  };
  let gottonPrice = getPrice();
  if (gottonPrice === "Free") {
    return gottonPrice;
  }
  if (String(gottonPrice).length === 1) {
    gottonPrice = "0" + gottonPrice;
  }

  return "£00." + gottonPrice + "/Kwh";
};

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

  const APIStoCall = [
    callApi(
      `https://chargepoints.dft.gov.uk/api/retrieve/registry/format/json/lat/${lat}/long/${long}/dist/${dist}/limit/40`
    ),
  ];
  try {
    const responses = await Promise.all(APIStoCall);
    const [ncrRES] = responses;
    ncr = ncrRES;
  } catch (err) {
    console.log(err);
  }

  return [ncr?.ChargeDevice];
}