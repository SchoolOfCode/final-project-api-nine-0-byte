import db from "../db/connection.js"

export async function getAllUsers(){
    const response = await db.query("SELECT * FROM users")
    return response
}

export async function getUserById({id}){
    const response = await db.query("SELECT * FROM users WHERE user_id = $1", [id])

    return response
}

export async function replaceUserById(id, updatedObject){
    const {user_id} = updatedObject
    const {username} = updatedObject

    const response = await db.query("UPDATE users SET user_id = $1, username = $2 WHERE user_id = $3 RETURNING *", [id, username, id])

    return response
}

export async function createNewUser({id, username}){

    username = username ?? "Username is changeable in settings"

    const response = await db.query("INSERT INTO users (user_id, username) VALUES ($1, $2) RETURNING *", [id, username])

    return response
}

export async function deleteUserById(id){
    const response = await db.query("DELETE FROM users WHERE user_id = $1 RETURNING *",[id])

    return response
}