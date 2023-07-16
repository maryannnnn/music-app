import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsersModule} from './users/users.module';
import {ConfigModule} from "@nestjs/config";
import {Users} from "./users/users.entity";
import { RolesModule } from './roles/roles.module';
import {Roles} from "./roles/roles.entity";
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { MenuController } from './menu/menu.controller';
import { MenuModule } from './menu/menu.module';
import {Menu} from "./menu/menu.entity";

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
            entities: [Users, Roles, Menu],
            synchronize: true,
        }),
        UsersModule,
        RolesModule,
        AuthModule,
        MenuModule,
    ],
    controllers: [AuthController, MenuController],
    providers: []
})
export class AppModule {
}
