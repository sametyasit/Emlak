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

const InfoCard = styled.div`
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

const JobsSection = styled.div`
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

const JobsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
`;

const JobCard = styled.div`
  background: var(--card-bg);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--border-color);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }
  
  h3 {
    font-size: 1.4rem;
    font-weight: 700;
    margin-bottom: 1rem;
    color: var(--text-primary);
  }
  
  .location {
    color: var(--accent-color);
    font-weight: 500;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .description {
    color: var(--text-secondary);
    line-height: 1.6;
    margin-bottom: 1.5rem;
    font-size: 0.95rem;
  }
  
  .requirements {
    color: var(--text-secondary);
    font-size: 0.9rem;
    margin-bottom: 1.5rem;
  }
  
  .apply-button {
    background: var(--accent-color);
    color: white;
    border: none;
    padding: 0.8rem 1.5rem;
    border-radius: 10px;
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    width: 100%;
    
    &:hover {
      background: var(--accent-hover);
      transform: translateY(-2px);
    }
  }
`;

const CareersPage: React.FC = () => {
  const jobs = [
    {
      id: 1,
      title: "Emlak Danışmanı",
      location: "İstanbul, Türkiye",
      description: "Müşterilere emlak satış ve kiralama konularında profesyonel danışmanlık hizmeti sunacak deneyimli danışmanlar arıyoruz.",
      requirements: "En az 2 yıl emlak sektörü deneyimi, mükemmel iletişim becerileri, sürücü belgesi",
      icon: "👨‍💼"
    },
    {
      id: 2,
      title: "Yazılım Geliştirici",
      location: "İstanbul, Türkiye",
      description: "Emlak platformumuzun geliştirilmesi ve sürdürülmesi için React ve Node.js deneyimli yazılım geliştiriciler arıyoruz.",
      requirements: "React, Node.js, TypeScript deneyimi, en az 3 yıl yazılım geliştirme deneyimi",
      icon: "👨‍💻"
    },
    {
      id: 3,
      title: "Pazarlama Uzmanı",
      location: "İstanbul, Türkiye",
      description: "Dijital pazarlama stratejileri geliştirerek platformumuzun büyümesine katkıda bulunacak pazarlama uzmanları arıyoruz.",
      requirements: "Dijital pazarlama deneyimi, sosyal medya yönetimi, analitik beceriler",
      icon: "📈"
    },
    {
      id: 4,
      title: "Müşteri Hizmetleri Temsilcisi",
      location: "İstanbul, Türkiye",
      description: "Müşterilerimize en iyi hizmeti sunmak için sabırlı ve iletişim becerileri güçlü temsilciler arıyoruz.",
      requirements: "Mükemmel Türkçe, temel İngilizce, müşteri odaklı yaklaşım",
      icon: "📞"
    }
  ];

  return (
    <Container>
      <HeroSection>
        <Title>💼 Kariyer</Title>
        <Subtitle>
          Emlak sektörünün öncü şirketlerinden biri olan ekibimize katılın. 
          Kariyerinizi geliştirmek ve başarılı olmak için mükemmel fırsatlar sunuyoruz.
        </Subtitle>
      </HeroSection>

      <ContentSection>
        <InfoCard>
          <h3>🎯 Neden Biz?</h3>
          <p>
            Emlak sektöründe 20 yılı aşkın deneyimimizle, çalışanlarımızın 
            kariyer gelişimine önem veriyoruz.
          </p>
          <ul>
            <li>Rekabetçi maaş ve yan haklar</li>
            <li>Sürekli eğitim ve gelişim fırsatları</li>
            <li>Esnek çalışma saatleri</li>
            <li>Modern ofis ortamı</li>
            <li>Kariyer gelişim planları</li>
            <li>Ekip aktiviteleri ve sosyal etkinlikler</li>
          </ul>
        </InfoCard>

        <InfoCard>
          <h3>🏢 Şirket Kültürümüz</h3>
          <p>
            Yenilikçi, şeffaf ve kapsayıcı bir çalışma ortamı yaratıyoruz. 
            Her çalışanımızın değerli olduğuna inanıyoruz.
          </p>
          <ul>
            <li>Şeffaf iletişim ve açık kapı politikası</li>
            <li>Yenilikçi projeler ve teknoloji odaklı yaklaşım</li>
            <li>Çeşitlilik ve kapsayıcılık</li>
            <li>Çevre dostu iş uygulamaları</li>
            <li>Toplumsal sorumluluk projeleri</li>
            <li>Güçlü ekip ruhu ve işbirliği</li>
          </ul>
        </InfoCard>
      </ContentSection>

      <JobsSection>
        <h2>🔍 Açık Pozisyonlar</h2>
        <JobsGrid>
          {jobs.map((job) => (
            <JobCard key={job.id}>
              <h3>{job.icon} {job.title}</h3>
              <div className="location">
                📍 {job.location}
              </div>
              <div className="description">
                {job.description}
              </div>
              <div className="requirements">
                <strong>Gereksinimler:</strong> {job.requirements}
              </div>
              <button className="apply-button">
                Başvuru Yap
              </button>
            </JobCard>
          ))}
        </JobsGrid>
      </JobsSection>
    </Container>
  );
};

export default CareersPage; 