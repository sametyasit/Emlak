import React from 'react';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 20px;
`;

const WelcomeSection = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 3rem;
  border-radius: 16px;
  margin-bottom: 2rem;
  text-align: center;
`;

const WelcomeTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const WelcomeSubtitle = styled.p`
  font-size: 1.2rem;
  opacity: 0.9;
`;

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const DashboardCard = styled.div<{ clickable?: boolean }>`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: ${props => props.clickable ? 'pointer' : 'default'};
  
  &:hover {
    transform: ${props => props.clickable ? 'translateY(-5px)' : 'none'};
    box-shadow: ${props => props.clickable ? '0 10px 30px rgba(0, 0, 0, 0.15)' : '0 4px 6px rgba(0, 0, 0, 0.1)'};
  }
`;

const CardIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
  text-align: center;
`;

const CardTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 1rem;
  text-align: center;
`;

const CardContent = styled.div`
  color: #64748b;
  line-height: 1.6;
  text-align: center;
`;

const QuickActions = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const QuickActionsTitle = styled.h2`
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

const UserDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <Container>
      <WelcomeSection>
        <WelcomeTitle>Hoş Geldiniz, {user?.name}! 👋</WelcomeTitle>
        <WelcomeSubtitle>
          Emlak platformumuzda size özel deneyimi keşfedin
        </WelcomeSubtitle>
      </WelcomeSection>

      <DashboardGrid>
        <DashboardCard clickable onClick={() => navigate('/favorites')}>
          <CardIcon>🔍</CardIcon>
          <CardTitle>Favori İlanlar</CardTitle>
          <CardContent>
            Beğendiğiniz emlak ilanlarını takip edin ve güncellemelerden haberdar olun.
          </CardContent>
        </DashboardCard>

        <DashboardCard clickable onClick={() => navigate('/appointments')}>
          <CardIcon>📋</CardIcon>
          <CardTitle>Randevularım</CardTitle>
          <CardContent>
            Planladığınız emlak görüntüleme randevularınızı yönetin.
          </CardContent>
        </DashboardCard>

        <DashboardCard clickable onClick={() => navigate('/messages')}>
          <CardIcon>💬</CardIcon>
          <CardTitle>Mesajlarım</CardTitle>
          <CardContent>
            Emlak danışmanları ile olan mesajlaşmalarınızı görüntüleyin.
          </CardContent>
        </DashboardCard>

        <DashboardCard clickable onClick={() => navigate('/stats')}>
          <CardIcon>📊</CardIcon>
          <CardTitle>İstatistiklerim</CardTitle>
          <CardContent>
            Arama geçmişiniz ve ilgi alanlarınıza göre öneriler alın.
          </CardContent>
        </DashboardCard>

        <DashboardCard clickable onClick={() => navigate('/settings')}>
          <CardIcon>⚙️</CardIcon>
          <CardTitle>Hesap Ayarları</CardTitle>
          <CardContent>
            Profil bilgilerinizi güncelleyin ve tercihlerinizi yönetin.
          </CardContent>
        </DashboardCard>

        <DashboardCard clickable onClick={() => navigate('/support')}>
          <CardIcon>📞</CardIcon>
          <CardTitle>Destek</CardTitle>
          <CardContent>
            Sorularınız için müşteri hizmetlerimizle iletişime geçin.
          </CardContent>
        </DashboardCard>
      </DashboardGrid>

      <QuickActions>
        <QuickActionsTitle>Hızlı İşlemler</QuickActionsTitle>
        <ActionsGrid>
          <ActionButton onClick={() => navigate('/properties')}>🏠 Yeni İlan Ara</ActionButton>
          <ActionButton onClick={() => navigate('/favorites')}>❤️ Favorilerim</ActionButton>
          <ActionButton onClick={() => navigate('/appointments')}>📅 Randevu Al</ActionButton>
          <ActionButton onClick={() => navigate('/messages')}>💬 Danışmanla Görüş</ActionButton>
          <ActionButton onClick={() => navigate('/settings/notifications')}>📱 Bildirim Ayarları</ActionButton>
          <ActionButton onClick={() => navigate('/notifications')}>🔔 Bildirimlerim</ActionButton>
        </ActionsGrid>
      </QuickActions>
    </Container>
  );
};

export default UserDashboard; 