import React from 'react';
import styled from 'styled-components';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const StatsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: var(--bg-primary);
  color: var(--text-primary);
  min-height: 100vh;
`;

const PageTitle = styled.h1`
  color: #333;
  margin-bottom: 30px;
  font-size: 2rem;
  text-align: center;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const StatCard = styled.div`
  background: var(--card-bg);
  border-radius: 12px;
  box-shadow: var(--shadow);
  padding: 20px;
  text-align: center;
  border: 1px solid var(--border-color);
`;

const StatIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 10px;
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #8B5CF6;
  margin-bottom: 5px;
`;

const StatLabel = styled.div`
  color: #666;
  font-size: 0.9rem;
`;

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ChartCard = styled.div`
  background: var(--card-bg);
  border-radius: 12px;
  box-shadow: var(--shadow);
  padding: 20px;
  border: 1px solid var(--border-color);
`;

const ChartTitle = styled.h3`
  color: #333;
  margin-bottom: 20px;
  text-align: center;
`;

const ActivityList = styled.div`
  background: var(--card-bg);
  border-radius: 12px;
  box-shadow: var(--shadow);
  padding: 20px;
  border: 1px solid var(--border-color);
`;

const ActivityTitle = styled.h3`
  color: #333;
  margin-bottom: 20px;
`;

const ActivityItem = styled.div`
  display: flex;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid var(--border-color);

  &:last-child {
    border-bottom: none;
  }
`;

const ActivityIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #8B5CF6;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  font-size: 1.2rem;
`;

const ActivityInfo = styled.div`
  flex: 1;
`;

const ActivityText = styled.div`
  color: #333;
  font-weight: 500;
`;

const ActivityTime = styled.div`
  color: #666;
  font-size: 0.85rem;
  margin-top: 2px;
`;

const StatsPage: React.FC = () => {
  // Arama geçmişi grafiği verisi
  const searchHistoryData = {
    labels: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran'],
    datasets: [
      {
        label: 'Arama Sayısı',
        data: [12, 19, 15, 25, 22, 30],
        borderColor: '#8B5CF6',
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        tension: 0.4,
      },
    ],
  };

  // İlgi alanları grafiği verisi
  const interestData = {
    labels: ['Kadıköy', 'Beşiktaş', 'Şişli', 'Çankaya', 'Konak'],
    datasets: [
      {
        label: 'Görüntülenme',
        data: [65, 45, 38, 28, 22],
        backgroundColor: [
          '#8B5CF6',
          '#A78BFA',
          '#C4B5FD',
          '#DDD6FE',
          '#EDE9FE',
        ],
      },
    ],
  };

  // Emlak tipi dağılımı
  const propertyTypeData = {
    labels: ['Daire', 'Villa', 'Müstakil Ev', 'Rezidans'],
    datasets: [
      {
        data: [45, 25, 20, 10],
        backgroundColor: [
          '#8B5CF6',
          '#F59E0B',
          '#10B981',
          '#EF4444',
        ],
      },
    ],
  };

  // Son aktiviteler
  const recentActivities = [
    {
      id: 1,
      icon: '🏠',
      text: 'Kadıköy\'de 3+1 daire aradınız',
      time: '2 saat önce'
    },
    {
      id: 2,
      icon: '❤️',
      text: 'Beşiktaş\'taki villayı favorilere eklediniz',
      time: '1 gün önce'
    },
    {
      id: 3,
      icon: '📅',
      text: 'Şişli\'deki daire için randevu aldınız',
      time: '2 gün önce'
    },
    {
      id: 4,
      icon: '💬',
      text: 'Emlak danışmanı ile mesajlaştınız',
      time: '3 gün önce'
    },
    {
      id: 5,
      icon: '🔍',
      text: 'Çankaya\'da 2+1 daire aradınız',
      time: '1 hafta önce'
    }
  ];

  return (
    <StatsContainer>
      <PageTitle>📊 İstatistiklerim</PageTitle>
      
      <StatsGrid>
        <StatCard>
          <StatIcon>🔍</StatIcon>
          <StatValue>127</StatValue>
          <StatLabel>Toplam Arama</StatLabel>
        </StatCard>
        
        <StatCard>
          <StatIcon>❤️</StatIcon>
          <StatValue>23</StatValue>
          <StatLabel>Favori İlan</StatLabel>
        </StatCard>
        
        <StatCard>
          <StatIcon>📅</StatIcon>
          <StatValue>8</StatValue>
          <StatLabel>Randevu</StatLabel>
        </StatCard>
        
        <StatCard>
          <StatIcon>💬</StatIcon>
          <StatValue>15</StatValue>
          <StatLabel>Mesaj</StatLabel>
        </StatCard>
      </StatsGrid>

      <ChartsGrid>
        <ChartCard>
          <ChartTitle>Arama Geçmişi</ChartTitle>
          <Line 
            data={searchHistoryData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            }}
          />
        </ChartCard>

        <ChartCard>
          <ChartTitle>İlgi Alanları</ChartTitle>
          <Bar 
            data={interestData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            }}
          />
        </ChartCard>
      </ChartsGrid>

      <ChartsGrid>
        <ChartCard>
          <ChartTitle>Emlak Tipi Dağılımı</ChartTitle>
          <Doughnut 
            data={propertyTypeData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'bottom',
                },
              },
            }}
          />
        </ChartCard>

        <ActivityList>
          <ActivityTitle>Son Aktiviteler</ActivityTitle>
          {recentActivities.map((activity) => (
            <ActivityItem key={activity.id}>
              <ActivityIcon>{activity.icon}</ActivityIcon>
              <ActivityInfo>
                <ActivityText>{activity.text}</ActivityText>
                <ActivityTime>{activity.time}</ActivityTime>
              </ActivityInfo>
            </ActivityItem>
          ))}
        </ActivityList>
      </ChartsGrid>
    </StatsContainer>
  );
};

export default StatsPage; 