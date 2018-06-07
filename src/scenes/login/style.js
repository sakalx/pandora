import styled from 'styled-components';

import AppBar from '@material-ui/core/AppBar';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

export const Wrap = styled('div')`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
`;

export const TabsBar = styled(AppBar)`
  margin-bottom: 5px;
`;

export const Left = styled('div')`
  flex: 1;
  margin: 15px;
  text-align: center;
`;

export const Right = styled(Paper)`
  width: 100%;
  max-width: 500px;
  margin: 15px 55px;
  padding: 15px;
  text-align: center;
`;

export const Slogan = styled(Typography)`
  color: #fff !important;
`;