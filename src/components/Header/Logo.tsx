import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import styles from '../../styles';

interface Props {
  isSmall: boolean;
}

const StyledLink = styled(Link)`
  font-weight: ${styles.fontWeightMedium};
  color: ${styles.primaryTextColor};
  text-decoration: none;

  &:hover {
    color: ${styles.primaryTextColor};
    opacity: 0.6;
  }
`;

const Logo: React.StatelessComponent<Props> = (({ isSmall }) => (
  <StyledLink to='/'>
    <big style={{ marginLeft: isSmall ? '20px' : '0px' }}>
      {'AnimeCharacters'}
    </big>
  </StyledLink>
));

export default Logo;
