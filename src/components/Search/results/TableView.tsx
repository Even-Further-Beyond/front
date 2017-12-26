import * as React from 'react';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import Character from '../../../types/data/Character';

interface Props {
  imagePath: string;
  headers: Map<string, string>;
  characters: Character[];
}

const renderHeaders = (headers: Map<string, string>) => {
  const tableHeaders = [];
  headers.forEach((key, value) => {
    tableHeaders.push(<TableHeaderColumn key={key}>{value}</TableHeaderColumn>);
  });

  return tableHeaders;
};

const renderColumns = (character: Character, headers: Map<string, string>, imagePath: string) => {
  const columns = [];
  headers.forEach((key, value) => {
    const rowBody = [];

    if (key === 'image') {
      let imageUrl = null;
      if (character.image) {
        imageUrl = `${imagePath}${character.image.imagePath}`;
      }
      rowBody.push(<img key={imageUrl} src={imageUrl} alt={character.name} />);
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
};

const renderRows = (characters: Character[], headers: Map<string, string>, imagePath: string) => {
  return characters.map((character) => (
    <TableRow key={character.id}>
      {renderColumns(character, headers, imagePath)}
    </TableRow>
  ));
};

const TableView: React.StatelessComponent<Props> = (({ imagePath, headers, characters }) => (
  <Table>
    <TableHeader displaySelectAll={false}>
      <TableRow>
        {renderHeaders(headers)}
      </TableRow>
    </TableHeader>
    <TableBody displayRowCheckbox={false}>
      {renderRows(characters, headers, imagePath)}
    </TableBody>
  </Table>
));

export default TableView;
