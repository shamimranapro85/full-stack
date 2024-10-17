"use client";
import Link from "next/link";
import React, { useState } from "react";
import { FaMountainCity, FaUser } from "react-icons/fa6";
import Typography from "@mui/material/Typography";

import { Button, TextField } from "@mui/material";
import { backendURL, Loading_div } from "./small_service/feature";

import { useRouter } from "next/navigation";
import axios from "axios";
const Login = () => {
  const [loading, setLoading] = useState("");
  const [err, seterr] = useState("");
  const router = useRouter();
  const [data, setData] = useState({});

  const hanndleChange = async (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const OnSubmite = async () => {
    try {
      setLoading("loading");
      const LoginResponsed = await axios.post(`${backendURL}/user/login`, {
        email: data.email,
        password: data.password,
      });
      setLoading("");
      localStorage.clear();
      localStorage.setItem("islogin", LoginResponsed.data.payLoad);
      router.push("/");
      window.location.href = "/";
    } catch (error) {
      setLoading("");
      seterr(error.response.data.message);
      console.log(error);
      
    }
  };


  let nextButtonStyle = {
    boxShadow: "none", // Remove default shadow
    "&:hover": {
      boxShadow: "none", // Remove hover shadow
    },
    width: "auto",
    background: "blue",
    display:"flex",
    paddingTop: "5px",
    borderRadius:"800px",
    fontWeight:"500",
    fontSize: "8px",
    alignSelf: "flex-end"

  }
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
                name="email"
                id="outlined-basic"
                sx={{
                  marginBottom : "10px",
                }}
                label="Email"
                variant="outlined"
                size="small"
              />
              <TextField
                onChange={hanndleChange}
                name="password"
                id="outlined-basic"
                label="Password"
                type="password"
                variant="outlined"
                size="small"
              />
              <Link
                className="text-blue-600 text-[10px] mt-1 hover:underline"
                href={"/shamim"}
              >
                Forgot email/password
              </Link>
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

                      width: "auto",
                      
                      display:"flex",
                      paddingTop: "5px",
                      borderRadius:"800px",
                      fontWeight:"500",
                      fontSize: "8px",
                      alignSelf: "flex-end"
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
                  sx={nextButtonStyle}
                  variant="contained"
                  
                  size="small"
                  onClick={OnSubmite}
                >
                 {loading ? Loading_div : ""} Next
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

export default Login;
