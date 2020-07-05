import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { UsersModule } from './users';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: 'src/schema.gql',
    }),
    UsersModule
  ]
})
export class AppModule {}
