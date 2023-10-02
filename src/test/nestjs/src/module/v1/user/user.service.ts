import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  async getUser() {
    const user = {
      id: 1,
      name: 'John Doe',
    };

    return {
      success: true,
      data: user,
      message: 'Success',
    };
  }
}
