import {Injectable} from '@nestjs/common';
import {UpdateMetaDto} from "../meta/dto/update-meta.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {CreateMetaDto} from "../meta/dto/create-meta.dto";
import {Repository} from "typeorm";
import {File} from "./file.entity";
import {CreateFileDto} from "./dto/create-file.dto";
import {MetaService} from "../meta/meta.service";
import {UpdateFileDto} from "./dto/update-file.dto";
import * as sharp from 'sharp';
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid'
import {Meta} from "../meta/meta.entity";
import {NewFileDto} from "./dto/new-file.dto";

@Injectable()
export class FileService {
    constructor(@InjectRepository(File) private fileRepository: Repository<File>,
                private metaService: MetaService) {
    }

    async uploadFiles(files: Express.Multer.File[], newDtoFiles: NewFileDto[], dtoMetas: CreateMetaDto[]): Promise<File[]> {
        const createdFiles: File[] = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const newDtoFile = newDtoFiles[i];
            const dtoMeta = dtoMetas[i];

            try {
                const newFileName = `original-${Date.now()}-${uuid.v4()}.${file.originalname}`;

                // Saving the original file
                const originalFilePath = path.join(__dirname, '..', 'uploads', newFileName);
                const relativeOriginalPath = '/uploads/' + newFileName;
                await fs.promises.writeFile(originalFilePath, file.buffer);

                // Creating and saving src
                const srcBuffer = await sharp(file.buffer)
                    .resize({
                        width: 300,
                        height: 250,
                        fit: sharp.fit.inside,
                        withoutEnlargement: true
                    })
                    .jpeg({ quality: 80 })
                    .toBuffer();

                const srcFileName = `src-${newFileName}`;
                const srcFilePath = path.join(__dirname, '..', 'uploads', srcFileName);
                const relativeSrcPath = '/uploads/' + srcFileName;
                await fs.promises.writeFile(srcFilePath, srcBuffer);

                // Creating and saving thumbnail
                const thumbnailBuffer = await sharp(file.buffer)
                    .resize({
                        width: 100,
                        height: 100,
                        fit: sharp.fit.inside,
                        withoutEnlargement: true
                    })
                    .jpeg({ quality: 80 })
                    .toBuffer();

                const thumbnailFileName = `thumbnail-${newFileName}`;
                const thumbnailFilePath = path.join(__dirname, '..', 'uploads', thumbnailFileName);
                const relativeThumbnailPath = '/uploads/' + thumbnailFileName;
                await fs.promises.writeFile(thumbnailFilePath, thumbnailBuffer);

                // Creating and saving previews
                const previewBuffer = await sharp(file.buffer)
                    .resize({
                        width: 1000,
                        height: 1000,
                        fit: sharp.fit.inside,
                        withoutEnlargement: true
                    })
                    .jpeg({ quality: 80 })
                    .toBuffer();

                const previewFileName = `preview-${newFileName}`;
                const previewFilePath = path.join(__dirname, '..', 'uploads', previewFileName);
                const relativePreviewPath = '/uploads/' + previewFileName;
                await fs.promises.writeFile(previewFilePath, previewBuffer);

                // Saving file information to a database
                const newCreateFileDto = new CreateFileDto({
                    title: newDtoFile.title,
                    titleLong: newDtoFile.titleLong,
                    alt: newDtoFile.alt,
                    description: newDtoFile.description,
                    original: relativeOriginalPath,
                    preview: relativePreviewPath,
                    src: relativeSrcPath,
                    thumbnail: relativeThumbnailPath
                });

                const createFile = this.fileRepository.create(newCreateFileDto);
                const metaFile = await this.metaService.createMeta(dtoMeta);
                createFile.meta = metaFile;
                const savedFile = await this.fileRepository.save(createFile);
                createdFiles.push(savedFile);
            } catch (error) {
                console.error('Error during file upload:', error);
            }
        }
        return createdFiles;
    }



    async getFileById(id: number): Promise<File> {
        return await this.fileRepository.findOne({where: {id}, relations: ['meta']});
    }

    async deleteFileById(id: number) {
        return await this.fileRepository.delete({id})
    }

    async updateFileById(updateFileDto: UpdateFileDto, updateMetaDto: UpdateMetaDto): Promise<File> {
        const existingFile = await this.fileRepository.findOne({where: {id: updateFileDto.id}, relations: ['meta']});
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
