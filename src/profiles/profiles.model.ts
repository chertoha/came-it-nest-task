import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/users/users.model';

@Table({ tableName: 'profiles' })
export class Profile extends Model<Profile> {
  @ApiProperty({ example: '1', description: 'Unique value' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Anton', description: 'User first name' })
  @Column({
    type: DataType.STRING,
  })
  firstName: string;

  @ApiProperty({ example: 'Chertok', description: 'User last name' })
  @Column({
    type: DataType.STRING,
  })
  lastName: string;

  @ApiProperty({ example: 'male', description: 'User state' })
  @Column({
    type: DataType.ENUM,
    values: ['male', 'female', 'other'],
    allowNull: true,
  })
  state: string;

  // @BelongsTo(() => User, { foreignKey: 'userId' })
  // user: User;

  @HasOne(() => User, { foreignKey: 'profileId' })
  user: User;
}
