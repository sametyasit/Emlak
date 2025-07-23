import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1000px;
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

const Select = styled.select`
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  background: white;
  width: 100%;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  width: 100%;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const SaveButton = styled(Button)`
  background: #667eea;
  color: white;
  
  &:hover {
    background: #5a67d8;
  }
`;

const ResetButton = styled(Button)`
  background: #f8fafc;
  color: #1e293b;
  border: 2px solid #e2e8f0;
  
  &:hover {
    background: #e2e8f0;
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

const SystemSettingsPage: React.FC = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [settings, setSettings] = useState({
    // Genel Ayarlar
    siteName: 'Emlak Platformu',
    siteDescription: 'Hayalinizdeki evi bulun',
    maintenanceMode: false,
    registrationEnabled: true,
    
    // E-posta Ayarları
    smtpHost: 'smtp.gmail.com',
    smtpPort: '587',
    smtpUser: 'noreply@emlak.com',
    smtpPassword: '',
    emailNotifications: true,
    
    // Güvenlik Ayarları
    sessionTimeout: '30',
    maxLoginAttempts: '5',
    passwordMinLength: '8',
    twoFactorAuth: false,
    
    // Bildirim Ayarları
    pushNotifications: true,
    emailAlerts: true,
    smsNotifications: false,
    
    // Performans Ayarları
    cacheEnabled: true,
    imageCompression: true,
    cdnEnabled: false
  });

  const handleSettingChange = (key: string, value: string | boolean) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
    console.log('Ayarlar kaydedildi:', settings);
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
        <PageTitle>⚙️ Sistem Ayarları</PageTitle>
        <PageSubtitle>Platform ayarlarını yönetin</PageSubtitle>
      </PageHeader>

      {showSuccess && (
        <SuccessMessage>
          ✅ Ayarlar başarıyla kaydedildi!
        </SuccessMessage>
      )}

      <SettingsGrid>
        <SettingsCard>
          <CardTitle>🌐 Genel Ayarlar</CardTitle>
          
          <SettingItem>
            <SettingLabel>
              Site Adı
            </SettingLabel>
            <SettingDescription>
              Platformun görünen adı
            </SettingDescription>
            <Input
              type="text"
              value={settings.siteName}
              onChange={(e) => handleSettingChange('siteName', e.target.value)}
            />
          </SettingItem>

          <SettingItem>
            <SettingLabel>
              Site Açıklaması
            </SettingLabel>
            <SettingDescription>
              Platformun kısa açıklaması
            </SettingDescription>
            <Input
              type="text"
              value={settings.siteDescription}
              onChange={(e) => handleSettingChange('siteDescription', e.target.value)}
            />
          </SettingItem>

          <SettingItem>
            <SettingLabel>
              Bakım Modu
              <ToggleSwitch>
                <input
                  type="checkbox"
                  checked={settings.maintenanceMode}
                  onChange={(e) => handleSettingChange('maintenanceMode', e.target.checked)}
                />
                <span></span>
              </ToggleSwitch>
            </SettingLabel>
            <SettingDescription>
              Bakım modu aktifken sadece adminler erişebilir
            </SettingDescription>
          </SettingItem>

          <SettingItem>
            <SettingLabel>
              Kayıt Olma
              <ToggleSwitch>
                <input
                  type="checkbox"
                  checked={settings.registrationEnabled}
                  onChange={(e) => handleSettingChange('registrationEnabled', e.target.checked)}
                />
                <span></span>
              </ToggleSwitch>
            </SettingLabel>
            <SettingDescription>
              Yeni kullanıcı kayıtlarına izin ver
            </SettingDescription>
          </SettingItem>
        </SettingsCard>

        <SettingsCard>
          <CardTitle>📧 E-posta Ayarları</CardTitle>
          
          <SettingItem>
            <SettingLabel>SMTP Sunucu</SettingLabel>
            <Input
              type="text"
              value={settings.smtpHost}
              onChange={(e) => handleSettingChange('smtpHost', e.target.value)}
            />
          </SettingItem>

          <SettingItem>
            <SettingLabel>SMTP Port</SettingLabel>
            <Input
              type="text"
              value={settings.smtpPort}
              onChange={(e) => handleSettingChange('smtpPort', e.target.value)}
            />
          </SettingItem>

          <SettingItem>
            <SettingLabel>E-posta Kullanıcı</SettingLabel>
            <Input
              type="email"
              value={settings.smtpUser}
              onChange={(e) => handleSettingChange('smtpUser', e.target.value)}
            />
          </SettingItem>

          <SettingItem>
            <SettingLabel>
              E-posta Bildirimleri
              <ToggleSwitch>
                <input
                  type="checkbox"
                  checked={settings.emailNotifications}
                  onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
                />
                <span></span>
              </ToggleSwitch>
            </SettingLabel>
          </SettingItem>
        </SettingsCard>

        <SettingsCard>
          <CardTitle>🔒 Güvenlik Ayarları</CardTitle>
          
          <SettingItem>
            <SettingLabel>Oturum Süresi (dakika)</SettingLabel>
            <Select
              value={settings.sessionTimeout}
              onChange={(e) => handleSettingChange('sessionTimeout', e.target.value)}
            >
              <option value="15">15 dakika</option>
              <option value="30">30 dakika</option>
              <option value="60">1 saat</option>
              <option value="120">2 saat</option>
            </Select>
          </SettingItem>

          <SettingItem>
            <SettingLabel>Maksimum Giriş Denemesi</SettingLabel>
            <Select
              value={settings.maxLoginAttempts}
              onChange={(e) => handleSettingChange('maxLoginAttempts', e.target.value)}
            >
              <option value="3">3 deneme</option>
              <option value="5">5 deneme</option>
              <option value="10">10 deneme</option>
            </Select>
          </SettingItem>

          <SettingItem>
            <SettingLabel>Şifre Minimum Uzunluk</SettingLabel>
            <Select
              value={settings.passwordMinLength}
              onChange={(e) => handleSettingChange('passwordMinLength', e.target.value)}
            >
              <option value="6">6 karakter</option>
              <option value="8">8 karakter</option>
              <option value="10">10 karakter</option>
              <option value="12">12 karakter</option>
            </Select>
          </SettingItem>

          <SettingItem>
            <SettingLabel>
              İki Faktörlü Doğrulama
              <ToggleSwitch>
                <input
                  type="checkbox"
                  checked={settings.twoFactorAuth}
                  onChange={(e) => handleSettingChange('twoFactorAuth', e.target.checked)}
                />
                <span></span>
              </ToggleSwitch>
            </SettingLabel>
          </SettingItem>
        </SettingsCard>

        <SettingsCard>
          <CardTitle>🔔 Bildirim Ayarları</CardTitle>
          
          <SettingItem>
            <SettingLabel>
              Push Bildirimleri
              <ToggleSwitch>
                <input
                  type="checkbox"
                  checked={settings.pushNotifications}
                  onChange={(e) => handleSettingChange('pushNotifications', e.target.checked)}
                />
                <span></span>
              </ToggleSwitch>
            </SettingLabel>
          </SettingItem>

          <SettingItem>
            <SettingLabel>
              E-posta Uyarıları
              <ToggleSwitch>
                <input
                  type="checkbox"
                  checked={settings.emailAlerts}
                  onChange={(e) => handleSettingChange('emailAlerts', e.target.checked)}
                />
                <span></span>
              </ToggleSwitch>
            </SettingLabel>
          </SettingItem>

          <SettingItem>
            <SettingLabel>
              SMS Bildirimleri
              <ToggleSwitch>
                <input
                  type="checkbox"
                  checked={settings.smsNotifications}
                  onChange={(e) => handleSettingChange('smsNotifications', e.target.checked)}
                />
                <span></span>
              </ToggleSwitch>
            </SettingLabel>
          </SettingItem>
        </SettingsCard>

        <SettingsCard>
          <CardTitle>⚡ Performans Ayarları</CardTitle>
          
          <SettingItem>
            <SettingLabel>
              Önbellek
              <ToggleSwitch>
                <input
                  type="checkbox"
                  checked={settings.cacheEnabled}
                  onChange={(e) => handleSettingChange('cacheEnabled', e.target.checked)}
                />
                <span></span>
              </ToggleSwitch>
            </SettingLabel>
          </SettingItem>

          <SettingItem>
            <SettingLabel>
              Resim Sıkıştırma
              <ToggleSwitch>
                <input
                  type="checkbox"
                  checked={settings.imageCompression}
                  onChange={(e) => handleSettingChange('imageCompression', e.target.value)}
                />
                <span></span>
              </ToggleSwitch>
            </SettingLabel>
          </SettingItem>

          <SettingItem>
            <SettingLabel>
              CDN Kullanımı
              <ToggleSwitch>
                <input
                  type="checkbox"
                  checked={settings.cdnEnabled}
                  onChange={(e) => handleSettingChange('cdnEnabled', e.target.checked)}
                />
                <span></span>
              </ToggleSwitch>
            </SettingLabel>
          </SettingItem>
        </SettingsCard>
      </SettingsGrid>

      <ButtonGroup>
        <ResetButton onClick={handleReset}>
          🔄 Sıfırla
        </ResetButton>
        <SaveButton onClick={handleSave}>
          💾 Kaydet
        </SaveButton>
      </ButtonGroup>
    </Container>
  );
};

export default SystemSettingsPage; 