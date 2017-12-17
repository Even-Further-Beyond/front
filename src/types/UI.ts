import SearchForm from './SearchForm';

interface UI {
  isSearchFormHidden: boolean;
  submittedSearchForm: SearchForm;
  searchResults: {
    offset?: number;
    limit?: number;
    totalCount?: number;
  };
  searchResultsViewType: string;
}

export default UI;
