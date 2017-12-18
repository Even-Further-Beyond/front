interface Tag {
  id: string;
  name: string;
  description?: string;
  isCategory?: boolean;
  parentId?: number;
  slug?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export default Tag;
