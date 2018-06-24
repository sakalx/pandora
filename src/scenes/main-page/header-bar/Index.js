import React from 'react';
import {signOut} from 'root/firebase-core/authentication';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';


//import {logOut} from 'root/redux-core/actions/user';

import Avatar from '@material-ui/core/Avatar';
import Fade from '@material-ui/core/Fade';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

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
    const openMenu = Boolean(anchorEl);

    return (
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
                            aria-owns={openMenu ? 'menu-appbar' : null}
                            color='inherit'
                            onClick={({currentTarget}) => this.setState({anchorEl: currentTarget})}>
                  <Avatar>
                    <UserIcon/>
                  </Avatar>
                </IconButton>
                <UserName color='inherit' variant='subheading'>
                  {user.name}
                </UserName>
              </User>
              <Menu anchorEl={anchorEl}
                    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                    id='menu-appbar'
                    onClose={() => this.setState({anchorEl: null})}
                    open={openMenu}
                    transformOrigin={{horizontal: 'right', vertical: 'top'}}>
                {this.renderMenuItem('Profile', <UserIcon/>, () => this.setState({anchorEl: null}))}
                <Hr light/>
                {this.renderMenuItem('Logout', <LogoutIcon/>, () => signOut())}
              </Menu>
            </div>
          </Header>
        </Wrap>
      </SlideAnimation>
    )
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  //logOut,
}, dispatch);

export default connect(null, mapDispatchToProps)(HeaderBar);