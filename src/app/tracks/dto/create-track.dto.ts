import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateTrackDto {
  @IsNotEmpty()
  readonly name: string;
  readonly artistId: string | null; // refers to Artist
  readonly albumId: string | null; // refers to Album
  @IsNotEmpty()
  @IsInt()
  readonly duration: number; // integer number
}
