import { Module } from '@nestjs/common';
import { MetaService } from './meta.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {MetaController} from "./meta.controller";
import {File} from "../file/file.entity";
import {Meta} from "./meta.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Meta, File])],
    controllers: [MetaController],
    providers: [MetaService],
    exports: [MetaService]

})
export class MetaModule {}
