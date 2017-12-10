import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import styles from '../../styles';

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${styles.primaryTextColor};
  font-size: ${styles.fontSizeLarge};
  &:hover {
    color: ${styles.primaryTextColor};
    opacity: 0.6;
  }
`;

const links = [
  <StyledLink key='about' to='/about'>About</StyledLink>,
  <StyledLink key='tags' to='/tags'>Tags</StyledLink>,
  <StyledLink key='feedback' to='/feedback'>Feedback</StyledLink>,
];

export default links;
