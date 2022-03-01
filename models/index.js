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


  const APIStoCall =[
      callApi(
      `https://chargepoints.dft.gov.uk/api/retrieve/registry/format/json/lat/${lat}/long/${long}/dist/${dist}/limit/10`
    )
    //  callApi(
    //   `https://api.openchargemap.io/v3/poi?key=${ocmKey}/&Latitude=${lat}&Longitude=${long}`
    // )
  ]
  try {
    
    const responses = await Promise.all(APIStoCall)
    const [ncrRES] = responses
    ncr = ncrRES
    // ocm = ocmRES
    // if (ncr === 200 || ocm === 200) {
    //   throw "Error: Failure to get data";
    // }

  } catch (err) {
    console.log(err);
  }



  return [ncr?.ChargeDevice];

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



    export async function getAllChargingStationsFromLatAndLong(location) {

      let subscriptions = [{Test: "Placeholder until dummy data is ready"}];
      
      console.time("CallApiArray")
      const [ncr] = await returnAPIdata(location)
      console.timeEnd("CallApiArray")

      const arrayOfChargingpoints = []


      ncr.forEach((v) => {
        // const ocmEquiv = ocm.filter((value) => {

        //   if (value.AddressInfo.Latitude == v.ChargeDeviceLocation.Latitude) {
        //     console.log("hello")
        //     return true
        //   }
        // })

        // if (ocmEquiv.length !== 0) {
        //   price = ocmEquiv[0].UsageCost;
        //   subscriptions = ocmEquiv[0].UsageType
        // }
   
        // fun syntax thing I learned the other day, if you wrap a fat arrow in smooths and add () after it, it will run once instead of being a function. This will set eta to 0(available) probability% times
        const probability = 35;
        let eta =( ()=>{ 
          if(Math.floor(Math.random() * 100) < probability){
            return 0
        }else{
          return Math.floor(Math.random() * 60)
        }
        } )()
        /////////////////////////////
        let price = (()=>{
          const getPrice = ()=>{
            let randomNumber = Math.floor(Math.random()*100)
            randomNumber = randomNumber>70 || randomNumber===0? "Free" : randomNumber
            return  randomNumber>25 && randomNumber !== "Free" ? getPrice() : randomNumber 
          }
          let gottonPrice = getPrice()
          if (gottonPrice === "Free"){ return gottonPrice} 
          if(String(gottonPrice).length===1){ gottonPrice = "0"+gottonPrice}

          return "£00." + gottonPrice + "/Kwh"
          }
          )();
  
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
