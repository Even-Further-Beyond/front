import Character from '../data/Character';

interface CharactersAndResultCount {
  count: number;
  characters: Character[];
}

export interface Response {
  charactersAndResultCount: CharactersAndResultCount;
}

export interface InputProps {
  characterName: string;
  animeName: string;
  personName: string;
  hairColorId: string;
  eyeColorId: string;
  genderId: string;
  hairLengthId: string;
  ageGroupId: string;
  tagIds: string[];
  offset: number;
  limit: number;
  currentTotalCount?: number;
  setSearchResultsPage: (offset?: number, limit?: number, totalCount?: number) => {};
}
