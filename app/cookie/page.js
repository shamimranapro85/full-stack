"use client";
import { backendURL } from "@/components/small_service/feature";
import axios from "axios";
import Button from '@mui/material/Button'

const page = () => {
  const cookieCreaation =async () => {
    let respon =await axios.get(`${backendURL}/user/cookie`, {
      withCredentials: true,
    });
    console.log(respon);
    
  };
  return (
    <>
     <Button  variant="text" color="default" onClick={cookieCreaation}>
       cookie set
     </Button>
    </>
  );
};

export default page;
