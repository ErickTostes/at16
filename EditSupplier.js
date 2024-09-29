import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import './EditSupplier.css';

const EditSupplier = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');
  const { _id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSupplier = async () => {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://api-infnet-produtos-privado.vercel.app/fornecedores/${_id}`, {
        method: 'GET',
        headers: {
          Authorization: token,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setNome(data.nome);
        setEmail(data.email);
        setTelefone(data.telefone);
        setEndereco(data.endereco);
      }
    };

    fetchSupplier();
  }, [_id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const updatedSupplier = {
      nome,
      email,
      telefone,
      endereco,
    };

    const response = await fetch(`https://api-infnet-produtos-privado.vercel.app/fornecedores/${_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify(updatedSupplier),
    });

    if (response.ok) {
      toast.success('Fornecedor atualizado com sucesso!');
      navigate('/fornecedores');
    } else {
      toast.error('Falha ao atualizar o fornecedor.');
    }
  };

  return (
    <div className="edit-supplier-container">
      <h1>Editar Fornecedor</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="telefone">Telefone</label>
          <input
            type="text"
            id="telefone"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="endereco">Endereço</label>
          <input
            type="text"
            id="endereco"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
            required
          />
        </div>
        <button type="submit">Salvar Alterações</button>
        <button type="button" onClick={() => navigate('/fornecedores')}>
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default EditSupplier;
