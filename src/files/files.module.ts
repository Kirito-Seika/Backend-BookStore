import { Module } from '@nestjs/common';
import { FilesService } from 'src/files/files.service';
import { FilesController } from 'src/files/files.controller';

@Module({
  controllers: [FilesController],
  providers: [FilesService],
})
export class FilesModule {}
