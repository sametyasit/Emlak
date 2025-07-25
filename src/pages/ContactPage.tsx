import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

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
    background: radial-gradient(circle at 50% 0%, rgba(102, 126, 234, 0.05) 0%, transparent 50%);
    pointer-events: none;
    z-index: 0;
  }
`;

const HeroSection = styled.div`
  text-align: center;
  margin-bottom: 4rem;
  position: relative;
  z-index: 1;
  animation: ${fadeInUp} 0.8s ease-out;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.3rem;
  color: var(--text-secondary);
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const ContentSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  margin-bottom: 4rem;
  position: relative;
  z-index: 1;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ContactForm = styled.div`
  background: var(--card-bg);
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--border-color);
  backdrop-filter: blur(10px);
  animation: ${fadeInUp} 0.8s ease-out;
  
  h3 {
    font-size: 1.8rem;
    font-weight: 700;
    margin-bottom: 2rem;
    color: var(--text-primary);
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: var(--text-primary);
  font-size: 0.95rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  border: 2px solid var(--border-color);
  border-radius: 12px;
  background: var(--bg-secondary);
  color: var(--text-primary);
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: var(--accent-color);
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
  
  &::placeholder {
    color: var(--text-secondary);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 1rem;
  border: 2px solid var(--border-color);
  border-radius: 12px;
  background: var(--bg-secondary);
  color: var(--text-primary);
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: var(--accent-color);
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
  
  &::placeholder {
    color: var(--text-secondary);
  }
`;

const SubmitButton = styled.button`
  background: var(--accent-color);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  
  &:hover {
    background: var(--accent-hover);
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const ContactInfo = styled.div`
  background: var(--card-bg);
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--border-color);
  backdrop-filter: blur(10px);
  animation: ${fadeInUp} 0.8s ease-out;
  
  h3 {
    font-size: 1.8rem;
    font-weight: 700;
    margin-bottom: 2rem;
    color: var(--text-primary);
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: var(--bg-secondary);
  border-radius: 12px;
  border: 1px solid var(--border-color);
  
  .icon {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: var(--accent-color);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    color: white;
    flex-shrink: 0;
  }
  
  .content {
    flex: 1;
    
    h4 {
      font-size: 1.1rem;
      font-weight: 600;
      margin-bottom: 0.3rem;
      color: var(--text-primary);
    }
    
    p {
      color: var(--text-secondary);
      line-height: 1.5;
    }
  }
`;

const OfficeSection = styled.div`
  margin-bottom: 4rem;
  position: relative;
  z-index: 1;
  animation: ${fadeInUp} 0.8s ease-out;
  
  h2 {
    font-size: 2.5rem;
    font-weight: 700;
    text-align: center;
    margin-bottom: 3rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const OfficeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
`;

const OfficeCard = styled.div`
  background: var(--card-bg);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--border-color);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }
  
  h3 {
    font-size: 1.4rem;
    font-weight: 700;
    margin-bottom: 1rem;
    color: var(--text-primary);
  }
  
  .address {
    color: var(--text-secondary);
    margin-bottom: 1rem;
    line-height: 1.6;
  }
  
  .hours {
    color: var(--accent-color);
    font-weight: 500;
    margin-bottom: 1rem;
  }
  
  .phone {
    color: var(--text-secondary);
    font-weight: 500;
  }
`;

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    alert('Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
    setIsSubmitting(false);
  };

  return (
    <Container>
      <HeroSection>
        <Title>📞 İletişim</Title>
        <Subtitle>
          Sorularınız için bizimle iletişime geçin. Uzman ekibimiz size yardımcı olmaktan 
          mutluluk duyacaktır.
        </Subtitle>
      </HeroSection>

      <ContentSection>
        <ContactForm>
          <h3>✉️ Mesaj Gönderin</h3>
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="name">Ad Soyad *</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Adınız ve soyadınız"
                required
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="email">E-posta *</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="ornek@email.com"
                required
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="phone">Telefon</Label>
              <Input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+90 (5XX) XXX XX XX"
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="subject">Konu *</Label>
              <Input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="Mesajınızın konusu"
                required
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="message">Mesaj *</Label>
              <TextArea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Mesajınızı buraya yazın..."
                required
              />
            </FormGroup>
            
            <SubmitButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Gönderiliyor...' : '📤 Mesaj Gönder'}
            </SubmitButton>
          </form>
        </ContactForm>

        <ContactInfo>
          <h3>📋 İletişim Bilgileri</h3>
          
          <ContactItem>
            <div className="icon">📍</div>
            <div className="content">
              <h4>Adres</h4>
              <p>Levent Mahallesi, Büyükdere Caddesi No:123<br />
              Şişli, İstanbul, Türkiye</p>
            </div>
          </ContactItem>
          
          <ContactItem>
            <div className="icon">📞</div>
            <div className="content">
              <h4>Telefon</h4>
              <p>+90 (212) 555 0123<br />
              +90 (532) 555 0123</p>
            </div>
          </ContactItem>
          
          <ContactItem>
            <div className="icon">✉️</div>
            <div className="content">
              <h4>E-posta</h4>
              <p>info@emlak.com<br />
              destek@emlak.com</p>
            </div>
          </ContactItem>
          
          <ContactItem>
            <div className="icon">🕒</div>
            <div className="content">
              <h4>Çalışma Saatleri</h4>
              <p>Pazartesi - Cuma: 09:00 - 18:00<br />
              Cumartesi: 10:00 - 16:00<br />
              Pazar: Kapalı</p>
            </div>
          </ContactItem>
        </ContactInfo>
      </ContentSection>

      <OfficeSection>
        <h2>🏢 Ofislerimiz</h2>
        <OfficeGrid>
          <OfficeCard>
            <h3>🏢 Merkez Ofis - İstanbul</h3>
            <div className="address">
              Levent Mahallesi, Büyükdere Caddesi No:123<br />
              Şişli, İstanbul, Türkiye
            </div>
            <div className="hours">
              Pazartesi - Cuma: 09:00 - 18:00
            </div>
            <div className="phone">
              +90 (212) 555 0123
            </div>
          </OfficeCard>
          
          <OfficeCard>
            <h3>🏢 Ankara Ofisi</h3>
            <div className="address">
              Çankaya Mahallesi, Atatürk Bulvarı No:456<br />
              Çankaya, Ankara, Türkiye
            </div>
            <div className="hours">
              Pazartesi - Cuma: 09:00 - 18:00
            </div>
            <div className="phone">
              +90 (312) 555 0123
            </div>
          </OfficeCard>
          
          <OfficeCard>
            <h3>🏢 İzmir Ofisi</h3>
            <div className="address">
              Alsancak Mahallesi, Kıbrıs Şehitleri Caddesi No:789<br />
              Konak, İzmir, Türkiye
            </div>
            <div className="hours">
              Pazartesi - Cuma: 09:00 - 18:00
            </div>
            <div className="phone">
              +90 (232) 555 0123
            </div>
          </OfficeCard>
        </OfficeGrid>
      </OfficeSection>
    </Container>
  );
};

export default ContactPage; 