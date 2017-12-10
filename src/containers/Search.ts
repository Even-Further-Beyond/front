import { connect } from 'react-redux';
import { graphql } from 'react-apollo';

import QUERY_SEARCH_MAPPINGS from '../queries/searchMappings';
import RootState from '../types/RootState';
import { Response, InputProps } from '../types/response/Search';
import Search from '../components/Search';
import { actions } from '../reducers/ui';

const mapStateToProps = (state: RootState) => ({
  inputTagIds: state.search.tagIds,
  submittedSearchForm: state.ui.submittedSearchForm,
  hidden: state.ui.isSearchFormHidden,
  offset: state.ui.searchResults.offset,
  limit: state.ui.searchResults.limit,
  totalCount: state.ui.searchResults.totalCount,
});

const mapDispatchToProps = (dispatch: InputProps['dispatch']) => {
  return {
    dispatch,
    saveSubmittedSearchForm(searchForm) {
      dispatch(actions.saveSubmittedSearchForm(searchForm));
    },
    toggleSearchForm() {
      dispatch(actions.toggleSearchForm());
    },
    setSearchResultsPage(offset?: number, limit?: number, totalCount?: number) {
      dispatch(actions.setSearchResultsPage(offset, limit, totalCount));
    },
  };
};

const Mappings = graphql<Response, InputProps>(QUERY_SEARCH_MAPPINGS, {
  options: {
    variables: {
      excludeCategories: true,
    },
  },
})(Search);

export default connect(mapStateToProps, mapDispatchToProps)(Mappings);
