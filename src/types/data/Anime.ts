interface Image {
  animeId?: string;
  imagePath: string;
  createdAt?: Date;
}

interface Anime {
  id: number;
  malId?: number;
  mainTitle: string;
  images: Image[];
  createdAt?: Date;
  updatedAt?: Date;
}

export default Anime;
