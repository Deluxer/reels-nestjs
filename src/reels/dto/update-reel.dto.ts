import { PartialType } from '@nestjs/mapped-types';
import { CreateReelDto } from './create-reel.dto';

export class UpdateReelDto extends PartialType(CreateReelDto) {}
