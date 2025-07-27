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

const ContentCard = styled.div`
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
    margin-bottom: 1.5rem;
    color: #1e293b;
  }
  
  p {
    color: #6b7280;
    line-height: 1.7;
    margin-bottom: 1rem;
  }
  
  ul {
    color: #6b7280;
    line-height: 1.7;
    padding-left: 1.5rem;
    
    li {
      margin-bottom: 0.5rem;
    }
  }
`;

const StatsSection = styled.div`
  text-align: center;
  margin-bottom: 4rem;
  position: relative;
  z-index: 1;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(16, 185, 129, 0.1);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(16, 185, 129, 0.15);
  }
  
  h3 {
    font-size: 2.5rem;
    font-weight: 800;
    color: #10b981;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: #6b7280;
    font-weight: 500;
  }
`;

const TeamSection = styled.div`
  text-align: center;
  margin-bottom: 4rem;
  position: relative;
  z-index: 1;
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const TeamCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(16, 185, 129, 0.1);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(16, 185, 129, 0.15);
  }
  
  .avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin: 0 auto 1rem;
    overflow: hidden;
    border: 3px solid #10b981;
    box-shadow: 0 4px 15px rgba(16, 185, 129, 0.2);
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }
    
    &:hover img {
      transform: scale(1.1);
    }
  }
  
  h4 {
    font-size: 1.3rem;
    font-weight: 600;
    color: #1e293b;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: #10b981;
    font-weight: 500;
    margin-bottom: 1rem;
  }
  
  .description {
    color: #6b7280;
    line-height: 1.6;
  }
`;

const SectionTitle = styled.h2`
  font-size: clamp(2rem, 4vw, 2.5rem);
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 1rem;
  
  span {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const SectionSubtitle = styled.p`
  font-size: 1.1rem;
  color: #64748b;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const AboutPage: React.FC = () => {
  return (
    <Container>
      <HeroSection>
        <Title>Hakkımızda <span>Emlak</span></Title>
        <Subtitle>
          20 yılı aşkın deneyimimizle Türkiye'nin en güvenilir emlak platformu olarak hizmet veriyoruz.
        </Subtitle>
      </HeroSection>

      <ContentSection>
        <ContentCard>
          <h3>Misyonumuz</h3>
          <p>
            Müşterilerimizin hayallerindeki evi bulmalarına yardımcı olmak için en kaliteli hizmeti sunmak.
          </p>
          <ul>
            <li>Güvenilir ve şeffaf hizmet</li>
            <li>Müşteri memnuniyeti odaklı yaklaşım</li>
            <li>Teknolojik yenilikler</li>
            <li>Uzman kadro desteği</li>
          </ul>
        </ContentCard>

        <ContentCard>
          <h3>Vizyonumuz</h3>
          <p>
            Türkiye'nin lider emlak platformu olarak, dijital dönüşümün öncüsü olmak.
          </p>
          <ul>
            <li>Yapay zeka destekli arama</li>
            <li>Mobil uygulama geliştirme</li>
            <li>Uluslararası genişleme</li>
            <li>Sürdürülebilir büyüme</li>
          </ul>
        </ContentCard>
      </ContentSection>

      <StatsSection>
        <SectionTitle>Rakamlarla <span>Başarılarımız</span></SectionTitle>
        <SectionSubtitle>
          Yılların deneyimi ve binlerce mutlu müşteri ile emlak sektörünün güvenilir adresi
        </SectionSubtitle>
        
        <StatsGrid>
          <StatCard>
            <h3>50,000+</h3>
            <p>Başarılı Satış</p>
          </StatCard>
          <StatCard>
            <h3>25,000+</h3>
            <p>Mutlu Müşteri</p>
          </StatCard>
          <StatCard>
            <h3>15+</h3>
            <p>Yıllık Deneyim</p>
          </StatCard>
          <StatCard>
            <h3>%98</h3>
            <p>Müşteri Memnuniyeti</p>
          </StatCard>
        </StatsGrid>
      </StatsSection>

      <TeamSection>
        <SectionTitle>Uzman <span>Ekibimiz</span></SectionTitle>
        <SectionSubtitle>
          Deneyimli ve profesyonel kadromuz ile size en iyi hizmeti sunuyoruz
        </SectionSubtitle>
        
        <TeamGrid>
          <TeamCard>
            <div className="avatar">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80" 
                alt="Ahmet Yılmaz - Genel Müdür"
              />
            </div>
            <h4>Ahmet Yılmaz</h4>
            <p>Genel Müdür</p>
            <div className="description">
              15 yıllık emlak deneyimi ile şirketimizin vizyonunu yönetiyor.
            </div>
          </TeamCard>
          
          <TeamCard>
            <div className="avatar">
              <img 
                src="https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=200&q=80" 
                alt="Fatma Demir - Satış Müdürü"
              />
            </div>
            <h4>Fatma Demir</h4>
            <p>Satış Müdürü</p>
            <div className="description">
              Müşteri ilişkileri ve satış stratejileri konusunda uzman.
            </div>
          </TeamCard>
          
          <TeamCard>
            <div className="avatar">
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80" 
                alt="Mehmet Kaya - Teknoloji Direktörü"
              />
            </div>
            <h4>Mehmet Kaya</h4>
            <p>Teknoloji Direktörü</p>
            <div className="description">
              Dijital dönüşüm ve teknoloji geliştirme projelerini yönetiyor.
            </div>
          </TeamCard>
          
          <TeamCard>
            <div className="avatar">
              <img 
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80" 
                alt="Zeynep Özkan - Müşteri Hizmetleri"
              />
            </div>
            <h4>Zeynep Özkan</h4>
            <p>Müşteri Hizmetleri</p>
            <div className="description">
              Müşteri memnuniyeti ve destek hizmetlerinden sorumlu.
            </div>
          </TeamCard>
        </TeamGrid>
      </TeamSection>
    </Container>
  );
};

export default AboutPage; 