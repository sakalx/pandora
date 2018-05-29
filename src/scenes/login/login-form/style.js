import styled from 'styled-components';

import muiTheme, {customColor} from 'root/theme';

const {palette} = muiTheme;

import FlatButton from 'material-ui/FlatButton';
import GoogleLogin from 'react-google-login';

export const Title = styled('h1')`
  color: ${palette.accent3Color};
  font-size: 44px;
  margin-bottom: 15px;
`;

export const Description = styled('p')`
  font-size: 12px;
`;

export const Link = styled('span')`
  color: ${palette.primary1Color};
  cursor: pointer;
`;

export const WrapButtons = styled('div')`
  display: flex;
  justify-content: space-around;
  margin-top: 15px;
`;

export const FailedMsg = styled('div')`
  color: ${palette.accent1Color};
`;

export const SocialLoginTitle = styled('p')`
  color: ${palette.accent3Color};
  margin-top: 25px;
  text-align: left;
`;

export const FacebookLoginBtn = styled('button')`
  background: ${customColor.facebookColor};
  color: ${palette.alternateTextColor};
  width: 137px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  border: none;
  cursor: pointer;
  outline:none;
  height: 36px;
  font-size: 18px;
`;

export const GoogleLoginBtn = styled(GoogleLogin)`
  background: ${customColor.googleColor};
  color: ${palette.alternateTextColor};
  width: 137px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  border: none;
  cursor: pointer;
  outline:none;
  height: 36px;
  font-size: 18px;
`;