interface Image {
  animeId?: string;
  imagePath: string;
  createdAt?: Date;
}

interface Anime {
  id: number;
  malId?: number;
  mainTitle: string;
  image?: Image;
  images?: Image[];
  createdAt?: Date;
  updatedAt?: Date;
}

export default Anime;
