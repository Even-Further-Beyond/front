import * as React from 'react';

import FlatButton from 'material-ui/FlatButton';
import Next from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import Prev from 'material-ui/svg-icons/hardware/keyboard-arrow-left';

interface Props {
  currentPage: number;
  pageCount: number;
  setPage: (pageNumber: number) => void;
  resultText: string;
}

const renderPageNumbers = (currentPage: number, pageCount: number, setPage: (pageNumber: number) => void) => {
  const pages = [];

  const minStart = Math.max(pageCount - 5, 0);
  const minEnd = Math.min(4, pageCount - 1);
  const targetStart = Math.max(currentPage - 2, 0);
  const targetEnd = Math.min(currentPage + 2, pageCount - 1);
  const start = Math.min(targetStart, minStart);
  const end = Math.max(targetEnd, minEnd);

  const style = {color: 'rgb(218, 11, 11)'};

  for (let i = start; i <= end; i++) {
    pages.push(
      <FlatButton
        key={i}
        label={i + 1}
        style={currentPage === i ? style : null}
        onClick={() => setPage(i)}
      />,
    );
  }

  return pages;
};

const renderEllipses = (isStart: boolean, currentPage: number, pageCount: number) => {
  if ((isStart && currentPage > 2 && pageCount > 2) ||
      (!isStart && pageCount > currentPage + 3)) {
    return <span>...</span>;
  }

  return null;
};

const Pagination: React.StatelessComponent<Props> = (({ currentPage, pageCount, setPage, resultText }) => (
  <div>
    <FlatButton
      disabled={currentPage === 0}
      label='First'
      onClick={() => setPage(0)}
    />
    <FlatButton
      disabled={currentPage === 0}
      icon={<Prev />}
      onClick={() => setPage(currentPage - 1)}
    />
    {renderEllipses(true, currentPage, pageCount)}
    {renderPageNumbers(currentPage, pageCount, setPage)}
    {renderEllipses(false, currentPage, pageCount)}
    <FlatButton
      disabled={currentPage === pageCount - 1}
      icon={<Next />}
      onClick={() => setPage(currentPage + 1)}
    />
    <FlatButton
      disabled={currentPage === pageCount - 1}
      label='Last'
      onClick={() => setPage(pageCount - 1)}
    />
    {resultText}
  </div>
));

export default Pagination;
