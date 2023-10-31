import React, { useEffect } from "react";
import axios from "axios";
import Layout from "../components/Layout";

function HomeBackup() {

  const getData = async () => {
    try {
      const response = await axios.post(
        "/api/user/get-user-info-by-id", {},
        {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      console.log('alo')
        console.log(response.data);
        console.log(response.data.data);
        console.log(response.data.data.isAdmin);

    } catch (error) {
        console.log(error)
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Layout>
      <div>Home</div>
    </Layout>
    
  )
}

export default HomeBackup