import Gender from './Gender';
import HairLength from './HairLength';
import Color from './Color';
import AgeGroup from './AgeGroup';
import Tag from './Tag';
import Anime from './Anime';
import Casting from './Casting';

interface Image {
  characterId?: string;
  imagePath: string;
  createdAt?: Date;
}

interface Character {
  id: number;
  malId?: number;
  name: string;
  description?: string;
  alternativeNames?: string[];
  japaneseName?: string;
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
  animeAndRoles: {
    anime: Anime[];
    role: string;
  };
  catings?: Casting[];
  tags?: Tag[];
  image?: Image;
  images?: Image[];
  createdAt?: Date;
  updatedAt?: Date;
}

export default Character;
