import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class DatabaseService {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  getConnectionStatus(): string {
    if (this.connection.readyState === 1) {
      return 'Database connection is healthy';
    }
    return 'Database connection is not healthy';
  }
}
