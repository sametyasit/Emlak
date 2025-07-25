import React from 'react';
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
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
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

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 2rem 1rem;
  }
`;

const ServiceCard = styled.div`
  background: var(--card-bg);
  border-radius: 20px;
  padding: 2.5rem;
  text-align: center;
  box-shadow: var(--shadow);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  animation: ${fadeInUp} 0.8s ease-out 0.4s both;

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
    transform: translateY(-10px);
    box-shadow: var(--card-hover);
  }

  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const ServiceIcon = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, var(--accent-color), var(--accent-hover));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  font-size: 2rem;
  color: white;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
`;

const ServiceTitle = styled.h3`
  font-size: 1.5rem;
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
  margin: 0 0 2rem;
  text-align: left;
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

const RenovationPage: React.FC = () => {
  const handleContactClick = () => {
    window.location.href = '/contact';
  };

  const handlePropertiesClick = () => {
    window.location.href = '/properties';
  };

  return (
    <Container>
      <HeroSection>
        <HeroTitle>Emlak Tadilat & Yenileme</HeroTitle>
        <HeroSubtitle>
          Profesyonel tadilat ve yenileme hizmetleri ile emlakınızın değerini artırın. 
          Uzman ekibimizle modern ve kaliteli çözümler sunuyoruz.
        </HeroSubtitle>
      </HeroSection>

      <ServicesGrid>
        <ServiceCard>
          <ServiceIcon>🏠</ServiceIcon>
          <ServiceTitle>Konut Tadilatı</ServiceTitle>
          <ServiceDescription>
            Evinizin her köşesini yeniden tasarlayın. Modern ve fonksiyonel yaşam alanları yaratıyoruz.
          </ServiceDescription>
          <ServiceFeatures>
            <ServiceFeature>İç mekan tasarımı</ServiceFeature>
            <ServiceFeature>Mutfak ve banyo yenileme</ServiceFeature>
            <ServiceFeature>Zemin ve duvar kaplamaları</ServiceFeature>
            <ServiceFeature>Elektrik ve tesisat işleri</ServiceFeature>
          </ServiceFeatures>
          <CTAButton onClick={handleContactClick}>Teklif Alın</CTAButton>
        </ServiceCard>

        <ServiceCard>
          <ServiceIcon>🏢</ServiceIcon>
          <ServiceTitle>Ticari Emlak Tadilatı</ServiceTitle>
          <ServiceDescription>
            İş yerinizi modern standartlara uygun hale getirin. Profesyonel görünüm ve işlevsellik.
          </ServiceDescription>
          <ServiceFeatures>
            <ServiceFeature>Ofis tasarımı ve düzenleme</ServiceFeature>
            <ServiceFeature>Mağaza ve showroom yenileme</ServiceFeature>
            <ServiceFeature>Depo ve fabrika düzenlemeleri</ServiceFeature>
            <ServiceFeature>Güvenlik sistemleri kurulumu</ServiceFeature>
          </ServiceFeatures>
          <CTAButton onClick={handleContactClick}>Detaylı Bilgi</CTAButton>
        </ServiceCard>

        <ServiceCard>
          <ServiceIcon>🔧</ServiceIcon>
          <ServiceTitle>Teknik Servis</ServiceTitle>
          <ServiceDescription>
            Bakım ve onarım hizmetleri ile emlakınızın uzun ömürlü olmasını sağlayın.
          </ServiceDescription>
          <ServiceFeatures>
            <ServiceFeature>Periyodik bakım hizmetleri</ServiceFeature>
            <ServiceFeature>Acil onarım müdahaleleri</ServiceFeature>
            <ServiceFeature>Enerji verimliliği iyileştirmeleri</ServiceFeature>
            <ServiceFeature>Güvenlik sistemleri bakımı</ServiceFeature>
          </ServiceFeatures>
          <CTAButton onClick={handleContactClick}>Servis Talebi</CTAButton>
        </ServiceCard>

        <ServiceCard>
          <ServiceIcon>🎨</ServiceIcon>
          <ServiceTitle>Dekorasyon & Tasarım</ServiceTitle>
          <ServiceDescription>
            İç mimari tasarım ve dekorasyon hizmetleri ile yaşam alanınızı kişiselleştirin.
          </ServiceDescription>
          <ServiceFeatures>
            <ServiceFeature>İç mimari proje tasarımı</ServiceFeature>
            <ServiceFeature>Mobilya seçimi ve yerleşimi</ServiceFeature>
            <ServiceFeature>Aydınlatma tasarımı</ServiceFeature>
            <ServiceFeature>Renk ve doku uyumu</ServiceFeature>
          </ServiceFeatures>
          <CTAButton onClick={handleContactClick}>Tasarım Danışmanlığı</CTAButton>
        </ServiceCard>

        <ServiceCard>
          <ServiceIcon>🌱</ServiceIcon>
          <ServiceTitle>Yeşil Bina Çözümleri</ServiceTitle>
          <ServiceDescription>
            Sürdürülebilir ve çevre dostu bina çözümleri ile geleceğe yatırım yapın.
          </ServiceDescription>
          <ServiceFeatures>
            <ServiceFeature>Enerji verimliliği optimizasyonu</ServiceFeature>
            <ServiceFeature>Güneş enerjisi sistemleri</ServiceFeature>
            <ServiceFeature>Su tasarrufu çözümleri</ServiceFeature>
            <ServiceFeature>Yeşil çatı ve bahçe tasarımı</ServiceFeature>
          </ServiceFeatures>
          <CTAButton onClick={handleContactClick}>Yeşil Çözümler</CTAButton>
        </ServiceCard>

        <ServiceCard>
          <ServiceIcon>📋</ServiceIcon>
          <ServiceTitle>Proje Yönetimi</ServiceTitle>
          <ServiceDescription>
            Tadilat projelerinizi başından sonuna kadar profesyonel olarak yönetiyoruz.
          </ServiceDescription>
          <ServiceFeatures>
            <ServiceFeature>Proje planlama ve koordinasyon</ServiceFeature>
            <ServiceFeature>Malzeme tedariki ve yönetimi</ServiceFeature>
            <ServiceFeature>İşçilik ve kalite kontrolü</ServiceFeature>
            <ServiceFeature>Proje teslimi ve garanti</ServiceFeature>
          </ServiceFeatures>
          <CTAButton onClick={handleContactClick}>Proje Başlatın</CTAButton>
        </ServiceCard>
      </ServicesGrid>
    </Container>
  );
};

export default RenovationPage; 