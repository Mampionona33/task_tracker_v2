import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";

// impot components
import DashboardInProgress from "../Components/DashboardInProgress.jsx";
import DashboardSubmitTask from "../Components/DashboardSubmitTask.jsx";
import DashboardCurrentTask from "../Components/DashboardCurrentTask.jsx";

export default function DashBoard() {
  return (
    <React.Fragment>
      <Grid
        container
        sx={{ padding: 3 }}
        spacing={2}
        justifyContent="space-evenly"
        height='90vh'
      >
        <DashboardSubmitTask />
        <DashboardInProgress />
        <DashboardCurrentTask />
      </Grid>
    </React.Fragment>
  );
}
