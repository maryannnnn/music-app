import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Menu} from "./menu.entity";
import {CreateMenuDto} from "./dto/create-menu.dto";

@Injectable()
export class MenuService {

    constructor(@InjectRepository(Menu) private menuRepository: Repository<Menu>) {}

    async createLinkMenu(dto: CreateMenuDto) {
        const menu = this.menuRepository.create(dto);
        return await this.menuRepository.save(menu);
    }

    async getLinksByMenuId(menuId: number): Promise<Menu[] | undefined> {
        return await this.menuRepository.find({ where: { menuId }})
    }

    async deleteLinkByNameAndMenuId(nameLink: string, menuId: number) {
        return await this.menuRepository.delete({ nameLink, menuId })
    }

}
