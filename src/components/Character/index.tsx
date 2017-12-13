import * as React from 'react';
import { ChildProps } from 'react-apollo';

import CircularProgress from 'material-ui/CircularProgress';
import Chip from 'material-ui/Chip';
import { Card, CardTitle, CardText } from 'material-ui/Card';

import styled from 'styled-components';

import styles from '../../styles';
import { Response, InputProps } from '../../types/response/Character';

const List = styled.div`
  font-size: ${styles.fontSizeSmall};
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-left: 20px;
`;

const Tags = styled.div`
  margin: 10px 15px 15px 15px;
  padding-bottom: 50px;
  display: flex;
  justify-content: space-between;
`;

class Character extends React.Component<ChildProps<InputProps, Response>, {}> {
  imagePath = `${process.env.REACT_APP_S3_URL}/images/`;
  character = null;

  renderVoiceActors() {
    const castings = this.character.castings;

    const duplicates = [];
    const newCastings = castings.filter((casting) => {
      if (duplicates.indexOf(casting.person.name) === -1) {
        duplicates.push(casting.person.name);
        return true;
      }
      return false;
    });

    return newCastings.map((casting) => (
      <div key={casting.person.id}>
        <h5>{casting.person.name} - {casting.language.name}</h5>
        <img
          alt={casting.person.name}
          src={casting.person.images ? `${this.imagePath}people/small/${casting.person.images[0].imagePath}` : null}
        />
      </div>
    ));
  }

  renderAnimes() {
    const anime = this.character.anime;

    return anime.map((a) => (
      <div key={a.id}>
        <h5>{a.mainTitle}</h5>
        <img
          alt={a.mainTitle}
          src={`${this.imagePath}anime/small/${a.images[0].imagePath}`}
        />
      </div>
    ));
  }

  renderImage() {
    return (
      <img
        alt={this.character.name}
        src={`${this.imagePath}character/big/${this.character.images[0].imagePath}`}
      />
    );
  }

  renderTags() {
    const tags = this.character.tags;

    return tags.map((tag) => (
      <Chip>{tag.name}</Chip>
    ));
  }

  render() {
    const { loading, error } = this.props.data;
    this.character = this.props.data.characterById;

    if (loading) {
      return <CircularProgress />;
    }

    if (error) {
      return <span>Error loading character.</span>;
    }

    return (
      <Card>
        <div>
          {this.character.images ? this.renderImage() : null}
          <div>
            <List>
              {this.renderAnimes()}
            </List>
            <List>
              {this.renderVoiceActors()}
            </List>
          </div>
        </div>
        <CardTitle title={this.character.name} />
        <CardText
          style={{whiteSpace: 'pre-wrap'}}
        >
          {this.character.description}
        </CardText>
        <Tags>
          {this.renderTags()}
        </Tags>
      </Card>
    );
  }
}

export default Character;
