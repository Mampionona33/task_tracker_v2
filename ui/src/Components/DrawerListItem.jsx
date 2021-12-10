import React from 'react';
import graphQLFetch from '../graphQLFetch.jsx';

import {
  ListItemIcon,
  ListItemText,
  Typography,
  ListItem,
  ListItemButton,
} from '@mui/material';

export default function DrawerListItem({ icon, itemText, drawerOpen, href }) {
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
