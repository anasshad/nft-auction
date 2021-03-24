import React from "react";
import { Paper, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
  },
}));

const GradientContainer = ({ inner, outer }) => {
  const classes = useStyles();
  return (
    <Paper variant="outlined" className={classes.paper}>
      <div
        style={{
          position: "relative",
          paddingTop: "100%",
          width: "100%",
          backgroundImage: `radial-gradient(${inner}, ${outer})`,
          borderRadius: "100%",
        }}
      ></div>
    </Paper>
  );
};

export default GradientContainer;
