import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
    @Field()
    username: string;

    @Field()
    firstName: string;

    @Field()
    lastName: string;
}