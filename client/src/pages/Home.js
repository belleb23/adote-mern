import React, { useEffect, useState } from "react";
import axios from "axios";

function Home() {

  const getData = async () => {
    try {
      const response = await axios.post("/api/user/get-user-info-by-id", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
        console.log(response.data);
    } catch (error) {
        console.log(error)
    }
  };

  return (
    <div>hOME</div>
  )
}

export default Home