import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

function ProtectedRouteAdminVolunteer(props) {
  const [isAdmin, setIsAdmin] = useState(null);
  const [isVolunter, setIsVolunter] = useState(null);

  useEffect(() => {
    axios.post("/api/user/get-user-info-by-id", {}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((response) => {
      const userData = response.data.data;
      setIsAdmin(userData.isAdmin);
      setIsVolunter(userData.isVolunter);
    })
    .catch((error) => {
      console.error(error);
      setIsAdmin(false);
      setIsVolunter(false);
    });
  }, []);

  if (isAdmin === null || isVolunter === null) {
    return null;
  } else if (isAdmin || isVolunter) {
    return props.children;
  } else {
    return <Navigate to="/access-denied" />;
  }
}

export default ProtectedRouteAdminVolunteer;
