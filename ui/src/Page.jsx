import React from 'react';

import Contents from './Contents.jsx';
import Navbar from './navigation/NavBar.jsx';

export default function Page() {
  return (
    <React.Fragment>
      <Navbar />
	<Contents />
    </React.Fragment>
  );
}
