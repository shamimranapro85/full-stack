"use client";
import DashBoard from "@/components/Dashboard";

import Login from "@/components/Login";
import { backendURL } from "@/components/small_service/feature";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setdata] = useState("");

  // useEffect(() => {
  //   (async () => {
  //     let responsed = await axios.post(`${backendURL}/user/login`, {
  //       token: localStorage.getItem("islogin"),
  //     });
  //     setdata(responsed.data.payLoad);

  //   })();
  // }, []);

  return (
    <>
      {/* {data ? <DashBoard  name={data.name} email={data.email}/> : <Login />} */}
      <h1 className="text-red text-center text-6xl capitalize font-bold h-screen flex justify-center items-center">
        shamim <br/>
        shanto <br/>
        Forhad  
      </h1>

    </>
  );
}
