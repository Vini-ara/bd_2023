import { OmitType } from '@nestjs/mapped-types';
import { UserEnity } from '../entities/user.entity';

export class CreateUserDto extends OmitType(UserEnity, ['id_usuario']) {}
