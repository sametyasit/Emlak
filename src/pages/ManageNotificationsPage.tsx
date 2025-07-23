import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 20px;
`;

const PageHeader = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem;
  border-radius: 16px;
  margin-bottom: 2rem;
  text-align: center;
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const PageSubtitle = styled.p`
  font-size: 1.2rem;
  opacity: 0.9;
`;

const NotificationGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const NotificationCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const CardTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const NotificationItem = styled.div`
  margin-bottom: 1.5rem;
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #667eea;
    box-shadow: 0 2px 8px rgba(102, 126, 234, 0.1);
  }
`;

const NotificationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const NotificationTitle = styled.h4`
  font-weight: 600;
  color: #1e293b;
  margin: 0;
`;

const NotificationTime = styled.span`
  color: #64748b;
  font-size: 0.9rem;
`;

const NotificationContent = styled.p`
  color: #64748b;
  margin-bottom: 1rem;
  line-height: 1.5;
`;

const NotificationActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-1px);
  }
`;

const MarkReadButton = styled(Button)`
  background: #10b981;
  color: white;
  
  &:hover {
    background: #059669;
  }
`;

const DeleteButton = styled(Button)`
  background: #ef4444;
  color: white;
  
  &:hover {
    background: #dc2626;
  }
`;

const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
  
  input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  
  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: .4s;
    border-radius: 24px;
    
    &:before {
      position: absolute;
      content: "";
      height: 18px;
      width: 18px;
      left: 3px;
      bottom: 3px;
      background-color: white;
      transition: .4s;
      border-radius: 50%;
    }
  }
  
  input:checked + span {
    background-color: #667eea;
  }
  
  input:checked + span:before {
    transform: translateX(26px);
  }
`;

const SettingItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e2e8f0;
  
  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`;

const SettingLabel = styled.div`
  font-weight: 500;
  color: #374151;
`;

const SettingDescription = styled.p`
  color: #64748b;
  font-size: 0.9rem;
  margin-top: 0.5rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
`;

const StatIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #667eea;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  color: #64748b;
  font-weight: 500;
`;

const ManageNotificationsPage: React.FC = () => {
  const [notifications] = useState([
    {
      id: 1,
      title: 'Yeni İlan Eklendi',
      content: 'Kadıköy bölgesinde yeni bir 3+1 daire ilanı eklendi.',
      time: '2 saat önce',
      type: 'info',
      read: false
    },
    {
      id: 2,
      title: 'Sistem Güncellemesi',
      content: 'Platform güvenlik güncellemesi tamamlandı.',
      time: '1 gün önce',
      type: 'system',
      read: true
    },
    {
      id: 3,
      title: 'Yeni Kullanıcı Kaydı',
      content: 'Ahmet Yılmaz adlı kullanıcı sisteme kayıt oldu.',
      time: '3 gün önce',
      type: 'user',
      read: false
    },
    {
      id: 4,
      title: 'Bakım Bildirimi',
      content: 'Sistem bakımı 15 Mart 2024 saat 02:00-04:00 arasında yapılacak.',
      time: '1 hafta önce',
      type: 'maintenance',
      read: true
    }
  ]);

  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    systemAlerts: true,
    userAlerts: true,
    maintenanceAlerts: true
  });

  const stats = {
    totalNotifications: notifications.length,
    unreadNotifications: notifications.filter(n => !n.read).length,
    todayNotifications: notifications.filter(n => n.time.includes('saat') || n.time.includes('gün')).length
  };

  const handleSettingChange = (key: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleMarkAsRead = (id: number) => {
    console.log('Bildirim okundu olarak işaretlendi:', id);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Bu bildirimi silmek istediğinizden emin misiniz?')) {
      console.log('Bildirim silindi:', id);
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'info':
        return 'ℹ️';
      case 'system':
        return '⚙️';
      case 'user':
        return '👤';
      case 'maintenance':
        return '🔧';
      default:
        return '📢';
    }
  };

  return (
    <Container>
      <PageHeader>
        <PageTitle>🔔 Bildirimleri Yönet</PageTitle>
        <PageSubtitle>Platform bildirimlerini yönetin</PageSubtitle>
      </PageHeader>

      <StatsGrid>
        <StatCard>
          <StatIcon>📢</StatIcon>
          <StatNumber>{stats.totalNotifications}</StatNumber>
          <StatLabel>Toplam Bildirim</StatLabel>
        </StatCard>
        <StatCard>
          <StatIcon>📬</StatIcon>
          <StatNumber>{stats.unreadNotifications}</StatNumber>
          <StatLabel>Okunmamış</StatLabel>
        </StatCard>
        <StatCard>
          <StatIcon>📅</StatIcon>
          <StatNumber>{stats.todayNotifications}</StatNumber>
          <StatLabel>Bugün</StatLabel>
        </StatCard>
      </StatsGrid>

      <NotificationGrid>
        <NotificationCard>
          <CardTitle>⚙️ Bildirim Ayarları</CardTitle>
          
          <SettingItem>
            <div>
              <SettingLabel>E-posta Bildirimleri</SettingLabel>
              <SettingDescription>
                Önemli olaylar için e-posta bildirimleri gönder
              </SettingDescription>
            </div>
            <ToggleSwitch>
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
              />
              <span></span>
            </ToggleSwitch>
          </SettingItem>

          <SettingItem>
            <div>
              <SettingLabel>Push Bildirimleri</SettingLabel>
              <SettingDescription>
                Tarayıcı push bildirimleri göster
              </SettingDescription>
            </div>
            <ToggleSwitch>
              <input
                type="checkbox"
                checked={settings.pushNotifications}
                onChange={(e) => handleSettingChange('pushNotifications', e.target.checked)}
              />
              <span></span>
            </ToggleSwitch>
          </SettingItem>

          <SettingItem>
            <div>
              <SettingLabel>SMS Bildirimleri</SettingLabel>
              <SettingDescription>
                Kritik olaylar için SMS gönder
              </SettingDescription>
            </div>
            <ToggleSwitch>
              <input
                type="checkbox"
                checked={settings.smsNotifications}
                onChange={(e) => handleSettingChange('smsNotifications', e.target.checked)}
              />
              <span></span>
            </ToggleSwitch>
          </SettingItem>

          <SettingItem>
            <div>
              <SettingLabel>Sistem Uyarıları</SettingLabel>
              <SettingDescription>
                Sistem güncellemeleri ve bakım bildirimleri
              </SettingDescription>
            </div>
            <ToggleSwitch>
              <input
                type="checkbox"
                checked={settings.systemAlerts}
                onChange={(e) => handleSettingChange('systemAlerts', e.target.checked)}
              />
              <span></span>
            </ToggleSwitch>
          </SettingItem>

          <SettingItem>
            <div>
              <SettingLabel>Kullanıcı Uyarıları</SettingLabel>
              <SettingDescription>
                Yeni kullanıcı kayıtları ve aktiviteler
              </SettingDescription>
            </div>
            <ToggleSwitch>
              <input
                type="checkbox"
                checked={settings.userAlerts}
                onChange={(e) => handleSettingChange('userAlerts', e.target.checked)}
              />
              <span></span>
            </ToggleSwitch>
          </SettingItem>

          <SettingItem>
            <div>
              <SettingLabel>Bakım Uyarıları</SettingLabel>
              <SettingDescription>
                Planlı bakım ve kesinti bildirimleri
              </SettingDescription>
            </div>
            <ToggleSwitch>
              <input
                type="checkbox"
                checked={settings.maintenanceAlerts}
                onChange={(e) => handleSettingChange('maintenanceAlerts', e.target.checked)}
              />
              <span></span>
            </ToggleSwitch>
          </SettingItem>
        </NotificationCard>

        <NotificationCard>
          <CardTitle>📢 Son Bildirimler</CardTitle>
          
          {notifications.map((notification) => (
            <NotificationItem key={notification.id}>
              <NotificationHeader>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span>{getNotificationIcon(notification.type)}</span>
                  <NotificationTitle>{notification.title}</NotificationTitle>
                </div>
                <NotificationTime>{notification.time}</NotificationTime>
              </NotificationHeader>
              
              <NotificationContent>{notification.content}</NotificationContent>
              
              <NotificationActions>
                {!notification.read && (
                  <MarkReadButton onClick={() => handleMarkAsRead(notification.id)}>
                    ✅ Okundu
                  </MarkReadButton>
                )}
                <DeleteButton onClick={() => handleDelete(notification.id)}>
                  🗑️ Sil
                </DeleteButton>
              </NotificationActions>
            </NotificationItem>
          ))}
        </NotificationCard>
      </NotificationGrid>
    </Container>
  );
};

export default ManageNotificationsPage; 