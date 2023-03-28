import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class InsertNoteDTO {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  url: string;
}
