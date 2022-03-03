import db from "../db/connection.js"

export async function getAllUsers(){
    const response = await db.query("SELECT * FROM users")
    return response
}

export async function getUserByEmail({email}){
    const response = await db.query("SELECT * FROM users WHERE email = $1", [email])

    return response
}

export async function replaceUserById(id, updatedObject){
    const {email} = updatedObject
    const {username} = updatedObject

    const response = await db.query("UPDATE users SET email = $1, username = $2 WHERE user_id = $3 RETURNING *", [email, username, id])

    return response
}

export async function createNewUser({email, username}){

    username = username ?? "Username is changeable in settings"

    const response = await db.query("INSERT INTO users (email, username) VALUES ($1, $2) RETURNING *", [email, username])

    return response
}

export async function deleteUserById(id){
    const response = await db.query("DELETE FROM users WHERE user_id = $1 RETURNING *",[id])

    return response
}