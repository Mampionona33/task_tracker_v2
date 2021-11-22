import React from 'react';
import {
  ListItemIcon,
  ListItemText,
  Typography,
  ListItem,
  ListItemButton,
} from '@mui/material';

export default function DrawerListItem(props) {
  const icon = props.icon;
  const itemText = props.itemText;
  const drawerOpen = props.drawerOpen;
  const href = props.href;
  return (
    <React.Fragment>
      <ListItem component='a' href={href}>
        <ListItemButton onClick={() => drawerOpen(false)}>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText
            primary={
              <Typography variant='subtitle1' style={{ color: '#fff' }}>
                {itemText}
              </Typography>
            }
          />
        </ListItemButton>
      </ListItem>
    </React.Fragment>
  );
}
