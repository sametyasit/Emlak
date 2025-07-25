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

const ConsultationPage: React.FC = () => {
  return (
    <Container>
      <HeroSection>
        <Title>💼 Emlak Danışmanlığı</Title>
        <Subtitle>
          Uzman emlak danışmanlarımız ile emlak süreçlerinizde profesyonel rehberlik alın. 
          Her adımda yanınızdayız.
        </Subtitle>
      </HeroSection>

      <ServicesGrid>
        <ServiceCard>
          <h3>🏠 Konut Danışmanlığı</h3>
          <p>
            Ev alım, satım ve kiralama süreçlerinde kapsamlı danışmanlık hizmeti.
          </p>
          <ul>
            <li>Piyasa analizi ve fiyat değerlendirmesi</li>
            <li>Emlak seçimi ve karşılaştırma</li>
            <li>Müzakere stratejileri</li>
            <li>Sözleşme danışmanlığı</li>
          </ul>
          <CTAButton to="/contact">Konut Danışmanlığı</CTAButton>
        </ServiceCard>

        <ServiceCard>
          <h3>🏢 Ticari Emlak Danışmanlığı</h3>
          <p>
            Ticari emlak yatırımları için özel danışmanlık hizmetleri.
          </p>
          <ul>
            <li>Yatırım analizi ve değerlendirme</li>
            <li>Gelir projeksiyonları</li>
            <li>Risk analizi</li>
            <li>Portföy yönetimi</li>
          </ul>
          <CTAButton to="/contact">Ticari Danışmanlık</CTAButton>
        </ServiceCard>

        <ServiceCard>
          <h3>📊 Yatırım Danışmanlığı</h3>
          <p>
            Emlak yatırımlarınız için stratejik danışmanlık ve planlama.
          </p>
          <ul>
            <li>Yatırım stratejisi geliştirme</li>
            <li>Risk-yatırım analizi</li>
            <li>Portföy çeşitlendirme</li>
            <li>Vergi optimizasyonu</li>
          </ul>
          <CTAButton to="/contact">Yatırım Danışmanlığı</CTAButton>
        </ServiceCard>

        <ServiceCard>
          <h3>📋 Hukuki Danışmanlık</h3>
          <p>
            Emlak hukuku konularında uzman danışmanlık hizmeti.
          </p>
          <ul>
            <li>Emlak hukuku danışmanlığı</li>
            <li>Sözleşme inceleme ve hazırlama</li>
            <li>Uyuşmazlık çözümü</li>
            <li>Tapu işlemleri takibi</li>
          </ul>
          <CTAButton to="/contact">Hukuki Danışmanlık</CTAButton>
        </ServiceCard>

        <ServiceCard>
          <h3>💰 Finansal Danışmanlık</h3>
          <p>
            Emlak finansmanı ve kredi konularında uzman danışmanlık.
          </p>
          <ul>
            <li>Kredi danışmanlığı</li>
            <li>Finansman planlaması</li>
            <li>Faiz oranı analizi</li>
            <li>Ödeme planı hazırlama</li>
          </ul>
          <CTAButton to="/contact">Finansal Danışmanlık</CTAButton>
        </ServiceCard>

        <ServiceCard>
          <h3>📈 Piyasa Danışmanlığı</h3>
          <p>
            Emlak piyasası trendleri ve analizleri konusunda danışmanlık.
          </p>
          <ul>
            <li>Piyasa trend analizi</li>
            <li>Bölge gelişim projeksiyonları</li>
            <li>Fiyat tahminleri</li>
            <li>Yatırım fırsatları</li>
          </ul>
          <CTAButton to="/contact">Piyasa Danışmanlığı</CTAButton>
        </ServiceCard>
      </ServicesGrid>
    </Container>
  );
};

export default ConsultationPage; 