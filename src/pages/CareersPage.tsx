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

const InfoCard = styled.div`
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

const JobsSection = styled.div`
  position: relative;
  z-index: 1;
`;

const JobsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
`;

const JobCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(16, 185, 129, 0.1);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(16, 185, 129, 0.15);
  }
  
  h4 {
    font-size: 1.3rem;
    font-weight: 600;
    color: #1e293b;
    margin-bottom: 0.8rem;
  }
  
  .department {
    color: #10b981;
    font-weight: 500;
    margin-bottom: 0.8rem;
    font-size: 0.9rem;
  }
  
  .description {
    color: #6b7280;
    line-height: 1.6;
    margin-bottom: 1rem;
    font-size: 0.95rem;
  }
  
  .requirements {
    color: #9ca3af;
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }
  
  .apply-button {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: white;
    border: none;
    padding: 0.8rem 1.5rem;
    border-radius: 10px;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    width: 100%;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(16, 185, 129, 0.3);
    }
  }
`;

const SectionTitle = styled.h2`
  font-size: clamp(2rem, 4vw, 2.5rem);
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 1rem;
  text-align: center;
  
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
  margin: 0 auto 3rem;
  line-height: 1.6;
  text-align: center;
`;

const CareersPage: React.FC = () => {
  const jobOpenings = [
    {
      id: 1,
      title: "Emlak Danışmanı",
      department: "Satış Departmanı",
      description: "Müşterilere emlak alım-satım konularında danışmanlık yapacak, deneyimli emlak danışmanları arıyoruz.",
      requirements: "En az 2 yıl deneyim, emlak lisansı gerekli",
      location: "İstanbul"
    },
    {
      id: 2,
      title: "Web Geliştirici",
      department: "Teknoloji Departmanı",
      description: "React ve Node.js teknolojileri ile web uygulamaları geliştirecek yazılım geliştiriciler arıyoruz.",
      requirements: "En az 3 yıl deneyim, React/Node.js bilgisi",
      location: "Uzaktan"
    },
    {
      id: 3,
      title: "Müşteri Hizmetleri Temsilcisi",
      department: "Müşteri Hizmetleri",
      description: "Müşteri sorularını yanıtlayacak ve destek sağlayacak deneyimli temsilciler arıyoruz.",
      requirements: "En az 1 yıl deneyim, iyi iletişim becerileri",
      location: "İstanbul"
    },
    {
      id: 4,
      title: "Pazarlama Uzmanı",
      department: "Pazarlama Departmanı",
      description: "Dijital pazarlama stratejileri geliştirecek ve kampanyaları yönetecek uzmanlar arıyoruz.",
      requirements: "En az 2 yıl deneyim, dijital pazarlama bilgisi",
      location: "İstanbul"
    },
    {
      id: 5,
      title: "Muhasebe Uzmanı",
      department: "Finans Departmanı",
      description: "Şirket muhasebe işlemlerini yürütecek deneyimli muhasebe uzmanları arıyoruz.",
      requirements: "En az 3 yıl deneyim, muhasebe lisansı",
      location: "İstanbul"
    },
    {
      id: 6,
      title: "İnsan Kaynakları Uzmanı",
      department: "İnsan Kaynakları",
      description: "İşe alım süreçlerini yönetecek ve çalışan gelişimi konularında destek sağlayacak uzmanlar arıyoruz.",
      requirements: "En az 2 yıl deneyim, İK süreçleri bilgisi",
      location: "İstanbul"
    }
  ];

  return (
    <Container>
      <HeroSection>
        <Title>Kariyer <span>Fırsatları</span></Title>
        <Subtitle>
          Dinamik ekibimizin bir parçası olun ve emlak sektörünün geleceğini birlikte şekillendirelim
        </Subtitle>
      </HeroSection>

      <ContentSection>
        <InfoCard>
          <h3>Neden Biz?</h3>
          <p>
            Emlak sektörünün öncü şirketlerinden biri olarak, çalışanlarımıza en iyi fırsatları sunuyoruz.
          </p>
          <ul>
            <li>Rekabetçi maaş ve yan haklar</li>
            <li>Esnek çalışma saatleri</li>
            <li>Sürekli eğitim ve gelişim imkanları</li>
            <li>Kariyer gelişim planları</li>
            <li>Modern ofis ortamı</li>
            <li>Takım çalışması odaklı kültür</li>
          </ul>
        </InfoCard>

        <InfoCard>
          <h3>Değerlerimiz</h3>
          <p>
            Şirket kültürümüzü oluşturan temel değerlerimiz ve çalışma prensiplerimiz.
          </p>
          <ul>
            <li>Müşteri odaklı yaklaşım</li>
            <li>Şeffaflık ve dürüstlük</li>
            <li>Yenilikçilik ve sürekli gelişim</li>
            <li>Takım çalışması ve işbirliği</li>
            <li>Sosyal sorumluluk</li>
            <li>Kalite ve mükemmellik</li>
          </ul>
        </InfoCard>
      </ContentSection>

      <JobsSection>
        <SectionTitle>Açık <span>Pozisyonlar</span></SectionTitle>
        <SectionSubtitle>
          Şu anda aşağıdaki pozisyonlar için başvuru alıyoruz. Sizin için uygun olan pozisyonu bulun ve başvurunuzu yapın.
        </SectionSubtitle>
        
        <JobsGrid>
          {jobOpenings.map((job) => (
            <JobCard key={job.id}>
              <h4>{job.title}</h4>
              <div className="department">{job.department}</div>
              <p className="description">{job.description}</p>
              <div className="requirements">📋 {job.requirements}</div>
              <div className="requirements">📍 {job.location}</div>
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