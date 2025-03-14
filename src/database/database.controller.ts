import { Controller } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Controller('database')
export class DatabaseController {
  constructor(private readonly databaseService: DatabaseService) {}
}
