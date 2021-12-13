import React, { useState } from 'react';
import { ListItem } from '@mui/material';

export default function Clock() {
  const [render, setRender] = useState(`00:00:00`);

  return (
    <React.Fragment>
      <p>{render}</p>
    </React.Fragment>
  );
}
