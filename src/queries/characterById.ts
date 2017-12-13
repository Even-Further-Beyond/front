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
      images {
        imagePath
      }
      tags {
        id
        name
        description
      }
      anime {
        id
        slug
        mainTitle
        images {
          imagePath
        }
      }
      castings {
        person {
          id
          name
          images {
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
