import React, { useState } from 'react';
import styled from 'styled-components';

const SupportContainer = styled.div`
  max-width: 1000px;
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

const SupportGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ContactCard = styled.div`
  background: var(--card-bg);
  border-radius: 12px;
  box-shadow: var(--shadow);
  padding: 30px;
  text-align: center;
  border: 1px solid var(--border-color);
`;

const ContactIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 20px;
`;

const ContactTitle = styled.h3`
  color: #333;
  margin-bottom: 15px;
  font-size: 1.3rem;
`;

const ContactInfo = styled.div`
  color: #666;
  margin-bottom: 20px;
`;

const ContactButton = styled.button`
  background: #8B5CF6;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: background 0.2s;

  &:hover {
    background: #7C3AED;
  }
`;

const FAQSection = styled.div`
  background: var(--card-bg);
  border-radius: 12px;
  box-shadow: var(--shadow);
  padding: 30px;
  margin-bottom: 30px;
  border: 1px solid var(--border-color);
`;

const FAQTitle = styled.h2`
  color: #333;
  margin-bottom: 20px;
  text-align: center;
`;

const FAQItem = styled.div`
  border-bottom: 1px solid var(--border-color);
  margin-bottom: 15px;

  &:last-child {
    border-bottom: none;
  }
`;

const FAQQuestion = styled.div<{ isOpen?: boolean }>`
  padding: 15px 0;
  cursor: pointer;
  font-weight: 500;
  color: #333;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    color: #8B5CF6;
  }
`;

const FAQAnswer = styled.div<{ isOpen?: boolean }>`
  padding: ${props => props.isOpen ? '0 0 15px 0' : '0'};
  color: #666;
  line-height: 1.6;
  max-height: ${props => props.isOpen ? '200px' : '0'};
  overflow: hidden;
  transition: all 0.3s ease;
`;

const ContactForm = styled.div`
  background: var(--card-bg);
  border-radius: 12px;
  box-shadow: var(--shadow);
  padding: 30px;
  border: 1px solid var(--border-color);
`;

const FormTitle = styled.h2`
  color: #333;
  margin-bottom: 20px;
  text-align: center;
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

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  resize: vertical;
  min-height: 120px;

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

const SubmitButton = styled.button`
  background: #8B5CF6;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  width: 100%;
  transition: background 0.2s;

  &:hover {
    background: #7C3AED;
  }
`;

const WorkingHours = styled.div`
  background: #f8fafc;
  border-radius: 8px;
  padding: 20px;
  margin-top: 20px;
`;

const WorkingHoursTitle = styled.h4`
  color: #333;
  margin-bottom: 10px;
`;

const WorkingHoursText = styled.div`
  color: #666;
  line-height: 1.6;
`;

const SupportPage: React.FC = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const faqs = [
    {
      id: 1,
      question: 'Emlak ilanı nasıl ekleyebilirim?',
      answer: 'Emlak ilanı eklemek için önce hesabınıza giriş yapın. Ardından "İlan Ekle" butonuna tıklayarak gerekli bilgileri doldurun ve ilanınızı yayınlayın.'
    },
    {
      id: 2,
      question: 'Favori ilanlarıma nasıl ulaşabilirim?',
      answer: 'Beğendiğiniz ilanların yanındaki kalp ikonuna tıklayarak favorilerinize ekleyebilirsiniz. Favori ilanlarınıza dashboard sayfanızdan ulaşabilirsiniz.'
    },
    {
      id: 3,
      question: 'Randevu nasıl alabilirim?',
      answer: 'İlan detay sayfasında "Randevu Al" butonuna tıklayarak emlak danışmanı ile iletişime geçebilir ve uygun bir tarih belirleyebilirsiniz.'
    },
    {
      id: 4,
      question: 'Fiyat pazarlığı yapabilir miyim?',
      answer: 'Evet, fiyat konusunda emlak danışmanı ile görüşebilir ve pazarlık yapabilirsiniz. Mesajlaşma özelliğini kullanarak detayları konuşabilirsiniz.'
    },
    {
      id: 5,
      question: 'Hesabımı nasıl silebilirim?',
      answer: 'Hesap ayarları sayfasından "Hesabı Sil" butonuna tıklayarak hesabınızı silebilirsiniz. Bu işlem geri alınamaz, dikkatli olun.'
    }
  ];

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  const handleContactFormChange = (field: string, value: string) => {
    setContactForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmitContact = () => {
    alert('Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.');
    setContactForm({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <SupportContainer>
      <PageTitle>📞 Destek</PageTitle>
      
      <SupportGrid>
        <ContactCard>
          <ContactIcon>📞</ContactIcon>
          <ContactTitle>Telefon</ContactTitle>
          <ContactInfo>
            <div>+90 (212) 555 0123</div>
            <div>+90 (212) 555 0124</div>
          </ContactInfo>
          <ContactButton onClick={() => window.open('tel:+902125550123')}>
            Ara
          </ContactButton>
        </ContactCard>

        <ContactCard>
          <ContactIcon>📧</ContactIcon>
          <ContactTitle>E-posta</ContactTitle>
          <ContactInfo>
            <div>info@emlak.com</div>
            <div>destek@emlak.com</div>
          </ContactInfo>
          <ContactButton onClick={() => window.open('mailto:info@emlak.com')}>
            E-posta Gönder
          </ContactButton>
        </ContactCard>

        <ContactCard>
          <ContactIcon>💬</ContactIcon>
          <ContactTitle>Canlı Destek</ContactTitle>
          <ContactInfo>
            <div>7/24 canlı destek</div>
            <div>Anında yanıt</div>
          </ContactInfo>
          <ContactButton>
            Sohbet Başlat
          </ContactButton>
        </ContactCard>

        <ContactCard>
          <ContactIcon>📍</ContactIcon>
          <ContactTitle>Adres</ContactTitle>
          <ContactInfo>
            <div>Emlak Caddesi No: 123</div>
            <div>Kadıköy, İstanbul</div>
            <div>34100, Türkiye</div>
          </ContactInfo>
          <ContactButton onClick={() => window.open('https://maps.google.com')}>
            Haritada Göster
          </ContactButton>
        </ContactCard>
      </SupportGrid>

      <WorkingHours>
        <WorkingHoursTitle>🕒 Çalışma Saatleri</WorkingHoursTitle>
        <WorkingHoursText>
          <div><strong>Pazartesi - Cuma:</strong> 09:00 - 18:00</div>
          <div><strong>Cumartesi:</strong> 09:00 - 16:00</div>
          <div><strong>Pazar:</strong> Kapalı</div>
          <div style={{ marginTop: '10px', color: '#8B5CF6' }}>
            <strong>Canlı destek:</strong> 7/24 hizmetinizdeyiz
          </div>
        </WorkingHoursText>
      </WorkingHours>

      <FAQSection>
        <FAQTitle>❓ Sık Sorulan Sorular</FAQTitle>
        
        {faqs.map((faq) => (
          <FAQItem key={faq.id}>
            <FAQQuestion 
              isOpen={openFAQ === faq.id}
              onClick={() => toggleFAQ(faq.id)}
            >
              {faq.question}
              <span>{openFAQ === faq.id ? '−' : '+'}</span>
            </FAQQuestion>
            <FAQAnswer isOpen={openFAQ === faq.id}>
              {faq.answer}
            </FAQAnswer>
          </FAQItem>
        ))}
      </FAQSection>

      <ContactForm>
        <FormTitle>📝 Bize Ulaşın</FormTitle>
        
        <FormGroup>
          <Label>Ad Soyad</Label>
          <Input
            type="text"
            value={contactForm.name}
            onChange={(e) => handleContactFormChange('name', e.target.value)}
            placeholder="Adınız ve soyadınız"
          />
        </FormGroup>

        <FormGroup>
          <Label>E-posta</Label>
          <Input
            type="email"
            value={contactForm.email}
            onChange={(e) => handleContactFormChange('email', e.target.value)}
            placeholder="E-posta adresiniz"
          />
        </FormGroup>

        <FormGroup>
          <Label>Konu</Label>
          <Select
            value={contactForm.subject}
            onChange={(e) => handleContactFormChange('subject', e.target.value)}
          >
            <option value="">Konu seçin</option>
            <option value="genel">Genel Bilgi</option>
            <option value="teknik">Teknik Destek</option>
            <option value="ilan">İlan İşlemleri</option>
            <option value="odeme">Ödeme</option>
            <option value="diger">Diğer</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <Label>Mesajınız</Label>
          <TextArea
            value={contactForm.message}
            onChange={(e) => handleContactFormChange('message', e.target.value)}
            placeholder="Mesajınızı buraya yazın..."
          />
        </FormGroup>

        <SubmitButton onClick={handleSubmitContact}>
          Mesaj Gönder
        </SubmitButton>
      </ContactForm>
    </SupportContainer>
  );
};

export default SupportPage; 