import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreateUserInput, User } from './models';

import { UserService } from './user.service';

@Resolver(_ => User)
export class UserResolver {
    constructor(private readonly userService: UserService) {}

    @Query(_ => [User!]!)
    async users(): Promise<Array<User>> {
        return await this.userService.getAllUsers();
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