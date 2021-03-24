import React from "react";
import { Link, Location } from "@reach/router";
import { Button, Menu, MenuItem, Fade } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

const MobileMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        aria-controls="fade-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MenuIcon style={{ color: "#FFF" }} />
      </Button>
      <Location>
        {({ location }) => (
          <Menu
            id="fade-menu"
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={handleClose}
            TransitionComponent={Fade}
          >
            <MenuItem
              component={Link}
              to="mint-gradient"
              disabled={location.pathname === "/mint-gradient"}
            >
              Mint New
            </MenuItem>
            <MenuItem
              component={Link}
              to="mygradients"
              disabled={location.pathname === "/mygradients"}
            >
              My gradients
            </MenuItem>
            <MenuItem
              component={Link}
              to="auctions"
              disabled={location.pathname === "/auctions"}
            >
              Auctions
            </MenuItem>
          </Menu>
        )}
      </Location>
    </div>
  );
};

export default MobileMenu;
