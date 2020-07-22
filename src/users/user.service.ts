import { Injectable } from '@nestjs/common';

import { prismaClient } from '../shared';
import { User } from './models';

@Injectable()
export class UserService {
  async getAllUsers(): Promise<Array<User>> {
    return await prismaClient.user.findMany(undefined);
  }
}