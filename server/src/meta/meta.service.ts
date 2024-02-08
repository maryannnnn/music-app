import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Meta} from "./meta.entity";
import {CreateMetaDto} from "./dto/create-meta.dto";
import {UpdateMetaDto} from "./dto/update-meta.dto";

@Injectable()
export class MetaService {
    constructor(@InjectRepository(Meta) private metaRepository: Repository<Meta>) {}

    async createMeta(dto: CreateMetaDto): Promise<Meta> {
        const meta = this.metaRepository.create(dto);
        return await this.metaRepository.save(meta);
    }

    async getMeta(id: number): Promise<Meta> {
        return await this.metaRepository.findOne({ where: { id } });
    }

    async deleteMeta(id: number) {
        return await this.metaRepository.delete({ id })
    }

    async updateMeta(updateDto: UpdateMetaDto): Promise<Meta> {
        const existingMeta = await this.metaRepository.findOne({ where: { id: updateDto.id } });
        if (!existingMeta) {
            return null;
        }
        existingMeta.titleMeta = updateDto.titleMeta;
        existingMeta.descriptionMeta = updateDto.descriptionMeta;
        existingMeta.keywordsMeta = updateDto.keywordsMeta;
        existingMeta.updatedAt = new Date();
        return await this.metaRepository.save(existingMeta);
    }
}
