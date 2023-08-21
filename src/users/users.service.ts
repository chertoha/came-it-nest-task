import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Profile } from 'src/profiles/profiles.model';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    @InjectModel(Profile) private profileModel: typeof Profile,
    private sequelize: Sequelize,
  ) {}

  async createUser(dto: CreateUserDto) {
    // const user = await this.userModel.create(dto);
    // return user;

    try {
      const result = await this.sequelize.transaction(async (t) => {
        const profile = await this.profileModel.create(dto, { transaction: t });

        const user = await this.userModel.create(
          { profileId: profile.id, ...dto },
          { transaction: t },
        );
        return user;
      });

      return result;
      // If the execution reaches this line, the transaction has been committed successfully
      // `result` is whatever was returned from the transaction callback (the `user`, in this case)
    } catch (error) {
      console.log(error);
      // If the execution reaches this line, an error occurred.
      // The transaction has already been rolled back automatically by Sequelize!
    }
  }

  async getAllUsers() {
    const users = await this.userModel.findAll({ include: [Profile] });
    return users;
  }
}
