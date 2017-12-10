import * as React from 'react';
import { ChildProps } from 'react-apollo';

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import CircularProgress from 'material-ui/CircularProgress';

import { InputProps, Response } from '../../types/response/SearchResults';
import Character from '../../types/data/Character';

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

  renderHeaders() {
    const tableHeaders = [];
    this.headers.forEach((key, value) => {
      tableHeaders.push(<TableHeaderColumn key={key}>{value}</TableHeaderColumn>);
    });

    return tableHeaders;
  }

  renderColumns(character: Character) {
    const columns = [];
    this.headers.forEach((key, value) => {
      const rowBody = [];

      if (key === 'image') {
        let imagePath = null;
        if (character.images[0]) {
          imagePath = `${this.imagePath}${character.images[0].imagePath}`;
        }
        rowBody.push(<img key={imagePath} src={imagePath} alt={character.name} />);
      } else if (key === 'anime') {
        for (let i = 0; i < 3; i++) {
          if (character.anime[i]) {
            rowBody.push(<div key={character.anime[i].id}>{character.anime[i].mainTitle}</div>);
          }
        }
      } else {
        rowBody.push(character[key]);
      }

      columns.push(<TableRowColumn key={key}>{rowBody}</TableRowColumn>);
    });

    return columns;
  }

  renderRows() {
    return this.props.data.charactersAndResultCount.characters.map((character) => (
      <TableRow key={character.id}>
        {this.renderColumns(character)}
      </TableRow>
    ));
  }

  render() {
    const { loading, error } = this.props.data;

    if (loading) {
      return <CircularProgress />;
    }

    if (error) {
      return <span>Error</span>;
    }

    return (
      <Table>
        <TableHeader displaySelectAll={false}>
          <TableRow>
            {this.renderHeaders()}
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {this.renderRows()}
        </TableBody>
      </Table>
    );
  }
}

export default SearchResults;
