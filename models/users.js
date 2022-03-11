import db from "../db/connection.js"

export async function getAllUsers(){
    const response = await db.query("SELECT * FROM users")
    return response.rows
}

export async function getUserById(id){
    const response = await db.query("SELECT * FROM users WHERE user_id = $1", [id])

    return response.rows
}

export async function replaceUserById(id, updatedObject){
    const {user_id} = updatedObject
    const {username} = updatedObject

    const response = await db.query("UPDATE users SET user_id = $1, username = $2 WHERE user_id = $3 RETURNING *", [user_id, username, user_id])

    return response.rows
}

export async function createNewUser({user_id, username}){

    // if(await getUserById(user_id).length !== 0){return {WHAT:"User already exists, calm down front end"}}

    username = username ?? "Username is changeable in settings"

    const response = await db.query("INSERT INTO users (user_id, username) VALUES ($1, $2) RETURNING *", [user_id, username])

    return response.rows
}

export async function deleteUserById(id){
    const response = await db.query("DELETE FROM users WHERE user_id = $1 RETURNING *",[id])

    return response.rows
}