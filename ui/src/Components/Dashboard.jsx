import React, { useEffect, useState } from "react";
// import graphQLFetch from './graphQLFetch.jsx';
import { Grid } from "@mui/material";

// impot components
import InProgress from "./InProgress.jsx";
import SubmitTask from "./SubmitTask.jsx";
import Processing from "./Processing.jsx";

export default function DashBoard() {
  return (
    <React.Fragment>
      <Grid
        container
        sx={{ padding: 3 }}
        spacing={2}
        justifyContent="space-evenly"
        // height='95vh'
      >
        <SubmitTask />
        <InProgress />
        <Processing />
      </Grid>
    </React.Fragment>
  );
}
