import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsersModule} from './users/users.module';
import {ConfigModule} from "@nestjs/config";
import {Users} from "./users/users.entity";
import { RolesModule } from './roles/roles.module';
import {Roles} from "./roles/roles.entity";
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';

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
            entities: [Users, Roles],
            synchronize: true,
        }),
        UsersModule,
        RolesModule,
        AuthModule,
    ],
    controllers: [AuthController],
    providers: []
})
export class AppModule {
}
