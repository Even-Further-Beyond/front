import * as React from 'react';
import { ChildProps } from 'react-apollo';

import CircularProgress from 'material-ui/CircularProgress';

import TableView from './TableView';
import GridView from './GridView';

import { VIEW_TYPES } from '../../../reducers/ui';
import { InputProps, Response } from '../../../types/response/SearchResults';

class SearchResults extends React.Component<ChildProps<InputProps, Response>, {}> {
  imagePath = `${process.env.REACT_APP_S3_URL}/images/character/small/`;

  headers: Map<string, string> = new Map<string, string>()
    .set('Image', 'image')
    .set('Name', 'name')
    .set('Anime', 'anime');

  componentWillReceiveProps(nextProps: ChildProps<InputProps, Response>) {
    if (nextProps.data.charactersAndResultCount &&
        nextProps.data.charactersAndResultCount.count !== this.props.currentTotalCount) {
      this.props.setSearchResultsPage(null, null, nextProps.data.charactersAndResultCount.count);
    }
  }

  render() {
    const { loading, error } = this.props.data;

    if (loading) {
      return <CircularProgress />;
    }

    if (error) {
      return <span>Error</span>;
    }

    switch (this.props.viewType) {
      case VIEW_TYPES.GRID:
        return (
          <GridView
            imagePath={this.imagePath}
            headers={this.headers}
            characters={this.props.data.charactersAndResultCount.characters}
          />
        );

      case VIEW_TYPES.TABLE:
      default:
        return (
          <TableView
            imagePath={this.imagePath}
            headers={this.headers}
            characters={this.props.data.charactersAndResultCount.characters}
          />
        );
    }
  }
}

export default SearchResults;
