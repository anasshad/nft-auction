import React from "react";
import { Link, Location } from "@reach/router";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  makeStyles,
  Hidden,
} from "@material-ui/core";

import MobileMenu from "./MobileMenu";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Topbar = ({ account }) => {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          className={classes.menuButton}
        ></IconButton>
        <Typography variant="h6" className={classes.title}>
          Crypto Gradient
        </Typography>
        <Hidden xsDown>
          <Location>
            {({ location }) => (
              <div>
                <Button
                  color="inherit"
                  component={Link}
                  to="mint-gradient"
                  disabled={location.pathname === "/mint-gradient"}
                >
                  Mint New
                </Button>
                <Button
                  color="inherit"
                  component={Link}
                  to="mygradients"
                  disabled={location.pathname === "/mygradients"}
                >
                  My Gradients
                </Button>
                <Button
                  color="inherit"
                  component={Link}
                  to="auctions"
                  disabled={location.pathname === "/auctions"}
                >
                  Auctions
                </Button>
              </div>
            )}
          </Location>
        </Hidden>
        <Hidden smUp>
          <MobileMenu />
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
