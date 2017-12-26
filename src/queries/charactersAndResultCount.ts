import gql from 'graphql-tag';

const QUERY_CHARACTERS_WITH_COUNT = gql`
  query charactersAndResultCount(
    $characterName: String,
    $animeName: String,
    $personName: String,
    $hairColorId: ID,
    $eyeColorId: ID,
    $genderId: ID,
    $hairLengthId: ID,
    $ageGroupId: ID,
    $tagIds: [ID],
    $offset: Int,
    $limit: Int
  ) {
    charactersAndResultCount(
      characterName: $characterName,
      animeName: $animeName,
      personName: $personName,
      hairColorId: $hairColorId,
      eyeColorId: $eyeColorId,
      genderId: $genderId,
      hairLengthId: $hairLengthId,
      ageGroupId: $ageGroupId,
      tagIds: $tagIds,
      offset: $offset,
      limit: $limit
    ) {
      count
      characters {
        id
        name
        japaneseName
        alternativeNames
        description
        ageStart
        ageEnd
        heightStart
        heightEnd
        weightStart
        weightEnd
        gender {
          id
        }
        hairLength {
          id
        }
        ageGroups {
          id
        }
        hairColors {
          id
        }
        eyeColors {
          id
        }
        anime {
          id
          mainTitle
        }
        tags {
          id
        }
        image {
          imagePath
        }
      }
    }
  }
`;

export default QUERY_CHARACTERS_WITH_COUNT;
