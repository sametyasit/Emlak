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
  min-height: 100vh;
  background: var(--bg-primary);
  color: var(--text-primary);
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, var(--gradient-primary), var(--gradient-secondary));
  padding: 120px 20px 80px;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.1"/><circle cx="50" cy="10" r="0.5" fill="white" opacity="0.1"/><circle cx="10" cy="60" r="0.5" fill="white" opacity="0.1"/><circle cx="90" cy="40" r="0.5" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
    opacity: 0.3;
  }
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  animation: ${fadeInUp} 0.8s ease-out;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.3rem;
  color: rgba(255, 255, 255, 0.9);
  max-width: 600px;
  margin: 0 auto 2rem;
  line-height: 1.6;
  animation: ${fadeInUp} 0.8s ease-out 0.2s both;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const ServicesSection = styled.section`
  padding: 80px 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 3rem;
  color: var(--text-primary);
  animation: ${fadeInUp} 0.8s ease-out;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const ServiceCard = styled.div`
  background: var(--card-bg);
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: var(--shadow);
  transition: all 0.3s ease;
  border: 1px solid var(--border-color);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, var(--accent-color), var(--accent-hover));
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: var(--card-hover);
    border-color: var(--accent-color);
  }

  animation: ${fadeInUp} 0.8s ease-out;
`;

const ServiceIcon = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, var(--accent-color), var(--accent-hover));
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  color: white;
`;

const ServiceTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--text-primary);
`;

const ServiceDescription = styled.p`
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const ServiceFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ServiceFeature = styled.li`
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
  padding-left: 1.5rem;
  position: relative;

  &::before {
    content: '✓';
    position: absolute;
    left: 0;
    color: var(--accent-color);
    font-weight: bold;
  }
`;

const CTASection = styled.section`
  background: linear-gradient(135deg, var(--gradient-secondary), var(--gradient-primary));
  padding: 80px 20px;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.1"/><circle cx="50" cy="10" r="0.5" fill="white" opacity="0.1"/><circle cx="10" cy="60" r="0.5" fill="white" opacity="0.1"/><circle cx="90" cy="40" r="0.5" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
    opacity: 0.2;
  }
`;

const CTATitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 600;
  color: white;
  margin-bottom: 1.5rem;
  animation: ${fadeInUp} 0.8s ease-out;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const CTADescription = styled.p`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.9);
  max-width: 600px;
  margin: 0 auto 2rem;
  line-height: 1.6;
  animation: ${fadeInUp} 0.8s ease-out 0.2s both;
`;

const CTAButton = styled.button`
  background: white;
  color: var(--accent-color);
  border: none;
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  animation: ${fadeInUp} 0.8s ease-out 0.4s both;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
    background: var(--accent-color);
    color: white;
  }
`;

const InteractiveTools = styled.div`
  background: var(--card-bg);
  border-radius: 20px;
  padding: 2.5rem;
  margin: 2rem 0;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--border-color);
  animation: ${fadeInUp} 0.8s ease-out 0.6s both;
`;

const ToolsTitle = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: var(--text-primary);
  text-align: center;
`;

const ToolsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const ToolCard = styled.div`
  background: var(--bg-primary);
  border-radius: 15px;
  padding: 2rem;
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }
`;

const ToolTitle = styled.h4`
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ToolDescription = styled.p`
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

const ToolForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FormLabel = styled.label`
  font-weight: 600;
  color: var(--text-primary);
  font-size: 0.9rem;
`;

const FormSelect = styled.select`
  padding: 0.8rem;
  border: 1px solid var(--border-color);
  border-radius: 10px;
  background: var(--bg-primary);
  color: var(--text-primary);
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: var(--accent-color);
  }
`;

const FormInput = styled.input`
  padding: 0.8rem;
  border: 1px solid var(--border-color);
  border-radius: 10px;
  background: var(--bg-primary);
  color: var(--text-primary);
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: var(--accent-color);
  }
`;

const FormTextarea = styled.textarea`
  padding: 0.8rem;
  border: 1px solid var(--border-color);
  border-radius: 10px;
  background: var(--bg-primary);
  color: var(--text-primary);
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: var(--accent-color);
  }
`;

const ToolButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
  
  &:hover {
    background: var(--accent-hover);
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
  }
`;

const ResultBox = styled.div`
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
  border-radius: 15px;
  padding: 1.5rem;
  margin-top: 1rem;
  border: 2px solid var(--accent-color);
`;

const ResultText = styled.div`
  color: var(--text-primary);
  font-size: 0.9rem;
  line-height: 1.6;
  white-space: pre-wrap;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
  flex-wrap: wrap;
`;

const ActionButton = styled.button`
  background: white;
  color: var(--accent-color);
  border: 2px solid var(--accent-color);
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: var(--accent-color);
    color: white;
    transform: translateY(-2px);
  }
`;

const LegalPage: React.FC = () => {
  const [documentType, setDocumentType] = useState('satis');
  const [documentData, setDocumentData] = useState({
    sellerName: '',
    buyerName: '',
    propertyAddress: '',
    price: '',
    additionalTerms: ''
  });
  const [generatedDocument, setGeneratedDocument] = useState('');
  const [consultationData, setConsultationData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceType: 'genel',
    description: '',
    preferredDate: '',
    preferredTime: ''
  });
  const [bookingResult, setBookingResult] = useState('');

  const handleContactClick = () => {
    window.location.href = '/contact';
  };

  const handleGenerateDocument = () => {
    const templates = {
      satis: `SATIŞ SÖZLEŞMESİ

SATICI: ${documentData.sellerName}
ALICI: ${documentData.buyerName}
EMLAK ADRESİ: ${documentData.propertyAddress}
SATIŞ BEDELİ: ${documentData.price} TL

1. TARAFLAR
Bu sözleşme, yukarıda kimlik bilgileri belirtilen SATICI ile ALICI arasında düzenlenmiştir.

2. KONU
Satıcı, yukarıda adresi belirtilen emlağı alıcıya satmayı, alıcı da satın almayı kabul etmiştir.

3. SATIŞ BEDELİ
Satış bedeli ${documentData.price} TL olup, peşin ödenecektir.

4. EK ŞARTLAR
${documentData.additionalTerms || 'Ek şart bulunmamaktadır.'}

5. YÜRÜRLÜK
Bu sözleşme iki nüsha halinde düzenlenmiş olup, taraflarca imzalandıktan sonra yürürlüğe girer.

Tarih: ${new Date().toLocaleDateString('tr-TR')}
Yer: İstanbul

SATICI İMZASI                    ALICI İMZASI
_________________                _________________`,
      
      kiralama: `KİRALAMA SÖZLEŞMESİ

KİRAYA VEREN: ${documentData.sellerName}
KİRACI: ${documentData.buyerName}
EMLAK ADRESİ: ${documentData.propertyAddress}
KİRA BEDELİ: ${documentData.price} TL

1. TARAFLAR
Bu kiralama sözleşmesi, yukarıda kimlik bilgileri belirtilen KİRAYA VEREN ile KİRACI arasında düzenlenmiştir.

2. KONU
Kiraya veren, yukarıda adresi belirtilen emlağı kiracıya kiralamayı, kiracı da kiralamayı kabul etmiştir.

3. KİRA BEDELİ
Aylık kira bedeli ${documentData.price} TL olup, her ayın ilk günü ödenecektir.

4. SÜRE
Kiralama süresi 1 yıl olup, tarafların anlaşması halinde uzatılabilir.

5. EK ŞARTLAR
${documentData.additionalTerms || 'Ek şart bulunmamaktadır.'}

Tarih: ${new Date().toLocaleDateString('tr-TR')}
Yer: İstanbul

KİRAYA VEREN İMZASI             KİRACI İMZASI
_________________                _________________`
    };

    const template = templates[documentType as keyof typeof templates] || templates.satis;
    setGeneratedDocument(template);
  };

  const handleBookConsultation = () => {
    const result = `Danışmanlık talebiniz alınmıştır!

Ad Soyad: ${consultationData.name}
E-posta: ${consultationData.email}
Telefon: ${consultationData.phone}
Hizmet Türü: ${consultationData.serviceType}
Tarih: ${consultationData.preferredDate}
Saat: ${consultationData.preferredTime}

En kısa sürede sizinle iletişime geçeceğiz. Talebiniz için teşekkür ederiz!`;
    
    setBookingResult(result);
  };

  return (
    <Container>
      <HeroSection>
        <HeroTitle>Hukuki Danışmanlık</HeroTitle>
        <HeroSubtitle>
          Emlak işlemlerinizde hukuki güvenliğiniz için uzman ekibimizle yanınızdayız. 
          Tüm hukuki süreçlerinizde profesyonel destek alın.
        </HeroSubtitle>
      </HeroSection>

      <ServicesSection>
        <SectionTitle>Hukuki Hizmetlerimiz</SectionTitle>
        
        <ServicesGrid>
          <ServiceCard>
            <ServiceIcon>📋</ServiceIcon>
            <ServiceTitle>Sözleşme Hizmetleri</ServiceTitle>
            <ServiceDescription>
              Satış, kiralama ve diğer emlak sözleşmelerinin hazırlanması ve hukuki incelemesi.
            </ServiceDescription>
            <ServiceFeatures>
              <ServiceFeature>Satış sözleşmesi hazırlama</ServiceFeature>
              <ServiceFeature>Kiralama sözleşmesi düzenleme</ServiceFeature>
              <ServiceFeature>Sözleşme hukuki inceleme</ServiceFeature>
              <ServiceFeature>Müzakere desteği</ServiceFeature>
            </ServiceFeatures>
          </ServiceCard>

          <ServiceCard>
            <ServiceIcon>🏛️</ServiceIcon>
            <ServiceTitle>Tapu İşlemleri</ServiceTitle>
            <ServiceDescription>
              Tapu devir işlemleri, ipotek işlemleri ve tapu ile ilgili tüm hukuki süreçler.
            </ServiceDescription>
            <ServiceFeatures>
              <ServiceFeature>Tapu devir işlemleri</ServiceFeature>
              <ServiceFeature>İpotek işlemleri</ServiceFeature>
              <ServiceFeature>Tapu düzeltme işlemleri</ServiceFeature>
              <ServiceFeature>Tapu davaları</ServiceFeature>
            </ServiceFeatures>
          </ServiceCard>

          <ServiceCard>
            <ServiceIcon>🏗️</ServiceIcon>
            <ServiceTitle>İmar Hukuku</ServiceTitle>
            <ServiceDescription>
              İmar planları, yapı ruhsatları ve imar ile ilgili tüm hukuki konularda danışmanlık.
            </ServiceDescription>
            <ServiceFeatures>
              <ServiceFeature>İmar planı inceleme</ServiceFeature>
              <ServiceFeature>Yapı ruhsatı işlemleri</ServiceFeature>
              <ServiceFeature>İmar davaları</ServiceFeature>
              <ServiceFeature>İmar ceza işlemleri</ServiceFeature>
            </ServiceFeatures>
          </ServiceCard>

          <ServiceCard>
            <ServiceIcon>⚖️</ServiceIcon>
            <ServiceTitle>Emlak Davaları</ServiceTitle>
            <ServiceDescription>
              Emlak ile ilgili tüm dava türlerinde hukuki temsil ve danışmanlık hizmetleri.
            </ServiceDescription>
            <ServiceFeatures>
              <ServiceFeature>Mülkiyet davaları</ServiceFeature>
              <ServiceFeature>Tahliye davaları</ServiceFeature>
              <ServiceFeature>Tazminat davaları</ServiceFeature>
              <ServiceFeature>Haciz işlemleri</ServiceFeature>
            </ServiceFeatures>
          </ServiceCard>

          <ServiceCard>
            <ServiceIcon>🏢</ServiceIcon>
            <ServiceTitle>Kat Mülkiyeti Hukuku</ServiceTitle>
            <ServiceDescription>
              Kat mülkiyeti kurulması, kat karşılığı inşaat sözleşmeleri ve kat mülkiyeti davaları.
            </ServiceDescription>
            <ServiceFeatures>
              <ServiceFeature>Kat mülkiyeti kurulması</ServiceFeature>
              <ServiceFeature>Kat karşılığı sözleşmeleri</ServiceFeature>
              <ServiceFeature>Kat mülkiyeti davaları</ServiceFeature>
              <ServiceFeature>Yönetici seçimi davaları</ServiceFeature>
            </ServiceFeatures>
          </ServiceCard>

          <ServiceCard>
            <ServiceIcon>📊</ServiceIcon>
            <ServiceTitle>Vergi Danışmanlığı</ServiceTitle>
            <ServiceDescription>
              Emlak vergileri, KDV ve diğer vergi konularında hukuki danışmanlık hizmetleri.
            </ServiceDescription>
            <ServiceFeatures>
              <ServiceFeature>Emlak vergisi danışmanlığı</ServiceFeature>
              <ServiceFeature>KDV işlemleri</ServiceFeature>
              <ServiceFeature>Vergi uyuşmazlıkları</ServiceFeature>
              <ServiceFeature>Vergi planlaması</ServiceFeature>
            </ServiceFeatures>
          </ServiceCard>
        </ServicesGrid>
      </ServicesSection>

      <InteractiveTools>
        <ToolsTitle>🛠️ Hukuki Araçlar</ToolsTitle>
        <ToolsGrid>
          <ToolCard>
            <ToolTitle>📄 Sözleşme Oluşturucu</ToolTitle>
            <ToolDescription>
              Temel emlak sözleşmelerini kolayca oluşturun. Satış ve kiralama sözleşmeleri için şablonlar.
            </ToolDescription>
            <ToolForm>
              <FormGroup>
                <FormLabel>Sözleşme Türü</FormLabel>
                <FormSelect 
                  value={documentType}
                  onChange={(e) => setDocumentType(e.target.value)}
                >
                  <option value="satis">Satış Sözleşmesi</option>
                  <option value="kiralama">Kiralama Sözleşmesi</option>
                </FormSelect>
              </FormGroup>
              
              <FormGroup>
                <FormLabel>Satıcı/Kiraya Veren Adı</FormLabel>
                <FormInput 
                  type="text"
                  placeholder="Ad Soyad"
                  value={documentData.sellerName}
                  onChange={(e) => setDocumentData({...documentData, sellerName: e.target.value})}
                />
              </FormGroup>
              
              <FormGroup>
                <FormLabel>Alıcı/Kiracı Adı</FormLabel>
                <FormInput 
                  type="text"
                  placeholder="Ad Soyad"
                  value={documentData.buyerName}
                  onChange={(e) => setDocumentData({...documentData, buyerName: e.target.value})}
                />
              </FormGroup>
              
              <FormGroup>
                <FormLabel>Emlak Adresi</FormLabel>
                <FormInput 
                  type="text"
                  placeholder="Tam adres"
                  value={documentData.propertyAddress}
                  onChange={(e) => setDocumentData({...documentData, propertyAddress: e.target.value})}
                />
              </FormGroup>
              
              <FormGroup>
                <FormLabel>Bedel (TL)</FormLabel>
                <FormInput 
                  type="number"
                  placeholder="500000"
                  value={documentData.price}
                  onChange={(e) => setDocumentData({...documentData, price: e.target.value})}
                />
              </FormGroup>
              
              <FormGroup>
                <FormLabel>Ek Şartlar (Opsiyonel)</FormLabel>
                <FormTextarea 
                  placeholder="Ek şartlarınızı buraya yazabilirsiniz..."
                  value={documentData.additionalTerms}
                  onChange={(e) => setDocumentData({...documentData, additionalTerms: e.target.value})}
                />
              </FormGroup>
              
              <ToolButton onClick={handleGenerateDocument}>
                📄 Sözleşme Oluştur
              </ToolButton>
              
              {generatedDocument && (
                <ResultBox>
                  <ResultText>{generatedDocument}</ResultText>
                  <ActionButtons>
                    <ActionButton onClick={() => navigator.clipboard.writeText(generatedDocument)}>
                      📋 Kopyala
                    </ActionButton>
                    <ActionButton onClick={() => window.print()}>
                      🖨️ Yazdır
                    </ActionButton>
                  </ActionButtons>
                </ResultBox>
              )}
            </ToolForm>
          </ToolCard>

          <ToolCard>
            <ToolTitle>📅 Danışmanlık Randevu</ToolTitle>
            <ToolDescription>
              Hukuki danışmanlık için randevu alın. Uzman avukatlarımızla görüşme planlayın.
            </ToolDescription>
            <ToolForm>
              <FormGroup>
                <FormLabel>Ad Soyad</FormLabel>
                <FormInput 
                  type="text"
                  placeholder="Adınız Soyadınız"
                  value={consultationData.name}
                  onChange={(e) => setConsultationData({...consultationData, name: e.target.value})}
                />
              </FormGroup>
              
              <FormGroup>
                <FormLabel>E-posta</FormLabel>
                <FormInput 
                  type="email"
                  placeholder="ornek@email.com"
                  value={consultationData.email}
                  onChange={(e) => setConsultationData({...consultationData, email: e.target.value})}
                />
              </FormGroup>
              
              <FormGroup>
                <FormLabel>Telefon</FormLabel>
                <FormInput 
                  type="tel"
                  placeholder="0555 123 45 67"
                  value={consultationData.phone}
                  onChange={(e) => setConsultationData({...consultationData, phone: e.target.value})}
                />
              </FormGroup>
              
              <FormGroup>
                <FormLabel>Hizmet Türü</FormLabel>
                <FormSelect 
                  value={consultationData.serviceType}
                  onChange={(e) => setConsultationData({...consultationData, serviceType: e.target.value})}
                >
                  <option value="genel">Genel Danışmanlık</option>
                  <option value="sozlesme">Sözleşme Hizmetleri</option>
                  <option value="tapu">Tapu İşlemleri</option>
                  <option value="imar">İmar Hukuku</option>
                  <option value="dava">Emlak Davaları</option>
                  <option value="vergi">Vergi Danışmanlığı</option>
                </FormSelect>
              </FormGroup>
              
              <FormGroup>
                <FormLabel>Tercih Edilen Tarih</FormLabel>
                <FormInput 
                  type="date"
                  value={consultationData.preferredDate}
                  onChange={(e) => setConsultationData({...consultationData, preferredDate: e.target.value})}
                />
              </FormGroup>
              
              <FormGroup>
                <FormLabel>Tercih Edilen Saat</FormLabel>
                <FormSelect 
                  value={consultationData.preferredTime}
                  onChange={(e) => setConsultationData({...consultationData, preferredTime: e.target.value})}
                >
                  <option value="">Saat seçin</option>
                  <option value="09:00">09:00</option>
                  <option value="10:00">10:00</option>
                  <option value="11:00">11:00</option>
                  <option value="14:00">14:00</option>
                  <option value="15:00">15:00</option>
                  <option value="16:00">16:00</option>
                </FormSelect>
              </FormGroup>
              
              <FormGroup>
                <FormLabel>Konu Açıklaması</FormLabel>
                <FormTextarea 
                  placeholder="Danışmanlık almak istediğiniz konuyu kısaca açıklayın..."
                  value={consultationData.description}
                  onChange={(e) => setConsultationData({...consultationData, description: e.target.value})}
                />
              </FormGroup>
              
              <ToolButton onClick={handleBookConsultation}>
                📅 Randevu Al
              </ToolButton>
              
              {bookingResult && (
                <ResultBox>
                  <ResultText>{bookingResult}</ResultText>
                  <ActionButtons>
                    <ActionButton onClick={handleContactClick}>
                      📞 İletişime Geç
                    </ActionButton>
                  </ActionButtons>
                </ResultBox>
              )}
            </ToolForm>
          </ToolCard>
        </ToolsGrid>
      </InteractiveTools>

      <CTASection>
        <CTATitle>Hukuki Danışmanlık Alın</CTATitle>
        <CTADescription>
          Emlak işlemlerinizde hukuki güvenliğiniz için uzman ekibimizle görüşün. 
          Ücretsiz ilk danışmanlık için hemen iletişime geçin.
        </CTADescription>
        <CTAButton onClick={handleContactClick}>
          Hemen İletişime Geçin
        </CTAButton>
      </CTASection>
    </Container>
  );
};

export default LegalPage; 