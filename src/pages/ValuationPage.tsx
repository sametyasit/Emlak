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
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(16, 185, 129, 0.1);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  animation: ${fadeInUp} 0.8s ease-out;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(16, 185, 129, 0.15);
  }
  
  .icon {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1.5rem;
    color: white;
    font-size: 2rem;
    font-weight: 600;
  }
  
  h3 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 1rem;
    text-align: center;
  }
  
  p {
    color: #6b7280;
    line-height: 1.6;
    text-align: center;
    margin-bottom: 1.5rem;
  }
  
  .features {
    list-style: none;
    padding: 0;
    margin: 0;
    
    li {
      color: #6b7280;
      padding: 0.5rem 0;
      border-bottom: 1px solid rgba(16, 185, 129, 0.1);
      display: flex;
      align-items: center;
      
      &:last-child {
        border-bottom: none;
      }
      
      &::before {
        content: '✓';
        color: #10b981;
        font-weight: bold;
        margin-right: 0.5rem;
      }
    }
  }
`;

const CTAButton = styled(Link)`
  display: inline-block;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  text-decoration: none;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
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
`;

const ValuationPage: React.FC = () => {
  const services = [
    {
      icon: '🏠',
      title: 'Konut Değerleme',
      description: 'Konut emlaklarınızın gerçek piyasa değerini profesyonel yöntemlerle belirleyin',
      features: [
        'Detaylı piyasa analizi',
        'Karşılaştırmalı değerleme',
        'Yatırım potansiyeli',
        'Raporlama'
      ]
    },
    {
      icon: '🏢',
      title: 'Ticari Emlak Değerleme',
      description: 'Ticari emlaklarınızın değerini uzman gözüyle analiz edin',
      features: [
        'Gelir analizi',
        'Piyasa karşılaştırması',
        'Yatırım getirisi',
        'Risk değerlendirmesi'
      ]
    },
    {
      icon: '🏗️',
      title: 'Arsa Değerleme',
      description: 'Arsa ve arazilerinizin geliştirme potansiyelini değerlendirin',
      features: [
        'İmar durumu analizi',
        'Geliştirme potansiyeli',
        'Piyasa değeri',
        'Gelecek projeksiyonu'
      ]
    }
  ];

  return (
    <Container>
      <HeroSection>
        <Title>Emlak <span>Değerleme</span></Title>
        <Subtitle>
          Uzman değerleme ekibimizle emlağınızın gerçek piyasa değerini öğrenin
        </Subtitle>
      </HeroSection>

      <ServicesGrid>
        {services.map((service, index) => (
          <ServiceCard key={index}>
            <div className="icon">{service.icon}</div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            <ul className="features">
              {service.features.map((feature, featureIndex) => (
                <li key={featureIndex}>{feature}</li>
              ))}
            </ul>
          </ServiceCard>
        ))}
      </ServicesGrid>

      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <CTAButton to="/contact">
          Değerleme Talep Et
        </CTAButton>
      </div>
    </Container>
  );
};

export default ValuationPage; 