import React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "antd";

function Pet({ pet }) {
  const navigate = useNavigate();
  const { Meta } = Card;

  return (
  
  <Card
    className="pet-card"
    onClick={() => navigate(`/details-pet/${pet._id}`)}
    cover={
      <img
        alt={pet.name}
        src={pet.urlPic}
        className="pet-card-img"
      />
    }
  >
    <Meta
      title={pet.name.toUpperCase()}
    />
  </Card>

  );
}

export default Pet;