import React from 'react';

import Navbar from './navigation/Navbar.jsx';
import Contents from './Contents.jsx';

export default function Page() {
  return (
    <React.Fragment>
      <Navbar />
      <Contents />
    </React.Fragment>
  );
}
