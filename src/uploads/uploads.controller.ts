import { Controller, Get, Param, Res, StreamableFile } from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';

@Controller('uploads')
export class UploadsController {
    @Get(':folder/:file')
    getFile(@Param('folder') folder: string, @Param('file') file:string) {
        try {
            const resFile = createReadStream(join(process.cwd(),"uploads",folder,file));
        return new StreamableFile(resFile);
        } catch (error) {
            
        }
    }
}
