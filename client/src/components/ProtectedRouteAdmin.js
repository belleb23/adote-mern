import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

function ProtectedRouteAdmin(props) {
  const [isAdmin, setIsAdmin] = useState(null);

  useEffect(() => {
    axios.post("/api/user/get-user-info-by-id", {}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((response) => {
      console.log(response.data);
      setIsAdmin(response.data.data.isAdmin);
    })
    .catch((error) => {
      console.error(error);
      setIsAdmin(false);
    });
  }, []);

  if (isAdmin === null) {
    return null;
  } else if (isAdmin) {
    return props.children;
  } else {
    return <Navigate to="/access-denied" />;
  }
}

export default ProtectedRouteAdmin;
