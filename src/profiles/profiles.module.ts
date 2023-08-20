import { Module } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfilesController } from './profiles.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Profile } from './profiles.model';

@Module({
  providers: [ProfilesService],
  controllers: [ProfilesController],
  imports: [SequelizeModule.forFeature([Profile])],
})
export class ProfilesModule {}
