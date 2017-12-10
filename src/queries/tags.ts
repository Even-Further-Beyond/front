import gql from 'graphql-tag';

export const QUERY_TAGS_EXCLUDE_CATEGORIES = gql`
  query tags($excludeCategories: Boolean) {
    tags(excludeCategories: $excludeCategories) {
      id
      name
      description
    }
  }
`;

export const QUERY_TAGS = gql`
  query tagsQuery {
    tags {
      id
      name
      description
      isCategory
      parentId
      slug
    }
  }
`;
