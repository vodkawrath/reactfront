import React, { useEffect, useState } from 'react';
import api from '../services/api';

const DashboardPage = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await api.get('/proof/dashboard', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDashboardData(response.data);
      } catch (err) {
        setError('Erro ao carregar dados do dashboard');
      }
    };

    fetchDashboardData();
  }, []);

  if (error) return <p>{error}</p>;
  if (!dashboardData) return <p>Carregando...</p>;

  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        <h2>Pedidos</h2>
        <p>Total: R$ {dashboardData.orders_total}</p>
        <p>Quantidade: {dashboardData.orders_count}</p>
      </div>
      <div>
        <h2>Vendas</h2>
        <p>Total: R$ {dashboardData.sales_total}</p>
        <p>Quantidade: {dashboardData.sales_count}</p>
      </div>
      <div>
        <h2>Ticket Médio</h2>
        <p>R$ {dashboardData.average_ticket}</p>
      </div>
      <div>
        <h2>Lista de Pedidos</h2>
        <ul>
          {dashboardData.orders.map((order) => (
            <li key={order.id}>
              <p>ID: {order.id}</p>
              <p>Cliente: {order.customer_name}</p>
              <p>Total: R$ {order.total}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DashboardPage;