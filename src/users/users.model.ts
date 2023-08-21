import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { Profile } from 'src/profiles/profiles.model';

interface IUserCreationAttrs {
  username: string;
  email: string;
  profileId?: number;
}

@Table({ tableName: 'users' })
export class User extends Model<User, IUserCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Unique value' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'chertoha_13', description: 'User short name' })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  username: string;

  @ApiProperty({ example: 'email@mail.com', description: 'E-mail' })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @ApiProperty({ example: 'afmin', description: 'User role' })
  @Column({
    type: DataType.STRING,
    defaultValue: 'guest',
  })
  role: string;

  @BelongsTo(() => Profile, { foreignKey: 'profileId' })
  profile: Profile;
}
