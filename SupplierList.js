import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SupplierList.css';

const SupplierList = () => {
  const [fornecedores, setFornecedores] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFornecedores = async () => {
      const token = localStorage.getItem('token');
      const response = await fetch('https://api-infnet-produtos-privado.vercel.app/fornecedores', {
        method: 'GET',
        headers: {
          Authorization: token,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setFornecedores(data);
      }
    };

    fetchFornecedores();
  }, []);

  const handleView = (id) => {
    navigate(`/fornecedores/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/edit-fornecedor/${id}`);
  };

  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    await fetch(`https://api-infnet-produtos-privado.vercel.app/fornecedores/${selectedSupplier}`, {
      method: 'DELETE',
      headers: {
        Authorization: token,
      },
    });
    setFornecedores(fornecedores.filter((fornecedor) => fornecedor._id !== selectedSupplier));
    setModalVisible(false);
    alert('Fornecedor excluído com sucesso!');
  };

  const openModal = (id) => {
    setSelectedSupplier(id);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedSupplier(null);
    setModalVisible(false);
  };

  return (
    <div className="supplier-list-container">
      <h1>Lista de Fornecedores</h1>
      <button className="create-button" onClick={() => navigate('/create-supplier')}>Criar Novo Fornecedor</button>
      <table className="supplier-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {fornecedores.map((fornecedor) => (
            <tr key={fornecedor._id}>
              <td>{fornecedor.nome}</td>
              <td>
                <button className="view-button" onClick={() => handleView(fornecedor._id)}>Ver</button>
                <button className="edit-button" onClick={() => handleEdit(fornecedor._id)}>Editar</button>
                <button className="delete-button" onClick={() => openModal(fornecedor._id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalVisible && (
        <div className="modal">
          <div className="modal-content">
            <h2>Confirmar Exclusão</h2>
            <p>Tem certeza que deseja excluir este fornecedor?</p>
            <div className="modal-buttons">
              <button className="confirm-button" onClick={handleDelete}>Sim</button>
              <button className="cancel-button" onClick={closeModal}>Não</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupplierList;
