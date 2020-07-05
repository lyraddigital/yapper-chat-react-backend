import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreateUserInput, User } from './models';

@Resolver(of => User)
export class UsersResolver {
//   constructor(
//     private authorsService: UsersService
//   ) {}

    @Query(_ => [User!]!)
    users(): Array<User> {
        return [];
    }

    @Mutation(_ => User)
    addNewUser(@Args('createUserInput') createUserInput: CreateUserInput): User {
        const newUser = new User();
        newUser.username = createUserInput.username;
        newUser.firstName = createUserInput.firstName;
        newUser.lastName = createUserInput.lastName;

        return newUser;
    }
}