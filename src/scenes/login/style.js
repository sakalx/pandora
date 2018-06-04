import styled from 'styled-components';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

export const Wrap = styled('div')`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const Left = styled('section')`
  margin: 15px;
`;

export const Right = styled(Paper)`
  display: inline-block;
  margin: 15px;
  min-width: 320px;
  padding: 15px;
  text-align: center;
`;

export const Slogan = styled(Typography)`
  color: #fff !important;
`;