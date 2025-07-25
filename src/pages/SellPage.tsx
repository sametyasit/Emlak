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

const SellPage: React.FC = () => {
  return (
    <Container>
      <HeroSection>
        <Title>🏠 Emlak Satış</Title>
        <Subtitle>
          Emlağınızı en iyi fiyata satmak için profesyonel hizmetlerimizden yararlanın. 
          Uzman ekibimiz satış sürecinizin her aşamasında yanınızda.
        </Subtitle>
      </HeroSection>

      <ServicesGrid>
        <ServiceCard>
          <h3>💰 Değerleme Hizmeti</h3>
          <p>
            Emlağınızın gerçek piyasa değerini öğrenin ve en uygun fiyatı belirleyin.
          </p>
          <ul>
            <li>Profesyonel değerleme raporu</li>
            <li>Piyasa analizi</li>
            <li>Karşılaştırmalı fiyat analizi</li>
            <li>Yatırım potansiyeli değerlendirmesi</li>
          </ul>
          <CTAButton to="/contact">Değerleme Talep Et</CTAButton>
        </ServiceCard>

        <ServiceCard>
          <h3>📸 Profesyonel Fotoğraf Çekimi</h3>
          <p>
            Emlağınızı en iyi şekilde tanıtmak için profesyonel fotoğraf çekimi.
          </p>
          <ul>
            <li>Yüksek kaliteli fotoğraflar</li>
            <li>Drone ile havadan çekim</li>
            <li>360° sanal tur</li>
            <li>Video çekimi</li>
          </ul>
          <CTAButton to="/contact">Fotoğraf Çekimi</CTAButton>
        </ServiceCard>

        <ServiceCard>
          <h3>📢 Pazarlama ve İlan Yönetimi</h3>
          <p>
            Emlağınızı geniş kitlelere ulaştırmak için kapsamlı pazarlama hizmetleri.
          </p>
          <ul>
            <li>Çoklu platform ilan yönetimi</li>
            <li>Sosyal medya pazarlaması</li>
            <li>E-posta kampanyaları</li>
            <li>Hedef kitle analizi</li>
          </ul>
          <CTAButton to="/contact">Pazarlama Hizmeti</CTAButton>
        </ServiceCard>

        <ServiceCard>
          <h3>🤝 Müşteri Bulma ve Görüşme</h3>
          <p>
            Potansiyel alıcıları bulun ve satış sürecini profesyonelce yönetin.
          </p>
          <ul>
            <li>Alıcı profili oluşturma</li>
            <li>Görüşme koordinasyonu</li>
            <li>Müzakere desteği</li>
            <li>Alıcı değerlendirmesi</li>
          </ul>
          <CTAButton to="/contact">Müşteri Bulma</CTAButton>
        </ServiceCard>

        <ServiceCard>
          <h3>📋 Satış Danışmanlığı</h3>
          <p>
            Satış sürecinin her aşamasında profesyonel danışmanlık hizmeti.
          </p>
          <ul>
            <li>Satış stratejisi geliştirme</li>
            <li>Fiyatlandırma danışmanlığı</li>
            <li>Pazarlık desteği</li>
            <li>Satış sonrası hizmetler</li>
          </ul>
          <CTAButton to="/contact">Danışmanlık Al</CTAButton>
        </ServiceCard>

        <ServiceCard>
          <h3>📄 Hukuki ve Belge İşlemleri</h3>
          <p>
            Satış sürecindeki tüm hukuki işlemler ve belge yönetimi.
          </p>
          <ul>
            <li>Tapu işlemleri takibi</li>
            <li>Sözleşme hazırlama</li>
            <li>Vergi hesaplamaları</li>
            <li>Noter işlemleri</li>
          </ul>
          <CTAButton to="/contact">Hukuki Destek</CTAButton>
        </ServiceCard>
      </ServicesGrid>
    </Container>
  );
};

export default SellPage; 