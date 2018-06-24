import styled from 'styled-components';
import {muiPalette} from 'root/theme';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

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
  justify-content: space-between;
  margin: 15px 0;
`;

export const LoginBtn = styled(Button)`
  flex: 1;
`;

export const SocialLoginBtn = styled(Button)`
  background: ${props => props.backgroundcolor} !important;
  color: ${muiPalette.common.white} !important;
  display: flex !important;
  flex: 0 0 45%;
  justify-content: space-evenly !important;
  &:hover {
  opacity: .9;
  };
`;

/*
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

export const GoogleLoginBtn = SocialLoginBtn.withComponent('div').extend`
  background: ${customColor.googleColor};
  color: ${muiPalette.common.white};
  margin-left: 5px;
`;*/