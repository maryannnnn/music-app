import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Link} from "./menu.entity";
import {CreateMenuDto} from "./dto/create-menu.dto";
import {UpdateMenuDto} from "./dto/update-menu.dto";

@Injectable()
export class MenuService {

    constructor(@InjectRepository(Link) private menuRepository: Repository<Link>) {}

    async createLinkMenu(createDto: CreateMenuDto): Promise<Link> {
        const linkMenu = this.menuRepository.create(createDto);
        return await this.menuRepository.save(linkMenu);
    }

    async getLinksByMenuId(menuId: number): Promise<Link[]> {
        console.log("getLinksByMenuId Nest: ", menuId)
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
        existingLinkMenu.menuId = updateDto.menuId;
        existingLinkMenu.updatedAt = new Date();
        return await this.menuRepository.save(existingLinkMenu);
    }

}
