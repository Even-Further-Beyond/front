import * as React from 'react';
import styled from 'styled-components';

import { Card } from 'material-ui/Card';

import Anime from '../../types/data/Anime';
import styles from '../../styles';

interface AnimeAndRole {
  anime: Anime[];
  role: string;
}

interface Props {
  animeAndRoles: AnimeAndRole[];
  imagePath: string;
}

const Anime = styled.div`
  margin-left: 20px;
  width: 100px;
  h5:first-child {
    height: 20px;
  }
  overflow-y: hidden;
`;

const List = styled.div`
  font-size: ${styles.fontSizeSmall};
  display: flex;
  overflow-x: hidden;
`;

const renderAnime = (animeAndRoles, imagePath) => {
  return animeAndRoles.map((animeAndRole) => (
    <Anime key={animeAndRole.anime.id}>
      <h5>{animeAndRole.anime.mainTitle}</h5>
      <h5>{animeAndRole.role}</h5>
      <img
        height={135}
        width={90}
        alt={animeAndRole.anime.mainTitle}
        src={animeAndRole.anime.image ? `${imagePath}${animeAndRole.anime.image.imagePath}` : null}
      />
    </Anime>
  ));
};

const AnimeList: React.StatelessComponent<Props> = (({ animeAndRoles, imagePath }) => (
  <div>
    <h3>Anime Roles:</h3>
    <Card style={{paddingBottom: '15px'}}>
      <List>
        {renderAnime(animeAndRoles, imagePath)}
      </List>
    </Card>
  </div>
));

export default AnimeList;
