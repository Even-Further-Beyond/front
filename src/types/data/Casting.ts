import Anime from './Anime';
import Person from './Person';
import Language from './Language';

interface Casting {
  anime: Anime;
  person: Person;
  language: Language;
  role?: string;
  isVoiceActor: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export default Casting;
