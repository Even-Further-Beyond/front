import { connect } from 'react-redux';
import { graphql } from 'react-apollo';

import QUERY_CHARACTER_BY_ID from '../queries/characterById';
import { Response, InputProps } from '../types/response/Character';
import Character from '../components/Character';

const withCharacter = graphql<Response, InputProps>(QUERY_CHARACTER_BY_ID, {
  options: (ownProps) => ({ variables: { id: (ownProps.match.params.id).toString() } }),
})(Character);

export default connect(null, null)(withCharacter);
