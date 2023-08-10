import { DataSource } from 'typeorm';
import {User,Role,Friendship} from "../user/entities/user.entity"

export const usersProvider = [
    {
        provide: "USER_REPOSITORY",
        useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
        inject: ["DATA_SOURCE"],
    },
    {
        provide: "ROLE_REPOSITORY",
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Role),
        inject: ["DATA_SOURCE"],
       
    },
    {
        provide: "FRIEND_REPOSITORY",
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Friendship),
        inject: ["DATA_SOURCE"],
    },

]