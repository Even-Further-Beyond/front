import * as React from 'react';
import { Route } from 'react-router-dom';
import * as History from 'history';
import injectTapEventPlugin from 'react-tap-event-plugin';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import styled from 'styled-components';

import Header from './containers/Header';
import Home from './components/Home';
import About from './components/About';
import Tags from './components/Tags';
import Feedback from './components/Feedback';
import Character from './containers/Character';

injectTapEventPlugin();

interface Props {
  location: History.Location;
}

const AppDiv = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const BodyDiv = styled.div`
  padding: 25px;
  flex-grow: 1;
  @media only screen and (min-width: 1200px) {
    width: 1200px;
    margin: auto;
  }
`;

class App extends React.Component<Props, {}> {
  componentWillUpdate(nextProps: Props) {
    if (this.props.location.key !== nextProps.location.key) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    const { location } = this.props;
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <AppDiv>
          <Header location={location} />
          <BodyDiv>
            <Route exact={true} path='/' component={Home} />
            <Route exact={true} path='/about' component={About} />
            <Route exact={true} path='/tags' component={Tags} />
            <Route exact={true} path='/feedback' component={Feedback} />
            <Route {...this.props} exact={true} path='/character/:id' component={Character} />
          </BodyDiv>
        </AppDiv>
      </MuiThemeProvider>
    );
  }
}

export default App;
