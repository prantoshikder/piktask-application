"use client";

import { ClickAwayListener, Grow, IconButton, Input, MenuItem, Paper, Popper, useMediaQuery } from "@/components/ui-kit";
import { CaretDownOutlined as ArrowDropDownIcon } from "@ant-design/icons";
import { CaretUpOutlined as ArrowDropUpIcon } from "@ant-design/icons";
import { CloseOutlined as CloseIcon } from "@ant-design/icons";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { useClickOutside } from "react-click-outside-hook";
import { useHistory } from "@/lib/router";
import { toast } from "react-toastify";
import searchIcon from "../../../assets/search.svg";
import { useDebounce } from "../../../lib/hooks/debounceHook";
import SearchItem from "./SearchItem";

const containerVariants = {
  expanded: {
    height: "30rem",
  },
  collapsed: {
    height: "3.9rem",
  },
};

const containerTransition = {
  type: "spring",
  damping: 22,
  stiffness: 150,
};

const Search = () => {
  const history = useHistory();
  const searchRef = useRef("");
  const anchorRef = useRef("");
  const mobileView = useMediaQuery("(max-width:576px)");

  const [searchCategoryName, setSearchCategoryName] = useState("All Resources");
  const [searchCategoryID, setSearchCategoryID] = useState("");
  const [parentRef, isClickedOutside] = useClickOutside();
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState([]);

  const [noSearchResults, setNoSearchResults] = useState(false);
  const [openSearchCategory, SearchCategory] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const isEmpty = !searchResults || searchResults.length === 0;

  const expandContainer = () => {
    setIsExpanded(true);
  };

  const handleSearchToggle = () => {
    SearchCategory((prevOpen) => !prevOpen);
  };

  const handleCloseCatSearch = () => {
    SearchCategory(false);
  };

  const handleClose = (e) => {
    if (anchorRef.current && anchorRef?.current.contains(e.target)) {
      return;
    }
    SearchCategory(false);
  };

  function handleListKeyDown(e) {
    if (e.key === "Tab") {
      e.preventDefault();
      SearchCategory(false);
    }
  }

  const collapseContainer = () => {
    setIsExpanded(false);
    setLoading(false);
    setSearchQuery("");
    setSearchResults([]);
    setSearchCategoryName("All Resources");
    setNoSearchResults(false);
    if (searchRef.current) searchRef.current.value = "";
  };

  useEffect(() => {
    if (isClickedOutside) collapseContainer();
  }, [isClickedOutside]);

  const prepareSearchQuery = (query) => {
    let url;

    if (searchCategoryID) {
      url = `${process.env.NEXT_PUBLIC_API_URL}/client/search/?title=${query}&category_id=${searchCategoryID}&limit=12`;
    } else {
      url = `${process.env.NEXT_PUBLIC_API_URL}/client/search/?title=${query}&limit=12`;
    }

    return encodeURI(url);
  };

  const searchPhotos = async () => {
    if (!searchQuery || searchQuery.trim() === "") return;
    setLoading(true);

    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    const URL = prepareSearchQuery(searchQuery);
    const response = await axios.get(URL, { cancelToken: source.token }).catch((err) => {
      console.log("Error", err);
    });

    if (response) {
      if (response.data && response.data.length === 0) setNoSearchResults(true);
      setSearchResults(response.data.results);
      setLoading(false);
    }

    return () => source.cancel();
  };

  useDebounce(searchQuery, 500, searchPhotos);

  const handleCategoryItem = (e) => {
    const categoryID = e.target.getAttribute("data-id");
    const textValue = e.target.textContent;
    setSearchCategoryName(textValue);
    setSearchCategoryID(categoryID);
  };

  const loadCategories = () => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    if (categories?.length === 0) {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/categories?limit=50`, { cancelToken: source.token })
        .then(({ data }) => {
          if (data?.status) {
            const sortedData = data?.categories.sort((a, b) => a.id - b.id);
            setCategories(sortedData);
          }
        })
        .catch((error) => console.log("Categories loading error: ", error));
    }

    return () => source.cancel();
  };

  const borderStyles = {
    WebkitBorderBottomLeftRadius: isExpanded ? 0 : ".3rem",
    MozBorderRadiusBottomLeft: isExpanded ? 0 : ".3rem",
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery) {
      toast.error("The search field is required", { autoClose: 2200 });
      return;
    }

    searchPhotos();
    setSearchQuery("");
    setIsExpanded(false);

    if (searchCategoryID) {
      history.push(`/search/title=${searchQuery.toLowerCase().replace(/\s/g, "-")}&category_id=${searchCategoryID}`);
    } else {
      history.push(`/search/title=${searchQuery.toLowerCase().replace(/\s/g, "-")}`);
    }
  };

  const [active, setActive] = useState(0);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    if (active === 0) {
      const searchFind = searchResults.filter((item, index) => index === active);
      setSelected(searchFind);
    }
  }, [searchResults, active]);

  const handleKeyDown = (e) => {
    if (e.keyCode === 38) {
      e.preventDefault();
      const searchFind = searchResults.filter((item, index) => index === active - 1);
      if (searchFind) {
        setSelected(searchFind);
      }
      setActive(active - 1);
    } else if (e.keyCode === 40) {
      e.preventDefault();
      const searchFind = searchResults.filter((item, index) => index === active + 1);
      if (searchFind) {
        setSelected(searchFind);
      }
      setActive(active + 1);
    }
  };

  return (
    <>
      <form action="" autoComplete="off" onSubmit={handleSearch} className="w-[100%]">
        <motion.div className="flex flex-row items-center justify-center w-[100%] relative" variants={containerVariants} transition={containerTransition} ref={parentRef}>
          <Input
            fullWidth
            className="bg-[#fff] [border:none] p-[.5rem_3rem] text-[18px] h-[5.2rem] rounded-tl-[.3rem] rounded-bl-[.2rem] max-[959.95px]:h-[4.5rem] max-[479.95px]:h-[4rem]"
            id="search"
            aria-describedby="search-resources"
            placeholder="Search All Resources"
            disableUnderline
            ref={searchRef}
            onFocus={expandContainer}
            onKeyDown={handleKeyDown}
            style={borderStyles}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                className="absolute right-[29%]"
                key="close-icon"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={collapseContainer}
              >
                <IconButton>
                  <CloseIcon />
                </IconButton>
              </motion.div>
            )}
          </AnimatePresence>

          {!mobileView && (
            <>
              <div className="bg-[rgb(0_0_0_/_12%)] h-[36px] w-[1px] absolute left-[-3px]" />
              <div
                ref={anchorRef}
                onClick={() => {
                  handleSearchToggle();
                  loadCategories();
                }}
                className="bg-[#fff] rounded-[0] h-[5.2rem] min-w-[140px] relative flex items-center [&_>span]:block [&_>span]:mr-[0.5rem] [&_>span]:min-w-[140px] [&_>span]:text-[#666] hover:bg-[#fff] hover:text-[#666] [&_svg]:absolute [&_svg]:right-[5px] [&_svg]:text-[#666] max-[959.95px]:h-[4.5rem] max-[576.95px]:hidden"
              >
                <span>{searchCategoryName}</span>
                {openSearchCategory ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
              </div>

              <Popper open={openSearchCategory} anchorEl={anchorRef.current} role={undefined} transition disablePortal style={{ zIndex: 9999 }}>
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin: placement === "bottom" ? "center top" : "center bottom",
                    }}
                  >
                    <Paper className="h-[450px] overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:w-[8px] [&::-webkit-scrollbar]:rounded-[20px] [&::-webkit-scrollbar-track]:bg-[#ddd] [&::-webkit-scrollbar-track]:rounded-[20px] [&::-webkit-scrollbar-thumb]:bg-[#999] [&::-webkit-scrollbar-thumb]:rounded-[20px] [&::-webkit-scrollbar-thumb]:w-[6px]">
                      <ClickAwayListener onClickAway={handleClose}>
                        <ul id="search-category-lists" onKeyDown={handleListKeyDown} className="p-[1rem_0rem]">
                          {categories?.length !== 0 ? (
                            categories?.map((category) => (
                              <li
                                key={category?.id}
                                data-id={category?.id}
                                className="list-none cursor-pointer p-[0.8rem_2rem] [transition:all_0.3s_linear] hover:bg-[rgba(0,0,0,0.04)]"
                                onClick={(e) => {
                                  handleCategoryItem(e);
                                  handleCloseCatSearch();
                                }}
                              >
                                {category?.name}
                              </li>
                            ))
                          ) : (
                            <MenuItem value="">All Resources</MenuItem>
                          )}
                        </ul>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </>
          )}

          <button type="submit" className="bg-[#0088f2] w-[122px] h-[5.2rem] cursor-pointer [border:none] text-center rounded-tr-[.2rem] rounded-br-[.2rem] max-[959.95px]:h-[4.5rem] max-[479.95px]:h-[4rem] max-[479.95px]:w-[76px]">
            <img className="text-[#fff] w-[2.2rem] h-[100%]" src={searchIcon.src} alt="Search" width="22px" height="52px" />
          </button>

          {isExpanded && (
            <div className="bg-[#FFF] min-h-[300px] max-h-[400px] overflow-y-auto overflow-x-hidden shadow-[rgba(100,100,111,0.2)_0px_7px_29px_0px;] absolute rounded-bl-[3px] rounded-br-[3px] top-[59px] w-[100%] left-[0] z-[1] opacity-[99] [&::-webkit-scrollbar-track]:[-webkit-box-shadow:inset_0_0_6px_rgba(0,0,0,0.3)] [&::-webkit-scrollbar-track]:rounded-[10px] [&::-webkit-scrollbar-track]:bg-[#F5F5F5] [&::-webkit-scrollbar]:w-[10px] [&::-webkit-scrollbar]:bg-[#F5F5F5] [&::-webkit-scrollbar-thumb]:rounded-[10px] [&::-webkit-scrollbar-thumb]:[-webkit-box-shadow:inset_0_0_6px_rgba(0,0,0,.3)] [&::-webkit-scrollbar-thumb]:bg-[rgba(0,28,48,0.6)]">
              <div className="w-[auto] h-[300px] flex flex-col">
                {/* Show this while typing */}
                {isLoading && (
                  <div className="w-[100%] h-[100%] flex items-center justify-center [&_>p]:text-[#a1a1a1] [&_>p]:text-[14px] [&_>p]:flex [&_>p]:self-center [&_>p]:[justify-self:center]">
                    <p>Loading...</p>
                  </div>
                )}

                {!isLoading && isEmpty && !noSearchResults && (
                  <div className="w-[100%] h-[100%] flex items-center justify-center [&_>p]:text-[#a1a1a1] [&_>p]:text-[14px] [&_>p]:flex [&_>p]:self-center [&_>p]:[justify-self:center]">
                    <p>Start typing to search</p>
                  </div>
                )}

                {!isLoading && noSearchResults && (
                  <div className="w-[100%] h-[100%] flex items-center justify-center [&_>p]:text-[#a1a1a1] [&_>p]:text-[14px] [&_>p]:flex [&_>p]:self-center [&_>p]:[justify-self:center]">
                    <p>No resources found</p>
                  </div>
                )}

                {!isLoading && !isEmpty && (
                  <div onClick={collapseContainer}>
                    {searchResults?.length > 0 &&
                      searchResults?.map((item, index) => (
                        <div key={index} className={active === index ? `shadow-[0_0px_10px_rgb(0_0_0_/_10%)] bg-[#f8f8f8]` : ""}>
                          <SearchItem key={index} selected={selected} item={item} />
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </form>
    </>
  );
};

export default Search;
