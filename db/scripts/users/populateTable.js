import db from "../../connection.js";
import usernames from "./dummyData.js";


async function populateUsersTable(){
for (let i = 0; i < usernames.length; i++) {
  const user_id = usernames[i].user_id;
  const username =  usernames[i].username
  
  const response = await db.query(
    `INSERT INTO users (user_id, username) VALUES ($1, $2);`, [user_id, username]
    
  );
  console.log(response);
}
}
populateUsersTable()
