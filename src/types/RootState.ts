import Browser from './Browser';
import SearchForm from './SearchForm';
import UI from './UI';

interface RootState {
  browser: Browser;
  search: SearchForm;
  ui: UI;
}

export default RootState;
