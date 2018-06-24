import styled from 'styled-components';

import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import Slide from '@material-ui/core/Slide';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

export const SlideAnimation = styled(Slide)`
  background-color: rgba(33,150,243, .2) !important;
`;

export const Wrap = styled(AppBar)`
  margin-bottom: 15px;
`;

export const Header = styled(Toolbar)`
  justify-content: space-between;
`;

export const Logo = styled('img')`
  margin: 5px 0;
`;

export const Title = styled(Typography)`
  margin: 15px !important;
  @media (max-width: 520px) {
   display: none !important;
  }
`;

export const User = styled('div')`
  align-items: center;
  display: flex;
  flex-direction: column;
`;

export const UserName = styled(Typography)`
  text-align: center;
`;

export const Hr = styled(Divider)`
  margin-left: 15px !important;
`;
