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
  background: var(--card-bg);
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--border-color);
  backdrop-filter: blur(10px);
  animation: ${fadeInUp} 0.8s ease-out;
  
  h3 {
    font-size: 1.8rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    color: var(--text-primary);
  }
  
  p {
    color: var(--text-secondary);
    line-height: 1.7;
    margin-bottom: 1rem;
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

const StatsSection = styled.div`
  background: var(--card-bg);
  border-radius: 20px;
  padding: 3rem;
  margin-bottom: 4rem;
  text-align: center;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--border-color);
  position: relative;
  z-index: 1;
  animation: ${fadeInUp} 0.8s ease-out;
  
  h2 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 3rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
`;

const StatItem = styled.div`
  h3 {
    font-size: 3rem;
    font-weight: 800;
    color: var(--accent-color);
    margin-bottom: 0.5rem;
  }
  
  p {
    font-size: 1.1rem;
    color: var(--text-secondary);
    font-weight: 500;
  }
`;

const TeamSection = styled.div`
  margin-bottom: 4rem;
  position: relative;
  z-index: 1;
  animation: ${fadeInUp} 0.8s ease-out;
  
  h2 {
    font-size: 2.5rem;
    font-weight: 700;
    text-align: center;
    margin-bottom: 3rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
`;

const TeamCard = styled.div`
  background: var(--card-bg);
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--border-color);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }
  
  .avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    margin: 0 auto 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.5rem;
    color: white;
  }
  
  h3 {
    font-size: 1.3rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: var(--text-primary);
  }
  
  p {
    color: var(--accent-color);
    font-weight: 500;
    margin-bottom: 1rem;
  }
  
  .description {
    color: var(--text-secondary);
    line-height: 1.6;
    font-size: 0.95rem;
  }
`;

const AboutPage: React.FC = () => {
  return (
    <Container>
      <HeroSection>
        <Title>🏠 Hakkımızda</Title>
        <Subtitle>
          20 yılı aşkın deneyimimizle, Türkiye'nin en güvenilir emlak platformu olarak 
          hayalinizdeki evi bulmanız için yanınızdayız.
        </Subtitle>
      </HeroSection>

      <ContentSection>
        <ContentCard>
          <h3>🎯 Misyonumuz</h3>
          <p>
            Müşterilerimize en kaliteli emlak hizmetini sunarak, hayallerindeki evi 
            bulmalarında yardımcı olmak ve güvenilir bir ortak olmak.
          </p>
          <ul>
            <li>Şeffaf ve dürüst hizmet anlayışı</li>
            <li>Müşteri memnuniyeti odaklı yaklaşım</li>
            <li>Teknolojik yeniliklerle desteklenen hizmet</li>
            <li>Uzman kadromuzla profesyonel danışmanlık</li>
          </ul>
        </ContentCard>

        <ContentCard>
          <h3>👁️ Vizyonumuz</h3>
          <p>
            Türkiye'nin lider emlak platformu olarak, sektörde standartları belirlemek 
            ve müşterilerimize en iyi deneyimi yaşatmak.
          </p>
          <ul>
            <li>Dijital dönüşümde öncü olmak</li>
            <li>Sürdürülebilir büyüme stratejisi</li>
            <li>Toplumsal sorumluluk bilinci</li>
            <li>Çevre dostu yaklaşımlar</li>
          </ul>
        </ContentCard>
      </ContentSection>

      <StatsSection>
        <h2>📊 Rakamlarla Biz</h2>
        <StatsGrid>
          <StatItem>
            <h3>50K+</h3>
            <p>Mutlu Müşteri</p>
          </StatItem>
          <StatItem>
            <h3>15K+</h3>
            <p>Satılan Emlak</p>
          </StatItem>
          <StatItem>
            <h3>20+</h3>
            <p>Yıllık Deneyim</p>
          </StatItem>
          <StatItem>
            <h3>100+</h3>
            <p>Uzman Danışman</p>
          </StatItem>
        </StatsGrid>
      </StatsSection>

      <TeamSection>
        <h2>👥 Ekibimiz</h2>
        <TeamGrid>
          <TeamCard>
            <div className="avatar">👨‍💼</div>
            <h3>Ahmet Yılmaz</h3>
            <p>Genel Müdür</p>
            <div className="description">
              15 yıllık emlak sektörü deneyimi ile şirketimizin vizyonunu yönetiyor.
            </div>
          </TeamCard>
          
          <TeamCard>
            <div className="avatar">👩‍💼</div>
            <h3>Ayşe Demir</h3>
            <p>Satış Müdürü</p>
            <div className="description">
              Müşteri ilişkileri ve satış stratejileri konusunda uzman.
            </div>
          </TeamCard>
          
          <TeamCard>
            <div className="avatar">👨‍💻</div>
            <h3>Mehmet Kaya</h3>
            <p>Teknoloji Direktörü</p>
            <div className="description">
              Dijital platformumuzun geliştirilmesinden sorumlu.
            </div>
          </TeamCard>
          
          <TeamCard>
            <div className="avatar">👩‍⚖️</div>
            <h3>Fatma Özkan</h3>
            <p>Hukuk Danışmanı</p>
            <div className="description">
              Emlak hukuku konusunda uzman, güvenli işlemler sağlıyor.
            </div>
          </TeamCard>
        </TeamGrid>
      </TeamSection>
    </Container>
  );
};

export default AboutPage; 