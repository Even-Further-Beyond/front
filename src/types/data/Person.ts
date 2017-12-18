interface Image {
  personId?: string;
  imagePath: string;
  createdAt?: Date;
}

interface Person {
  id: number;
  malId: number;
  slug: string;
  name: string;
  images: Image[];
  createdAt?: Date;
  updatedAt?: Date;
}

export default Person;
