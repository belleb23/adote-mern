import React from "react";
import { Result, Button } from "antd";
import { Link } from "react-router-dom";

function AccessDenied() {
  return (
    <Result
      status="403"
      title="Acesso Negado"
      subTitle="Você não tem permissão para acessar esta página."
      extra={
        <Link to="/">
          <Button type="primary">Voltar à página inicial</Button>
        </Link>
      }
    />
  );
}

export default AccessDenied;