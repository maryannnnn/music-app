import { Injectable } from '@nestjs/common';
import {UpdateMetaDto} from "../meta/dto/update-meta.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {CreateMetaDto} from "../meta/dto/create-meta.dto";
import {Repository} from "typeorm";
import {File} from "./file.entity";
import {CreateFileDto} from "./dto/create-file.dto";
import {MetaService} from "../meta/meta.service";
import {UpdateFileDto} from "./dto/update-file.dto";
import {UpdateMenuDto} from "../menu/dto/update-menu.dto";
import {Meta} from "../meta/meta.entity";

@Injectable()
export class FileService {
    constructor(@InjectRepository(File) private fileRepository: Repository<File>,
                private metaService: MetaService) {}

    async createFile(dtoFile: CreateFileDto, dtoMeta: CreateMetaDto): Promise<File> {
        const file = this.fileRepository.create(dtoFile);
        const metaFile = await this.metaService.createMeta(dtoMeta);
        file.meta = metaFile;
        return await this.fileRepository.save(file);
    }

    async getFileById(id: number): Promise<File> {
        return await this.fileRepository.findOne({ where: { id }, relations: ['meta'] });
    }

    async deleteFileById(id: number) {
        return await this.fileRepository.delete( { id } )
    }

    async updateFileById(updateFileDto: UpdateFileDto, updateMetaDto: UpdateMetaDto): Promise<File> {
        const existingFile = await this.fileRepository.findOne({ where: {id: updateFileDto.id}, relations: ['meta'] });
        if (!existingFile) {
            return null;
        }

        const updatedMeta = await this.metaService.updateMeta(updateMetaDto);

        existingFile.title = updateFileDto.title;
        existingFile.titleLong = updateFileDto.titleLong;
        existingFile.alt = updateFileDto.alt;
        existingFile.description = updateFileDto.description;
        existingFile.updatedAt = new Date();

        existingFile.meta = updatedMeta;

        return await this.fileRepository.save(existingFile);
    }


}
