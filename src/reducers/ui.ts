const constants = {
  TOGGLE_SEARCH_FORM: 'TOGGLE_SEARCH_FORM',
  SAVE_SEARCH_FORM_SUBMIT: 'SAVE_SEARCH_FORM_SUBMIT',
  SET_SEARCH_RESULTS_PAGE: 'SET_SEARCH_RESULTS_PAGE',
  SET_SEARCH_RESULTS_VIEW_TYPE: 'SET_SEARCH_RESULTS_VIEW_TYPE',
};

export const VIEW_TYPES = {
  GRID: 'GRID',
  TABLE: 'TABLE',
};

const initialState = {
  isSearchFormHidden: false,
  submittedSearchForm: {},
  searchResults: {
    offset: null,
    limit: null,
    totalCount: null,
  },
  searchResultsViewType: VIEW_TYPES.GRID,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case constants.TOGGLE_SEARCH_FORM:
      return {
        ...state,
        isSearchFormHidden: !state.isSearchFormHidden,
      };
    case constants.SAVE_SEARCH_FORM_SUBMIT:
      return {
        ...state,
        submittedSearchForm: action.searchForm,
      };
    case constants.SET_SEARCH_RESULTS_PAGE:
      let offset = action.offset;

      if (offset === null) {
        offset = state.searchResults.offset;
      }

      return {
        ...state,
        searchResults: {
          offset,
          limit: action.limit || state.searchResults.limit,
          totalCount: action.totalCount || state.searchResults.totalCount,
        },
      };
    case constants.SET_SEARCH_RESULTS_VIEW_TYPE:
      return {
        ...state,
        searchResultsViewType: action.viewType,
      };

    default:
      return state;
  }
};

const toggleSearchForm = () => {
  return {
    type: constants.TOGGLE_SEARCH_FORM,
  };
};

const saveSubmittedSearchForm = (searchForm) => {
  return {
    type: constants.SAVE_SEARCH_FORM_SUBMIT,
    searchForm,
  };
};

const setSearchResultsPage = (offset: number, limit: number, totalCount: number) => {
  return {
    type: constants.SET_SEARCH_RESULTS_PAGE,
    offset,
    limit,
    totalCount,
  };
};

const setSearchResultsViewType = (viewType: string) => {
  return {
    type: constants.SET_SEARCH_RESULTS_VIEW_TYPE,
    viewType,
  };
};

export const actions = {
  saveSubmittedSearchForm,
  toggleSearchForm,
  setSearchResultsPage,
  setSearchResultsViewType,
};
