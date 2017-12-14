import * as React from 'react';
import { ChildProps } from 'react-apollo';

import CircularProgress from 'material-ui/CircularProgress';
import Chip from 'material-ui/Chip';
import { Card, CardTitle, CardText } from 'material-ui/Card';

import styled from 'styled-components';

import { Response, InputProps } from '../../types/response/Character';
import AnimeList from './AnimeList';
import VoiceActorList from './VoiceActorList';

const Tags = styled.div`
  margin-top: 15px;
  padding-bottom: 25px;
  display: flex;
  flex-wrap: wrap;
`;

const Traits = styled.div`
  span:not(:first-child) {
    margin-left: 40px;
  }
  margin-bottom: 20px;
`;

class Character extends React.Component<ChildProps<InputProps, Response>, {}> {
  imagePath = `${process.env.REACT_APP_S3_URL}/images/`;
  character = null;

  renderAnimes() {
    const animeAndRoles = this.character.animeAndRoles;

    return animeAndRoles.map((animeAndRole) => (
      <div key={animeAndRole.anime.id}>
        <h5>{animeAndRole.anime.mainTitle}</h5>
        <img
          alt={animeAndRole.anime.mainTitle}
          src={`${this.imagePath}anime/small/${animeAndRole.anime.images[0].imagePath}`}
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

  getCommaSentence(object) {
    const length = Object.keys(object).length;

    let commaSentence = '';

    if (length === 1) {
      commaSentence = object[0].name;
    } else if (length === 2) {
      commaSentence = `${object[0].name} and ${object[1].name}`;
    } else {
      for (let i = 0; i < length; i++) {
        if (i === length - 1) {
          commaSentence = `${commaSentence} and ${object[i].name}`;
        } else {
          commaSentence = `${commaSentence}, ${object[i].name}`;
        }
      }
    }

    return commaSentence;
  }

  renderTraits() {
    const character = this.character;

    const gender = character.gender ? character.gender.description : 'N/A';
    const hairLength = character.hairLength ? character.hairLength.description : 'N/A';
    const hairColors = Object.keys(character.hairColors).length ? this.getCommaSentence(character.hairColors) : 'N/A';
    const eyeColors = Object.keys(character.eyeColors).length ? this.getCommaSentence(character.eyeColors) : 'N/A';

    return (
      <Traits>
        <span>Gender: {gender}</span>
        <span>Hair Length: {hairLength}</span>
        <span>Hair Colors: {hairColors}</span>
        <span>Eye Colors: {eyeColors}</span>
      </Traits>
    );

  }

  renderTags() {
    const tags = this.character.tags;

    return tags.map((tag) => (
      <Chip style={{margin: '15px 0px 0px 15px'}}>{tag.name}</Chip>
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
      <div>
        <Card>
          <div style={{display: 'flex'}}>
            {this.character.images ? this.renderImage() : null}
            <CardText style={{whiteSpace: 'pre-wrap'}} >
              <CardTitle
                title={this.character.name}
                subtitle={this.character.japaneseName}
                style={{marginBottom: '15px', padding: '0px'}}
              />
              {this.renderTraits()}
              {this.character.description}
            </CardText>
          </div>
          <Tags>
            {this.renderTags()}
          </Tags>
        </Card>
        <AnimeList
          animeAndRoles={this.character.animeAndRoles}
          imagePath={this.imagePath}
        />
        <VoiceActorList
          castings={this.character.castings}
          imagePath={this.imagePath}
        />
      </div>
    );
  }
}

export default Character;
