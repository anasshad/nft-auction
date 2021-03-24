import React, { useState, useEffect, useContext } from "react";
import { Grid, Typography, makeStyles, Button, Modal } from "@material-ui/core";
import GradientContainer from "./GradientContainer";
import AuctionForm from "./AuctionForm";
import CheckIcon from "@material-ui/icons/Check";
import { GlobalContext } from "../GlobalContext";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
}));

const MyGradients = () => {
  const { gradientToken, account, auctionToken, web3 } = useContext(
    GlobalContext
  );
  const [gradients, setGradients] = useState([]);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [auctionCreated, setAuctionCreated] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    async function fetchGradients() {
      let tokens = [];
      let token, gradient;
      const balance = await gradientToken.methods.balanceOf(account).call();
      for (let i = 0; i < balance; i++) {
        token = await gradientToken.methods
          .tokenOfOwnerByIndex(account, i)
          .call();
        gradient = await gradientToken.methods.tokenIdToGradient(token).call();
        gradient.id = token;
        tokens.push(gradient);
      }
      setGradients(tokens);
    }
    if (gradientToken) fetchGradients();
  }, [gradientToken]);

  if (gradientToken) {
    return (
      <Grid container spacing={2} className={classes.root}>
        <Grid item xs={12}>
          <Typography align="center" variant="h3">
            My Gradients
          </Typography>
        </Grid>
        <Grid container direction="row" justify="flex-start" spacing={2}>
          {gradients.length !== 0 &&
            gradients.map((gradient, index) => {
              return (
                <Grid item xs={11} sm={4} md={3} key={index}>
                  <GradientContainer
                    key={index}
                    inner={gradient.innerColor}
                    outer={gradient.outerColor}
                  />
                  {!auctionCreated && (
                    <Button
                      color="primary"
                      fullWidth
                      variant="contained"
                      onClick={handleOpen}
                    >
                      Create Auction
                    </Button>
                  )}
                  {auctionCreated && (
                    <Button
                      color="primary"
                      fullWidth
                      disabled
                      variant="contained"
                      onClick={handleOpen}
                      startIcon={<CheckIcon />}
                    >
                      Auction Created
                    </Button>
                  )}
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                  >
                    <AuctionForm
                      id={gradient.id}
                      auctionToken={auctionToken}
                      account={account}
                      web3={web3}
                      gradientToken={gradientToken}
                      setOpen={setOpen}
                      setAuctionCreated={setAuctionCreated}
                    />
                  </Modal>
                </Grid>
              );
            })}
        </Grid>
      </Grid>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default MyGradients;
