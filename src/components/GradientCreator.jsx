import React, { useState, useContext } from "react";
import { Grid, Button, Typography, makeStyles } from "@material-ui/core";
import GradientContainer from "./GradientContainer";
import { GlobalContext } from "../GlobalContext";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
  },
}));

const GradientCreator = () => {
  const { gradientToken, account, web3 } = useContext(GlobalContext);
  const [inner, setInner] = useState("#FFFFFF");
  const [outer, setOuter] = useState("#000000");
  const classes = useStyles();

  console.log(gradientToken);

  const mintToken = async () => {
    gradientToken.methods
      .mint(inner, outer)
      .send({
        from: account,
        value: web3.utils.toWei("1", "ether"),
      })
      .on("transactionHash", (hash) => {
        console.log(hash);
      });
  };

  if (gradientToken) {
    return (
      <Grid
        className={classes.root}
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item xs={10} sm={4} md={3}>
          <GradientContainer inner={inner} outer={outer} />
        </Grid>
        <Grid
          container
          item
          xs={11}
          sm={4}
          md={3}
          direction="column"
          justify="space-between"
          spacing={3}
        >
          <Grid item container justify="center">
            <Typography align="center" variant="h5">
              CREATE NEW GRADIENT
            </Typography>
          </Grid>
          <Grid item container justify="space-between">
            <span>Inner Color</span>
            <input
              style={{ width: "50%" }}
              type="color"
              name="inner"
              value={inner}
              onChange={(e) => setInner(e.target.value)}
            />
          </Grid>

          <Grid item container justify="space-between">
            Outer Color
            <input
              type="color"
              style={{ width: "50%" }}
              name="outer"
              value={outer}
              onChange={(e) => setOuter(e.target.value)}
            />
          </Grid>
          <Grid item>
            <Button
              onClick={() => mintToken(inner, outer)}
              variant="contained"
              color="primary"
              fullWidth
            >
              Mint
            </Button>
          </Grid>
        </Grid>
      </Grid>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default GradientCreator;
