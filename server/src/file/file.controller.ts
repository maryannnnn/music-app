import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { UpdateMetaDto } from "../meta/dto/update-meta.dto";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { CreateMetaDto } from "../meta/dto/create-meta.dto";
import { File } from "./file.entity";
import { FileService } from "./file.service";
import { UpdateFileDto } from "./dto/update-file.dto";
import { FilesInterceptor } from '@nestjs/platform-express';
import { NewFileDto } from "./dto/new-file.dto";
import { Express } from 'express';

@Controller('files')
export class FileController {
    constructor(private fileService: FileService) {}

    @ApiOperation({summary: 'Create File'})
    @ApiResponse({status: 200, type: File})
    @Post('/upload')
    @UseInterceptors(FilesInterceptor('files'))
    uploadFile(@UploadedFiles() files: Express.Multer.File[], @Body() newDtoFiles: NewFileDto[], @Body() dtoMeta: CreateMetaDto[]) {
        return this.fileService.uploadFiles(files, newDtoFile, dtoMeta)
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
    updateFileById(@Body() updateFileDto: UpdateFileDto, @Body() updateMetaDto: UpdateMetaDto) {
        return this.fileService.updateFileById(updateFileDto, updateMetaDto)
    }
}

