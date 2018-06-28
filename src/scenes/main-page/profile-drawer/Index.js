import React from 'react';
import {updateUserEmail, updateUserProfile, currentUser} from 'root/firebase-core/authentication'

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {toggleSnackbar} from 'root/redux-core/actions/notification';

import {camelCaseToString} from 'root/helpers/camel-case';
import {validatorName, validatorEmail} from 'root/helpers/validator';

import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';

import {
  AvatarSection,
  EditButton,
  EditField,
  ProfileSection,
  UserAvatar,
  UserIconAvatar,
  Wrap,
} from './style'

class ProfileDrawer extends React.PureComponent {
  state = {
    // index 0 === value, index 1 === open edit field, index 2 === error, index 3 === error Message,
    email: ['', false, false, 'email@example.com'],
    firstName: ['', false, false, 'You can use letters & numbers'],
    lastName: ['', false, false, 'You can use letters & numbers'],
    open: false,
    // photoURL,
  };

  componentDidMount() {
    const {user, handleOpenDrawer} = this.props;
    const {email, firstName, lastName} = this.state;

    this.setState({
      email: [user.email, ...email.slice(1)],
      firstName: [user.firstName, ...firstName.slice(1)],
      lastName: [user.lastName, ...lastName.slice(1)],
    });
    handleOpenDrawer(this.toggleDrawer);
  }

  toggleDrawer = (open = true) => this.setState({open});

  handleEditField = field => {
    const {toggleSnackbar} = this.props;
    const {email, firstName, lastName} = this.state;
    const [value, onEdit, ...rest] = this.state[field];

    if (onEdit) {
      if (field === 'email') {
        this._validation(validatorEmail, field)
        && updateUserEmail(email[0]).then(() =>
          toggleSnackbar('Email has been successfully updated 🔥'))
          .catch(error => {
            console.error(error);
            toggleSnackbar(error.message)
          });
      } else {
        this._validation(validatorName, field)
        && updateUserProfile({firstName: firstName[0], lastName: lastName[0]})
          .then(() => toggleSnackbar(`${camelCaseToString(field)} has been successfully updated 🔥`))
          .catch(error => {
            console.error(error);
            toggleSnackbar(error.message)
          });
      }
    } else {
      this.setState({[field]: [value, true, ...rest]})
    }
  };

  _validation = (validator, field) => {
    const {user} = this.props;
    const [value, , , errorMsg] = this.state[field];

    if (validator(value)) {
      this.setState({[field]: [value, false, false, errorMsg]});
      return true
    }
    this.setState({[field]: [user[field], true, true, errorMsg]});
    return false
  };

  renderProfileSection = field => {
    const [title, onEdit] = this.state[field];

    return (
      <React.Fragment>
        <Typography variant='caption'>{camelCaseToString(field)}</Typography>
        <ProfileSection>
          <Typography color={onEdit ? 'primary' : 'default'}
                      gutterBottom variant='headline'>
            {title}
          </Typography>
          {this._renderEditButton(field)}
        </ProfileSection>
        <EditField in={onEdit}>
          {this._renderTextField(field)}
        </EditField>
      </React.Fragment>
    )
  };

  _renderEditButton = field => {
    const [, onEdit] = this.state[field];
    return (
      <Tooltip id={`edit-profile-${field}`} placement='top-start'
               title={onEdit ? 'Save' : 'Edit'}>
        <EditButton color='primary' onClick={() => this.handleEditField(field)}>
          {onEdit ? <SaveIcon/> : <EditIcon/>}
        </EditButton>
      </Tooltip>
    )
  };

  _renderTextField = field => {
    const [value, onEdit, isError, errorMsg] = this.state[field];

    return (
      <TextField error={isError}
                 fullWidth
                 label={isError ? errorMsg : null}
                 onChange={({target}) => this.setState({
                   [field]: [target.value, onEdit, isError, errorMsg]
                 })}
                 placeholder={value}
                 type='search'
      />
    )
  };

  render() {
    const {user} = this.props;
    // console.log(this.state.email);

    return (
      <Drawer anchor='right' open={this.state.open} onClose={() => this.toggleDrawer(false)}>
        <Wrap>

          <AvatarSection>
            <UserAvatar alt={user.lastName} src={user.photoURL}>
              {!user.photoURL && <UserIconAvatar/>}
            </UserAvatar>
            <Button color='primary' size='small'>Change</Button>
          </AvatarSection>

          {this.renderProfileSection('firstName')}
          {this.renderProfileSection('lastName')}
          {this.renderProfileSection('email')}
        </Wrap>
      </Drawer>
    );
  }
}

const mapStateToProps = ({user}) => ({
  user,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  toggleSnackbar,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDrawer);