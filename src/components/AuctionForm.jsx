import React, { useState } from "react";
import { TextField, Button, MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const AuctionForm = React.forwardRef(
  ({ id, auctionToken, account, web3, gradientToken }) => {
    const classes = useStyles();
    const [date, setDate] = useState(new Date().toDateString());
    const [time, setTime] = useState(new Date().getTime());
    const [amount, setAmount] = useState(0);
    const [unit, setUnit] = useState("wei");
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
    const handleSubmit = () => {
      const d = new Date(`${date} ${time}`);
      const day = d.getDay();
      const month = d.getMonth();
      const year = d.getFullYear();
      const hours = d.getHours();
      const minutes = d.getMinutes();
      const UTC = Date.UTC(year, month, day, hours, minutes);
      console.log(web3.utils.toWei(`${amount}`, unit));
      gradientToken.methods
        .approve(auctionToken.address, id)
        .send({ from: account })
        .on("transactionHash", (hash) => {
          auctionToken.methods
            .createAuction(
              id,
              web3.utils.toWei(`${amount}`, unit),
              Date.now(),
              Date.now() + 86400
            )
            .send({ from: account })
            .on("transactionHash", (hash) => {
              console.log(hash);
            });
        });
    };
    return (
      <div
        style={{
          top: "35vh",
          left: "35vw",
          background: "white",
          display: "flex",
          flexDirection: "column",
        }}
        className={classes.paper}
      >
        <TextField
          id="standard-select-currency"
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
        <TextField
          id="standard-number"
          label="Number"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="date"
          label="Auction end date"
          type="date"
          defaultValue={date}
          onChange={(e) => setDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="time"
          label="Auction end time"
          type="time"
          defaultValue={time}
          onChange={(e) => setTime(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Create Auction
        </Button>
      </div>
    );
  }
);

export default AuctionForm;
