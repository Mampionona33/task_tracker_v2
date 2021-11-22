import React from 'react';
import { ListItemIcon, ListItemText, Typography } from '@mui/material';

export default function DrawerListItem(props) {
  const icon = props.icon;
  const itemText = props.itemText;
  return (
    <React.Fragment>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText
        primary={
          <Typography variant='subtitle1' style={{ color: '#fff' }}>
            {itemText}
          </Typography>
        }
      />
    </React.Fragment>
  );
}
