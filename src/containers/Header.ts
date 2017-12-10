import { connect } from 'react-redux';

import RootState from '../types/RootState';
import Header from '../components/Header';

const mapStateToProps = (state: RootState) => ({
  isSmall: state.browser.lessThan.small,
});

export default connect(mapStateToProps)(Header);
