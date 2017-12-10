import { Image } from './Image';
import Gender from './Gender';
import HairLength from './HairLength';
import Color from './Color';
import AgeGroup from './AgeGroup';
import Tag from './Tag';
import Anime from './Anime';

interface Character {
  id: number;
  malId?: number;
  name: string;
  alternativeNames?: string[];
  ageStart?: number;
  ageEnd?: number;
  heightStart?: number;
  heightEnd?: number;
  weightStart?: number;
  weightEnd?: number;
  gender?: Gender;
  hairLength?: HairLength;
  eyeColors?: Color[];
  hairColors?: Color[];
  ageGroups?: AgeGroup[];
  anime: Anime[];
  tags?: Tag[];
  images?: Image[];
  createdAt?: string;
  updatedAt?: string;
}

export default Character;
