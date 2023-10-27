import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

function ProtectedRouteAdmin(props) {
  const [isAdmin, setIsAdmin] = useState(null);

  useEffect(() => {
    // Faça uma solicitação para verificar se o usuário é um administrador
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
    // Aguarde a verificação
    return null;
  } else if (isAdmin) {
    // O usuário é um administrador, permita o acesso à rota
    return props.children;
  } else {
    // O usuário não é um administrador, redirecione para a página de acesso negado
    return <Navigate to="/access-denied" />;
  }
}

export default ProtectedRouteAdmin;
