import UserInfo from "../definitions/user-info"
import db from "../lib/mongo-client"
import { User } from "discord.js"

async function getOrSetUser(queryUser: User){
    let user: UserInfo = await db.users.findOne({
        id: queryUser.id
    }).then(res =>{
        return res
    }).catch(e =>{
        console.error(e)
    })

    if(user == null){
        let tempUser: UserInfo = {
            id: queryUser.id,
            username: queryUser.username,
            avatar: queryUser.avatar,
            avatarURL: queryUser.avatarURL(),
            bot: queryUser.bot,
            doots: 10
        }

        await db.users.insertOne(tempUser)

        user = tempUser
    }

    return user
}

export default getOrSetUser