"use client";

import { Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from "@/components/ui-kit";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "@/lib/router";
import { toast } from "react-toastify";

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
    <Card className="mt-[1.6rem] shadow-[0_1px_2px_0_rgb(0_0_0_/_10%)] cursor-pointer [&_a]:no-underline [&_p]:text-[1.6rem] [&_p]:font-[400] [&_p]:text-[#E21313] [&_p]:text-center [&_p]:mb-[-0.3rem]">
      <CardContent>
        <Typography onClick={handleDialogOpen}>Close My Account</Typography>
      </CardContent>

      {/* close account modal */}

      <Dialog
        className="[&_div_div]:max-w-[100%] [&_div_div]:max-[479.95px]:w-[100%]"
        open={alertDialog}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <TabPanel {...a11yProps(0)} value={tabIndex} index={0}>
          <DialogTitle className="[&_h2]:text-[1.8rem]!">{"Are you sure?"}</DialogTitle>

          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Note that you will close your Piktask accounts! Your premium subscription will also be canceled with no refund.
            </DialogContentText>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleDialogClose} className="text-[white] bg-[#0088f2] [transition:all_0.3s_linier] hover:bg-[#0773c5]" autoFocus>
              keep Account
            </Button>
            {user.signupBy !== "email" ? (
              <Button onClick={handleCloseAccount} className="text-[white] bg-[#f91c0c] [transition:all_0.3s_linier] hover:bg-[#b71c1c]" autoFocus>
                Close Account
              </Button>
            ) : (
              <Button onClick={handleChangeTab} className="text-[white] bg-[#f91c0c] [transition:all_0.3s_linier] hover:bg-[#b71c1c]" autoFocus>
                Close Account
              </Button>
            )}
          </DialogActions>
        </TabPanel>

        <TabPanel {...a11yProps(1)} value={tabIndex} index={1}>
          <div style={{ padding: "2rem", width: "60rem" }}>
            <DialogTitle className="p-[1rem_0rem] [&_h2]:text-[1.8rem]! [&_h2]:pl-[0rem]">{"Are you sure?"}</DialogTitle>

            <form onSubmit={handleCloseAccount}>
              <TextField
                fullWidth
                variant="outlined"
                label="Password"
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <DialogActions>
                <Button onClick={handleDialogClose} className="text-[white] bg-[#0088f2] [transition:all_0.3s_linier] hover:bg-[#0773c5]" autoFocus>
                  keep Account
                </Button>
                <Button className="text-[white] bg-[#f91c0c] [transition:all_0.3s_linier] hover:bg-[#b71c1c]" autoFocus type="submit">
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
