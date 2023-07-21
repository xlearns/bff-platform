import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { join } from 'node:path';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

//mysql
import { TypeOrmModule } from '@nestjs/typeorm';

//graphql
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ResolverModule } from './resolver/resolver.module';

@Module({
  imports: [
    ResolverModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async (config: ConfigService) => {
        return {
          type: 'mysql',
          host: config.get('MYSQL_URL'),
          port: config.get('MYSQL_PORT'),
          username: config.get('MYSQL_USER'),
          password: config.get('MYSQL_PASSWD'),
          database: config.get('MYSQL_DB'),
          entities: ['dist/src/entities/*.ts'],
          synchronize: config.get('MYSQL_ISSync'),
          autoLoadEntities: true,
        };
      },
      inject: [ConfigService],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      // autoSchemaFile: join(process.cwd(), 'src/schema/schema.gql') sets the path for generating the Schema file. Whenever we add or remove a Resolver, NestJS will automatically update the Schema file.
      autoSchemaFile: join(process.cwd(), 'src/schema/schema.gql'),
      sortSchema: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
