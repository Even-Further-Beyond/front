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

  insertComma(sentence: string) {
    return sentence ? `${sentence},` : '';
  }

  getCommaSentence(object: { name: string }) {
    const length = Object.keys(object).length;
    let commaSentence = '';

    let i = 0;

    const insertComma = (sentence: string) => {
      return sentence ? `${sentence},` : '';
    };

    if (length === 1) {
      commaSentence = object[0].name;
    } else {
      for (; i < length - 2; i++) {
        commaSentence = `${insertComma(commaSentence)} ${object[i].name}`;
      }

      commaSentence = `${insertComma(commaSentence)} ${object[length - 2].name} and ${object[length - 1].name}`;
    }

    return commaSentence;
  }

  renderTraits() {
    const character = this.character;
    const NA = 'NA';

    const gender = character.gender ? character.gender.description : NA;
    const hairLength = character.hairLength ? character.hairLength.description : NA;
    const hairColors = Object.keys(character.hairColors).length ? this.getCommaSentence(character.hairColors) : NA;
    const eyeColors = Object.keys(character.eyeColors).length ? this.getCommaSentence(character.eyeColors) : NA;

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
      <Chip key={tag.id} style={{margin: '15px 0px 0px 15px'}}>{tag.name}</Chip>
    ));
  }

  getCastings() {
    const duplicates = new Set([]);
    const newCastings = this.character.castings.filter((casting) => {
      if (duplicates.has(casting.person.name)) {
        duplicates.add(casting.person.name);
        return false;
      }
      return true;
    });

    return newCastings;
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
          castings={this.getCastings()}
          imagePath={this.imagePath}
        />
      </div>
    );
  }
}

export default Character;
