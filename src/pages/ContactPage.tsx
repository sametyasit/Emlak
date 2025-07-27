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
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  color: #1e293b;
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
    background: radial-gradient(circle at 50% 0%, rgba(16, 185, 129, 0.03) 0%, transparent 50%);
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
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 800;
  color: #1e293b;
  margin-bottom: 1.5rem;
  letter-spacing: -0.02em;
  
  span {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const Subtitle = styled.p`
  font-size: clamp(1.1rem, 2vw, 1.3rem);
  color: #64748b;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
  font-weight: 400;
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
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(16, 185, 129, 0.1);
  backdrop-filter: blur(10px);
  animation: ${fadeInUp} 0.8s ease-out;
  
  h3 {
    font-size: 1.8rem;
    font-weight: 700;
    margin-bottom: 2rem;
    color: #1e293b;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #374151;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 10px;
  font-size: 1rem;
  background: #ffffff;
  color: #374151;
  outline: none;
  transition: all 0.3s ease;
  
  &:focus {
    border-color: #10b981;
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
  }
  
  &::placeholder {
    color: #9ca3af;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.8rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 10px;
  font-size: 1rem;
  background: #ffffff;
  color: #374151;
  outline: none;
  transition: all 0.3s ease;
  resize: vertical;
  min-height: 120px;
  
  &:focus {
    border-color: #10b981;
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
  }
  
  &::placeholder {
    color: #9ca3af;
  }
`;

const SubmitButton = styled.button`
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  width: 100%;
  
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
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const ContactInfo = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(16, 185, 129, 0.1);
  backdrop-filter: blur(10px);
  animation: ${fadeInUp} 0.8s ease-out;
  
  h3 {
    font-size: 1.8rem;
    font-weight: 700;
    margin-bottom: 2rem;
    color: #1e293b;
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: rgba(16, 185, 129, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(16, 185, 129, 0.1);
  
  .icon {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 1rem;
    color: white;
    font-size: 1.2rem;
  }
  
  .content {
    flex: 1;
    
    h4 {
      font-size: 1.1rem;
      font-weight: 600;
      color: #1e293b;
      margin-bottom: 0.3rem;
    }
    
    p {
      color: #6b7280;
      line-height: 1.5;
    }
  }
`;

const MapSection = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(16, 185, 129, 0.1);
  backdrop-filter: blur(10px);
  position: relative;
  z-index: 1;
  
  h3 {
    font-size: 1.8rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    color: #1e293b;
    text-align: center;
  }
`;

const MapPlaceholder = styled.div`
  width: 100%;
  height: 300px;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
  font-weight: 500;
`;

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Form gönderme işlemi burada yapılacak
    console.log('Form data:', formData);
    alert('Mesajınız başarıyla gönderildi!');
  };

  return (
    <Container>
      <HeroSection>
        <Title>İletişim <span>Kurun</span></Title>
        <Subtitle>
          Sorularınız için bizimle iletişime geçin. Uzman ekibimiz size yardımcı olmaktan mutluluk duyacaktır.
        </Subtitle>
      </HeroSection>

      <ContentSection>
        <ContactForm>
          <h3>Mesaj Gönderin</h3>
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>Ad Soyad</Label>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Adınız ve soyadınız"
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>E-posta</Label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="E-posta adresiniz"
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>Telefon</Label>
              <Input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Telefon numaranız"
              />
            </FormGroup>

            <FormGroup>
              <Label>Konu</Label>
              <Input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="Mesaj konusu"
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>Mesaj</Label>
              <TextArea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Mesajınızı buraya yazın..."
                required
              />
            </FormGroup>

            <SubmitButton type="submit">
              📧 Mesaj Gönder
            </SubmitButton>
          </form>
        </ContactForm>

        <ContactInfo>
          <h3>İletişim Bilgileri</h3>
          
          <ContactItem>
            <div className="icon">📍</div>
            <div className="content">
              <h4>Adres</h4>
              <p>Levent Mahallesi, Büyükdere Caddesi No:123<br />Şişli, İstanbul, Türkiye</p>
            </div>
          </ContactItem>

          <ContactItem>
            <div className="icon">📞</div>
            <div className="content">
              <h4>Telefon</h4>
              <p>+90 (212) 555 0123<br />+90 (212) 555 0124</p>
            </div>
          </ContactItem>

          <ContactItem>
            <div className="icon">✉️</div>
            <div className="content">
              <h4>E-posta</h4>
              <p>info@emlak.com<br />destek@emlak.com</p>
            </div>
          </ContactItem>

          <ContactItem>
            <div className="icon">🕒</div>
            <div className="content">
              <h4>Çalışma Saatleri</h4>
              <p>Pazartesi - Cuma: 09:00 - 18:00<br />Cumartesi: 09:00 - 14:00</p>
            </div>
          </ContactItem>
        </ContactInfo>
      </ContentSection>

      <MapSection>
        <h3>Konum</h3>
        <MapPlaceholder>
          🗺️ Harita burada görüntülenecek
        </MapPlaceholder>
      </MapSection>
    </Container>
  );
};

export default ContactPage; 