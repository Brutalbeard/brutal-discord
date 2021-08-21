import UserInfo from "../definitions/user-info";
import db from "../lib/mongo-client";

async function getOrSetUser(queryUser) {
    let user: UserInfo = await db
        .users
        .findOne({
            id: queryUser.id
        }).then(res => {
            return res;
        }).catch(e => {
            console.error(e);
        });

    if (!user) {
        queryUser['doots'] = 10;

        await db
            .users
            .insertOne(queryUser)
            .catch(e => {
                console.error("DB ERROR: ", e);
            });
        //@ts-ignore
        user = queryUser;
    }

    return user;
}

export {getOrSetUser};