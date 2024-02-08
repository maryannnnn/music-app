import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {Meta} from "../meta/meta.entity";
import {UpdateMetaDto} from "../meta/dto/update-meta.dto";
import {ApiOperation, ApiResponse} from "@nestjs/swagger";
import {CreateMetaDto} from "../meta/dto/create-meta.dto";
import {File} from "./file.entity";
import {FileService} from "./file.service";
import {CreateFileDto} from "./dto/create-file.dto";
import {UpdateFileDto} from "./dto/update-file.dto";

@Controller('file')
export class FileController {
    constructor(private fileService: FileService) {}

    @ApiOperation({summary: 'Create File'})
    @ApiResponse({status: 200, type: File})
    @Post('/new')
    createFile(@Body() dtoFile: CreateFileDto, dtoMeta: CreateMetaDto) {
        return this.fileService.createFile(dtoFile, dtoMeta)
    }

    @ApiOperation({summary: 'Get File'})
    @ApiResponse({status: 200, type: File})
    @Get(':id')
    getFileById(@Param('id') id: number) {
        return this.fileService.getFileById(id)
    }

    @ApiOperation({summary: 'Remove File'})
    @ApiResponse({status: 200})
    @Delete('/delete/:id')
    deleteFileById(@Param('id') id: number) {
        return this.fileService.deleteFileById(id)
    }

    @ApiOperation({summary: 'Update File'})
    @ApiResponse({status: 200, type: File})
    @Put('/edit')
    updateFileById(@Body() updateFileDto: UpdateFileDto, updateMetaDto: UpdateMetaDto) {
        return this.fileService.updateFileById(updateFileDto, updateMetaDto)
    }



}
