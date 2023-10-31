import React, { useState } from 'react';

const ApplicationForm = ({ onSubmit }) => {
  const [applicationData, setApplicationData] = useState({
    nome: '',
    
  });

  const handleFormSubmit = () => {
    // Valide os campos do formulário, se necessário
    onSubmit(applicationData);
  };

  return (
    <div>
      <p>Formulário de adoção</p>
      <input
        type="text"
        placeholder="Nome"
        value={applicationData.nome}
        onChange={(e) => setApplicationData({ ...applicationData, nome: e.target.value })}
      />
      <button onClick={handleFormSubmit}>Enviar Aplicação</button>
    </div>
  );
};

export default ApplicationForm;
