import React from "react";
import { Card, Button } from "antd";
import { Link } from "react-router-dom";

const PetCard = ({ pet }) => {
  return (
    <Card
      title={pet.name}
      extra={
        <Link to={`/pet/${pet.id}`}>
          <Button type="primary">Ver Detalhes</Button>
        </Link>
      }
      style={{ width: 300, margin: "16px" }}
    >
    </Card>
  );
};

export default PetCard;
