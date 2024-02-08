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
import {Link} from "./menu/menu.entity";
import { FileController } from './file/file.controller';
import { FileModule } from './file/file.module';
import { MetaController } from './meta/meta.controller';
import { MetaModule } from './meta/meta.module';
import {File} from "./file/file.entity";
import {Meta} from "./meta/meta.entity";

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
            entities: [Users, Roles, Link, File, Meta],
            synchronize: true,
        }),
        UsersModule,
        RolesModule,
        AuthModule,
        MenuModule,
        FileModule,
        MetaModule,
    ],
    controllers: [AuthController, MenuController, FileController, MetaController],
    providers: []
})
export class AppModule {
}
