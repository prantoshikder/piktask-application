"use client";

import { Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "@/lib/router";
import { toast } from "react-toastify";
import useStyles from "./CloseAccountModal.style";

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`authentication-tabpanel-${index}`} aria-labelledby={`authentication-tab-${index}`} {...other}>
      {value === index && children}
    </div>
  );
};

function a11yProps(index) {
  return {
    id: `user-authentication-tab-${index}`,
    "aria-controls": `user-authentication-tabpanel-${index}`,
  };
}

const CloseAccountModal = () => {
  const { classes } = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [alertDialog, setAlertDialog] = useState(false);
  const [password, setPassword] = useState("");
  const [tabIndex, setTabIndex] = useState(0);

  //close account modal
  const handleDialogOpen = () => {
    setAlertDialog(true);
  };
  const handleDialogClose = () => {
    setAlertDialog(false);
  };

  const handleChangeTab = () => {
    return tabIndex === 0 ? setTabIndex(1) : tabIndex === 1 && setTabIndex(0);
  };

  const handleCloseAccount = (e) => {
    e.preventDefault();
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/user`;
    axios
      .delete(URL, {
        headers: { Authorization: user?.token },
        data: { password: password },
      })
      .then((res) => {
        if (res.status) {
          toast.success("Your account are successfully deleted");
          history.push("/");
          localStorage.removeItem("token");
          dispatch({
            type: "LOGOUT",
            payload: {
              email: "",
              token: "",
            },
          });
        }
      })
      .catch((error) => {
        toast.error(error.response.data?.message);
      });
  };

  return (
    <Card className={classes.closedAccount}>
      <CardContent>
        <Typography onClick={handleDialogOpen}>Close My Account</Typography>
      </CardContent>

      {/* close account modal */}

      <Dialog
        className={classes.closeAccountDialog}
        open={alertDialog}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <TabPanel {...a11yProps(0)} value={tabIndex} index={0}>
          <DialogTitle className={classes.closeAccountTitle}>{"Are you sure?"}</DialogTitle>

          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Note that you will close your Piktask accounts! Your premium subscription will also be canceled with no refund.
            </DialogContentText>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleDialogClose} className={classes.keepAccountBtn} autoFocus>
              keep Account
            </Button>
            {user.signupBy !== "email" ? (
              <Button onClick={handleCloseAccount} className={classes.closeAccountBtn} autoFocus>
                Close Account
              </Button>
            ) : (
              <Button onClick={handleChangeTab} className={classes.closeAccountBtn} autoFocus>
                Close Account
              </Button>
            )}
          </DialogActions>
        </TabPanel>

        <TabPanel {...a11yProps(1)} value={tabIndex} index={1}>
          <div style={{ padding: "2rem", width: "60rem" }}>
            <DialogTitle className={classes.closeAccountsTitle}>{"Are you sure?"}</DialogTitle>

            <form onSubmit={handleCloseAccount}>
              <TextField
                className={classes.passwordField}
                fullWidth
                variant="outlined"
                label="Password"
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <DialogActions>
                <Button onClick={handleDialogClose} className={classes.keepAccountBtn} autoFocus>
                  keep Account
                </Button>
                <Button className={classes.closeAccountBtn} autoFocus type="submit">
                  Close Account
                </Button>
              </DialogActions>
            </form>
          </div>
        </TabPanel>
      </Dialog>
    </Card>
  );
};

export default CloseAccountModal;
