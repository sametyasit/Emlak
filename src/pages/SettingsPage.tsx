import React, { useState } from 'react';
import styled from 'styled-components';
import { useTheme } from '../contexts/ThemeContext';

const SettingsContainer = styled.div`
  max-width: 800px;
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

const SettingsSection = styled.div`
  background: var(--card-bg);
  border-radius: 12px;
  box-shadow: var(--shadow);
  padding: 30px;
  margin-bottom: 20px;
  border: 1px solid var(--border-color);
`;

const SectionTitle = styled.h2`
  color: #333;
  margin-bottom: 20px;
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  color: #333;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;

  &:focus {
    border-color: #8B5CF6;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  background: white;

  &:focus {
    border-color: #8B5CF6;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  resize: vertical;
  min-height: 100px;

  &:focus {
    border-color: #8B5CF6;
  }
`;

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 0;
  border-bottom: 1px solid #e5e7eb;

  &:last-child {
    border-bottom: none;
  }
`;

const ToggleLabel = styled.div`
  flex: 1;
`;

const ToggleTitle = styled.div`
  color: #333;
  font-weight: 500;
  margin-bottom: 4px;
`;

const ToggleDescription = styled.div`
  color: #666;
  font-size: 0.9rem;
`;

const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
`;

const ToggleInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + span {
    background-color: #8B5CF6;
  }

  &:checked + span:before {
    transform: translateX(26px);
  }
`;

const ToggleSlider = styled.span`
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
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 30px;
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' | 'danger' }>`
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  ${props => {
    switch (props.variant) {
      case 'primary':
        return `
          background: #8B5CF6;
          color: white;
          &:hover {
            background: #7C3AED;
          }
        `;
      case 'secondary':
        return `
          background: #f3f4f6;
          color: #333;
          &:hover {
            background: #e5e7eb;
          }
        `;
      case 'danger':
        return `
          background: #ef4444;
          color: white;
          &:hover {
            background: #dc2626;
          }
        `;
      default:
        return `
          background: #8B5CF6;
          color: white;
          &:hover {
            background: #7C3AED;
          }
        `;
    }
  }}
`;

const AvatarSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
`;

const Avatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #8B5CF6;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2rem;
  font-weight: bold;
`;

const AvatarUpload = styled.div`
  flex: 1;
`;

const UploadButton = styled.label`
  display: inline-block;
  padding: 8px 16px;
  background: #f3f4f6;
  color: #333;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;

  &:hover {
    background: #e5e7eb;
  }
`;

const SettingsPage: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [profile, setProfile] = useState({
    firstName: 'Ahmet',
    lastName: 'Yılmaz',
    email: 'ahmet@example.com',
    phone: '+90 555 123 4567',
    city: 'İstanbul',
    notifications: {
      email: true,
      sms: false,
      push: true,
      marketing: false
    }
  });

  const [preferences, setPreferences] = useState({
    language: 'tr',
    currency: 'TRY',
    timezone: 'Europe/Istanbul',
    theme: theme
  });

  const handleProfileChange = (field: string, value: string) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNotificationChange = (type: string, value: boolean) => {
    setProfile(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: value
      }
    }));
  };

  const handlePreferenceChange = (field: string, value: string) => {
    setPreferences(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Tema değişikliğini uygula
    if (field === 'theme') {
      setTheme(value as 'light' | 'dark');
    }
  };

  const handleSave = () => {
    alert('Ayarlar başarıyla kaydedildi!');
  };

  const handleDeleteAccount = () => {
    if (confirm('Hesabınızı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.')) {
      alert('Hesap silme işlemi başlatıldı.');
    }
  };

  return (
    <SettingsContainer>
      <PageTitle>⚙️ Hesap Ayarları</PageTitle>
      
      <SettingsSection>
        <SectionTitle>👤 Profil Bilgileri</SectionTitle>
        
        <AvatarSection>
          <Avatar>AY</Avatar>
          <AvatarUpload>
            <UploadButton>
              Fotoğraf Değiştir
              <input type="file" style={{ display: 'none' }} accept="image/*" />
            </UploadButton>
          </AvatarUpload>
        </AvatarSection>

        <FormGroup>
          <Label>Ad</Label>
          <Input
            type="text"
            value={profile.firstName}
            onChange={(e) => handleProfileChange('firstName', e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label>Soyad</Label>
          <Input
            type="text"
            value={profile.lastName}
            onChange={(e) => handleProfileChange('lastName', e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label>E-posta</Label>
          <Input
            type="email"
            value={profile.email}
            onChange={(e) => handleProfileChange('email', e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label>Telefon</Label>
          <Input
            type="tel"
            value={profile.phone}
            onChange={(e) => handleProfileChange('phone', e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label>Şehir</Label>
          <Select
            value={profile.city}
            onChange={(e) => handleProfileChange('city', e.target.value)}
          >
            <option value="İstanbul">İstanbul</option>
            <option value="Ankara">Ankara</option>
            <option value="İzmir">İzmir</option>
            <option value="Bursa">Bursa</option>
            <option value="Antalya">Antalya</option>
          </Select>
        </FormGroup>
      </SettingsSection>

      <SettingsSection>
        <SectionTitle>🔔 Bildirim Ayarları</SectionTitle>
        
        <ToggleContainer>
          <ToggleLabel>
            <ToggleTitle>E-posta Bildirimleri</ToggleTitle>
            <ToggleDescription>Yeni ilanlar ve güncellemeler için e-posta alın</ToggleDescription>
          </ToggleLabel>
          <ToggleSwitch>
            <ToggleInput
              type="checkbox"
              checked={profile.notifications.email}
              onChange={(e) => handleNotificationChange('email', e.target.checked)}
            />
            <ToggleSlider />
          </ToggleSwitch>
        </ToggleContainer>

        <ToggleContainer>
          <ToggleLabel>
            <ToggleTitle>SMS Bildirimleri</ToggleTitle>
            <ToggleDescription>Önemli güncellemeler için SMS alın</ToggleDescription>
          </ToggleLabel>
          <ToggleSwitch>
            <ToggleInput
              type="checkbox"
              checked={profile.notifications.sms}
              onChange={(e) => handleNotificationChange('sms', e.target.checked)}
            />
            <ToggleSlider />
          </ToggleSwitch>
        </ToggleContainer>

        <ToggleContainer>
          <ToggleLabel>
            <ToggleTitle>Push Bildirimleri</ToggleTitle>
            <ToggleDescription>Tarayıcı bildirimleri alın</ToggleDescription>
          </ToggleLabel>
          <ToggleSwitch>
            <ToggleInput
              type="checkbox"
              checked={profile.notifications.push}
              onChange={(e) => handleNotificationChange('push', e.target.checked)}
            />
            <ToggleSlider />
          </ToggleSwitch>
        </ToggleContainer>

        <ToggleContainer>
          <ToggleLabel>
            <ToggleTitle>Pazarlama E-postaları</ToggleTitle>
            <ToggleDescription>Özel teklifler ve kampanyalar için e-posta alın</ToggleDescription>
          </ToggleLabel>
          <ToggleSwitch>
            <ToggleInput
              type="checkbox"
              checked={profile.notifications.marketing}
              onChange={(e) => handleNotificationChange('marketing', e.target.checked)}
            />
            <ToggleSlider />
          </ToggleSwitch>
        </ToggleContainer>
      </SettingsSection>

      <SettingsSection>
        <SectionTitle>🌍 Tercihler</SectionTitle>
        
        <FormGroup>
          <Label>Dil</Label>
          <Select
            value={preferences.language}
            onChange={(e) => handlePreferenceChange('language', e.target.value)}
          >
            <option value="tr">Türkçe</option>
            <option value="en">English</option>
            <option value="de">Deutsch</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <Label>Para Birimi</Label>
          <Select
            value={preferences.currency}
            onChange={(e) => handlePreferenceChange('currency', e.target.value)}
          >
            <option value="TRY">Türk Lirası (₺)</option>
            <option value="USD">Amerikan Doları ($)</option>
            <option value="EUR">Euro (€)</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <Label>Saat Dilimi</Label>
          <Select
            value={preferences.timezone}
            onChange={(e) => handlePreferenceChange('timezone', e.target.value)}
          >
            <option value="Europe/Istanbul">İstanbul (UTC+3)</option>
            <option value="Europe/London">Londra (UTC+0)</option>
            <option value="America/New_York">New York (UTC-5)</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <Label>Tema</Label>
          <Select
            value={preferences.theme}
            onChange={(e) => handlePreferenceChange('theme', e.target.value)}
          >
            <option value="light">Açık</option>
            <option value="dark">Koyu</option>
          </Select>
        </FormGroup>
      </SettingsSection>

      <SettingsSection>
        <SectionTitle>🔒 Güvenlik</SectionTitle>
        
        <FormGroup>
          <Label>Mevcut Şifre</Label>
          <Input type="password" placeholder="Mevcut şifrenizi girin" />
        </FormGroup>

        <FormGroup>
          <Label>Yeni Şifre</Label>
          <Input type="password" placeholder="Yeni şifrenizi girin" />
        </FormGroup>

        <FormGroup>
          <Label>Yeni Şifre (Tekrar)</Label>
          <Input type="password" placeholder="Yeni şifrenizi tekrar girin" />
        </FormGroup>
      </SettingsSection>

      <ButtonGroup>
        <Button onClick={handleSave}>Kaydet</Button>
        <Button variant="secondary">İptal</Button>
        <Button variant="danger" onClick={handleDeleteAccount}>Hesabı Sil</Button>
      </ButtonGroup>
    </SettingsContainer>
  );
};

export default SettingsPage; 