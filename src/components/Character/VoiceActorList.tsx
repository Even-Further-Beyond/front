import * as React from 'react';
import styled from 'styled-components';

import { Card } from 'material-ui/Card';

import Casting from '../../types/data/Casting';
import styles from '../../styles';

interface Props {
  castings: Casting[];
  imagePath: string;
}

const VoiceActors = styled.div`
  margin-left: 20px;
  width: 100px;
  h5:first-child {
    height: 15px;
  }
  overflow-y: hidden;
`;

const List = styled.div`
  font-size: ${styles.fontSizeSmall};
  display: flex;
  overflow-x: hidden
`;

const renderVoiceActors = (castings: Casting[], imagePath: string) => {
  return castings.map((casting) => (
    <VoiceActors key={casting.person.id}>
      <h5>{casting.person.name}</h5>
      <h5>{casting.language.name}</h5>
      <img
        height={90}
        width={60}
        alt={casting.person.name}
        src={casting.person.images ? `${imagePath}people/small/${casting.person.images[0].imagePath}` : null}
      />
    </VoiceActors>
  ));
};

const VoiceActorList: React.StatelessComponent<Props> = (({ castings, imagePath }) => (
  <div>
    <h3>Voice Actor Roles:</h3>
    <Card style={{paddingBottom: '15px'}}>
      <List>
        {renderVoiceActors(castings, imagePath)}
      </List>
    </Card>
  </div>
));

export default VoiceActorList;
