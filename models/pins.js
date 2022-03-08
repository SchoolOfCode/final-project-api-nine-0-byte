
import db from "../db/connection.js"



export async function getAllPins(){
    const response = await db.query(`SELECT * FROM pins`)
    return response.rows
}

export async function getPinById(id){
    const response = await db.query(`SELECT * FROM pins WHERE pin_id = $1`, [id])

    return response.rows
}


export async function replacePinById(id, createObject){
    let {name, lat, long, location, Connectors, FAST, RAPID, SLOW, Available, ETA, Price} = createObject 
    Connectors = JSON.stringify(Connectors)

    const response = await db.query(`
    UPDATE pins SET 
    name = $1,
    lat = $2,
    long = $3,
    location = $4, 
    connectors = $5,
    fast = $6,
    rapid = $7,
    slow = $8,
    available = $9, 
    eta = $10,
    price = $11
    WHERE pin_id = $12 
    RETURNING *`, 
    [name, lat, long, location, Connectors, FAST, RAPID, SLOW, Available, ETA, Price,id])

    return response.rows
}

export async function getPinsFromSearch(search){
    const response = await db.query(`
    SELECT pins.* 
    FROM searches
    JOIN pins
    ON searches.location = pins.location
    WHERE search=$1
`,[search])

return response.rows 
}

export async function createNewPin(createObject){

    let {name, lat, long, location, Connectors, FAST, RAPID, SLOW, Available, ETA, Price} = createObject 
    Connectors = JSON.stringify(Connectors)
    const response = await db.query(`
    INSERT INTO pins
       (name,  
        lat,
        long,  
        location,   
        connectors,  
        fast,  
        rapid,  
        slow,  
        available,   
        eta,
        price) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) 
    RETURNING *`,
    [name, lat, long, location, Connectors, FAST, RAPID, SLOW, Available, ETA, Price])

    return response.rows
}

export async function deletePinById(id){
    const response = await db.query(`DELETE FROM pins WHERE pin_id = $1 RETURNING *`,[id])
    return response.rows
}