import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Profile } from 'src/profiles/profiles.model';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';
import { Sequelize } from 'sequelize-typescript';
import { GetUserByRoleDto } from './dto/get-user-by-role';
import { UpdateUserDto } from './dto/update-user-dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    @InjectModel(Profile) private profileModel: typeof Profile,
    private sequelize: Sequelize,
  ) {}

  async createUser(dto: CreateUserDto) {
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
    } catch (error) {
      console.log(error);
    }
  }

  async getAllUsers(query?: GetUserByRoleDto) {
    const conditions = query && query.role ? { role: query.role } : {};

    const users = await this.userModel.findAll({
      include: [Profile],
      where: conditions,
    });
    return users;
  }

  async updateUser(id: string, dto: UpdateUserDto) {
    try {
      const result = await this.sequelize.transaction(async (t) => {
        const user = await this.userModel.findByPk(id, {
          include: [Profile],
          transaction: t,
        });

        if (!user) {
          console.log('error user not found!');
        }

        await user.profile.update({ ...dto }, { transaction: t });
        const updatedUser = await user.update({ ...dto }, { transaction: t });

        return updatedUser.get();
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async removeUser(id: string) {
    try {
      const result = await this.sequelize.transaction(async (t) => {
        const user = await this.userModel.findByPk(id, {
          include: [Profile],
          transaction: t,
        });

        const deletedUser = user.get();

        if (!user) {
          console.log('error user not found!');
        }

        await user.profile.destroy({ transaction: t });
        await user.destroy({ transaction: t });

        return deletedUser;
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  }
}
