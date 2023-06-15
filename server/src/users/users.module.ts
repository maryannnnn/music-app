import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import {Users} from "./users.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsersController} from "./users.controller";
import {Roles} from "../roles/roles.entity";
import {RolesModule} from "../roles/roles.module";

@Module({
  imports: [TypeOrmModule.forFeature([Users, Roles]), RolesModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
