import Character from '../data/Character';

export interface Response {
  characterById: Character;
}

export interface InputProps {
  match: { params: { id: number } };
}
