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

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
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
  
  @media (max-width: 768px) {
    font-size: clamp(2rem, 4vw, 2.5rem);
  }
`;

const Subtitle = styled.p`
  font-size: clamp(1.1rem, 2vw, 1.3rem);
  color: #64748b;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
  font-weight: 400;
  
  @media (max-width: 768px) {
    font-size: clamp(1rem, 2vw, 1.1rem);
  }
`;

const NewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2.5rem;
  position: relative;
  z-index: 1;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  @media (max-width: 480px) {
    gap: 1.5rem;
  }
`;

const NewsCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(16, 185, 129, 0.1);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  animation: ${fadeInUp} 0.8s ease-out;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(16, 185, 129, 0.15);
    border-color: rgba(16, 185, 129, 0.2);
  }
`;

const NewsImage = styled.div`
  height: 200px;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: white;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
  }
  
  span {
    z-index: 1;
    position: relative;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
  }
`;

const NewsContent = styled.div`
  padding: 2rem;
`;

const NewsTitle = styled.h3`
  font-size: clamp(1.2rem, 2.5vw, 1.4rem);
  font-weight: 700;
  margin-bottom: 1rem;
  color: #1e293b;
  line-height: 1.3;
`;

const NewsExcerpt = styled.p`
  color: #64748b;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
`;

const NewsMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #64748b;
  font-size: 0.9rem;
  
  .date {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 500;
  }
  
  .category {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: white;
    padding: 0.4rem 1rem;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
    box-shadow: 0 2px 8px rgba(16, 185, 129, 0.2);
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
    
    &:hover::before {
      left: 100%;
    }
  }
`;

const NewsPage: React.FC = () => {
  const newsItems = [
    {
      id: 1,
      title: "Yeni Konut Kredisi Düzenlemeleri",
      excerpt: "Merkez Bankası'nın yeni konut kredisi düzenlemeleri ile ilgili detaylar ve piyasaya etkileri.",
      date: "20 Mart 2024",
      category: "Ekonomi",
      icon: "🏦"
    },
    {
      id: 2,
      title: "İstanbul'da Yeni Metro Hatları",
      excerpt: "İstanbul'da planlanan yeni metro hatları ve emlak piyasasına olası etkileri hakkında analiz.",
      date: "18 Mart 2024",
      category: "Altyapı",
      icon: "🚇"
    },
    {
      id: 3,
      title: "Emlak Vergisi Güncellemeleri",
      excerpt: "2024 yılı emlak vergisi güncellemeleri ve mülk sahiplerini etkileyecek değişiklikler.",
      date: "16 Mart 2024",
      category: "Vergi",
      icon: "📋"
    },
    {
      id: 4,
      title: "Yeşil Bina Sertifikası",
      excerpt: "Çevre dostu binalar için yeni sertifika programı ve teşvikler hakkında bilgiler.",
      date: "14 Mart 2024",
      category: "Çevre",
      icon: "🌱"
    },
    {
      id: 5,
      title: "Akıllı Ev Teknolojileri",
      excerpt: "Emlak sektöründe akıllı ev teknolojilerinin yükselişi ve gelecek trendleri.",
      date: "12 Mart 2024",
      category: "Teknoloji",
      icon: "🏠"
    },
    {
      id: 6,
      title: "Kentsel Dönüşüm Projeleri",
      excerpt: "Türkiye genelinde devam eden kentsel dönüşüm projeleri ve güncel durumlar.",
      date: "10 Mart 2024",
      category: "Dönüşüm",
      icon: "🏗️"
    }
  ];

  return (
    <Container>
      <HeroSection>
        <Title>📰 Emlak <span>Haberleri</span></Title>
        <Subtitle>
          Emlak sektöründen en güncel haberler, yasal değişiklikler ve piyasa güncellemeleri. 
          Bilgiye dayalı kararlar almanız için güncel kalın.
        </Subtitle>
      </HeroSection>

      <NewsGrid>
        {newsItems.map((news) => (
          <NewsCard key={news.id}>
            <NewsImage>
              <span>{news.icon}</span>
            </NewsImage>
            <NewsContent>
              <NewsTitle>{news.title}</NewsTitle>
              <NewsExcerpt>{news.excerpt}</NewsExcerpt>
              <NewsMeta>
                <div className="date">
                  📅 {news.date}
                </div>
                <div className="category">
                  {news.category}
                </div>
              </NewsMeta>
            </NewsContent>
          </NewsCard>
        ))}
      </NewsGrid>
    </Container>
  );
};

export default NewsPage; 