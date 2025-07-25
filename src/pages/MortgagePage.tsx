import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

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

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2.5rem;
  margin-bottom: 4rem;
  position: relative;
  z-index: 1;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ServiceCard = styled.div`
  background: var(--card-bg);
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--border-color);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  animation: ${fadeInUp} 0.8s ease-out;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
  }
  
  h3 {
    font-size: 1.8rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    color: var(--text-primary);
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  p {
    color: var(--text-secondary);
    line-height: 1.7;
    margin-bottom: 1.5rem;
    font-size: 1rem;
  }
  
  ul {
    list-style: none;
    padding: 0;
    margin: 1.5rem 0;
  }
  
  li {
    color: var(--text-secondary);
    margin-bottom: 0.8rem;
    padding-left: 1.5rem;
    position: relative;
    
    &::before {
      content: '✓';
      position: absolute;
      left: 0;
      color: var(--accent-color);
      font-weight: bold;
    }
  }
`;

const CTAButton = styled(Link)`
  display: inline-block;
  background: var(--accent-color);
  color: white;
  text-decoration: none;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  margin-top: 1rem;
  
  &:hover {
    background: var(--accent-hover);
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
  }
`;

const MortgagePage: React.FC = () => {
  return (
    <Container>
      <HeroSection>
        <Title>💳 Kredi Hesaplama</Title>
        <Subtitle>
          Konut kredisi hesaplama araçları ve kredi danışmanlığı hizmetlerimiz ile 
          hayalinizdeki evi almanız için size yardımcı oluyoruz.
        </Subtitle>
      </HeroSection>

      <ServicesGrid>
        <ServiceCard>
          <h3>🧮 Kredi Hesaplama Aracı</h3>
          <p>
            Konut kredisi tutarınızı ve aylık taksitlerinizi kolayca hesaplayın.
          </p>
          <ul>
            <li>Faiz oranı hesaplama</li>
            <li>Aylık taksit hesaplama</li>
            <li>Toplam geri ödeme hesaplama</li>
            <li>Peşinat hesaplama</li>
          </ul>
          <CTAButton to="/contact">Kredi Hesapla</CTAButton>
        </ServiceCard>

        <ServiceCard>
          <h3>🏦 Banka Karşılaştırması</h3>
          <p>
            Farklı bankaların kredi tekliflerini karşılaştırın ve en uygununu seçin.
          </p>
          <ul>
            <li>Faiz oranı karşılaştırması</li>
            <li>Kredi şartları analizi</li>
            <li>Masraf karşılaştırması</li>
            <li>Vade seçenekleri</li>
          </ul>
          <CTAButton to="/contact">Banka Karşılaştır</CTAButton>
        </ServiceCard>

        <ServiceCard>
          <h3>📋 Kredi Başvuru Desteği</h3>
          <p>
            Kredi başvuru sürecinizde profesyonel destek ve rehberlik.
          </p>
          <ul>
            <li>Başvuru belgeleri hazırlama</li>
            <li>Kredi notu analizi</li>
            <li>Başvuru takibi</li>
            <li>Onay süreci desteği</li>
          </ul>
          <CTAButton to="/contact">Başvuru Desteği</CTAButton>
        </ServiceCard>

        <ServiceCard>
          <h3>💰 Kredi Danışmanlığı</h3>
          <p>
            Kredi konularında uzman danışmanlık ve finansal planlama.
          </p>
          <ul>
            <li>Kredi kapasitesi analizi</li>
            <li>Ödeme planı hazırlama</li>
            <li>Risk değerlendirmesi</li>
            <li>Alternatif finansman seçenekleri</li>
          </ul>
          <CTAButton to="/contact">Danışmanlık Al</CTAButton>
        </ServiceCard>

        <ServiceCard>
          <h3>📊 Kredi Simülasyonu</h3>
          <p>
            Farklı senaryolar için kredi simülasyonu yapın ve en uygun seçeneği bulun.
          </p>
          <ul>
            <li>Farklı vade simülasyonları</li>
            <li>Faiz oranı değişim analizi</li>
            <li>Erken ödeme simülasyonu</li>
            <li>Yatırım karşılaştırması</li>
          </ul>
          <CTAButton to="/contact">Simülasyon Yap</CTAButton>
        </ServiceCard>

        <ServiceCard>
          <h3>🔄 Kredi Yeniden Yapılandırma</h3>
          <p>
            Mevcut kredinizi yeniden yapılandırarak daha uygun şartlar elde edin.
          </p>
          <ul>
            <li>Kredi transfer analizi</li>
            <li>Yeniden yapılandırma seçenekleri</li>
            <li>Masraf analizi</li>
            <li>Avantaj hesaplama</li>
          </ul>
          <CTAButton to="/contact">Yeniden Yapılandır</CTAButton>
        </ServiceCard>
      </ServicesGrid>
    </Container>
  );
};

export default MortgagePage; 