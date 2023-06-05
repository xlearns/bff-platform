import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { join } from 'node:path';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

//mysql
import { TypeOrmModule } from '@nestjs/typeorm';

//graphql
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { StatusResolver } from './resolver/status.resolver';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: '',
    //   port: 3306,
    //   username: 'root',
    //   password: '123456',
    //   database: 'test',
    //   entities: [__dirname + '/**/*.entity{.ts,.js}'],
    //   synchronize: true,
    // }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      // autoSchemaFile: join(process.cwd(), 'src/schema/schema.gql') sets the path for generating the Schema file. Whenever we add or remove a Resolver, NestJS will automatically update the Schema file.
      autoSchemaFile: join(process.cwd(), 'src/schema/schema.gql'),
      sortSchema: true,
    }),
  ],
  controllers: [AppController],
  providers: [StatusResolver, AppService],
})
export class AppModule {}
