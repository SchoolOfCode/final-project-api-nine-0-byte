import db from "../../connection.js";
import comments from "./dummyData.js";


async function populateCommentsTable (){
    for (let i = 0; i < comments.length; i++) {
        const user_id = comments[i].user_id;
        const location = comments[i].location;
        const comment = comments[i].comment;
        const visibility = comments[i].visibility;

        const response = await db.query(
            `INSERT INTO comments (user_id, location, comment,visibility) VALUES ($1, $2, $3, $4);`, [user_id, location, comment,visibility]
            
          );
          console.log(response);
        }
    }

    populateCommentsTable()