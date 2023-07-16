import {Body, Controller, Delete, Get, Post, Query} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {MenuService} from "./menu.service";
import {Menu} from "./menu.entity";
import {CreateMenuDto} from "./dto/create-menu.dto";

@ApiTags('Menu')
@Controller('menu')
export class MenuController {

    constructor(private menuService: MenuService) {}

    @ApiOperation({summary: 'Create link of Menu'})
    @ApiResponse({status: 200, type: Menu})
    @Post()
    createLink(@Body() menuDto: CreateMenuDto) {
        return this.menuService.createLinkMenu(menuDto)
    }

    @ApiOperation({summary: 'Get links by menuId'})
    @ApiResponse({status: 200, type: [Menu]})
    @Get()
    getMenuById(@Query('menuId') menuId: number) {
        return this.menuService.getLinksByMenuId(menuId)
    }

    @ApiOperation({summary: 'Remove link of Menu'})
    @ApiResponse({status: 200})
    @Delete()
    deleteLink(@Query('nameLink') nameLink: string, @Query('menuId') menuId: number) {
        return this.menuService.deleteLinkByNameAndMenuId(nameLink, menuId)
    }
}
