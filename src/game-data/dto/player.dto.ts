import { ItemDto } from './item.dto';

export class PlayerDto {
  championName: string;
  isBot: boolean;
  isDead: boolean;
  items: ItemDto[];
  level: number;
  position: string;
  summonerName: string;
  team: string;
}
