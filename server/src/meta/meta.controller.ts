import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {ApiOperation, ApiResponse} from "@nestjs/swagger";
import {Meta} from "./meta.entity";
import {CreateMetaDto} from "./dto/create-meta.dto";
import {MetaService} from "./meta.service";
import {UpdateMetaDto} from "./dto/update-meta.dto";

@Controller('meta')
export class MetaController {
    constructor(private metaService: MetaService) {}

    @ApiOperation({summary: 'Create Meta'})
    @ApiResponse({status: 200, type: Meta})
    @Post('/new')
    createMeta(@Body() metaDto: CreateMetaDto) {
        return this.metaService.createMeta(metaDto)
    }

    @ApiOperation({summary: 'Get Meta'})
    @ApiResponse({status: 200, type: Meta})
    @Get(':id')
    getMeta(@Param('id') id: number) {
        return this.metaService.getMeta(id)
    }

    @ApiOperation({summary: 'Remove Meta'})
    @ApiResponse({status: 200})
    @Delete('/delete/:id')
    deleteMeta(@Param('id') id: number) {
        return this.metaService.deleteMeta(id)
    }

    @ApiOperation({summary: 'Update Meta'})
    @ApiResponse({status: 200, type: Meta})
    @Put('/edit')
    updateMeta(@Body() updateDto: UpdateMetaDto) {
        return this.metaService.updateMeta(updateDto)
    }

}
