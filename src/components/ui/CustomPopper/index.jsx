"use client";

import { ClickAwayListener, Grid, Grow, MenuItem, MenuList, Paper, Popper, Typography } from "@/components/ui-kit";
import { UserOutlined as AccountCircleIcon } from "@ant-design/icons";
import { RightOutlined as ArrowForwardIosIcon } from "@ant-design/icons";
import { EuroOutlined as EuroIcon } from "@ant-design/icons";
import { HeartOutlined as FavoriteBorderIcon } from "@ant-design/icons";
import { DownloadOutlined as GetAppIcon } from "@ant-design/icons";
import { TeamOutlined as PeopleOutlineIcon } from "@ant-design/icons";
import { UserOutlined as PersonOutlineIcon } from "@ant-design/icons";
import { PoweroffOutlined as PowerSettingsNewIcon } from "@ant-design/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "@/lib/router";
import { Link } from "@/lib/router";
import { getBaseURL, joinImageUrl } from "../../../helpers";
// import crownGreenIcon from "../../../assets/icons/crownGreenIcon.svg";

const CustomPopper = ({ open, handleToggle, anchorRef, handleClose, handleListKeyDown }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [downloadCount, setDownloadCount] = useState("");
  const [downloadLimit, setDownloadLimit] = useState("");
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    if (user?.isLoggedIn && user?.role === "user") {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/user/download_count`, {
          headers: { Authorization: user?.token },
          cancelToken: source.token,
        })
        .then(({ data }) => {
          if (data?.status) {
            setDownloadCount(data?.downloads);
            setDownloadLimit(data?.daily_limit - data?.downloads);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.log("Download error", error.response.data.message);
          setLoading(false);
        });
    }

    return () => source.cancel();
  }, [user?.token, user?.isLoggedIn, user?.role]);

  const handleSignout = () => {
    if (user && user?.token) {
      user.isLoggedIn = false;
      history.push("/");
      localStorage.removeItem("token");
      localStorage.removeItem("profileImage");

      dispatch({
        type: "LOGOUT",
        payload: {
          email: "",
          token: "",
        },
      });
    }
  };

  return (
    <Popper open={open} anchorEl={anchorRef?.current} role={undefined} transition disablePortal className="z-[99] left-[-4.5rem]! mt-[1rem] max-[576px]:min-w-[60%] max-[576px]:left-[auto]!">
      {({ TransitionProps, placement }) => (
        <Grow
          {...TransitionProps}
          style={{
            transformOrigin: placement === "bottom" ? "center top" : "center bottom",
          }}
        >
          <Paper>
            <ClickAwayListener onClickAway={handleClose}>
              <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown} className="p-[0] outline-none">
                <Grid container className="w-[32rem] p-[1rem] items-center outline-none max-[576px]:p-[1rem]">
                  <Grid size={{ xs: 6 }} className="flex items-center">
                    <div>
                      {user?.isLoggedIn && user?.avatar && user?.avatar !== "null" ? (
                        <>
                          {user?.avatar_from === "own" ? (
                            <img
                              className="w-[5rem] h-[5rem] rounded-[100%] object-cover p-[0.2rem] mr-[1rem] max-[576px]:w-[4rem] max-[576px]:h-[4rem]"
                              src={joinImageUrl(getBaseURL().bucket_base_url + "/", user?.avatar)}
                              alt={user?.username}
                              width="46px"
                              height="46px"
                            />
                          ) : (
                            <img className="w-[5rem] h-[5rem] rounded-[100%] object-cover p-[0.2rem] mr-[1rem] max-[576px]:w-[4rem] max-[576px]:h-[4rem]" src={user?.avatar} alt={user?.username} width="46px" height="46px" />
                          )}
                        </>
                      ) : (
                        <AccountCircleIcon className="w-[5rem] h-[5rem] rounded-[100%] object-cover p-[0.2rem] mr-[1rem] max-[576px]:w-[4rem] max-[576px]:h-[4rem]" />
                      )}
                    </div>
                    <div>
                      <Typography variant="h3" className="text-[1.6rem] max-[576px]:text-[1.4rem]">
                        {user?.username}
                      </Typography>
                      <Typography variant="body1" className="text-[1.4rem] text-[#1B3F4E] max-[576px]:text-[1.2rem]">
                        {user?.email}
                      </Typography>
                    </div>
                  </Grid>
                  <Grid size={{ xs: 6 }}>
                    {/* <Button className="text-[#76C71A] font-[400] font-['Roboto',sans-serif] capitalize text-[1.4rem] rounded-[3rem] opacity-[1] leading-[1.75] bg-[#143340] ml-[1rem] p-[0.3rem_1.5rem] float-right [border:.2rem_solid_transparent] hover:border-[#0088f2] max-[576px]:p-[0rem_0.2rem] max-[576px]:text-[1.2rem]">
                      <img
                        className="w-[1.8rem] mr-[0.8rem] max-[576px]:w-[1.2rem] max-[576px]:mr-[0.4rem]"
                        src={crownGreenIcon.src}
                        alt="Free"
                      />
                      Free
                    </Button> */}
                  </Grid>
                </Grid>

                {user?.isLoggedIn && user?.role === "user" && (
                  <Grid container className="bg-[#e7f5ff] text-center p-[0.8rem] max-[576px]:p-[0.8rem]">
                    <Grid size={{ xs: 6 }} className="flex items-center justify-center flex-col first:[border-right:1px_solid_#CCCCCC]">
                      <Typography variant="h2" className="text-[#0088f2] text-[2.8rem] leading-[1] max-[576px]:text-[1.5rem]">
                        {downloadCount}
                      </Typography>
                      <Typography variant="h3" className="text-[1.3rem] font-[400] max-[576px]:text-[1.3rem]">
                        Daily Downloads
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 6 }} className="flex items-center justify-center flex-col first:[border-right:1px_solid_#CCCCCC]">
                      <Typography variant="h2" className="text-[#0088f2] text-[2.8rem] leading-[1] max-[576px]:text-[1.5rem]">
                        {downloadLimit}
                      </Typography>
                      <Typography variant="h3" className="text-[1.3rem] font-[400] max-[576px]:text-[1.3rem]">
                        Remaining Downloads
                      </Typography>
                    </Grid>
                  </Grid>
                )}

                {user?.role === "user" && (
                  <div>
                    <MenuItem className="p-[1rem_1.5rem] [border-bottom:1px_solid_#cccccc] flex items-center justify-between text-[1.5rem] [&_svg]:text-[#b6b6b6] last:[border-bottom:0px_solid_transparent] max-[576px]:p-[.6rem_1.5rem] max-[576px]:text-[1.4rem] max-[576px]:min-h-[38px]" onClick={handleClose} component={Link} to="/user/profile">
                      <div className="flex items-center [&_span]:text-[1.4rem] [&_span]:text-[inherit] [&_svg]:text-[1.8rem] [&_svg]:text-[#858585] [&_svg]:mr-[1.2rem]">
                        <PersonOutlineIcon />
                        <span>Edit Profile</span>
                      </div>
                      <ArrowForwardIosIcon />
                    </MenuItem>

                    <MenuItem className="p-[1rem_1.5rem] [border-bottom:1px_solid_#cccccc] flex items-center justify-between text-[1.5rem] [&_svg]:text-[#b6b6b6] last:[border-bottom:0px_solid_transparent] max-[576px]:p-[.6rem_1.5rem] max-[576px]:text-[1.4rem] max-[576px]:min-h-[38px]" onClick={handleClose} component={Link} to="/user/favorites">
                      <div className="flex items-center [&_span]:text-[1.4rem] [&_span]:text-[inherit] [&_svg]:text-[1.8rem] [&_svg]:text-[#858585] [&_svg]:mr-[1.2rem]">
                        <FavoriteBorderIcon />
                        <span>Favourite</span>
                      </div>
                      <ArrowForwardIosIcon />
                    </MenuItem>

                    <MenuItem className="p-[1rem_1.5rem] [border-bottom:1px_solid_#cccccc] flex items-center justify-between text-[1.5rem] [&_svg]:text-[#b6b6b6] last:[border-bottom:0px_solid_transparent] max-[576px]:p-[.6rem_1.5rem] max-[576px]:text-[1.4rem] max-[576px]:min-h-[38px]" onClick={handleClose} component={Link} to="/user/downloads">
                      <div className="flex items-center [&_span]:text-[1.4rem] [&_span]:text-[inherit] [&_svg]:text-[1.8rem] [&_svg]:text-[#858585] [&_svg]:mr-[1.2rem]">
                        <GetAppIcon />
                        <span>
                          Downloads({downloadCount}/{downloadLimit})
                        </span>
                      </div>
                      <ArrowForwardIosIcon />
                    </MenuItem>

                    <MenuItem className="p-[1rem_1.5rem] [border-bottom:1px_solid_#cccccc] flex items-center justify-between text-[1.5rem] [&_svg]:text-[#b6b6b6] last:[border-bottom:0px_solid_transparent] max-[576px]:p-[.6rem_1.5rem] max-[576px]:text-[1.4rem] max-[576px]:min-h-[38px]" onClick={handleClose} component={Link} to="/user/following">
                      <div className="flex items-center [&_span]:text-[1.4rem] [&_span]:text-[inherit] [&_svg]:text-[1.8rem] [&_svg]:text-[#858585] [&_svg]:mr-[1.2rem]">
                        <PeopleOutlineIcon />
                        <span>Following</span>
                      </div>
                      <ArrowForwardIosIcon />
                    </MenuItem>

                    <MenuItem
                      className="p-[1rem_1.5rem] [border-bottom:1px_solid_#cccccc] flex items-center justify-between text-[1.5rem] [&_svg]:text-[#b6b6b6] last:[border-bottom:0px_solid_transparent] max-[576px]:p-[.6rem_1.5rem] max-[576px]:text-[1.4rem] max-[576px]:min-h-[38px]"
                      onClick={(e) => {
                        handleClose(e);
                        handleSignout();
                      }}
                    >
                      <div className="flex items-center [&_span]:text-[1.4rem] [&_span]:text-[inherit] [&_svg]:text-[1.8rem] [&_svg]:text-[#858585] [&_svg]:mr-[1.2rem]">
                        <PowerSettingsNewIcon />
                        <span>Logout</span>
                      </div>
                    </MenuItem>
                  </div>
                )}

                {user?.role === "contributor" && (
                  <div>
                    <MenuItem className="p-[1rem_1.5rem] [border-bottom:1px_solid_#cccccc] flex items-center justify-between text-[1.5rem] [&_svg]:text-[#b6b6b6] last:[border-bottom:0px_solid_transparent] max-[576px]:p-[.6rem_1.5rem] max-[576px]:text-[1.4rem] max-[576px]:min-h-[38px]" onClick={handleClose} component={Link} to="/contributor/earnings">
                      <div className="flex items-center [&_span]:text-[1.4rem] [&_span]:text-[inherit] [&_svg]:text-[1.8rem] [&_svg]:text-[#858585] [&_svg]:mr-[1.2rem]">
                        <EuroIcon />
                        <span>Earning Management</span>
                      </div>
                      <ArrowForwardIosIcon />
                    </MenuItem>

                    <MenuItem className="p-[1rem_1.5rem] [border-bottom:1px_solid_#cccccc] flex items-center justify-between text-[1.5rem] [&_svg]:text-[#b6b6b6] last:[border-bottom:0px_solid_transparent] max-[576px]:p-[.6rem_1.5rem] max-[576px]:text-[1.4rem] max-[576px]:min-h-[38px]" onClick={handleClose} component={Link} to="/contributor/settings">
                      <div className="flex items-center [&_span]:text-[1.4rem] [&_span]:text-[inherit] [&_svg]:text-[1.8rem] [&_svg]:text-[#858585] [&_svg]:mr-[1.2rem]">
                        <AccountCircleIcon />
                        <span>Account Setting</span>
                      </div>
                      <ArrowForwardIosIcon />
                    </MenuItem>

                    <MenuItem
                      className="p-[1rem_1.5rem] [border-bottom:1px_solid_#cccccc] flex items-center justify-between text-[1.5rem] [&_svg]:text-[#b6b6b6] last:[border-bottom:0px_solid_transparent] max-[576px]:p-[.6rem_1.5rem] max-[576px]:text-[1.4rem] max-[576px]:min-h-[38px]"
                      onClick={(e) => {
                        handleClose(e);
                        handleSignout();
                      }}
                    >
                      <div className="flex items-center [&_span]:text-[1.4rem] [&_span]:text-[inherit] [&_svg]:text-[1.8rem] [&_svg]:text-[#858585] [&_svg]:mr-[1.2rem]">
                        <PowerSettingsNewIcon />
                        <span>Logout</span>
                      </div>
                    </MenuItem>
                  </div>
                )}
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  );
};

export default CustomPopper;
