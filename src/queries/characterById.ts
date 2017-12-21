import gql from 'graphql-tag';

const QUERY_CHARACTER_BY_ID = gql`
  query characterById($id: ID) {
    characterById(id: $id) {
      id
      malId
      name
      description
      slug
      japaneseName
      alternativeNames
      ageStart
      ageEnd
      heightStart
      heightEnd
      weightEnd
      gender {
        description
      }
      hairLength {
        description
      }
      ageGroups {
        name
      }
      hairColors {
        name
      }
      eyeColors {
        name
      }
      image {
        imagePath
      }
      tags {
        id
        name
        description
      }
      animeAndRoles {
        anime {
          id
          slug
          mainTitle
          image {
            imagePath
          }
        }
        role
      }
      castings {
        person {
          id
          name
          image {
            imagePath
          }
        }
        language {
          name
        }
      }
    }
  }
`;

export default QUERY_CHARACTER_BY_ID;
