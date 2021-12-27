import React from "react";
import { Box } from "@mui/material";

import Contents from "./Contents.jsx";
import Navbar from "./Components/NavBar.jsx";

export default function Page() {
  return (
    <React.Fragment>
      <Box
        height="100vh"
        sx={{
          background:
            "linear-gradient(55deg, rgba(112,128,144,1) 0%, rgba(192,192,192,1) 36%, rgba(192,192,192,1) 62%, rgba(112,128,144,1) 100%)",
        }}
      >
        <Navbar />
        <Contents />
      </Box>
    </React.Fragment>
  );
}
