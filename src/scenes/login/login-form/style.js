import styled, {withComponent} from 'styled-components';
import {muiPalette, customColor} from 'root/theme';

import Typography from '@material-ui/core/Typography';

import Button from '@material-ui/core/Button';
import GoogleLogin from 'react-google-login';

export const Wrap = styled('section')`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-around;
`;

export const Title = styled(Typography)`
  display: flex !important;
`;

export const WrapButtons = styled('div')`
  display: flex;
  justify-content: space-around;
  margin: 15px 0;
`;

export const LoginBtn = styled(Button)`
  flex: 1;
`;

export const SocialLoginBtn = styled('button')`
  align-items: center;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  display: flex;
  flex: 1;
  height: 36px;
  justify-content: space-evenly;
  outline:none;
  width: 137px;
  
  &:hover {
   opacity: .9;
   }
`;

export const FacebookLoginBtn = SocialLoginBtn.extend`
  background: ${customColor.facebookColor};
  color: ${muiPalette.common.white};
  margin-right: 5px;
`;

export const GoogleLoginBtn = SocialLoginBtn.withComponent(GoogleLogin).extend`
  background: ${customColor.googleColor};
  color: ${muiPalette.common.white};
  margin-left: 5px;
`;