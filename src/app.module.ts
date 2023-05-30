import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { join } from 'node:path';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { StatusResolver } from './resolver/status.resolver';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema/schema.gql'),
      sortSchema: true,
    }),
  ],
  controllers: [AppController],
  providers: [StatusResolver, AppService],
})
export class AppModule {}
