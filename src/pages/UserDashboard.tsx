import React from 'react';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 20px;
  background-color: var(--bg-primary);
  color: var(--text-primary);
  min-height: 100vh;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100vw;
    height: 100%;
    background: radial-gradient(circle at 50% 0%, rgba(139, 92, 246, 0.1) 0%, transparent 50%);
    pointer-events: none;
    z-index: 0;
  }
`;

const WelcomeSection = styled.div`
  background: var(--gradient-primary);
  color: white;
  padding: 4rem 3rem;
  border-radius: 24px;
  margin-bottom: 3rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  z-index: 1;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
    pointer-events: none;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
    animation: float 6s ease-in-out infinite;
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(180deg); }
  }
`;

const WelcomeTitle = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 2;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 2px;
  }
`;

const WelcomeSubtitle = styled.p`
  font-size: 1.3rem;
  opacity: 0.95;
  line-height: 1.6;
  font-weight: 400;
  position: relative;
  z-index: 2;
`;

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2.5rem;
  margin-bottom: 3rem;
  position: relative;
  z-index: 1;
`;

const DashboardCard = styled.div<{ clickable?: boolean }>`
  background: var(--card-bg);
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: var(--shadow);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: ${props => props.clickable ? 'pointer' : 'default'};
  border: 1px solid var(--border-color);
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: var(--gradient-secondary);
    transform: scaleX(0);
    transition: transform 0.4s ease;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(139, 92, 246, 0.05) 0%, transparent 50%);
    opacity: 0;
    transition: opacity 0.4s ease;
  }
  
  &:hover {
    transform: ${props => props.clickable ? 'translateY(-12px) scale(1.02)' : 'none'};
    box-shadow: ${props => props.clickable ? '0 25px 50px rgba(139, 92, 246, 0.15)' : 'var(--shadow)'};
    background: var(--card-hover);
    border-color: var(--accent-color);
    
    &::before {
      transform: scaleX(1);
    }
    
    &::after {
      opacity: 1;
    }
  }
`;

const CardIcon = styled.div`
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  text-align: center;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 60px;
    height: 60px;
    background: var(--gradient-secondary);
    border-radius: 50%;
    opacity: 0.1;
    z-index: -1;
  }
`;

const CardTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 1rem;
  text-align: center;
  position: relative;
`;

const CardContent = styled.div`
  color: var(--text-secondary);
  line-height: 1.7;
  text-align: center;
  font-size: 0.95rem;
  font-weight: 400;
`;

const QuickActions = styled.div`
  background: var(--card-bg);
  border-radius: 20px;
  padding: 3rem;
  box-shadow: var(--shadow);
  border: 1px solid var(--border-color);
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: var(--gradient-secondary);
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(139, 92, 246, 0.03) 0%, transparent 50%);
    pointer-events: none;
  }
`;

const QuickActionsTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 2rem;
  text-align: center;
  position: relative;
  z-index: 1;
`;

const ActionsGrid = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
  position: relative;
  z-index: 1;
`;

const ActionButton = styled.button`
  background: var(--card-bg);
  border: 2px solid var(--border-color);
  padding: 1rem 1.2rem;
  border-radius: 16px;
  font-size: 0.95rem;
  font-weight: 600;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  color: var(--text-primary);
  cursor: pointer;
  backdrop-filter: blur(5px);
  white-space: nowrap;
  min-width: fit-content;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.15), transparent);
    transition: left 0.6s;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: rgba(139, 92, 246, 0.1);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: width 0.3s, height 0.3s;
  }
  
  &:hover {
    background: var(--accent-color);
    border-color: var(--accent-color);
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 12px 30px rgba(139, 92, 246, 0.2);
    color: white;
    
    &::before {
      left: 100%;
    }
    
    &::after {
      width: 300px;
      height: 300px;
    }
  }
  
  &:active {
    transform: translateY(-2px) scale(0.98);
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
          <ActionButton onClick={() => navigate('/settings')}>⚙️ Hesap Ayarları</ActionButton>
        </ActionsGrid>
      </QuickActions>
    </Container>
  );
};

export default UserDashboard; 