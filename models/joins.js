import db from "../db/connection.js"




export async function joinUsersAndFiltersByUserID(userId){
    const response = await db.query(`
    SELECT username, filters.*
    FROM users 
    JOIN filters 
    ON (users.user_id = filters.user_id)
    WHERE users.user_id = $1
    ORDER BY price ASC
    `,
    [userId])

    return response.rows
}

export async function joinUsersAndCommentsByUserID(userId){
    const response = await db.query(`
    SELECT username, comments.*
    FROM users 
    JOIN comments 
    ON (users.user_id = comments.user_id)
    WHERE users.user_id = $1
    `,
    [userId])

    return response.rows
}