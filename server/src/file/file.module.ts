import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import {FileController} from "./file.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Meta} from "../meta/meta.entity";
import {MetaModule} from "../meta/meta.module";
import {File} from "./file.entity";

@Module({
    imports: [TypeOrmModule.forFeature([File, Meta]), MetaModule,],
    controllers: [FileController],
    providers: [FileService],
    exports: [FileService]

})
export class FileModule {}
