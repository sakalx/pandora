import styled from 'styled-components';

import Button from '@material-ui/core/Button';
import PlaylistAdd from '@material-ui/icons/PlaylistAdd';

export const AddThemeSection = styled('div')`
  display: flex;
  padding: 10px 18px 20px 24px;
`;

export const AddThemeIcon = styled(PlaylistAdd)`
  align-self: flex-end;
  margin-bottom: 2px;
  margin-right: 5px;
`;

export const AddThemeBtn = styled(Button)`
  top: 25px;
  width: 44.5px !important;
`;