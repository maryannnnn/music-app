import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsersController} from './users/users.controller';
import {UsersModule} from './users/users.module';
import {ConfigModule} from "@nestjs/config";

@Module({
    imports: [
        ConfigModule.forRoot(
            {
                envFilePath: `.${process.env.NODE_ENV}.env`
            }
        ),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: '',
            database: 'music-app',
            entities: [],
            synchronize: true,
        }),
        UsersModule,
    ],
    controllers: [UsersController],
})
export class AppModule {
}
