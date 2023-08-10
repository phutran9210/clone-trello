import {DataSource} from "typeorm"
import {UserFriendShip} from "../user-friend-ship/entities/user-friend-ship.entity"

export const userFriendshipProviders = [
    {
        provide : "USER_FRIENDSHIP_USER_REPOSITORY",
        useFactory: (dataSource: DataSource) => dataSource.getRepository(UserFriendShip),
         inject: ["DATA_SOURCE"],
    }
]