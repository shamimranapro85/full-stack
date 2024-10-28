"use client";
import DashBoard from "@/components/Dashboard";

import Login from "@/components/Login";
import { backendURL } from "@/components/small_service/feature";
import { Button, Popover, Typography } from "@mui/material";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function Home() {
  const [data, setdata] = useState("");

  useEffect(() => {
    (async () => {
      try {
        let responsed = await axios.post(
          `${backendURL}/user/login`,
          {
            token: Cookies.get("isLogin"),
          }
        );
        setdata(responsed.data.payLoad);
      } catch (error) {
        console.log(error);
        setdata({
          name: "server error",
          email:
            "please contact with develeoper " + error.response.data.message,
        });
      }
    })();
  }, []);

  return (
    <>
      <div className="bg-gray-50 border-y-2 border-gray-200 ">
        <nav className="md:flex container py-2 mx-auto px-2 hidden   justify-between items-center">
          <Profile data={data} />
          <div className="md:flex gap-4 hidden items-center">
            <Link href="/">Dashboard</Link>
            <Link href="/user">user</Link>
            <Link href="/product">Product</Link>
            <Link href="/product">Product</Link>
            <Link href="/product">Product</Link>
            <Link href="/product">Product</Link>
          </div>
          <span>Logo</span>
        </nav>

        {/* for mobile version */}
        <nav className="md:hidden container py-2 mx-auto px-2  flex  justify-between items-center">
          <span>Logo</span>
          <div className="md:flex gap-4 hidden items-center">
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/product">Product</Link>
            <Link href="/product">Product</Link>
            <Link href="/product">Product</Link>
            <Link href="/product">Product</Link>
            <Link href="/product">Product</Link>
          </div>
          <Profile data={data} />
        </nav>
      </div>
    </>
  );
}

const Profile = ({ data }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const LogoutHnade = async () => {
    const responsed = await axios.get(`${backendURL}/user/logout`, {
      withCredentials: true,
    });
    window.location.reload();
  };

  return (
    <>
      <div
        className="h-6 w-6 rounded-full p-4 bg-yellow-300 flex border-2 items-center justify-center border-black focus:outline-none focus:ring-2 focus:ring-blue-300 active:translate-y-1 hover:shadow-md hover:border-green-400 hover:text-white transition-all duration-100  hover:bg-gray-700"
        onClick={handleClick}
      >
        S
      </div>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        sx={{
          "& .MuiPopover-paper": {
            p: 2,
            display: "flex",
            gap: "2px",
            flexDirection: "column",
          },
        }}
      >
        <div className="flex justify-between">
          <Typography
            sx={{
              fontSize: "20px",
              textTransform: "uppercase",
              fontWeight: "bold",
            }}
          >
            {data.name}
          </Typography>
          <Button
            sx={{
              width: "auto",
              alignSelf: "self-end",
              fontWeight: "bold",
              bgcolor: "whitesmooth",
              borderRadius: "4px",
              padding: "2px 8px",
              textTransform: "capitalize",
              color: "black",
              border: "1px solid gray",

              fontSize: "10px",
            }}
          >
            your Profile..
          </Button>
        </div>
        <Typography sx={{}}>{data.email}</Typography>
        <Button
          onClick={LogoutHnade}
          sx={{
            width: "auto",
            alignSelf: "self-end",
            fontWeight: "bold",
            bgcolor: "#8c3f47",
            borderRadius: "4px",
            padding: "2px 8px",
            textTransform: "capitalize",
            color: "white",
            mt: "30px",
            fontSize: "10px",
          }}
        >
          Logout
        </Button>
      </Popover>
    </>
  );
};
