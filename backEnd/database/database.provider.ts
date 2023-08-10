import { DataSource } from "typeorm";
import {UserFriendShip} from "../src/user-friend-ship/entities/user-friend-ship.entity"
import {User,Role} from "../src/user/entities/user.entity"
export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'lamgico123',
        database: 'trellodb',
        // logging: true ,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'
        ],
        synchronize: false
      });

      await dataSource
        .initialize()
        .then(() => {
          console.log('Đã kết nối với mySQL');
        })
        .catch((err) => {
          console.error('Error during Data Source initialization', err);
        });

      return dataSource;
    },
  },
];
