import {Body, Controller, Delete, Get, Param, Post, Put, Query} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {MenuService} from "./menu.service";
import {Link} from "./menu.entity";
import {CreateMenuDto} from "./dto/create-menu.dto";
import {UpdateMenuDto} from "./dto/update-menu.dto";

@ApiTags('Menu')
@Controller('menu')
export class MenuController {

    constructor(private menuService: MenuService) {}

    @ApiOperation({summary: 'Create link of Menu'})
    @ApiResponse({status: 200, type: Link})
    @Post('/create')
    createLink(@Body() menuDto: CreateMenuDto) {
        return this.menuService.createLinkMenu(menuDto)
    }

    @ApiOperation({summary: 'Get links by menuId'})
    @ApiResponse({status: 200, type: [Link]})
    @Get()
    getMenuById(@Param('menuId') menuId: number) {
        return this.menuService.getLinksByMenuId(menuId)
    }

    @ApiOperation({summary: 'Remove link of Menu'})
    @ApiResponse({status: 200})
    @Delete('/delete/:id')
    deleteLink(@Param('id') id: number) {
        return this.menuService.deleteLinkByNameAndMenuId(id)
    }

    @ApiOperation({summary: 'Update link of Menu'})
    @ApiResponse({status: 200, type: Link})
    @Put('/edit/:id')
    updateLink(@Body() updateDto: UpdateMenuDto) {
        return this.menuService.updateLinkMenu(updateDto)
    }
}
