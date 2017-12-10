import * as React from 'react';

import Character from '../../../types/data/Character';
import styled from 'styled-components';

interface Props {
  imagePath: string;
  headers: Map<string, string>;
  characters: Character[];
}

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Character = styled.div`
  margin: 10px 30px;
`;

const renderCharacter = (character: Character, headers: Map<string, string>, imagePath: string) => {
  const card = [];
  headers.forEach((key, value) => {
    const rowBody = [];

    if (key === 'image') {
      let imageUrl = null;
      if (character.images[0]) {
        imageUrl = `${imagePath}${character.images[0].imagePath}`;
      }
      rowBody.push(<img key={imageUrl} src={imageUrl} alt={character.name} />);
    } else if (key === 'name') {
      rowBody.push(character[key]);
    }

    card.push(<Character key={key}>{rowBody}</Character>);
  });

  return card;
};

const renderCharacters = (characters: Character[], headers: Map<string, string>, imagePath: string) => {
  return characters.map((character) => (
    <div key={character.id}>
      {renderCharacter(character, headers, imagePath)}
    </div>
  ));
};

const GridView: React.StatelessComponent<Props> = (({ imagePath, headers, characters }) => (
  <Grid>
    {renderCharacters(characters, headers, imagePath)}
  </Grid>
));

export default GridView;
