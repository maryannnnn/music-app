import {forwardRef, Module} from '@nestjs/common';
import { UsersService } from './users.service';
import {Users} from "./users.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsersController} from "./users.controller";
import {Roles} from "../roles/roles.entity";
import {RolesModule} from "../roles/roles.module";
import {AuthModule} from "../auth/auth.module";
import {JwtModule} from "@nestjs/jwt";

@Module({
  imports: [TypeOrmModule.forFeature([Users, Roles]), RolesModule,
    forwardRef(() => AuthModule)],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
