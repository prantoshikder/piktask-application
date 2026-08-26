"use client";

import { Button } from "@/components/ui-kit";
import { CloseOutlined as ClearIcon } from "@ant-design/icons";
import { CloseOutlined as CloseIcon } from "@ant-design/icons";
// import { Autocomplete } from "@/components/ui-kit";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getBaseURL } from "../../../../../helpers";

const EditItem = (props) => {
  const user = useSelector((state) => state.user);
  const { products, setOpenModal, setSelectedProducts, setAddProductDetails, pendingProducts, setSuccessProduct } = props;

  const [categoryName, setCategoryName] = useState("");
  const [tagsValue, setTagsValue] = useState([]);
  const [category, setCategory] = useState([]);
  const [title, setTitle] = useState("");

  const [tag, setTag] = useState([]);
  const keyWordRef = useRef(null);

  useEffect(() => {
    if (user?.isLoggedIn && user?.role === "contributor") {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/categories?limit=50`)
        .then(({ data }) => {
          if (data?.status) {
            const sortedData = data?.categories.sort((a, b) => a.id - b.id);
            // setCategory(sortedData);
            setCategory((prevState) => [{ id: "0", name: "Select Category" }, ...sortedData]);
          }
        })
        .catch((error) => console.log("Categories loading error: ", error));
    }
  }, [user]);

  const images = [];
  products.forEach((element) => {
    images.push(element.token_id);
  });

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    const action = e.currentTarget.value;
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    if (!categoryName) {
      toast.error("Please select a category", { autoClose: 2200 });
      return;
    } else if (!title) {
      toast.error("The Title field is required.", { autoClose: 2200 });
      return;
    } else if (title.length < 3 || title.length > 200) {
      toast.error("Title must be between 3 and 200 characters", {
        autoClose: 2200,
      });
      return;
    } else if (tagsValue.length === 0) {
      toast.error("The tag field is required", { autoClose: 2200 });
      return;
    }

    // API integration for set product details
    if (user?.isLoggedIn && user?.role === "contributor") {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/images?action=${action}`;
      try {
        const response = await axios({
          method: "put",
          url,
          cancelToken: source.token,
          headers: {
            Authorization: user?.token,
            "Content-Type": "application/json",
          },
          data: {
            images,
            title,
            categories_id: categoryName,
            tags: tagsValue,
          },
        });
        if (response.data?.status) {
          setCategoryName("");
          setTitle("");
          setTagsValue([]);
          setAddProductDetails(pendingProducts);
          products.forEach((element) => {
            if (element.isSelected === true) {
              setSuccessProduct((element.isSelected = false));
            }
          });
          toast.success(response.data.message || "Product update successfully");
        }
      } catch (error) {
        if (error.response?.data?.errors) {
          Object.entries(error.response.data.errors).forEach(([key, value]) => {
            console.log(`${key} ${value}`);
            toast.error(value);
          });
        } else if (error.response?.data?.message) {
          toast.error(error.response.data.message);
        }
      }
    }
    setSelectedProducts([]);
    setOpenModal(false);

    return () => source.cancel();
  };

  const handleDeleteItem = (id) => {
    setSelectedProducts(products.filter((item) => item.token_id !== id));
    return;
  };

  const removeKeyword = (keyword, index, e) => {
    tagsValue.splice(index, 1);
    setTagsValue([...tagsValue]);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      setTagsValue((prevState) => {
        const isInArray = prevState?.find((item) => e.target.value.includes(item));
        if (isInArray) {
          toast.error("Tag already exist");
          return [...prevState];
        } else {
          return [...tag.split(","), ...prevState];
        }
      });
      setTag("");
    }
  };

  const getTags = () => {
    return (
      <div className="flex self-start list-none flex-wrap [&_li]:m-[3px] [&_li]:p-[4px_10px] [&_li]:[border:1px_solid_#ddd] [&_li]:rounded-[20px] [&_li]:text-[14px] [&_li]:flex [&_li]:items-center [&_li]:[&_svg]:ml-[5px] [&_li]:[&_svg]:cursor-pointer [&_li]:hover:bg-[#F2F2F2]">
        {tagsValue?.length > 0 &&
          tagsValue?.map((tag, index) => (
            <li key={index} className="keyword">
              {tag}
              <ClearIcon onClick={(e) => removeKeyword(tag, index, e)} />
            </li>
          ))}
      </div>
    );
  };

  // const [openSchema, setOpenSchema] = useState("");

  // const handleSchemaInput = () => {
  //   setOpenSchema(!openSchema);
  // };

  return (
    <div className="w-[45rem] p-[2rem_2rem] max-[600px]:w-[100%] max-[600px]:p-[1rem_1rem]">
      <div className="flex items-center flex-col">
        <div className="w-[100%] min-h-[74px] object-cover overflow-hidden mb-[1.8rem] flex flex-wrap gap-[8px]">
          {products?.length > 0 &&
            products?.map((product) => (
              <div key={product?.id} className="w-[96px] relative [&_img]:w-[100%] [&_img]:h-[7rem] [&_img]:object-cover [&_img]:rounded-[0.5rem]">
                <img
                  className="w-[100%] h-[100%] object-cover"
                  src={getBaseURL().bucket_base_url + getBaseURL().images + product?.original_file}
                  alt={product?.original_name}
                />
                <div className="cursor-pointer text-[#000] bg-[#ddd] absolute top-[0] [&_svg]:text-[2rem]">
                  <CloseIcon onClick={() => handleDeleteItem(product?.token_id)} />
                </div>
              </div>
            ))}
        </div>

        <div className="mb-[1rem] w-[100%] flex items-start flex-col [&_label]:text-[1.4rem] [&_label]:font-[500] [&_label]:mb-[0.8rem] [&_select]:w-[100%] [&_select]:[border:1px_solid_#ddd] [&_select]:p-[1rem] [&_select]:rounded-[4px] [&_select]:text-[1.6rem] [&_select]:focus:[outline:1px] [&_input]:w-[100%] [&_input]:[border:1px_solid_#ddd] [&_input]:p-[1rem] [&_input]:rounded-[4px] [&_input]:text-[1.6rem] [&_textarea]:w-[100%] [&_textarea]:[border:1px_solid_#ddd] [&_textarea]:p-[1.8rem] [&_textarea]:rounded-[4px] [&_textarea]:text-[1.6rem] [&_textarea]:[resize:none]">
          <label htmlFor="category">Select Category</label>
          <select id="category" value={categoryName} onChange={(e) => setCategoryName(e.target.value)}>
            {category?.length > 0 &&
              category?.map((categoryItem) => (
                <option key={categoryItem.id} value={categoryItem.id}>
                  {categoryItem?.name}
                </option>
              ))}
          </select>
        </div>

        <div className="mb-[1rem] w-[100%] flex items-start flex-col [&_label]:text-[1.4rem] [&_label]:font-[500] [&_label]:mb-[0.8rem] [&_select]:w-[100%] [&_select]:[border:1px_solid_#ddd] [&_select]:p-[1rem] [&_select]:rounded-[4px] [&_select]:text-[1.6rem] [&_select]:focus:[outline:1px] [&_input]:w-[100%] [&_input]:[border:1px_solid_#ddd] [&_input]:p-[1rem] [&_input]:rounded-[4px] [&_input]:text-[1.6rem] [&_textarea]:w-[100%] [&_textarea]:[border:1px_solid_#ddd] [&_textarea]:p-[1.8rem] [&_textarea]:rounded-[4px] [&_textarea]:text-[1.6rem] [&_textarea]:[resize:none]">
          <label htmlFor="title">Title</label>
          <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>

        <div className="mb-[1rem] w-[100%] flex items-start flex-col [&_label]:text-[1.4rem] [&_label]:font-[500] [&_label]:mb-[0.8rem] [&_select]:w-[100%] [&_select]:[border:1px_solid_#ddd] [&_select]:p-[1rem] [&_select]:rounded-[4px] [&_select]:text-[1.6rem] [&_select]:focus:[outline:1px] [&_input]:w-[100%] [&_input]:[border:1px_solid_#ddd] [&_input]:p-[1rem] [&_input]:rounded-[4px] [&_input]:text-[1.6rem] [&_textarea]:w-[100%] [&_textarea]:[border:1px_solid_#ddd] [&_textarea]:p-[1.8rem] [&_textarea]:rounded-[4px] [&_textarea]:text-[1.6rem] [&_textarea]:[resize:none]">
          <label htmlFor="tag">Keyword</label>
          <input type="text" id="tag" ref={keyWordRef} value={tag} onChange={(e) => setTag(e.target.value)} onKeyPress={handleKeyPress} />
        </div>

        {getTags()}

        <hr className="bg-[#ddd] [border:0px_solid_transparent] h-[.1rem] w-[100%] mt-[1rem] mb-[3rem]" />

        {/* <div style={{ alignSelf: "flex-start" }}>
          <FormControlLabel onClick={handleSchemaInput} value="schema" control={<Checkbox />} label="Schema" />
        </div>

        {openSchema && (
          <>
            <div className="mb-[1rem] w-[100%] flex items-start flex-col [&_label]:text-[1.4rem] [&_label]:font-[500] [&_label]:mb-[0.8rem] [&_select]:w-[100%] [&_select]:[border:1px_solid_#ddd] [&_select]:p-[1rem] [&_select]:rounded-[4px] [&_select]:text-[1.6rem] [&_select]:focus:[outline:1px] [&_input]:w-[100%] [&_input]:[border:1px_solid_#ddd] [&_input]:p-[1rem] [&_input]:rounded-[4px] [&_input]:text-[1.6rem] [&_textarea]:w-[100%] [&_textarea]:[border:1px_solid_#ddd] [&_textarea]:p-[1.8rem] [&_textarea]:rounded-[4px] [&_textarea]:text-[1.6rem] [&_textarea]:[resize:none]">
              <label htmlFor="title">Title</label>
              <input type="text" id="title" />
            </div>

            <div className="mb-[1rem] w-[100%] flex items-start flex-col [&_label]:text-[1.4rem] [&_label]:font-[500] [&_label]:mb-[0.8rem] [&_select]:w-[100%] [&_select]:[border:1px_solid_#ddd] [&_select]:p-[1rem] [&_select]:rounded-[4px] [&_select]:text-[1.6rem] [&_select]:focus:[outline:1px] [&_input]:w-[100%] [&_input]:[border:1px_solid_#ddd] [&_input]:p-[1rem] [&_input]:rounded-[4px] [&_input]:text-[1.6rem] [&_textarea]:w-[100%] [&_textarea]:[border:1px_solid_#ddd] [&_textarea]:p-[1.8rem] [&_textarea]:rounded-[4px] [&_textarea]:text-[1.6rem] [&_textarea]:[resize:none]">
              <label htmlFor="title">Keyword</label>
              <input type="text" id="keyword" />
            </div>
          </>
        )} */}

        {/* <Spacing space={{ height: "2rem" }} /> */}

        <div className="flex items-center justify-center">
          <Button onClick={handleProductSubmit} value="submit" type="submit" className="text-[#fff] font-[400] font-['Roboto',sans-serif] capitalize text-[1.5rem] rounded-[3rem] opacity-[1] leading-[1.75] p-[0.6rem_3rem] mr-[.8rem] ml-[.5rem] [border:.2rem_solid] border-[transparent] bg-[#0088f2] [transition:all_0.3s_linear] hover:border-[#0088f2] hover:text-[#0088f2] hover:font-[500]">
            Submit
          </Button>
          <Button onClick={handleProductSubmit} value="save" className="text-[#fff] font-[400] font-['Roboto',sans-serif] capitalize text-[1.5rem] rounded-[3rem] opacity-[1] leading-[1.75] p-[0.6rem_3rem] mr-[.8rem] ml-[.5rem] [border:.2rem_solid] border-[transparent] bg-[#114960] [transition:all_0.3s_linear] hover:border-[#114960] hover:text-[#114960] hover:font-[500]">
            Save
          </Button>
          <Button className="text-[#fff] font-[400] font-['Roboto',sans-serif] capitalize text-[1.5rem] rounded-[3rem] opacity-[1] leading-[1.75] p-[0.6rem_3rem] mr-[.8rem] ml-[.5rem] [border:.2rem_solid] border-[transparent] bg-[#D9D9D9] text-[#696969] [transition:all_0.3s_linear] hover:border-[#D9D9D9] hover:text-[#444] hover:font-[500]" onClick={() => setOpenModal(false)}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditItem;
