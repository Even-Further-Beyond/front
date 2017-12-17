import * as React from 'react';
import * as _ from 'lodash';

import { Control, Form, actions } from 'react-redux-form';
import { Dispatch } from 'redux';

import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

import styled from 'styled-components';

import TagAutoComplete from './TagAutoComplete';
import CharacterTraits from '../../types/data/CharacterTraits';
import Tag from '../../types/data/Tag';
import RootState from '../../types/RootState';

interface Props {
  characterTraits: CharacterTraits;
  tags: Tag[];
  inputTagIds: string[];
  saveSubmittedSearchForm: (searchForm) => {};
  toggleSearchForm: () => {};
  setSearchResultsPage: (offset: number, limit: number, totalCount?: number) => {};
  dispatch: Dispatch<RootState>;
  hidden: boolean;
}

interface Attribute {
  id: string;
  name?: string;
  description?: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
`;

class SearchForm extends React.Component<Props, {}> {
  private unspecified = '0';
  private offset = 0;
  private limit = 30;

  private selects = [
    {
      labelName: 'Gender',
      key: 'genders',
    },
    {
      labelName: 'Hair Color',
      key: 'colors',
    },
    {
      labelName: 'Eye Color',
      key: 'colors',
    },
    {
      labelName: 'Hair Length',
      key: 'hairLengths',
    },
    {
      labelName: 'Apparent Age',
      key: 'ageGroups',
    },
  ];

  onSearch = (form) => {
    this.props.saveSubmittedSearchForm(form);
    this.props.setSearchResultsPage(this.offset, this.limit);
    this.props.toggleSearchForm();
  }

  onClick = () => {
    this.props.dispatch(actions.submit('search'));
  }

  renderTextInput(name: string) {
    const camelName = _.camelCase(name);

    return (
      <Control.text
        id={`${camelName}`}
        key={camelName}
        model={`.${camelName}`}
        ignore={['blur', 'focus']}
        component={TextField}
        controlProps={{floatingLabelText: name}}
      />
    );
  }

  renderSelect(name: string, values: Attribute[]) {
    const camelName = _.camelCase(name);

    const options = (
      values.map((value) => (
        <MenuItem
          key={value.id}
          value={value.id}
          primaryText={value.name || value.description}
        />
      ),
    ));

    const handleChange = (model: string) => (event: Event, value: number) => {
      this.props.dispatch(actions.change(model, value.toString()));
    };

    return (
      <Control.select
        id={camelName}
        key={camelName}
        model={`.${camelName}Id`}
        ignore={['blur', 'focus']}
        component={SelectField}
        mapProps={{ onChange: () => handleChange(`search.${camelName}Id`) }}
        controlProps={{floatingLabelText: name, style: {width: '200px'}}}
      >
        {<MenuItem key={this.unspecified} value={this.unspecified} primaryText={'<Unspecified>'} />}
        {options}
      </Control.select>
    );
  }

  renderSelects() {
    return this.selects.map((select) => {
      return this.renderSelect(select.labelName, this.props.characterTraits[select.key]);
    });
  }

  render() {
    const { tags, inputTagIds, dispatch } = this.props;

    const textLabels = ['Character', 'Anime', 'Voice Actor'];

    const formDivStyle = {
      transition: 'height 0.5s',
      height: this.props.hidden ? '0px' : '500px',
      overflow: 'hidden',
    } as React.CSSProperties;

    const buttonStyle = {
      margin: '20px auto',
      width: '50%',
      display: 'relative',
    };

    return (
      <div style={formDivStyle}>
        <Form
          model='search'
          onSubmit={this.onSearch}
        >
          <Container>
            {textLabels.map((name) => this.renderTextInput(name))}
          </Container>
          <Container>
            {this.renderSelects()}
          </Container>
          <TagAutoComplete
            tags={tags}
            inputTagIds={inputTagIds}
            dispatch={dispatch}
          />
          <Control.button
            model='search'
            component={RaisedButton}
            ignore={['blur', 'focus']}
            onClick={this.onClick}
            controlProps={{label: 'Search', primary: true, style: buttonStyle}}
          />
        </Form>
      </div>
    );
  }
}

export default SearchForm;
