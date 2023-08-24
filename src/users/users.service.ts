import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Profile } from 'src/profiles/profiles.model';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';
import { Sequelize } from 'sequelize-typescript';
import { GetUserByRoleDto } from './dto/get-user-by-role';
import { Op, Transaction } from 'sequelize';
import { CommonException } from 'src/exceptions/common.exception';
import { UpdateUserDto } from './dto/update-user-dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    @InjectModel(Profile) private profileModel: typeof Profile,
    private sequelize: Sequelize,
  ) {}

  async createUser(dto: CreateUserDto) {
    const [user, created] = await this.userModel.findOrCreate({
      where: {
        [Op.or]: [{ username: dto.username }, { email: dto.email }],
      },
      defaults: {
        ...dto,
        profile: { ...dto },
      },
      include: [Profile],
      attributes: { exclude: ['profileId', 'createdAt', 'updatedAt'] },
    });

    if (!created) {
      throw new ConflictException('User is already exist');
    }

    return user;
  }

  async getAllUsers(query?: GetUserByRoleDto) {
    const conditions = query && query.role ? { role: query.role } : {};

    const users = await this.userModel.findAll({
      include: [
        {
          model: Profile,
          attributes: { exclude: ['createdAt', 'updatedAt'] },
        },
      ],
      where: conditions,
      order: ['id'],
      attributes: { exclude: ['profileId', 'createdAt', 'updatedAt'] },
    });
    return users;
  }

  async updateUser(id: number, dto: UpdateUserDto) {
    try {
      const result = await this.sequelize.transaction(async (t) => {
        const user = await this.userModel.findByPk(id, {
          include: [Profile],
          transaction: t,
        });

        if (!user) {
          throw new NotFoundException('User not found');
        }

        // Check for username and email
        // let existingUser: User | null = null;
        const existingUser = await this.checkIsUserExistedByUsernameAndEmail(
          id,
          dto,
          t,
        );

        if (existingUser) {
          throw new ConflictException('Username or email already exists');
        }
        // Check for username and email
        // const whereConditions = [];
        // if (dto.username) {
        //   whereConditions.push({ username: dto.username });
        // }

        // if (dto.email) {
        //   whereConditions.push({ email: dto.email });
        // }

        // const existingUser = this.userModel.findOne({
        //   where: {
        //     [Op.or]: whereConditions,
        //   },
        //   transaction: t,
        // });

        // if (existingUser && existingUser.id !== id) {
        //   console.log('!!!!!!!!!!!!!!');
        //   throw new ConflictException('Username or email are already existed');
        // }

        await user.profile.update({ ...dto }, { transaction: t });
        const updatedUser = await user.update({ ...dto }, { transaction: t });

        return updatedUser.get();
      });
      return result;
    } catch (error) {
      throw new CommonException(error.message, error.status);
    }
  }

  async removeUser(id: number) {
    try {
      const result = await this.sequelize.transaction(async (t) => {
        const user = await this.userModel.findByPk(id, {
          include: [Profile],
          transaction: t,
        });

        if (!user) {
          throw new NotFoundException('User not found');
        }

        const deletedUser = user.get();

        await user.profile.destroy({ transaction: t });
        await user.destroy({ transaction: t });

        return deletedUser;
      });
      return result;
    } catch (error) {
      throw new CommonException(error.message, error.status);
    }
  }

  private async checkIsUserExistedByUsernameAndEmail(
    updatingUserId: number,
    dto: UpdateUserDto,
    transaction?: Transaction,
  ): Promise<User | null> {
    let existingUser: User | null = null;

    const whereConditions = [];
    if (dto.username) {
      whereConditions.push({ username: dto.username });
    }

    if (dto.email) {
      whereConditions.push({ email: dto.email });
    }

    if (whereConditions.length > 0) {
      existingUser = await this.userModel.findOne({
        where: {
          [Op.and]: [
            { id: { [Op.not]: updatingUserId } },
            { [Op.or]: whereConditions },
          ],
        },
        transaction,
      });
    }

    return existingUser;
  }
}
