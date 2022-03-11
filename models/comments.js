import db from "../db/connection.js"

//comment_id SERIAL PRIMARY KEY, user_id INTEGER, location TEXT, comment TEXT, date TIMESTAMP, visibility BOOLEAN );`

export async function getAllComments(){
    const response = await db.query(`SELECT * FROM comments`)
    return response.rows
}

export async function getCommentsByLocation(id){
console.log(id)
    const response = await db.query(` 
    SELECT users.username, comments.* 
    FROM users 
    JOIN comments ON users.user_id = comments.user_id 
    WHERE comments.location = $1 
    ORDER BY comments.comment_id ASC`, [id])

    return response.rows
}





export async function replaceCommentById(id, createObject){
    const {user_id} = createObject ?? Null
    const {location} = createObject ?? ""
    const {comment} = createObject ?? "No comment"
    const {date} = createObject ?? Null
    const {visibility} = createObject ?? false
    
    const response = await db.query(`
    UPDATE comments SET 
    user_id = $1,
    location = $2, 
    comment = $3,
    date = $4,
    visibility = $5
    WHERE comment_id = $6 
    RETURNING *`, 
    [user_id , location, comment, date, visibility, id])

    return response.rows
}

export async function createNewComment(createObject){

    const {user_id} = createObject ?? Null
    const {location} = createObject ?? ""
    const {comment} = createObject ?? "No comment"
    const {date} = createObject ?? Null
    const {visibility} = createObject ?? false


    const response = await db.query(`
    INSERT INTO comments
    (user_id, location, comment, date, visibility) 
    VALUES ($1, $2, $3, $4, $5) 
    RETURNING *`,
    [user_id, location, comment, date, visibility])

    return response.rows
}

export async function deleteCommentById(id){
    const response = await db.query(`DELETE FROM comments WHERE comment_id = $1 RETURNING *`,[id])
    return response.rows
}