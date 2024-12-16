import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService, ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule, // Add ConfigModule here
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DATABASE_URL'), // Use the DATABASE_URL from the env file
      }),
      inject: [ConfigService], // Inject ConfigService into the factory
    }),
  ],
})
export class DatabaseModule {}
