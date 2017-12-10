import * as React from 'react';
import Drawer from 'material-ui/Drawer';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';

interface Props {
  menuItems: StyledLink[];
}

interface State {
  open: boolean;
}

interface StyledLink extends React.DetailedReactHTMLElement<{}, HTMLElement> {
  key: string;
}

class BurgerMenu extends React.Component<Props, State> {
  constructor() {
    super();
    this.state = { open: false };
  }

  handleToggle = () => {
    this.setState((prevState) => ({
        open: !prevState.open,
    }));
  }

  handleClose = () => {
    this.setState({ open: false });
  }

  onRequestChange = (open: boolean) => {
    this.setState({ open });
  }

  renderMenuItems() {
    const menuItems = (
      this.props.menuItems.map((item: StyledLink) => {
        const linkElement = React.cloneElement(item, { style: { width: '100%', display: 'block' } });
        return (
          <MenuItem key={item.key} onClick={this.handleClose}>
            {linkElement}
          </MenuItem>
        );
      })
    );

    return menuItems;
  }

  render() {
    return (
      <div>
        <IconButton style={{ marginTop: '5px' }} onClick={this.handleToggle}>
          <MenuIcon />
        </IconButton>
        <Drawer
          containerStyle={{ overflow: 'hidden' }}
          docked={false}
          width={260}
          open={this.state.open}
          onRequestChange={this.onRequestChange}
        >
          <Menu>
            {this.renderMenuItems()}
          </Menu>
        </Drawer>
      </div>
    );
  }
}

export default BurgerMenu;
