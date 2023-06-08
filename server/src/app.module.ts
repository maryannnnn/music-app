import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsersController} from './users/users.controller';
import {UsersModule} from './users/users.module';
import {ConfigModule} from "@nestjs/config";
import {Users} from "./users/user.entity";

@Module({
    imports: [
        ConfigModule.forRoot(
            {
                envFilePath: `.${process.env.NODE_ENV}.env`
            }
        ),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRESS_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRESS_PASSWORD,
            database: process.env.POSTGRES_DB,
            entities: [Users],
            synchronize: true,
        }),
        UsersModule,
    ],
    controllers: [UsersController],
})
export class AppModule {
}
