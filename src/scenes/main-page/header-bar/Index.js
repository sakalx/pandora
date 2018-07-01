import React from 'react';
import {signOut} from 'root/firebase-core/auth/authentication';

import {connect} from 'react-redux';

import Avatar from '@material-ui/core/Avatar';
import Fade from '@material-ui/core/Fade';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import ProfileDrawer from '../profile-drawer'

import logoSrc from 'root/assets/img/bidwin-logo-180x72.png';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import UserIcon from '@material-ui/icons/PersonOutline';

import {
  Header,
  Hr,
  Logo,
  SlideAnimation,
  Title,
  User,
  UserName,
  Wrap,
} from './style';

class HeaderBar extends React.PureComponent {
  state = {
    anchorEl: null,
  };

  renderMenu = () => {
    const {anchorEl} = this.state;

    return (
      <Menu anchorEl={anchorEl}
            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            id='menu-appbar'
            onClose={() => this.setState({anchorEl: null})}
            open={Boolean(anchorEl)}
            transformOrigin={{horizontal: 'right', vertical: 'top'}}>
        {this.renderMenuItem('Profile', <UserIcon/>, () => {
          this.openDrawer();
          this.setState({anchorEl: null})
        })
        }
        <Hr light/>
        {this.renderMenuItem('Logout', <LogoutIcon/>, () => signOut())}
      </Menu>
    )
  };

  renderMenuItem = (text, icon, callBack) =>
    <MenuItem onClick={callBack}>
      <ListItemIcon>
        {icon}
      </ListItemIcon>
      <ListItemText inset primary={text}/>
    </MenuItem>;

  render() {
    const {user} = this.props;
    const {anchorEl} = this.state;

    return (
      <React.Fragment>
        <SlideAnimation direction='right' in={true} mountOnEnter timeout={1000}>
          <Wrap position='static'>
            <Header>
              <Logo alt='Logo' src={logoSrc}/>
              <Fade in={true} timeout={3500}>
                <Title color='inherit' variant='title'>
                  BidWin is a next-generation of content delivery
                </Title>
              </Fade>
              <div>
                <User>
                  <IconButton aria-haspopup='true'
                              aria-owns={Boolean(anchorEl) ? 'menu-appbar' : null}
                              color='inherit'
                              onClick={({currentTarget}) => this.setState({anchorEl: currentTarget})}>
                    <Avatar alt={user.lastName} src={user.photoURL}>
                      {!user.photoURL && <UserIcon/>}
                    </Avatar>
                  </IconButton>
                  <UserName color='inherit' variant='subheading'>
                    {user.firstName}
                  </UserName>
                </User>
                {this.renderMenu()}
              </div>
            </Header>
          </Wrap>
        </SlideAnimation>
        <ProfileDrawer handleOpenDrawer={toggleDrawer => this.openDrawer = toggleDrawer}/>
      </React.Fragment>
    )
  }
}

const mapStateToProps = ({user}) => ({
  user,
});

export default connect(mapStateToProps, null)(HeaderBar);