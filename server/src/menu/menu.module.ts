import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Link} from "./menu.entity";
import {MenuController} from "./menu.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Link])],
  controllers: [MenuController],
  providers: [MenuService],
  exports: [MenuService]
})
export class MenuModule {}
