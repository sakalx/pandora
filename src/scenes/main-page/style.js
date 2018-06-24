import styled from 'styled-components';

import Paper from '@material-ui/core/Paper';

export const Wrap = styled('div')`
  align-items: center;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow: hidden;
  width: 100%;
`;

export const MainSection = styled(Paper)`
  min-height: 80vh;
  width: 95%;
`;