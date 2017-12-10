import * as React from 'react';
import styled from 'styled-components';
import * as History from 'history';

import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';

import styles from '../../styles';
import Links from './links';
import Logo from './Logo';
import BurgerMenu from './BurgerMenu';

interface Props {
  location: History.Location;
  isSmall: boolean;
}

interface StyledLink extends React.DetailedReactHTMLElement<{}, HTMLElement> {
  key: string;
}

const toolbarStyle = {
  backgroundColor: `${styles.headerBackgroundColor}`,
  justifyContent: 'normal',
};

const TabDiv = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 15px;
`;

const links = (
  Links.map((link) => (
    <TabDiv key={(link.key as string)}>
      {link}
    </TabDiv>
  ))
);

const TabLinks = () => (
  <ToolbarGroup>
    {links}
  </ToolbarGroup>
);

const Header: React.StatelessComponent<Props> = (({ location, isSmall }) => (
  <Toolbar style={(toolbarStyle as {})}>
    {isSmall && <BurgerMenu menuItems={(Links as StyledLink[])} />}
    <TabDiv>
      <Logo isSmall={isSmall} />
    </TabDiv>
    {!isSmall && <TabLinks />}
  </Toolbar>
));

export default Header;
