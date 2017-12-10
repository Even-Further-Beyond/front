import { connect } from 'react-redux';
import { graphql } from 'react-apollo';

import QUERY_CHARACTERS_WITH_COUNT from '../queries/charactersAndResultCount';
import { Response, InputProps } from '../types/response/SearchResults';
import SearchResults from '../components/Search/results';
import RootState from '../types/RootState';

const mapStateToProps = (state: RootState) => ({
  currentTotalCount: state.ui.searchResults.totalCount,
});

const SearchWithFilters = graphql<Response, InputProps>(QUERY_CHARACTERS_WITH_COUNT, {
  options:
    ({
      characterName,
      animeName,
      personName,
      hairColorId,
      eyeColorId,
      genderId,
      hairLengthId,
      ageGroupId,
      tagIds,
      offset,
      limit,
    }) => ({
      variables: {
        characterName,
        animeName,
        personName,
        hairColorId,
        eyeColorId,
        genderId,
        hairLengthId,
        ageGroupId,
        tagIds,
        offset,
        limit,
    }}),
})(SearchResults);

export default connect(mapStateToProps, null)(SearchWithFilters);
