import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { UserModule } from './users';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: 'src/schema.gql',
    }),
    UserModule
  ]
})
export class AppModule {}
