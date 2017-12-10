import { Dispatch } from 'redux';

import RootState from '../RootState';
import Tag from '../data/Tag';
import CharacterTraits from '../data/CharacterTraits';
import SearchForm from '../SearchForm';

export interface Response {
  characterTraits: CharacterTraits;
  tags: Tag[];
}

export interface InputProps {
  dispatch: Dispatch<RootState>;
  toggleSearchForm: () => {};
  saveSubmittedSearchForm: (searchForm: SearchForm) => {};
  setSearchResultsPage: (offset?: number, limit?: number, totalCount?: number) => {};
  inputTagIds: string[];
  submittedSearchForm: SearchForm;
  hidden: boolean;
  offset: number;
  limit: number;
  totalCount: number;
}
