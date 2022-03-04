import knownFakeIds from "../../../utils/knownFakes.js"


export const filters = knownFakeIds.map((value)=>{
  const randomNumber = Math.floor(Math.random()*100)

  const connectorListOne = [
    "JEVS G105 (CHAdeMO) DC",
    "Type 1 SAEJ1772 (IEC 62196)",
    "Type 3 Scame (IEC62196)",
    "CCS Type 2 Combo (IEC62196)",
    "Type 2 Tesla (IEC62196) DC",
    "Commando 2P+E (IEC60309)",
    "Commando 3P+N+E (IEC60309)",]

    const connectorListTwo = [
      "JEVS G105 (CHAdeMO) DC",
      "Type 1 SAEJ1772 (IEC 62196)",
      "CCS Type 2 Combo (IEC62196)",
      "Commando 3P+N+E (IEC60309)"
    ]
  return(
    {
      user_id:value.user_id,
      price: randomNumber>50? 0.5: 0.0, 
      connector_type: randomNumber>50? connectorListOne: connectorListTwo,
      availability:randomNumber>50? true: false
  }
  )
})












  
  
  
  
