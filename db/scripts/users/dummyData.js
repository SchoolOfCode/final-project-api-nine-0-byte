import knownFakeIds from "../../../utils/knownFakes.js"

const usernames = knownFakeIds.map((value)=>{
    return {user_id:value.user_id, username:value.name}
})

export default usernames