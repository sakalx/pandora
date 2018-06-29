import styled from 'styled-components';

import Avatar from '@material-ui/core/Avatar';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import LinearProgress from '@material-ui/core/LinearProgress';
import UserIcon from '@material-ui/icons/PersonOutline';

import {muiPalette} from 'root/theme';

export const Wrap = styled('div')`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-evenly;
  min-width: 30vw;
  padding: 0 10px;
`;

export const UserAvatar = styled(Avatar)`
  align-self: center;
  background-color: ${muiPalette.grey['200']};
  height: 150px !important;
  padding: 10px;
  width: 150px !important;
`;

export const UserIconAvatar = styled(UserIcon)`
  height: 120px !important;
  width: 120px !important;
`;

export const AvatarSection = styled('div')`
  align-items: center;
  display: flex;  
  flex-direction: column;
`;

export const ProfileSection = styled('section')`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const EditButton = styled(IconButton)`
  bottom: 10px;
`;

export const EditField = styled(Collapse)`
  margin-bottom: 25px;
`;

export const ProgressBar = styled(LinearProgress)`
  flex: 0 1 auto;
`;