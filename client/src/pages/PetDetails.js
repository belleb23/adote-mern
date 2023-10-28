import React from "react";
import { useParams } from "react-router-dom";

const PetDetails = () => {
  const { id } = useParams();

  // Buscar os detalhes do pet com o ID fornecido e exibi-los
  // Você pode usar uma chamada à API para buscar os detalhes do pet aqui

  return (
    <div>
      <h1>Detalhes do Pet</h1>
      <p>ID do Pet: {id}</p>
      {/* Exiba mais detalhes do pet aqui */}
    </div>
  );
};

export default PetDetails;
