"use client";

import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Container, FormControl, TextareaAutosize, TextField, Typography } from "@/components/ui-kit";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import thumbnail from "../../assets/banner/hero-banner.jpg";
import Spacing from "../../components/Spacing";
import Footer from "../../components/ui/Footer";
import Header from "../../components/ui/Header";
import HeroSection from "../../components/ui/Hero";
import { imageObjSchema } from "../../helpers";
import Layout from "../../Layout";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [issueItem, setIssueItem] = useState([]);

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/others/contact_us/issues`, { cancelToken: source.token })
      .then(({ data }) => {
        console.log("data", data);
        if (data?.status) {
          const sortedData = data?.getIssues.sort((a, b) => a.id - b.id);
          setIssueItem((prevState) => [{ id: "0", name: "Select a category" }, ...sortedData]);
        }
      })
      .catch((error) => console.log("Categories loading error: ", error));

    return () => source.cancel();
  }, []);

  const handleSubjectChange = (event) => {
    setSubject(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    const validateEmail =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (email && !validateEmail.test(String(email))) {
      toast.error("Your email is invalid", { autoClose: 2200 });
      setLoading(false);
      return;
    } else if (!name) {
      setLoading(false);
      toast.error("The name field is required.", { autoClose: 2200 });
      return;
    } else if (!email) {
      setLoading(false);
      toast.error("The email field is required.", { autoClose: 2200 });
      return;
    } else if (!subject) {
      setLoading(false);
      toast.error("Please select a category.", { autoClose: 2200 });
      return;
    } else if (!message) {
      setLoading(false);
      toast.error("The description field is required.", { autoClose: 2200 });
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("contact_categories_id", subject);
    formData.append("message", message);

    const url = `${process.env.NEXT_PUBLIC_API_URL}/others/contact_us`;
    axios({
      method: "post",
      url,
      data: formData,
      cancelToken: source.token,
    })
      .then((res) => {
        if (res?.status === 200) {
          toast.success(res.data.message);
          setLoading(false);
          setName("");
          setEmail("");
          setSubject("");
          setMessage("");
        }
      })
      .catch((error) => {
        const { errors } = error.response.data;
        for (let key in errors) {
          toast.error(errors[key]);
        }
        setLoading(false);
      });

    return () => source.cancel();
  };

  useEffect(() => {
    const schemaObj = {
      name: document.title,
      contentUrl: document.location.href,
      acquireLicensePage: document.location.href,
      thumbnailUrl: `${process.env.NEXT_PUBLIC_API_URL}/media_images/company/piktak_logo.jpg`,
    };

    imageObjSchema(schemaObj);
  }, []);

  return (
    <Layout title=" Contact" ogImage={thumbnail}>
      <Header />

      <HeroSection contact isSearch />
      <Spacing space={{ height: "5rem" }} />
      <Container>
        <div className="p-[0rem_30rem] max-[1199.95px]:p-[0_2rem]">
          <div>
            <div className="text-[black]! text-[2.2rem]">
              <Typography variant="h2">Software and Service :</Typography>
            </div>
            <Spacing space={{ height: "1rem" }} />
            <div>
              <Typography className="text-justify text-[#173050] text-[1.6rem] leading-[28px]">
                Our Team piktask 24/7 is dedicated to support our beloved Customers.We have a good support team to the client.if you need any assistance for any
                software or service.You can just Email us directly at : bdtask@gmail.com or info@bdtask.com or submit a ticket. Our Response time is 24 hours
                maximum.
              </Typography>
              <Spacing space={{ height: "3rem" }} />
              <div>
                <Typography variant="h2">Submit a request </Typography>
              </div>
              <Spacing space={{ height: "1rem" }} />

              <form autoComplete="off" onSubmit={handleSubmit} className="bg-[White] rounded-[4px] p-[2.2rem] shadow-[3px_3px_10px_#cacaca8a]">
                <FormControl fullWidth className="mb-[1.4rem] [&_label]:mb-[0.5rem] [&_label>span]:text-[red]">
                  <label htmlFor="name">
                    Name <span>*</span>
                  </label>
                  <TextField
                    id="name"
                    InputLabelProps={{ shrink: true }}
                    className="[&_input]:p-[1.28rem_1.5rem] focus:[border:1px_solid_gray]! after:border-[gray] [&_p]:text-[14px]"
                    placeholder="Name"
                    variant="outlined"
                    fullWidth
                    // error={titleError}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </FormControl>
                <FormControl fullWidth className="mb-[1.4rem] [&_label]:mb-[0.5rem] [&_label>span]:text-[red]">
                  <label htmlFor="email">
                    Email <span>*</span>
                  </label>
                  <TextField
                    id="email"
                    InputLabelProps={{ shrink: true }}
                    className="[&_input]:p-[1.28rem_1.5rem] focus:[border:1px_solid_gray]! after:border-[gray] [&_p]:text-[14px]"
                    placeholder="Email"
                    variant="outlined"
                    fullWidth
                    // error={titleError}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormControl>

                <FormControl fullWidth className="mb-[1.4rem] [&_label]:mb-[0.5rem] [&_label>span]:text-[red]">
                  <label htmlFor="license">
                    What your problem is about? <span>*</span>
                  </label>
                  <TextField
                    id="license"
                    select
                    label=""
                    variant="outlined"
                    value={subject}
                    onChange={handleSubjectChange}
                    SelectProps={{
                      native: true,
                    }}
                  >
                    {issueItem?.length > 0 &&
                      issueItem?.map((issueItemItem) => (
                        <option key={issueItemItem.id} value={issueItemItem.id}>
                          {issueItemItem?.name}
                        </option>
                      ))}
                  </TextField>
                </FormControl>
                <FormControl fullWidth className="mb-[1.4rem] [&_label]:mb-[0.5rem] [&_label>span]:text-[red]">
                  <label htmlFor="description">
                    Description <span>*</span>
                  </label>
                  <TextareaAutosize
                    id="description"
                    className="w-[100%] max-w-[100%] text-[1.5rem] p-[1rem] rounded-[5px]"
                    aria-label="minimum height"
                    minRows={6}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </FormControl>
                <Button variant="contained" className="p-[1rem_3rem] ml-[50%] [transform:translateX(-50%)] [border:none] rounded-[3px] text-[18px] cursor-pointer bg-[#0088f2] text-[white] [transition:all_0.3s_linear] hover:bg-[#0773c5] max-[479.95px]:w-[100%] max-[479.95px]:ml-[0%] max-[479.95px]:text-[14px] max-[479.95px]:p-[1rem_0.9rem] max-[479.95px]:[transform:translateX(0%)]" type="submit" disabled={isLoading}>
                  <FontAwesomeIcon icon={faEnvelope} className="mr-[7px]" />
                  {isLoading ? "Sending..." : "Send"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </Container>
      <Spacing space={{ height: "4rem" }} />
      <Footer />
    </Layout>
  );
};

export default Contact;
