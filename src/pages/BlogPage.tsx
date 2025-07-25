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

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2.5rem;
  position: relative;
  z-index: 1;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const BlogCard = styled.div`
  background: var(--card-bg);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--border-color);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  animation: ${fadeInUp} 0.8s ease-out;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
  }
`;

const BlogImage = styled.div`
  height: 200px;
  background: var(--gradient-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: white;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(0, 0, 0, 0.2) 0%, transparent 50%);
  }
`;

const BlogContent = styled.div`
  padding: 2rem;
`;

const BlogTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--text-primary);
  line-height: 1.3;
`;

const BlogExcerpt = styled.p`
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
`;

const BlogMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--text-secondary);
  font-size: 0.9rem;
  
  .date {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .category {
    background: var(--accent-color);
    color: white;
    padding: 0.3rem 0.8rem;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 500;
  }
`;

const BlogPage: React.FC = () => {
  const blogPosts = [
    {
      id: 1,
      title: "2024 Emlak Piyasası Trendleri",
      excerpt: "Bu yıl emlak piyasasında yaşanan değişimler ve gelecek dönem için öngörüler hakkında detaylı analiz.",
      date: "15 Mart 2024",
      category: "Piyasa Analizi",
      icon: "📈"
    },
    {
      id: 2,
      title: "Ev Alırken Dikkat Edilmesi Gerekenler",
      excerpt: "İlk evinizi alırken göz önünde bulundurmanız gereken önemli faktörler ve ipuçları.",
      date: "12 Mart 2024",
      category: "Rehber",
      icon: "🏠"
    },
    {
      id: 3,
      title: "Kredi Hesaplama Rehberi",
      excerpt: "Konut kredisi alırken nasıl hesaplama yapacağınız ve en uygun kredi seçeneklerini nasıl bulacağınız.",
      date: "10 Mart 2024",
      category: "Kredi",
      icon: "💰"
    },
    {
      id: 4,
      title: "İstanbul'un En Popüler Semtleri",
      excerpt: "2024 yılında İstanbul'da en çok tercih edilen semtler ve bu semtlerin avantajları.",
      date: "8 Mart 2024",
      category: "Semt Analizi",
      icon: "🌆"
    },
    {
      id: 5,
      title: "Emlak Yatırımı Yaparken Dikkat Edilecekler",
      excerpt: "Emlak yatırımı yaparken risk faktörleri ve karlı yatırım stratejileri.",
      date: "5 Mart 2024",
      category: "Yatırım",
      icon: "📊"
    },
    {
      id: 6,
      title: "Ev Dekorasyon Trendleri 2024",
      excerpt: "Bu yılın en popüler ev dekorasyon trendleri ve modern tasarım önerileri.",
      date: "3 Mart 2024",
      category: "Dekorasyon",
      icon: "🎨"
    }
  ];

  return (
    <Container>
      <HeroSection>
        <Title>📝 Emlak Blog</Title>
        <Subtitle>
          Emlak dünyasından en güncel haberler, piyasa analizleri ve uzman görüşleri. 
          Bilgiye dayalı kararlar almanız için yanınızdayız.
        </Subtitle>
      </HeroSection>

      <BlogGrid>
        {blogPosts.map((post) => (
          <BlogCard key={post.id}>
            <BlogImage>
              <span style={{ zIndex: 1, position: 'relative' }}>{post.icon}</span>
            </BlogImage>
            <BlogContent>
              <BlogTitle>{post.title}</BlogTitle>
              <BlogExcerpt>{post.excerpt}</BlogExcerpt>
              <BlogMeta>
                <div className="date">
                  📅 {post.date}
                </div>
                <div className="category">
                  {post.category}
                </div>
              </BlogMeta>
            </BlogContent>
          </BlogCard>
        ))}
      </BlogGrid>
    </Container>
  );
};

export default BlogPage; 