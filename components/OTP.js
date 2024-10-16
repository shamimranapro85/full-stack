"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import React, { useState } from "react";
import { FaMountainCity, FaUser } from "react-icons/fa6";
import Typography from "@mui/material/Typography";

import { Button, TextField } from "@mui/material";
import { backendURL, Loading_div } from "./small_service/feature";
import axios from "axios";

const Otp = () => {
  const [loading, setLoading] = useState("");
  const [err, seterr] = useState("");

  let userData = JSON.parse(localStorage.getItem("TemporaryData"));
  const resentEmail = async () => {
    try {
      setLoading("true");
      const responsed = await axios.post(
        "http://localhost:3001/user/register/otp",
        userData
      );
      setLoading("");
      console.log(responsed);

      seterr(responsed.data.message);

      return;
    } catch (error) {
      setLoading("");
      console.log(error);

      seterr(error.response.data.message);
    }
    console.log(userData.password);
  };

  const [data, setData] = useState({});
  const hanndleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  // on submite ==================================================
  const router = useRouter();
  const OnSubmitted = async (e) => {
    try {
      const otp_data = {
        otp: data.otp,
        email: userData.email,
      };

      const responsed = await axios.post(
        `${backendURL}/user/verification/register`,
        otp_data
      );

      
      seterr(responsed.data.message);
      const LoginResponsed = await axios.post(`${backendURL}/user/login`, {
        email: userData.email,
        password: userData.password,
      });
      localStorage.clear();
      localStorage.setItem("islogin", LoginResponsed.data.payLoad);
      router.push("/");
    } catch (error) {
      console.log(error);

      seterr(error.response.data.message);
    }
  };
  return (
    <>
      <div className="flex justify-center items-center h-screen w-screen bg-gray-200">
        <div className="flex flex-col gap-2 transform scale-150">
          <span className="text-center">{err}</span>
          <div className="bg-white p-5 grid grid-cols-1 lg:grid-cols-2 rounded-2xl">
            <div>
              <FaMountainCity className="text-green-500 text-3xl" />
              <Typography variant="" className="text-xl" color="initial">
                Sign in
              </Typography>
              <p className="text-[15px]">to continue to Email</p>
            </div>
            <div className="flex mt-5 flex-col">
              <TextField
                onChange={hanndleChange}
                name="otp"
                id="outlined-basic"
                label="Enter your Otp"
                type="number"
                variant="outlined"
                size="small"
              />
              <span
                className="text-blue-600 flex gap-2 items-center  cursor-pointer text-[10px] mt-1 hover:underline"
                onClick={resentEmail}
              >
                Resent Otp {loading ? Loading_div : ""}
              </span>
              <div className="flex lg:justify-end gap-2 mt-8 justify-between ">
                <Link
                  className="text-blue-600  mt-1  flex items-center justify-center"
                  href={"/register"}
                >
                  <Button
                    sx={{
                      boxShadow: "none", // Remove default shadow
                      "&:hover": {
                        boxShadow: "none", // Remove hover shadow
                      },
                    }}
                    variant="contained"
                    className="w-auto hover:bg-blue-100 self-end rounded-2xl pt-[5px] font-semibold capitalize text-[8px]"
                    size="small"
                    color=""
                  >
                    Create new Account
                  </Button>
                </Link>

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
                  Next
                </Button>
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

export default Otp;
