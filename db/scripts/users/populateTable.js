import db from "../../connection.js";
import usernames from "./dummyData.js";


async function populateUsersTable(){
for (let i = 0; i < usernames.length; i++) {
  const email = usernames[i].email;
  const username =  usernames[i].username
  
  const response = await db.query(
    `INSERT INTO users (email, username) VALUES ($1, $2);`, [email, username]
    
  );
  console.log(response);
}
}
populateUsersTable()
