import * as React from 'react';
import { Dispatch } from 'redux';
import { actions } from 'react-redux-form';

import Tag from '../../types/data/Tag';
import RootState from '../../types/RootState';

import AutoComplete from 'material-ui/AutoComplete';
import MenuItem from 'material-ui/MenuItem';
import Chip from 'material-ui/Chip';

import styled from 'styled-components';
import styles from '../../styles';

interface Props {
  tags: Tag[];
  inputTagIds: string[];
  dispatch: Dispatch<RootState>;
}

interface Suggestion {
  textKey: string;
  valueKey: JSX.Element;
}

interface State {
  searchableSuggestions: Suggestion[];
  searchText: string;
}

const ChipDiv = styled.div`
  border: 1px solid ${styles.primaryTextColor};
  min-height: 150px;
  margin-top: 15px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
`;

class TagAutoComplete extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const searchableSuggestions = props.tags.filter((tag) =>
      props.inputTagIds.indexOf(tag.id) === -1,
    ).map((suggestion) => {
      return {
        textKey: suggestion.name,
        valueKey: <MenuItem key={suggestion.id} primaryText={suggestion.name} />,
      };
    });

    this.state = {
      searchableSuggestions,
      searchText: '',
    };
  }

  handleUpdateInput = (text: string) => {
    this.setState({searchText: text});
  }

  onCompleteRequest = (event: Suggestion, index: number) => {
    if (index > -1) {
      const newSuggestions = this.state.searchableSuggestions.filter((suggestion) =>
        suggestion.valueKey.key !== event.valueKey.key,
      );

      this.setState({searchableSuggestions: newSuggestions});
      this.props.dispatch(actions.push('search.tagIds', event.valueKey.key));
      (this.refs[`autocomplete`] as AutoComplete).setState({searchText: ''});
    }
  }

  removeTag = (id: string) => {
    const selectedTag = this.props.tags.find((tag) => tag.id === id);
    const newSuggestions = this.state.searchableSuggestions;

    newSuggestions.push({
      textKey: selectedTag.name,
      valueKey: <MenuItem key={selectedTag.id} primaryText={selectedTag.name} />,
    });

    this.setState({searchableSuggestions: newSuggestions});
    this.props.dispatch(actions.remove('search.tagIds', this.props.inputTagIds.indexOf(id)));
}

  renderChips() {
    const chips = this.props.tags.map((tag) => {
      if (this.props.inputTagIds.indexOf(tag.id) !== -1) {
        return (
          <Chip
            key={tag.id}
            onRequestDelete={() => this.removeTag(tag.id)}
            style={{margin: '10px 15px', height: '30px'}}
          >
            {tag.name}
          </Chip>
        );
      }

      return null;
    });

    return chips;
  }

  render() {
    return (
      <div>
        <AutoComplete
          floatingLabelText='Find a tag by name'
          filter={AutoComplete.caseInsensitiveFilter}
          menuStyle={{maxHeight: '300px', overflowY: 'auto'}}
          dataSource={this.state.searchableSuggestions}
          onUpdateInput={this.handleUpdateInput}
          dataSourceConfig={{text: 'textKey', value: 'valueKey'}}
          onNewRequest={this.onCompleteRequest}
          ref={`autocomplete`}
        />
        <ChipDiv>
          {this.renderChips()}
        </ChipDiv>
      </div>
    );
  }
}

export default TagAutoComplete;
