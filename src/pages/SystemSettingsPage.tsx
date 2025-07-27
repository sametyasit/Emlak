import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem 20px;
`;

const PageHeader = styled.div`
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  padding: 2rem;
  border-radius: 16px;
  margin-bottom: 2rem;
  text-align: center;
  box-shadow: 0 10px 30px rgba(16, 185, 129, 0.3);
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

const SettingsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const SettingsCard = styled.div`
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

const SettingItem = styled.div`
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #e2e8f0;
  
  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`;

const SettingLabel = styled.label`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
`;

const SettingDescription = styled.p`
  color: #64748b;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #10b981;
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  background: white;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #10b981;
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
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
    transition: 0.4s;
    border-radius: 24px;
    
    &:before {
      position: absolute;
      content: "";
      height: 18px;
      width: 18px;
      left: 3px;
      bottom: 3px;
      background-color: white;
      transition: 0.4s;
      border-radius: 50%;
    }
  }
  
  input:checked + span {
    background-color: #10b981;
  }
  
  input:checked + span:before {
    transform: translateX(26px);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
`;

const SaveButton = styled.button`
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(16, 185, 129, 0.3);
  }
`;

const ResetButton = styled.button`
  background: #f8fafc;
  color: #64748b;
  padding: 1rem 2rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #e2e8f0;
    border-color: #cbd5e1;
    transform: translateY(-2px);
  }
`;

const SuccessMessage = styled.div`
  background: #f0fdf4;
  color: #16a34a;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  text-align: center;
  font-weight: 500;
`;

const AccessDeniedMessage = styled.div`
  background: #fef3f2;
  color: #991b1b;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  text-align: center;
  font-weight: 500;
`;

const SystemSettingsPage: React.FC = () => {
  const { user } = useAuth();
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Kullanıcı ayarları (tüm adminler erişebilir)
  const [userSettings, setUserSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    language: 'tr',
    theme: 'light',
    timezone: 'Europe/Istanbul'
  });

  const handleUserSettingChange = (key: string, value: string | boolean) => {
    setUserSettings((prev: any) => ({
      ...prev,
      [key]: value
    }));
    
    // Dil değişikliğini anında uygula
    if (key === 'language') {
      document.documentElement.lang = value as string;
      // LocalStorage'a kaydet
      localStorage.setItem('userLanguage', value as string);
    }
    
    // Tema değişikliğini anında uygula
    if (key === 'theme') {
      document.documentElement.setAttribute('data-theme', value as string);
      // LocalStorage'a kaydet
      localStorage.setItem('userTheme', value as string);
    }
  };

  const handleSaveUserSettings = () => {
    // LocalStorage'a kaydet
    localStorage.setItem('userSettings', JSON.stringify(userSettings));
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
    console.log('Kullanıcı ayarları kaydedildi:', userSettings);
  };

  const handleReset = () => {
    if (window.confirm('Tüm ayarları varsayılana sıfırlamak istediğinizden emin misiniz?')) {
      // Varsayılan ayarları yükle
      console.log('Ayarlar sıfırlandı');
    }
  };

  return (
    <Container>
      <PageHeader>
        <PageTitle>⚙️ Kullanıcı Ayarları</PageTitle>
        <PageSubtitle>Kendi ayarlarınızı yönetin</PageSubtitle>
      </PageHeader>

      {showSuccess && (
        <SuccessMessage>
          ✅ Ayarlar başarıyla kaydedildi!
        </SuccessMessage>
      )}

      <SettingsGrid>
        <SettingsCard>
          <CardTitle>👤 Kullanıcı Ayarları</CardTitle>
          
          <SettingItem>
            <SettingLabel>
              E-posta Bildirimleri
            </SettingLabel>
            <SettingDescription>
              E-posta ile bildirim al
            </SettingDescription>
            <ToggleSwitch>
              <input
                type="checkbox"
                checked={userSettings.emailNotifications}
                onChange={(e) => handleUserSettingChange('emailNotifications', e.target.checked)}
              />
              <span></span>
            </ToggleSwitch>
          </SettingItem>

          <SettingItem>
            <SettingLabel>
              Push Bildirimleri
            </SettingLabel>
            <SettingDescription>
              Tarayıcı push bildirimlerini etkinleştir
            </SettingDescription>
            <ToggleSwitch>
              <input
                type="checkbox"
                checked={userSettings.pushNotifications}
                onChange={(e) => handleUserSettingChange('pushNotifications', e.target.checked)}
              />
              <span></span>
            </ToggleSwitch>
          </SettingItem>

          <SettingItem>
            <SettingLabel>
              Dil
            </SettingLabel>
            <SettingDescription>
              Platform dili (değişiklik anında uygulanır)
            </SettingDescription>
            <Select
              value={userSettings.language}
              onChange={(e) => handleUserSettingChange('language', e.target.value)}
            >
              <option value="tr">Türkçe</option>
              <option value="en">English</option>
            </Select>
          </SettingItem>

          <SettingItem>
            <SettingLabel>
              Tema
            </SettingLabel>
            <SettingDescription>
              Platform teması (değişiklik anında uygulanır)
            </SettingDescription>
            <Select
              value={userSettings.theme}
              onChange={(e) => handleUserSettingChange('theme', e.target.value)}
            >
              <option value="light">Açık</option>
              <option value="dark">Koyu</option>
            </Select>
          </SettingItem>
        </SettingsCard>
      </SettingsGrid>

      <ButtonGroup>
        <SaveButton onClick={handleSaveUserSettings}>
          💾 Ayarları Kaydet
        </SaveButton>
        <ResetButton onClick={handleReset}>
          🔄 Sıfırla
        </ResetButton>
      </ButtonGroup>
    </Container>
  );
};

export default SystemSettingsPage; 