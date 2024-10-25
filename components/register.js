"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaMountainCity, FaUser } from "react-icons/fa6";
import Typography from "@mui/material/Typography";

import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { backendURL, Loading_div } from "./small_service/feature";

const Register = () => {
  const [data, setData] = useState({});
  const [err, seterr] = useState("");
  const [loading, setLoading] = useState("");
  const [nameValid, setNameValidation] = useState("");
  let [emailValid, setEmailValidation] = useState("");
  const [passwordValid, setpasswordValidation] = useState("");
  const [againpasswordValid, setaginpasswordValidation] = useState("");

  let [otpButton, setotpButton] = useState("");

  const hanndleChange = (e) => {
    let time = 1000;
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });

    setTimeout(() => {
      let name = e.target.name;

      let value = e.target.value;

      switch (name) {
        case "name":
          if (value == "" || value.length < 3 || value.length > 31) {
            setNameValidation("true");
          } else {
            setNameValidation("");
          }
          break;
        case "email":
          if (value == "") {
            setEmailValidation("true");
          } else {
            setEmailValidation("");
          }
          break;
        case "password":
          if (value == "" || value.length < 4) {
            setpasswordValidation("true");
          } else {
            setpasswordValidation("");
          }
          break;
        case "againpassword":
          if (value == "" || value.length < 4) {
            setaginpasswordValidation("true");
          } else {
            setaginpasswordValidation("");
          }
          break;
        default:
          break;
      }
    }, time);
  };

  useEffect(() => {
    let time = 3000;
    setTimeout(() => {
      seterr("");
    }, time);
  }, [err, loading]);
  const router = useRouter();
  const OnSubmitted = async () => {
    try {
      setLoading("loading");
      const responsed = await axios.post(
        `${backendURL}/user/register/otp`,
        data,
        { withCredentials: true }
      );

      setLoading("");
      seterr(responsed.data.payLoad.message);

      responsed.data.payLoad.againpassword = responsed.data.payLoad.password;
      console.log(responsed.data.payLoad);

      if (!(responsed.data.payLoad.err == true)) {
        localStorage.setItem(
          "TemporaryData",
          JSON.stringify(responsed.data.payLoad)
        );
        router.push("/verificationOTP");
      }
      setotpButton("true");
      seterr(responsed.data.message);

      return;
    } catch (error) {
      setLoading("");
      console.log(error);

      error.response
      ? seterr(error.response?.data.message)
      : error.message == "Network Error"
      ? seterr("bakcend not working because :" + error.message)
      : "";
    }
  };

  let nextButtonStyle = {
    boxShadow: "none", // Remove default shadow
    "&:hover": {
      boxShadow: "none", // Remove hover shadow
    },
    width: "auto",
    background: "blue",
    display: "flex",
    paddingTop: "5px",
    borderRadius: "800px",
    fontWeight: "500",
    fontSize: "8px",
    alignSelf: "flex-end",
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen w-screen bg-gray-200">
        <div className="flex flex-col gap-2 transform scale-150 ">
          <span className="text-center text-red-500 capitalize">{err}</span>
          <div className="bg-white p-5 grid grid-cols-1 lg:grid-cols-2 rounded-2xl">
            <div>
              <FaMountainCity className="text-green-500 text-3xl" />
              <Typography variant="" className="text-xl" color="initial">
                Create Account
              </Typography>
              <p className="text-[15px]">Enter your information</p>
            </div>
            <div className="flex mt-5 flex-col">
              <TextField
                name="name"
                error={nameValid}
                onChange={hanndleChange}
                id="outlined-basic"
                sx={{
                  marginBottom: "10px",
                }}
                label="Full name"
                required
                variant="outlined"
                size="small"
              />
              <TextField
                name="email"
                error={emailValid}
                onChange={hanndleChange}
                sx={{
                  marginBottom: "10px",
                }}
                id="outlined-basic"
                label="Email"
                type="Email"
                required
                variant="outlined"
                size="small"
              />
              <TextField
                error={passwordValid}
                required
                name="password"
                onChange={hanndleChange}
                id="outlined-basic"
                label="Password"
                type="password"
                variant="outlined"
                sx={{
                  marginBottom: "10px",
                }}
                size="small"
              />
              <TextField
                error={againpasswordValid}
                required
                name="againpassword"
                onChange={hanndleChange}
                id="outlined-basic"
                label="again type your Password"
                type="password"
                variant="outlined"
                sx={{
                  marginBottom: "10px",
                }}
                size="small"
              />
              {otpButton ? (
                <Link
                  className="text-blue-600 text-[11px] mt-1 hover:underline flex items-center justify-center"
                  href={"/verificationOTP"}
                >
                  <span className="mr-2">verify by otp</span>
                </Link>
              ) : (
                ""
              )}

              <div className="flex lg:justify-end gap-2 mt-8 justify-between ">
                <Link
                  className="text-blue-600 text-[11px] mt-1 capitalize flex items-center justify-center"
                  href={"/login"}
                >
                  <Button
                    sx={{
                      boxShadow: "none", // Remove default shadow
                      "&:hover": {
                        boxShadow: "none", // Remove hover shadow
                      },

                      width: "auto",

                      display: "flex",
                      paddingTop: "5px",
                      borderRadius: "800px",
                      fontWeight: "500",
                      fontSize: "8px",
                      alignSelf: "flex-end",
                    }}
                    variant="contained"
                    className="w-auto hover:bg-blue-100 self-end rounded-2xl pt-[5px] font-semibold capitalize text-[8px]"
                    size="small"
                    color=""
                  >
                    if you already register then login
                  </Button>
                </Link>

                {loading ? (
                  <Button
                    sx={{
                      boxShadow: "none", // Remove default shadow
                      "&:hover": {
                        boxShadow: "none", // Remove hover shadow
                      },
                    }}
                    variant="contained"
                    className="w-auto bg-blue-700 self-end rounded-2xl pt-[5px] font-semibold  text-[8px]"
                    size="small"
                    onClick={OnSubmitted}
                  >
                    {Loading_div}
                    wait
                  </Button>
                ) : (
                  <Button
                    sx={nextButtonStyle}
                    variant="contained"
                    size="small"
                    onClick={OnSubmitted}
                  >
                    Next
                  </Button>
                )}
              </div>
            </div>
          </div>
          <div className="p-3 text-sm  text-gray-600 flex justify-between">
            <div>English.</div>
            <div className="flex gap-2">
              <Link href={"/help"}>Help</Link>
              <Link href={"/Privacy"}>Privacy</Link>
              <Link href={"/Terms"}>Terms</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
