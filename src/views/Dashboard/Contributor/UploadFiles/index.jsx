"use client";

import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, CardContent, Grid, Typography, useMediaQuery } from "@/components/ui-kit";
import { CheckCircleOutlined as CheckCircleRoundedIcon } from "@ant-design/icons";
import { Box, LinearProgress } from "@/components/ui-kit";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useSelector } from "react-redux";
import { useHistory } from "@/lib/router";
import { toast } from "react-toastify";
import fileThumbnail from "../../../../assets/icons/fileThumpnail.png";
import Spacing from "../../../../components/Spacing";
import AdminHeader from "../../../../components/ui/dashboard/contributor/Header";
import Heading from "../../../../components/ui/dashboard/contributor/Heading";
import Sidebar from "../../../../components/ui/dashboard/contributor/Sidebar";
import Footer from "../../../../components/ui/Footer";
import { expiredLoginTime } from "../../../../helpers";
import Layout from "../../../../Layout";

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2">{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

const UploadFiles = () => {
  const history = useHistory();
  const mobileView = useMediaQuery("(max-width:769px)");
  const user = useSelector((state) => state.user);

  const [imageError, setImageError] = useState({});

  let isUploadBtnDisabled = true;
  // let disableUploadButton;
  const [disableDeleteBtn, setDisableDeleteBtn] = useState(false);
  // const [disabledBtn, setDisabledBtn] = useState(false);

  //for tag element
  const [files, setFiles] = useState([]);
  const [thumbImage, setThumbImage] = useState("");
  const [isImageDimensionOkay, setImageDimensionOkay] = useState(false);

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    accept: "image/*, .ai,.eps,.psd,.svg",
    noKeyboard: true,
    onDrop: (acceptedFiles) => {
      setThumbImage(acceptedFiles[0]);
      const fileData = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      if (files.length === 0) {
        setFiles(fileData);
      } else {
        setFiles((prevFiles) => [...fileData, ...prevFiles]);
      }
    },
  });

  //reject file
  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <div className="h-[5.3rem] flex pl-[2rem] rounded-[0.3rem] bg-[#fce4e4e0]" key={file.path}>
      {errors.map((e) => (
        <div className="text-[red] text-[2rem] flex items-center justify-center" key={e.code}>
          {e.message}
        </div>
      ))}
    </div>
  ));

  //upload file
  let tokenMatch = {};
  const uploadFile = (file, index) => {
    const chunkSize = 5242880;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/images/upload`;
    const element = file;
    const fileName = element.name.split(".")[0];

    // let timer = null;

    return new Promise((resolve, reject) => {
      var fr = new FileReader();
      fr.onload = async (ev) => {
        const fileSize = ev.target.result.byteLength;

        if (fileSize < chunkSize) {
          const headers = {
            Authorization: user.token,
            "content-type": "application/octet-stream",
            start: true,
            end: true,
            "file-name": element.name,
          };

          if (tokenMatch[fileName]) {
            headers["token-id"] = tokenMatch[fileName];
          }

          try {
            const data = await fetch(url, {
              method: "POST",
              headers,
              body: ev.target.result,
            });

            const response = await data.json();

            if (response.errors) {
              toast.error(response.errors);
              // return;
            } else if (response.status) {
              tokenMatch[fileName] = response.token_id;
              let temp_files = [...files];
              temp_files[index].progress = 100;
              setFiles(temp_files);
              resolve();
            }
          } catch (error) {
            console.log("File upload error", error);
            if (error.response.status === 401) {
              expiredLoginTime();
            }
            reject();
          }
        } else {
          let uploadId;
          let uploadedData = 0;

          for (let i = 0; i < fileSize / chunkSize + 1; i++) {
            const chunk = ev.target.result.slice(i * chunkSize, i * chunkSize + chunkSize);

            if (!i) {
              const headers = {
                Authorization: user.token,
                "content-type": "application/octet-stream",
                start: true,
                "file-name": element.name,
              };

              if (tokenMatch[fileName]) {
                headers["token-id"] = tokenMatch[fileName];
              }

              try {
                let response = await fetch(url, {
                  method: "POST",
                  headers,
                  body: chunk,
                });

                response = await response.json();
                tokenMatch[fileName] = response.token_id;
                uploadId = response.upload_id;
              } catch (error) {
                console.error(error);
                reject();
              }
            } else if (i === Math.ceil(fileSize / chunkSize + 1) - 1) {
              try {
                let response = await fetch(url, {
                  method: "POST",
                  headers: {
                    Authorization: user.token,
                    "content-type": "application/octet-stream",
                    "upload-id": uploadId,
                    "part-number": i + 1,
                    "file-name": element.name,
                    end: true,
                  },
                  body: chunk,
                });
                response = await response.json();
              } catch (error) {
                console.error(error);
              }
            } else {
              try {
                let response = await fetch(url, {
                  method: "POST",
                  headers: {
                    Authorization: user.token,
                    "content-type": "application/octet-stream",
                    "upload-id": uploadId,
                    "part-number": i + 1,
                    "file-name": element.name,
                  },
                  body: chunk,
                });
                response = await response.json();
              } catch (error) {
                console.error(error);
              }
            }

            uploadedData += chunk.byteLength;
            const percentage = Math.round((uploadedData / fileSize) * 100);

            let temp_files = [...files];
            temp_files[index].progress = percentage;
            setFiles(temp_files);
          }
          resolve();
        }
      };
      fr.onerror = reject;
      fr.readAsArrayBuffer(element);
    });
  };

  const handleUpload = async (e) => {
    if (files.length === 0) {
      toast.error("Sorry, you did not upload any files.");
      return;
    }
    // disableUploadButton = true;
    isUploadBtnDisabled = true;
    setDisableDeleteBtn(true);
    // setDisabledBtn(true);

    for (let i = 0; i < files.length; i++) {
      let temp_files = [...files];
      temp_files[i].progress = 0;
      setFiles(temp_files);
      await uploadFile(files[i], i);
    }

    history.push("/contributor/pending");
  };

  //remove file function
  const removeFile = (file, itemIndex) => {
    const index = files.indexOf(file);
    files.splice(index, 1);
    setFiles((prevFiles) => [...prevFiles]);
  };

  const isActive = isDragActive && "2px dashed #26AA10";

  function checkFileSize(file) {
    let fileStatus = [];

    let fileName = [];
    let mainFileName = [];

    files?.map((file) => {
      if (file.name.match(/\.(jpg|jpeg|png|gif)$/)) {
        fileName.push(file.name.split(".")[0]);
      }

      if (file.name.match(/\.(eps|psd|ai|svg)$/)) {
        mainFileName.push(file.name.split(".")[0]);
      }

      if (
        (file.name.match(/\.(jpg|jpeg|png|gif)$/) && file.size < 104858) ||
        file.size > 83886080 ||
        (file.name.match(/\.(eps)$/) && file.size > 83886080) ||
        (file.name.match(/\.(psd)$/) && file.size < 1572864)
      ) {
        fileStatus.push(true);
        isUploadBtnDisabled = false;
        return false;
      } else {
        fileStatus.push(false);
        isUploadBtnDisabled = true;
        return true;
      }
    });

    const checkFile = fileStatus.find((item) => item === true);

    const checkFileName = mainFileName.find((element) => !fileName.includes(element));

    if (checkFileName) {
      toast.error(`${checkFileName} no preview file`);
      isUploadBtnDisabled = true;
      return true;
    }

    if (fileStatus.length > 0) {
      if (checkFile) {
        isUploadBtnDisabled = true;
        return true;
      } else {
        isUploadBtnDisabled = false;
        return false;
      }
    }
  }

  const getUploadFiles = () => {
    checkFileSize();
    return files?.map((file, index) => {
      return (
        <div className="files-wrapper" key={file.name}>
          {(file.name.match(/\.(jpg|jpeg|png|gif)$/) && file.size < 104858) ||
          file.size > 83886080 ||
          (file.name.match(/\.(eps)$/) && file.size > 83886080) ||
          (file.name.match(/\.(psd)$/) && file.size < 1572864) ? (
            <div className="bg-[#fce4e4e0] block w-[100%] mb-[1rem]">
              <div className="flex justify-start items-center [transition:all_0.2s_linear] pr-[1rem] hover:bg-[#f8b3b363]">
                <div className="w-[10rem] text-[0rem] [&_img]:h-[100%] [&_img]:w-[100%] [&_img]:object-cover">
                  {file?.name?.match(/\.(ai|eps|psd|svg)$/) ? (
                    <img src={fileThumbnail.src} alt="Piktask" className="[border:1px_solid_#c9c9c9] bg-[#ddd] p-[1rem_3rem]" />
                  ) : (
                    <img src={file.preview} alt="Piktask" />
                  )}
                </div>
                <Typography className="text-[1.7rem] font-[500] ml-[2rem] text-[red] [&_span]:text-[red] [&_span]:text-[1.3rem]">
                  {file.name} <br /> <span>{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                </Typography>

                <Box className="w-[15%] ml-[auto] [&_p]:text-[1.5rem] [&_span]:h-[0.7rem] [&_span]:rounded-[0.3rem]">
                  <LinearProgressWithLabel value={file.progress || 0} />
                </Box>

                <button className="p-[1rem] rounded-[0.3rem] [transition:all_0.2s_linear] ml-[2rem] cursor-pointer [&_svg]:text-[red] [&_svg]:text-[1.8rem] hover:text-[red] disabled:text-[#ddd] disabled:cursor-default" onClick={(e) => removeFile(file, index)} disabled={disableDeleteBtn}>
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button>
              </div>
            </div>
          ) : (
            <div className="block w-[100%] mb-[1rem]">
              <div className="flex justify-start items-center [transition:all_0.2s_linear] pr-[1rem] hover:bg-[#e3e3e363]">
                <div className="w-[10rem] text-[0rem] [&_img]:h-[100%] [&_img]:w-[100%] [&_img]:object-cover">
                  {file?.name?.match(/\.(ai|eps|psd|svg)$/) ? (
                    <img src={fileThumbnail.src} alt="thumbnail" className="[border:1px_solid_#c9c9c9] bg-[#ddd] p-[1rem_3rem]" />
                  ) : (
                    <img src={file.preview} alt="thumbnail" />
                  )}
                </div>

                <Typography className="text-[1.7rem] font-[500] ml-[2rem] [&_span]:text-[gray] [&_span]:text-[1.3rem]">
                  {file.name} <br /> <span>{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                </Typography>

                <Box className="w-[15%] ml-[auto] [&_p]:text-[1.5rem] [&_span]:h-[0.7rem] [&_span]:rounded-[0.3rem]">
                  <LinearProgressWithLabel value={file.progress || 0} />
                </Box>

                <button className="p-[1rem] rounded-[0.3rem] [transition:all_0.2s_linear] ml-[2rem] cursor-pointer [border:none] hover:bg-[#d1d1d1] [&_svg]:text-[1.8rem] disabled:text-[#ddd] disabled:cursor-default" onClick={(e) => removeFile(file, index)} disabled={disableDeleteBtn}>
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button>
              </div>
            </div>
          )}
        </div>
      );
    });
  };

  const displayErrors = () => {
    if (Object.keys(imageError)) {
      for (let key in imageError) {
        if (imageError.hasOwnProperty(key)) {
          return <p className="text-[red] font-[bold] text-[1.6rem]">{imageError[key]}</p>;
        }
      }
    }
  };

  return (
    <Layout title="Upload">
      <div className="">
        {mobileView ? null : <Sidebar className="mt-[0rem] max-[768.95px]:hidden" />}

        <main className="p-[0] ml-[28rem] max-[768.95px]:w-[100%] max-[768.95px]:ml-[0rem]">
          <AdminHeader />
          <div className="mt-[10rem] m-[2rem] max-[768.95px]:p-[0rem_2rem]">
            <Heading className="m-[0_0_2rem_0rem]" tag="h2">
              What type of content are you going to upload?
            </Heading>
            <Card>
              <CardContent className="p-[1rem_2rem] [border:0.7px_solid_lightgray] [&_h2]:mb-[1.5rem]">
                <Grid container>
                  <Grid size={{ xs: 12, sm: 6, md: 4 }} className="max-[1270px]:mb-[3rem]">
                    <div className={"relative pr-[3.5rem] before:content-[\"\"] before:absolute before:w-[.2rem] before:h-[74%] before:bg-[#E6E6E6] before:top-[60%] before:right-[0] before:mr-[2.5rem] before:[transform:translateY(-50%)] max-[960px]:before:bg-[transparent] max-[960px]:before:w-[0] max-[960px]:before:h-[0] max-[960px]:before:[transform:translateY(0)]"}>
                      {/* <Heading tag="h4"></Heading> */}
                      <Typography variant="h2">Vectors</Typography>
                      <div className="flex mb-[1rem] [&_svg]:m-[0.2rem_1rem_0_0]">
                        <CheckCircleRoundedIcon />
                        <Typography>EPS and a JPG preview file (with the same name) up to 80MB</Typography>
                      </div>
                      <div className="flex mb-[1rem] [&_svg]:m-[0.2rem_1rem_0_0]">
                        <CheckCircleRoundedIcon />
                        <Typography>RGB Color</Typography>
                      </div>
                      <div className="flex mb-[1rem] [&_svg]:m-[0.2rem_1rem_0_0]">
                        <CheckCircleRoundedIcon />
                        <Typography>Preview files must be between 800px and 500px on any of the sides.</Typography>
                      </div>
                      <div className="flex mb-[1rem] [&_svg]:m-[0.2rem_1rem_0_0]">
                        <CheckCircleRoundedIcon />
                        <Typography>Titles and tags can be included in preview file. How can I do this?</Typography>
                      </div>
                    </div>
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6, md: 4 }} className="max-[1270px]:mb-[3rem]">
                    <div className={"relative pr-[3.5rem] before:content-[\"\"] before:absolute before:w-[.2rem] before:h-[74%] before:bg-[#E6E6E6] before:top-[60%] before:right-[0] before:mr-[2.5rem] before:[transform:translateY(-50%)] max-[960px]:before:bg-[transparent] max-[960px]:before:w-[0] max-[960px]:before:h-[0] max-[960px]:before:[transform:translateY(0)]"}>
                      <Heading tag="h2">PSD</Heading>

                      <div className="flex mb-[1rem] [&_svg]:m-[0.2rem_1rem_0_0]">
                        <CheckCircleRoundedIcon />
                        <Typography>PSD between 1.5MB and 250MB and a JPG preview file (with the same name)</Typography>
                      </div>
                      <div className="flex mb-[1rem] [&_svg]:m-[0.2rem_1rem_0_0]">
                        <CheckCircleRoundedIcon />
                        <Typography>Color: sRGB, Adobe RGB, Prophoto RGB or P3</Typography>
                      </div>
                      <div className="flex mb-[1rem] [&_svg]:m-[0.2rem_1rem_0_0]">
                        <CheckCircleRoundedIcon />
                        <Typography>Preview files must be between 800px and 500px on any of the sides.</Typography>
                      </div>
                      <div className="flex mb-[1rem] [&_svg]:m-[0.2rem_1rem_0_0]">
                        <CheckCircleRoundedIcon />
                        <Typography>Titles and tags can be included in preview file. How can I do this?</Typography>
                      </div>
                    </div>
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6, md: 4 }} className="max-[1270px]:mb-[3rem]">
                    <div>
                      <Heading tag="h2">Photos</Heading>

                      <div className="flex mb-[1rem] [&_svg]:m-[0.2rem_1rem_0_0]">
                        <CheckCircleRoundedIcon />
                        <Typography>Only JPG files Over 0.5MB</Typography>
                      </div>
                      <div className="flex mb-[1rem] [&_svg]:m-[0.2rem_1rem_0_0]">
                        <CheckCircleRoundedIcon />
                        <Typography>Color: sRGB, Adobe RGB, Prophoto RGB or P3</Typography>
                      </div>
                      <div className="flex mb-[1rem] [&_svg]:m-[0.2rem_1rem_0_0]">
                        <CheckCircleRoundedIcon />
                        <Typography>Photos must be between 800px and 500px on any of the sides.</Typography>
                      </div>
                      <div className="flex mb-[1rem] [&_svg]:m-[0.2rem_1rem_0_0]">
                        <CheckCircleRoundedIcon />
                        <Typography>Titles and tags can be included in preview file. How can I do this?</Typography>
                      </div>
                    </div>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            <Spacing space={{ height: "2.5rem" }} />
            <Heading tag="h2">Upload Your Content</Heading>

            <label
              htmlFor="btn-upload"
              className="flex flex-col justify-center items-center min-h-[30rem] [border:2px_dashed] border-[#114960] mb-[2.5rem] mt-[1.5rem] focus:[border:2px_dashed] focus:outline-none"
              {...getRootProps({
                onClick: (e) => (e.currentTarget.style.border = "2px dashed #26AA10"),
              })}
              style={{ border: isActive }}
            >
              <div className="flex-col text-[8.5rem] text-[#97A1A8] rounded-[100%] flex items-center justify-center mb-[0.8rem]">
                <input
                  {...getInputProps({
                    multiple: true,
                  })}
                />
                <FontAwesomeIcon icon={faCloudUploadAlt} />

                {/* <p className="text-[red] font-[bold] text-[1.6rem]"> */}
                {/* {imageError} */}
                {displayErrors()}
                {/* </p> */}

                <Typography className="text-[2.5rem] text-[#97A1A8] max-[479.95px]:p-[1rem] max-[479.95px]:text-center" variant="body1">
                  Drag and drop or click to upload an photo
                </Typography>

                {isImageDimensionOkay ? (
                  <Typography
                    className="text-[1.8rem] text-[#97A1A8]"
                    variant="body1"
                    // style={{ color: "red" }}
                  >
                    Your image dimension exceeds the limit. Preview files must be between 820px and 510px on any of the sides.
                  </Typography>
                ) : (
                  <Typography className="text-[1.8rem] text-[#97A1A8]" variant="body1">
                    Preview files must be between 800px and 500px on any of the sides.
                  </Typography>
                )}
              </div>
            </label>

            {!isImageDimensionOkay}

            {getUploadFiles()}

            <div className="m-[2.5rem_0_2rem_0] [border-bottom:0.7px_solid_lightgray]"></div>
            <div className="flex justify-between">
              <div className="w-[86%]">{fileRejectionItems}</div>
              <Button variant="contained" className="h-[5.3rem] p-[1rem_3rem] [border:none] rounded-[3px] text-[18px] cursor-pointer bg-[#0088f2] text-[white] [transition:all_0.3s_linear] hover:bg-[#0773c5] max-[479.95px]:w-[100%] max-[479.95px]:ml-[0%] max-[479.95px]:text-[14px] max-[479.95px]:p-[1rem_0.9rem] max-[479.95px]:[transform:translateX(0%)]" type="submit" disabled={disableDeleteBtn || isUploadBtnDisabled} onClick={handleUpload}>
                <FontAwesomeIcon icon={faCloudUploadAlt} className="mr-[7px]" />
                {disableDeleteBtn ? "Uploading..." : "Upload"}
              </Button>
            </div>
          </div>

          <Spacing space={{ height: "2rem" }} />
          <Footer />
        </main>
      </div>
    </Layout>
  );
};

export default UploadFiles;
