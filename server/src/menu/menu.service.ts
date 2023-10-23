import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Link} from "./menu.entity";
import {CreateMenuDto} from "./dto/create-menu.dto";
import {UpdateMenuDto} from "./dto/update-menu.dto";
import {link} from "fs";

@Injectable()
export class MenuService {

    constructor(@InjectRepository(Link) private menuRepository: Repository<Link>) {}

    async createLinkMenu(createDto: CreateMenuDto): Promise<Link> {
        const linkMenu = this.menuRepository.create(createDto);
        return await this.menuRepository.save(linkMenu);
    }

    async getLinksByMenuId(menuId: number): Promise<Link[]> {
        return await this.menuRepository.find( {where: { menuId }})
    }

    async deleteLinkByNameAndMenuId(id: number) {
        return await this.menuRepository.delete({ id })
    }

    async updateLinkMenu(updateDto: UpdateMenuDto): Promise<Link> {
        const existingLinkMenu = await this.menuRepository.findOneById(updateDto.id);
        existingLinkMenu.nameLink = updateDto.nameLink;
        existingLinkMenu.urlLink = updateDto.urlLink;
        existingLinkMenu.orderLink = updateDto.orderLink;
        existingLinkMenu.parentId = updateDto.parentId;
        existingLinkMenu.isVisible = updateDto.isVisible;
        existingLinkMenu.menuId = updateDto.menuId;
        existingLinkMenu.updatedAt = new Date();
        return await this.menuRepository.save(existingLinkMenu);
    }

    async updateMenu(updateMenu: UpdateMenuDto[]): Promise<Link[]> {
        console.log("updateMenu ", updateMenu)
        const existingMenu = await this.menuRepository.find( {where: { menuId: updateMenu[0].menuId }})
        console.log("existingMenu ", existingMenu)
        existingMenu.forEach((link, index) => {
            console.log("link ", link)
            console.log("updateMenu[index] ", updateMenu[index])

                    link.nameLink = updateMenu[index].nameLink;
            console.log("link.nameLink ", link.nameLink)
                    link.urlLink = updateMenu[index].urlLink;
            console.log("link.urlLink ", link.urlLink)
                    link.orderLink = updateMenu[index].orderLink;
            console.log("link.orderLink ", link.orderLink)
                    link.parentId = updateMenu[index].parentId;
            console.log("link.parentId ", link.parentId)
                    link.isVisible = updateMenu[index].isVisible;
            console.log("link.isVisible ", link.isVisible)
                    link.menuId = updateMenu[index].menuId;
            console.log("link.menuId ", link.menuId)
                    link.updatedAt = new Date();
            console.log("link.updatedAt ", link.updatedAt)
            });

        return await this.menuRepository.save(existingMenu);
    }

}
