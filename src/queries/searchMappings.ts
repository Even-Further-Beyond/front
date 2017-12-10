import gql from 'graphql-tag';

const QUERY_SEARCH_MAPPINGS = gql`
  query searchMappings($excludeCategories: Boolean) {
    characterTraits {
      colors {
        id
        name
      }
      genders {
        id
        description
      }
      hairLengths {
        id
        description
      }
      ageGroups {
        id
        name
      }
    }
    tags(excludeCategories: $excludeCategories) {
      id
      name
      description
    }
  }
`;

export default QUERY_SEARCH_MAPPINGS;
