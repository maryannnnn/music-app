import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Roles} from "./roles.entity";
import {Users} from "../users/users.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Roles, Users])],
  controllers: [RolesController],
  providers: [RolesService],
  exports: [RolesService]
})
export class RolesModule {}
