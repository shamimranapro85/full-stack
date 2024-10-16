"use client";
import React, { useEffect, useState } from "react";

const Local_storage = () => {
  const [data, setdata] = useState("");

  useEffect(() => {
    setdata(localStorage.getItem("islogin"));
  }, [data]);
  return <div></div>;
};

export default Local_storage;
