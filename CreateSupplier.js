import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateSupplier.css';

const CreateSupplier = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const response = await fetch('https://api-infnet-produtos-privado.vercel.app/fornecedores', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({ nome: name }),
    });

    if (response.ok) {
      setMessage('Fornecedor criado com sucesso!');
      setTimeout(() => {
        navigate('/fornecedores');
      }, 2000);
    } else {
      setMessage('Erro ao criar o fornecedor. Tente novamente.');
    }
  };

  return (
    <div className="create-supplier-container">
      <h1>Criar Novo Fornecedor</h1>
      <form onSubmit={handleSubmit} className="create-supplier-form">
        <div className="form-group">
          <label>Nome do Fornecedor:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <button type="submit">Criar Fornecedor</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default CreateSupplier;
