import React from 'react';
import {updateUserEmail, updateUserProfile, currentUser} from 'root/firebase-core/auth/authentication';
import {updateUserFireStore} from 'root/firebase-core/collections/users';
import {uploadToFirestorage, getURLPhoto} from 'root/firebase-core/storage/users-photo';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {toggleSnackbar} from 'root/redux-core/actions/notification';
import {onLoadingUpdateUser} from 'root/redux-core/actions/onLoad';
import {updateUserReduxStore} from 'root/redux-core/actions/user';

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
  ProgressBar,
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
    photoURL: null,
    photoFile: null,
  };

  componentDidMount() {
    const {user, handleOpenDrawer} = this.props;
    const {email, firstName, lastName} = this.state;

    this.setState({
      email: [user.email, ...email.slice(1)],
      firstName: [user.firstName, ...firstName.slice(1)],
      lastName: [user.lastName, ...lastName.slice(1)],
      photoURL: user.photoURL,
    });
    handleOpenDrawer(this.toggleDrawer);
  }

  toggleDrawer = (open = true) => this.setState({open});

  handleEditField = field => {
    const {user, onLoadingUpdateUser, toggleSnackbar, updateUserReduxStore} = this.props;
    const {email, firstName, lastName, photoURL} = this.state;
    const [value, onEdit, ...rest] = this.state[field];
    const notSame = value !== user[field];
    const userId = currentUser().uid;

    const foo = () => {
      onLoadingUpdateUser(true);
      updateUserEmail(email[0])
        .then(() => updateUserFireStore(userId, {email: email[0]}))
        .then(() => {
          updateUserReduxStore({email: email[0]});
          toggleSnackbar('Email has been successfully updated 🔥');
          onLoadingUpdateUser(false);
        })
        .catch(error => {
          console.error(error);
          toggleSnackbar(error.message)
        });
    };

    const bar = () => {
      onLoadingUpdateUser(true);
      updateUserProfile({firstName: firstName[0], lastName: lastName[0], photoURL})
        .then(() => updateUserFireStore(userId, {[field]: value}))
        .then(() => {
          updateUserReduxStore({[field]: value});
          toggleSnackbar(`${camelCaseToString(field)} has been successfully updated 🔥`);
          onLoadingUpdateUser(false);
        })
        .catch(error => {
          console.error(error);
          toggleSnackbar(error.message)
        });
    };

    if (onEdit) {
      field === 'email'
        ? this._validation(validatorEmail, field) && notSame && foo()
        : this._validation(validatorName, field) && notSame && bar();
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


  handleSelectFile = ({target}) => {
    const {toggleSnackbar} = this.props;
    const photoFile = target.files[0];

    if (photoFile) {
      const {size, type} = photoFile;
      const isValidImg = (size < 2 * 1024 * 1024) && (type === 'image/png' || type === 'image/jpeg');

      isValidImg
        ? this.setState({photoFile})
        : toggleSnackbar('Allowed PNG or JPG format less 2 mb. ⛔')
    }
  };

  handleSaveAvatar = () => {
    const {photoFile} = this.state;
    const {updateUserReduxStore} = this.props;

    getURLPhoto().then(photoURL => updateUserReduxStore({photoURL})).catch(e => console.error(e));
    //uploadToFirestorage(photoFile).then(res => console.log(res)).catch(e => console.error(e));
  };

  render() {
    const {onLoad, user} = this.props;
    const {photoFile} = this.state;
    console.log(this.state);

    return (
      <Drawer anchor='right' open={this.state.open} onClose={() => this.toggleDrawer(false)}>
        <Wrap>
          {onLoad.updateUserProfile && <ProgressBar/>}
          <AvatarSection>
            <UserAvatar alt={user.lastName} src={user.photoURL}>
              {!user.photoURL && <UserIconAvatar/>}
            </UserAvatar>
            <Button color='primary'
                    onClick={() => this.fileInput.click()}
                    size='small'>
              Change
            </Button>
            {photoFile &&
            <Tooltip id={'edit-profile-photo'} placement='top-end'
                     title='Save'>
              <EditButton color='primary' onClick={() => this.handleSaveAvatar()}>
                <SaveIcon/>
              </EditButton>
            </Tooltip>}
            <input onChange={this.handleSelectFile}
                   ref={fileInput => this.fileInput = fileInput}
                   style={{display: 'none'}}
                   type='file'
            />
          </AvatarSection>

          {this.renderProfileSection('firstName')}
          {this.renderProfileSection('lastName')}
          {this.renderProfileSection('email')}
        </Wrap>
      </Drawer>
    );
  }
}

const mapStateToProps = ({onLoad, user}) => ({
  onLoad,
  user,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  onLoadingUpdateUser,
  toggleSnackbar,
  updateUserReduxStore,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDrawer);