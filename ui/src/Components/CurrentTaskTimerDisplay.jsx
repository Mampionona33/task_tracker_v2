import React from "react";
import { Typography, Box, Card, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";

const CurrentTaskTimerDisplay = ({ value }) => {
  let day = Math.floor(value / 86400)
    .toString()
    .padStart(2, "0");
  let hours = Math.floor((value % 86400) / 3600)
    .toString()
    .padStart(2, "0");
  let min = Math.floor((value % 3600) / 60)
    .toString()
    .padStart(2, "0");
  let sec = Math.floor(value % 60)
    .toString()
    .padStart(2, "0");

  //   create classe for Box and Typography
  const useStyles = makeStyles(() => ({
    indicationCard: {
      margin: "0 0.5rem",
    },
    indicationContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      color: "#008B8B",
    },
    timerCard: {
      width: "1.5rem",
      display: "flex",
      justifyContent: "center",
      padding: "0 0.5rem",
    },
    timerTypography: {
      textAlign: "left",
      letterSpacing: "2.5px",
      fontFamily: "Digital Numbers Regular",
      fontWeight: "500",
      margin: "0.2rem",
    },
    timerSeparator: {
      fontFamily: "Digital Numbers Regular",
      color: "#008B8B",
      fontSize: "1.5rem",
      alignItems: "center",
      margin: "0.2rem 0 0 0",
    },
  }));

  //   import the created classe here
  const classes = useStyles();

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Card
          className={classes.timerCard}
          sx={{ backgroundColor: "primary.light" }}
        >
          <Typography
            className={classes.timerTypography}
            variant="body2"
            sx={{ color: "primary.contrastText" }}
          >
            {day}
          </Typography>
        </Card>
        <Box component="span" className={classes.timerSeparator}>
          :
        </Box>
        <Box>
          <Card
            className={classes.timerCard}
            sx={{ backgroundColor: "primary.light" }}
          >
            <Typography
              variant="body2"
              className={classes.timerTypography}
              sx={{ color: "primary.contrastText" }}
            >
              {hours}
            </Typography>
          </Card>
        </Box>
        <Box component="span" className={classes.timerSeparator}>
          :
        </Box>
        <Card
          className={classes.timerCard}
          sx={{ backgroundColor: "primary.light" }}
        >
          <Typography
            variant="body2"
            className={classes.timerTypography}
            sx={{ color: "primary.contrastText" }}
          >
            {min}
          </Typography>
        </Card>
        <Box component="span" className={classes.timerSeparator}>
          :
        </Box>
        <Card
          className={classes.timerCard}
          sx={{
            backgroundColor: "primary.light",
            color: "primary.contrastText",
          }}
        >
          <Typography
            variant="body2"
            className={classes.timerTypography}
            sx={{ color: "primary.contrastText" }}
          >
            {sec}
          </Typography>
        </Card>
      </Box>

      <Box className={classes.indicationContainer}>
        <Box className={classes.indicationCard}>
          <Typography variant="body2">Day</Typography>
        </Box>
        <Box className={classes.indicationCard}>
          <Typography variant="body2">Hrs</Typography>
        </Box>
        <Box className={classes.indicationCard}>
          <Typography variant="body2">Min</Typography>
        </Box>
        <Box className={classes.indicationCard}>
          <Typography variant="body2">Sec</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default CurrentTaskTimerDisplay;
