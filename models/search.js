import db from "../db/connection.js"

//searches
//  (search_id SERIAL PRIMARY KEY, search TEXT, location TEXT);`
export async function getAllSearches(){
    const response = await db.query(`SELECT * FROM searches`)
    return response.rows
}

export async function getSearchById(id){
    const response = await db.query(`SELECT * FROM searches WHERE search_id = $1`, [id])

    return response.rows
}

export async function getSearchByLocation(location){
    const response = await db.query(`SELECT * FROM searches WHERE location = $1`, [location])

    return response.rows
}


export async function replaceSearchById(id, createObject){
    const {search, location} = createObject 

    const response = await db.query(`
    UPDATE searches SET 
    search = $1,
    location =$2
    WHERE search_id = $3
    RETURNING *`, 
    [search, location,id])

    return response.rows
}

export async function createNewSearch(createObject){

    const {search, location} = createObject 

    const response = await db.query(`
    INSERT INTO searches
       (search,
        location) 
    VALUES ($1, $2) 
    RETURNING *`,
    [search, location])

    return response.rows
}

export async function deleteSearchById(id){
    const response = await db.query(`DELETE FROM searches WHERE search_id = $1 RETURNING *`,[id])
    return response.rows
}