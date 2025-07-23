import React from 'react';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 20px;
`;

const AdminHeader = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 3rem;
  border-radius: 16px;
  margin-bottom: 2rem;
  text-align: center;
`;

const AdminTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const AdminSubtitle = styled.p`
  font-size: 1.2rem;
  opacity: 0.9;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  }
`;

const StatIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: #667eea;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  color: #64748b;
  font-size: 1.1rem;
  font-weight: 500;
`;

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ChartCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ChartTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const ActionsSection = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ActionsTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const ActionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

const ActionButton = styled.button`
  background: #f8fafc;
  border: 2px solid #e2e8f0;
  padding: 1rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  color: #1e293b;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #667eea;
    color: white;
    border-color: #667eea;
    transform: translateY(-2px);
  }
`;

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();

  // Bar chart verisi
  const barChartData = {
    labels: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran'],
    datasets: [
      {
        label: 'Satılan Emlaklar',
        data: [12, 19, 15, 25, 22, 30],
        backgroundColor: 'rgba(102, 126, 234, 0.8)',
        borderColor: 'rgba(102, 126, 234, 1)',
        borderWidth: 1,
      },
      {
        label: 'Kiralanan Emlaklar',
        data: [8, 15, 12, 18, 20, 25],
        backgroundColor: 'rgba(118, 75, 162, 0.8)',
        borderColor: 'rgba(118, 75, 162, 1)',
        borderWidth: 1,
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // Doughnut chart verisi
  const doughnutChartData = {
    labels: ['Satılık', 'Kiralık', 'Günlük Kiralık', 'Proje'],
    datasets: [
      {
        data: [45, 30, 15, 10],
        backgroundColor: [
          'rgba(102, 126, 234, 0.8)',
          'rgba(118, 75, 162, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(251, 146, 60, 0.8)',
        ],
        borderColor: [
          'rgba(102, 126, 234, 1)',
          'rgba(118, 75, 162, 1)',
          'rgba(34, 197, 94, 1)',
          'rgba(251, 146, 60, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const doughnutChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
  };

  return (
    <Container>
      <AdminHeader>
        <AdminTitle>👑 Admin Paneli</AdminTitle>
        <AdminSubtitle>
          Hoş geldiniz, {user?.name}! Platform yönetimi için tüm araçlar burada.
        </AdminSubtitle>
      </AdminHeader>

      <StatsGrid>
        <StatCard>
          <StatIcon>🏠</StatIcon>
          <StatNumber>1,247</StatNumber>
          <StatLabel>Toplam İlan</StatLabel>
        </StatCard>
        <StatCard>
          <StatIcon>👥</StatIcon>
          <StatNumber>5,234</StatNumber>
          <StatLabel>Aktif Kullanıcı</StatLabel>
        </StatCard>
        <StatCard>
          <StatIcon>💰</StatIcon>
          <StatNumber>₺12.5M</StatNumber>
          <StatLabel>Aylık Ciro</StatLabel>
        </StatCard>
        <StatCard>
          <StatIcon>📈</StatIcon>
          <StatNumber>+23%</StatNumber>
          <StatLabel>Büyüme Oranı</StatLabel>
        </StatCard>
      </StatsGrid>

      <ChartsGrid>
        <ChartCard>
          <ChartTitle>📊 Aylık Satış ve Kiralama İstatistikleri</ChartTitle>
          <Bar data={barChartData} options={barChartOptions} />
        </ChartCard>
        <ChartCard>
          <ChartTitle>🍩 İlan Kategorileri Dağılımı</ChartTitle>
          <Doughnut data={doughnutChartData} options={doughnutChartOptions} />
        </ChartCard>
      </ChartsGrid>

      <ActionsSection>
        <ActionsTitle>⚡ Hızlı Yönetim İşlemleri</ActionsTitle>
        <ActionsGrid>
          <ActionButton>➕ Yeni İlan Ekle</ActionButton>
          <ActionButton>📝 İlanları Düzenle</ActionButton>
          <ActionButton>👥 Kullanıcıları Yönet</ActionButton>
          <ActionButton>📊 Raporları Görüntüle</ActionButton>
          <ActionButton>⚙️ Sistem Ayarları</ActionButton>
          <ActionButton>🔔 Bildirimleri Yönet</ActionButton>
          <ActionButton>💬 Mesajları Görüntüle</ActionButton>
          <ActionButton>📈 Analitik Raporlar</ActionButton>
        </ActionsGrid>
      </ActionsSection>
    </Container>
  );
};

export default AdminDashboard; 