import * as React from 'react';
import { ChildProps } from 'react-apollo';

import CircularProgress from 'material-ui/CircularProgress';
import KeyboardArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import KeyboardArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import { Response, InputProps } from '../../types/response/Search';
import SearchForm from './SearchForm';
import SearchResults from '../../containers/SearchResults';
import Pagination from '../Pagination';
import { VIEW_TYPES } from '../../reducers/ui';

class Search extends React.Component<ChildProps<InputProps, Response>, {}> {
  hideForm = () => {
    this.props.toggleSearchForm();
  }

  renderKeyboardArrow() {
    const keyboardArrowStyle = {
      width: '50px',
      height: '50px',
      marginBottom: '0px',
      cursor: 'pointer',
    };

    if (this.props.hidden) {
      return (
        <KeyboardArrowUp
          onClick={this.hideForm}
          style={keyboardArrowStyle}
        />
      );
    }

    return (
      <KeyboardArrowDown
        onClick={this.hideForm}
        style={keyboardArrowStyle}
      />
    );
  }

  setPage = (pageNumber: number) => {
    const limit = this.props.limit;
    this.props.setSearchResultsPage(pageNumber * limit);
  }

  renderPagination() {
    if (Object.keys(this.props.submittedSearchForm).length !== 0 && this.props.totalCount) {
      const offset = this.props.offset;
      const limit = this.props.limit;
      const currentPage = Math.floor(offset / limit);
      const pageCount = Math.ceil(this.props.totalCount / limit);

      let toNumber = (currentPage + 1) * limit;

      if (toNumber > this.props.totalCount) {
        toNumber = this.props.totalCount;
      }

      const resultText = `Showing ${offset + 1} to ${toNumber} of ${this.props.totalCount} results`;

      return (
        <Pagination
          currentPage={currentPage}
          pageCount={pageCount}
          setPage={this.setPage}
          resultText={resultText}
        />
      );
    }

    return null;
  }

  renderSearchResults() {
    if (Object.keys(this.props.submittedSearchForm).length !== 0) {
      const searchForm = this.props.submittedSearchForm;

      return (
        <SearchResults
          characterName={searchForm.character}
          animeName={searchForm.anime}
          personName={searchForm.voiceActor}
          hairColorId={searchForm.hairColorId}
          eyeColorId={searchForm.eyeColorId}
          hairLengthId={searchForm.hairLengthId}
          genderId={searchForm.genderId}
          ageGroupId={searchForm.apparentAgeId}
          tagIds={searchForm.tagIds}
          offset={this.props.offset}
          limit={this.props.limit}
          viewType={this.props.viewType}
          setSearchResultsPage={this.props.setSearchResultsPage}
          setSearchResultsViewType={this.props.setSearchResultsViewType}
        />
      );
    }

    return null;
  }

  handleChange = (event, index, value) => {
    this.props.setSearchResultsViewType(value);
  }

  renderViewTypesDropdown() {
    const menuItems = [];

    for (const key of Object.keys(VIEW_TYPES)) {
      menuItems.push(
        <MenuItem
          key={VIEW_TYPES[key]}
          value={VIEW_TYPES[key]}
          primaryText={VIEW_TYPES[key]}
        />,
      );
    }

    return (
      <SelectField
        floatingLabelText={'Change View'}
        value={this.props.viewType}
        onChange={this.handleChange}
      >
        {menuItems}
      </SelectField>
    );
  }

  render() {
    const { loading, error, characterTraits, tags } = this.props.data;

    if (loading) {
      return <CircularProgress />;
    }

    if (error) {
      return <span>Error loading traits.</span>;
    }

    return (
      <div>
        {this.renderKeyboardArrow()}
          <SearchForm
            characterTraits={characterTraits}
            tags={tags}
            inputTagIds={this.props.inputTagIds}
            saveSubmittedSearchForm={this.props.saveSubmittedSearchForm}
            toggleSearchForm={this.props.toggleSearchForm}
            setSearchResultsPage={this.props.setSearchResultsPage}
            dispatch={this.props.dispatch}
            hidden={this.props.hidden}
          />
        {this.renderPagination()}
        {this.renderSearchResults()}
        {this.renderPagination()}
      </div>
    );
  }
}

export default Search;
