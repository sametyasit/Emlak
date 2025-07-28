import React, { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import ReCAPTCHA from 'react-google-recaptcha';
import { useAuth } from '../contexts/AuthContext';
import { authAPI } from '../services/api';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  padding: 2rem;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 50% 0%, rgba(16, 185, 129, 0.03) 0%, transparent 50%);
    pointer-events: none;
  }
`;

const LoginCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(16, 185, 129, 0.1);
  backdrop-filter: blur(10px);
  padding: 3rem;
  width: 100%;
  max-width: 450px;
  text-align: center;
  position: relative;
  z-index: 1;
  animation: ${fadeInUp} 0.6s ease;
  
  @media (max-width: 768px) {
    padding: 2rem;
    margin: 1rem;
  }
`;

const Logo = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const Title = styled.h1`
  font-size: 1.8rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  color: #64748b;
  margin-bottom: 2rem;
  font-size: 1rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  text-align: left;
`;

const Label = styled.label`
  display: block;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.875rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.8);
  
  &:focus {
    outline: none;
    border-color: #10b981;
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
    background: white;
  }
  
  &::placeholder {
    color: #9ca3af;
  }
`;

const LoginButton = styled.button`
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  padding: 0.875rem 1rem;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(16, 185, 129, 0.3);
    
    &::before {
      left: 100%;
    }
  }
  
  &:disabled {
    background: #9ca3af;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
    
    &::before {
      display: none;
    }
  }
`;

const ErrorMessage = styled.div`
  background: rgba(239, 68, 68, 0.1);
  color: #dc2626;
  padding: 1rem;
  border-radius: 12px;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  border: 1px solid rgba(239, 68, 68, 0.2);
`;

const SuccessMessage = styled.div`
  background: rgba(16, 185, 129, 0.1);
  color: #059669;
  padding: 1rem;
  border-radius: 12px;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  border: 1px solid rgba(16, 185, 129, 0.2);
`;

const DemoInfo = styled.div`
  background: rgba(16, 185, 129, 0.05);
  border: 1px solid rgba(16, 185, 129, 0.1);
  border-radius: 12px;
  padding: 1.5rem;
  margin-top: 1.5rem;
  text-align: left;
`;

const DemoTitle = styled.h4`
  color: #1e293b;
  margin-bottom: 0.75rem;
  font-size: 1rem;
  font-weight: 600;
`;

const DemoText = styled.p`
  color: #64748b;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  
  strong {
    color: #10b981;
  }
`;

const TabContainer = styled.div`
  display: flex;
  margin-bottom: 2rem;
  border-bottom: 2px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
`;

const Tab = styled.button<{ active: boolean }>`
  flex: 1;
  padding: 1rem;
  background: ${props => props.active ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : 'transparent'};
  border: none;
  font-size: 1rem;
  font-weight: 600;
  color: ${props => props.active ? 'white' : '#64748b'};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.active ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : 'rgba(16, 185, 129, 0.05)'};
    color: ${props => props.active ? 'white' : '#10b981'};
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 1.5rem 0;
  color: #64748b;
  font-size: 0.9rem;
  
  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #e5e7eb;
  }
  
  span {
    padding: 0 1rem;
  }
`;

const GoogleButton = styled.button`
  width: 100%;
  background: white;
  color: #374151;
  border: 2px solid #e5e7eb;
  padding: 0.875rem 1rem;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  
  &:hover {
    background: #f9fafb;
    border-color: #10b981;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const RecaptchaContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 1rem 0;
`;

const BackLink = styled(Link)`
  color: #10b981;
  text-decoration: none;
  font-weight: 500;
  margin-top: 1.5rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    color: #059669;
    transform: translateX(-2px);
  }
`;

const LoginPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  
  // Login state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Register state
  const [registerData, setRegisterData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  });
  
  // reCAPTCHA state
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      const response = await authAPI.login(email, password);
      
      // Token'ı localStorage'a kaydet
      localStorage.setItem('token', response.token);
      
      // Kullanıcı bilgilerini context'e kaydet
      login(response.user, response.token);
      
      setSuccess('Giriş başarılı! Yönlendiriliyorsunuz...');
      setTimeout(() => {
        if (response.user.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      }, 1500);
    } catch (error: any) {
      setError(error.message || 'E-posta veya şifre hatalı!');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    // reCAPTCHA kontrolü
    if (!recaptchaToken) {
      setError('Lütfen reCAPTCHA doğrulamasını tamamlayın!');
      setIsLoading(false);
      return;
    }

    // Şifre kontrolü
    if (registerData.password !== registerData.confirmPassword) {
      setError('Şifreler eşleşmiyor!');
      setIsLoading(false);
      resetRecaptcha();
      return;
    }

    if (registerData.password.length < 6) {
      setError('Şifre en az 6 karakter olmalıdır!');
      setIsLoading(false);
      resetRecaptcha();
      return;
    }

    try {
      const userData = {
        name: `${registerData.firstName} ${registerData.lastName}`,
        email: registerData.email,
        password: registerData.password,
        phone: registerData.phone
      };

      const response = await authAPI.register(userData);
      
      // Token'ı localStorage'a kaydet
      localStorage.setItem('token', response.token);
      
      // Kullanıcı bilgilerini context'e kaydet
      login(response.user, response.token);
      
      setSuccess('Hesap başarıyla oluşturuldu! Yönlendiriliyorsunuz...');
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (error: any) {
      setError(error.message || 'Kayıt olurken bir hata oluştu.');
      resetRecaptcha();
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterChange = (field: string, value: string) => {
    setRegisterData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleGoogleSignIn = () => {
    // Google OAuth entegrasyonu burada yapılacak
    setError('Google ile giriş özelliği yakında eklenecek!');
  };

  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
  };

  const resetRecaptcha = () => {
    if (recaptchaRef.current) {
      recaptchaRef.current.reset();
    }
    setRecaptchaToken(null);
  };

  return (
    <LoginContainer>
      <LoginCard>
        <Logo>
          🏠 Emlak
        </Logo>
        
        <TabContainer>
          <Tab 
            active={activeTab === 'login'} 
            onClick={() => setActiveTab('login')}
          >
            Giriş Yap
          </Tab>
          <Tab 
            active={activeTab === 'register'} 
            onClick={() => setActiveTab('register')}
          >
            Hesap Aç
          </Tab>
        </TabContainer>

        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && <SuccessMessage>{success}</SuccessMessage>}

        {activeTab === 'login' ? (
          <>
            <Title>Hoş Geldiniz</Title>
            <Subtitle>Hesabınıza giriş yapın</Subtitle>

            <Form onSubmit={handleLogin}>
              <FormGroup>
                <Label htmlFor="email">E-posta</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ornek@email.com"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="password">Şifre</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Şifrenizi girin"
                  required
                />
              </FormGroup>

              <LoginButton type="submit" disabled={isLoading}>
                {isLoading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
              </LoginButton>
            </Form>

            <DemoInfo>
              <DemoTitle>Demo Hesap Bilgileri:</DemoTitle>
              <DemoText><strong>Admin:</strong> admin@emlak.com / admin123</DemoText>
              <DemoText><strong>Kullanıcı:</strong> user@emlak.com / user123</DemoText>
            </DemoInfo>
          </>
        ) : (
          <>
            <Title>Hesap Oluştur</Title>
            <Subtitle>Yeni hesabınızı oluşturun</Subtitle>

            <GoogleButton onClick={handleGoogleSignIn}>
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Gmail ile devam et
            </GoogleButton>

            <Divider>
              <span>veya</span>
            </Divider>

            <Form onSubmit={handleRegister}>
              <FormGroup>
                <Label htmlFor="firstName">Ad</Label>
                <Input
                  id="firstName"
                  type="text"
                  value={registerData.firstName}
                  onChange={(e) => handleRegisterChange('firstName', e.target.value)}
                  placeholder="Adınız"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="lastName">Soyad</Label>
                <Input
                  id="lastName"
                  type="text"
                  value={registerData.lastName}
                  onChange={(e) => handleRegisterChange('lastName', e.target.value)}
                  placeholder="Soyadınız"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="registerEmail">E-posta</Label>
                <Input
                  id="registerEmail"
                  type="email"
                  value={registerData.email}
                  onChange={(e) => handleRegisterChange('email', e.target.value)}
                  placeholder="ornek@email.com"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="phone">Telefon</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={registerData.phone}
                  onChange={(e) => handleRegisterChange('phone', e.target.value)}
                  placeholder="+90 555 123 4567"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="registerPassword">Şifre</Label>
                <Input
                  id="registerPassword"
                  type="password"
                  value={registerData.password}
                  onChange={(e) => handleRegisterChange('password', e.target.value)}
                  placeholder="En az 6 karakter"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="confirmPassword">Şifre Tekrar</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={registerData.confirmPassword}
                  onChange={(e) => handleRegisterChange('confirmPassword', e.target.value)}
                  placeholder="Şifrenizi tekrar girin"
                  required
                />
              </FormGroup>

              <RecaptchaContainer>
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" // Test site key
                  onChange={handleRecaptchaChange}
                  theme="light"
                />
              </RecaptchaContainer>

              <LoginButton type="submit" disabled={isLoading || !recaptchaToken}>
                {isLoading ? 'Hesap oluşturuluyor...' : 'Hesap Aç'}
              </LoginButton>
            </Form>
          </>
        )}

        <BackLink to="/">
          ← Ana Sayfaya Dön
        </BackLink>
      </LoginCard>
    </LoginContainer>
  );
};

export default LoginPage; 