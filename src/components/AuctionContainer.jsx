import React, { useContext, useEffect, useState } from "react";
import moment from "moment";
import { Grid, Button, Typography, TextField, Select } from "@material-ui/core";

import { GlobalContext } from "../GlobalContext";
import GradientContainer from "./GradientContainer";

const AuctionContainer = ({ tokenId, endTime }) => {
  const { gradientToken } = useContext(GlobalContext);
  const [inner, setInner] = useState("#FFFFFF");
  const [outer, setOuter] = useState("#000000");
  const toNow = moment(endTime).toNow();

  const units = [
    "wei",
    "kwei",
    "babbage",
    "femtoether",
    "mwei",
    "lovelace",
    "picoether",
    "gwei",
    "shannon",
    "nanoether",
    "nano",
    "szabo",
    "microether",
    "micro",
    "finney",
    "milliether",
    "milli",
    "ether",
  ];

  useEffect(() => {
    console.log(endTime.toNumber());
    async function fetchGradient() {
      const gradient = await gradientToken.methods
        .tokenIdToGradient(tokenId)
        .call();
      console.log(gradient);
      setInner(gradient.innerColor);
      setOuter(gradient.outerColor);
    }

    if (gradientToken) fetchGradient();
  }, []);

  return (
    <Grid container direction="column">
      <Grid item>
        <Typography align="center">Auction ends {toNow}</Typography>
      </Grid>
      <Grid item>
        <Button variant="contained" fullWidth>
          Bid
        </Button>
      </Grid>
      <Grid item>
        <GradientContainer inner={inner} outer={outer} />
      </Grid>
      <Grid item>
        <TextField type="number" label="Enter amount" />
        <TextField
          id="select-unit"
          select
          label="Select Unit"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          helperText="Please select your unit"
        >
          {units.map((option, index) => (
            <MenuItem key={index} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <Button>Bid</Button>
      </Grid>
    </Grid>
  );
};

export default AuctionContainer;
