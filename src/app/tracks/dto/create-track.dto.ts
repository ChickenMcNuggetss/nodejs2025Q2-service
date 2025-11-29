import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateTrackDto {
  readonly id: string;

  @IsNotEmpty()
  readonly name: string;

  readonly artistId: string | null; // refers to Artist
  readonly albumId: string | null; // refers to Album
  @IsNotEmpty()
  readonly duration: number; // integer number
}
