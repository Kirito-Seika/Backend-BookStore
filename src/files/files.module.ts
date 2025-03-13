import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { FilesService } from 'src/files/files.service';
import { FilesController } from 'src/files/files.controller';
import { MulterConfigService } from 'src/files/config/multer.config';

@Module({
  imports: [
    MulterModule.registerAsync({
      useClass: MulterConfigService,
    }),
  ],
  controllers: [FilesController],
  providers: [FilesService],
})
export class FilesModule {}
