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

const ValuationPage: React.FC = () => {
  return (
    <Container>
      <HeroSection>
        <Title>💰 Emlak Değerleme</Title>
        <Subtitle>
          Uzman değerleme ekibimiz ile emlağınızın gerçek piyasa değerini öğrenin. 
          Profesyonel raporlar ve detaylı analizler ile doğru fiyatlandırma yapın.
        </Subtitle>
      </HeroSection>

      <ServicesGrid>
        <ServiceCard>
          <h3>📊 Piyasa Analizi</h3>
          <p>
            Bölgenizdeki emlak piyasasının detaylı analizi ile güncel değer bilgisi.
          </p>
          <ul>
            <li>Bölge piyasa analizi</li>
            <li>Karşılaştırmalı fiyat analizi</li>
            <li>Trend analizi</li>
            <li>Gelecek projeksiyonları</li>
          </ul>
          <CTAButton to="/contact">Piyasa Analizi</CTAButton>
        </ServiceCard>

        <ServiceCard>
          <h3>🏠 Konut Değerleme</h3>
          <p>
            Daire, villa ve müstakil evler için profesyonel değerleme hizmeti.
          </p>
          <ul>
            <li>Detaylı fiziki inceleme</li>
            <li>Özellik analizi</li>
            <li>Yaş ve durum değerlendirmesi</li>
            <li>Piyasa karşılaştırması</li>
          </ul>
          <CTAButton to="/contact">Konut Değerleme</CTAButton>
        </ServiceCard>

        <ServiceCard>
          <h3>🏢 Ticari Emlak Değerleme</h3>
            <p>
              Ofis, mağaza, depo ve diğer ticari emlaklar için özel değerleme.
            </p>
            <ul>
              <li>Gelir analizi</li>
              <li>Yatırım değeri hesaplama</li>
              <li>Kira piyasası analizi</li>
              <li>Yatırım getirisi hesaplama</li>
            </ul>
            <CTAButton to="/contact">Ticari Değerleme</CTAButton>
        </ServiceCard>

        <ServiceCard>
          <h3>📋 Arsa Değerleme</h3>
          <p>
            Arsa ve arazi değerleme hizmetleri ile yatırım potansiyelini keşfedin.
          </p>
          <ul>
            <li>İmar durumu analizi</li>
            <li>Gelişim potansiyeli</li>
            <li>Altyapı değerlendirmesi</li>
            <li>Yatırım senaryoları</li>
          </ul>
          <CTAButton to="/contact">Arsa Değerleme</CTAButton>
        </ServiceCard>

        <ServiceCard>
          <h3>📈 Yatırım Değerleme</h3>
          <p>
            Emlak yatırımlarınızın karlılığını ve potansiyelini değerlendirin.
          </p>
          <ul>
            <li>Yatırım getirisi hesaplama</li>
            <li>Risk analizi</li>
            <li>Portföy değerlendirmesi</li>
            <li>Strateji önerileri</li>
          </ul>
          <CTAButton to="/contact">Yatırım Analizi</CTAButton>
        </ServiceCard>

        <ServiceCard>
          <h3>📄 Resmi Değerleme Raporu</h3>
          <p>
            Banka, sigorta ve resmi işlemler için geçerli değerleme raporları.
          </p>
          <ul>
            <li>Banka kredisi için rapor</li>
            <li>Sigorta değerleme</li>
            <li>Vergi değerleme</li>
            <li>Hukuki süreçler için rapor</li>
          </ul>
          <CTAButton to="/contact">Resmi Rapor</CTAButton>
        </ServiceCard>
      </ServicesGrid>
    </Container>
  );
};

export default ValuationPage; 