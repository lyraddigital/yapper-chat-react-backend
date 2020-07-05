import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
    @Field()
    username: string;

    @Field()
    firstName: string;

    @Field()
    lastName: string;
}